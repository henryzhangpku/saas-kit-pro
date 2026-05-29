"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    features: ["100 AI generations/mo", "Basic support", "1 API key"],
    current: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    features: ["10,000 AI generations/mo", "Priority support", "Unlimited API keys", "Advanced models"],
    current: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    features: ["Unlimited generations", "Dedicated support", "Custom models", "SLA guarantee"],
    current: false,
  },
]

export default function BillingPage() {
  const [loading, setLoading] = useState<string | null>(null)

  async function upgrade(priceId: string) {
    setLoading(priceId)
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } finally {
      setLoading(null)
    }
  }

  async function openPortal() {
    setLoading("portal")
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="text-muted-foreground">Manage your subscription and billing details</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className={plan.current ? "border-primary" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{plan.name}</CardTitle>
                {plan.current && <Badge>Current</Badge>}
              </div>
              <div className="text-3xl font-bold">
                ${plan.price}
                <span className="text-sm font-normal text-muted-foreground">/mo</span>
              </div>
              <CardDescription>
                {plan.id === "pro" && "Best for growing teams"}
                {plan.id === "enterprise" && "For large organizations"}
                {plan.id === "free" && "Get started for free"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f, i) => (
                  <li key={i} className="text-sm flex items-center gap-2">
                    <span className="text-emerald-500">✓</span> {f}
                  </li>
                ))}
              </ul>
              {!plan.current && (
                <Button
                  className="w-full"
                  onClick={() => upgrade(plan.id === "pro" ? "pro" : "enterprise")}
                  loading={loading === (plan.id === "pro" ? "pro" : "enterprise")}
                >
                  Upgrade to {plan.name}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline" onClick={openPortal} loading={loading === "portal"}>
          Manage Billing Portal
        </Button>
      </div>
    </div>
  )
}
