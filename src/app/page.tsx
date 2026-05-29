import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            SaaS<span className="text-primary/70">Kit</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1">
        <div className="container mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm mb-8">
            🚀 Launch your SaaS in hours, not months
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl mx-auto mb-6">
            The Complete{" "}
            <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              SaaS Starter Kit
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Authentication, payments, AI integration, and more — all pre-built and ready to deploy.
            Stop rebuilding the same boilerplate. Start shipping your actual product.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/register">
              <Button size="xl">Start Building →</Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="xl">See Features</Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-20">
            <div>
              <div className="text-3xl font-bold">10+</div>
              <div className="text-sm text-muted-foreground">Pre-built Pages</div>
            </div>
            <div>
              <div className="text-3xl font-bold">99%</div>
              <div className="text-sm text-muted-foreground">TypeScript Coverage</div>
            </div>
            <div>
              <div className="text-3xl font-bold">Zero</div>
              <div className="text-sm text-muted-foreground">Config Needed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need to Launch
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, i) => (
              <div key={i} className="rounded-xl border p-6 hover:shadow-lg transition-shadow">
                <div className="text-2xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Simple Pricing</h2>
          <p className="text-muted-foreground text-center mb-12">
            Start free, upgrade when you grow
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`rounded-xl border p-6 ${
                  plan.popular ? "border-primary shadow-lg relative" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="font-semibold text-lg mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold mb-4">
                  ${plan.price}
                  <span className="text-sm font-normal text-muted-foreground">/mo</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className="text-sm flex items-center gap-2">
                      <span className="text-emerald-500">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href={plan.price === 0 ? "/register" : "/register"}>
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Launch?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join hundreds of founders who shipped their SaaS faster with our boilerplate.
          </p>
          <Link href="/register">
            <Button size="xl">Get Started Free →</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          Built with Next.js, Stripe & Prisma. © 2025 SaaSKit.
        </div>
      </footer>
    </div>
  )
}

const features = [
  { icon: "🔐", title: "Authentication", description: "Email/password, Google, GitHub OAuth out of the box with NextAuth.js" },
  { icon: "💳", title: "Billing", description: "Stripe subscriptions, metered billing, and customer portal pre-integrated" },
  { icon: "🤖", title: "AI Integration", description: "OpenAI API ready with usage tracking, rate limiting, and cost monitoring" },
  { icon: "🎨", title: "Modern UI", description: "Beautiful dashboard with Tailwind CSS, dark mode, and responsive design" },
  { icon: "📊", title: "Analytics", description: "Usage dashboards, API key management, and real-time monitoring" },
  { icon: "🔌", title: "API Ready", description: "RESTful API with rate limiting, authentication, and developer docs" },
]

const plans = [
  {
    name: "Free",
    price: 0,
    cta: "Get Started",
    features: ["100 AI generations/mo", "Basic support", "1 API key"],
  },
  {
    name: "Pro",
    price: 29,
    popular: true,
    cta: "Start Free Trial",
    features: ["10,000 AI generations/mo", "Priority support", "Unlimited API keys", "Advanced models", "Usage analytics"],
  },
  {
    name: "Enterprise",
    price: 99,
    cta: "Contact Sales",
    features: ["Unlimited generations", "Dedicated support", "Custom models", "SLA guarantee", "Team accounts", "SSO"],
  },
]
