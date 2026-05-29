import { NextResponse } from "next/server"
import OpenAI from "openai"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  // Allow both session auth and API key auth
  const session = await auth()
  const apiKey = req.headers.get("x-api-key")

  let userId: string | null = null

  if (session?.user?.id) {
    userId = session.user.id
  } else if (apiKey) {
    const key = await prisma.apiKey.findUnique({
      where: { key: apiKey },
    })
    if (!key) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 })
    }
    userId = key.userId
    await prisma.apiKey.update({
      where: { id: key.id },
      data: { lastUsed: new Date() },
    })
  }

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { prompt, model = "gpt-4o-mini", maxTokens = 1024 } = await req.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: maxTokens,
    })

    // Track usage
    const usage = completion.usage
    if (usage) {
      await prisma.aiUsage.create({
        data: {
          userId,
          model,
          promptTokens: usage.prompt_tokens,
          completionTokens: usage.completion_tokens,
          cost: (usage.prompt_tokens * 0.00000015) + (usage.completion_tokens * 0.0000006),
        },
      })
    }

    return NextResponse.json({
      content: completion.choices[0]?.message?.content || "",
      model: completion.model,
      usage: {
        promptTokens: usage?.prompt_tokens || 0,
        completionTokens: usage?.completion_tokens || 0,
      },
    })
  } catch (error) {
    console.error("AI generation error:", error)
    return NextResponse.json(
      { error: "Failed to generate" },
      { status: 500 }
    )
  }
}
