import Stripe from "stripe"
import { prisma } from "./prisma"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
  typescript: true,
})

export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    features: [
      "100 AI generations/month",
      "Basic support",
      "1 API key",
    ],
  },
  pro: {
    name: "Pro",
    price: 29,
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    features: [
      "10,000 AI generations/month",
      "Priority support",
      "Unlimited API keys",
      "Advanced models",
      "Usage analytics",
    ],
  },
  enterprise: {
    name: "Enterprise",
    price: 99,
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID,
    features: [
      "Unlimited AI generations",
      "Dedicated support",
      "Custom models",
      "SLA guarantee",
      "Team accounts",
      "SSO",
    ],
  },
} as const

export async function createCheckoutSession(
  userId: string,
  priceId: string
) {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) throw new Error("User not found")

  const session = await stripe.checkout.sessions.create({
    customer: user.stripeCustomerId || undefined,
    customer_email: user.stripeCustomerId ? undefined : user.email!,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=true`,
    metadata: { userId },
  })

  return session
}

export async function createCustomerPortalSession(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user?.stripeCustomerId) throw new Error("No Stripe customer")

  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
  })

  return session
}
