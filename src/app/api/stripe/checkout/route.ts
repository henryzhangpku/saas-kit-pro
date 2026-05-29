import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { createCheckoutSession } from "@/lib/stripe"

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { priceId } = await req.json()

    const priceMap: Record<string, string> = {
      pro: process.env.STRIPE_PRO_PRICE_ID || "",
      enterprise: process.env.STRIPE_ENTERPRISE_PRICE_ID || "",
    }

    const resolvedPriceId = priceMap[priceId] || priceId
    if (!resolvedPriceId) {
      return NextResponse.json({ error: "Invalid price" }, { status: 400 })
    }

    const checkoutSession = await createCheckoutSession(
      session.user.id,
      resolvedPriceId
    )

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    )
  }
}
