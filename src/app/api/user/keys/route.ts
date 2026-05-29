import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const keys = await prisma.apiKey.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      key: true,
      lastUsed: true,
      createdAt: true,
    },
  })

  return NextResponse.json({ keys })
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { name } = await req.json()
  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 })
  }

  const keyStr = `sk_${crypto.randomUUID().replace(/-/g, "")}${crypto.randomUUID().replace(/-/g, "")}`

  const apiKey = await prisma.apiKey.create({
    data: {
      name,
      key: keyStr,
      userId: session.user.id,
    },
  })

  return NextResponse.json({
    id: apiKey.id,
    name: apiKey.name,
    key: apiKey.key,
    createdAt: apiKey.createdAt,
  })
}

export async function DELETE(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")
  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 })
  }

  const key = await prisma.apiKey.findFirst({
    where: { id, userId: session.user.id },
  })
  if (!key) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  await prisma.apiKey.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
