import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user) redirect("/login")

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {session.user.name || session.user.email}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border p-6">
          <div className="text-sm text-muted-foreground mb-1">API Calls Today</div>
          <div className="text-3xl font-bold">0</div>
        </div>
        <div className="rounded-xl border p-6">
          <div className="text-sm text-muted-foreground mb-1">Active API Keys</div>
          <div className="text-3xl font-bold">0</div>
        </div>
        <div className="rounded-xl border p-6">
          <div className="text-sm text-muted-foreground mb-1">Plan</div>
          <div className="text-3xl font-bold">Free</div>
        </div>
      </div>

      <div className="rounded-xl border p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <a href="/dashboard/api-keys" className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
            <h3 className="font-medium mb-1">Create API Key</h3>
            <p className="text-sm text-muted-foreground">Generate a new API key for your application</p>
          </a>
          <a href="/dashboard/billing" className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
            <h3 className="font-medium mb-1">Upgrade Plan</h3>
            <p className="text-sm text-muted-foreground">Unlock more features with a Pro plan</p>
          </a>
        </div>
      </div>
    </div>
  )
}
