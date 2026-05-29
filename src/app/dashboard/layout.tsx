import { redirect } from "next/navigation"
import { auth, signOut } from "@/lib/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/dashboard", label: "Overview", icon: "📊" },
  { href: "/dashboard/api-keys", label: "API Keys", icon: "🔑" },
  { href: "/dashboard/billing", label: "Billing", icon: "💳" },
  { href: "/dashboard/settings", label: "Settings", icon: "⚙️" },
]

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user) redirect("/login")

  return (
    <div className="min-h-screen">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 border-r bg-card">
        <div className="p-6">
          <Link href="/" className="text-xl font-bold">
            SaaS<span className="text-primary/70">Kit</span>
          </Link>
        </div>
        <nav className="px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-accent transition-colors"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-4 left-3 right-3">
          <form
            action={async () => {
              "use server"
              await signOut()
            }}
          >
            <Button variant="ghost" className="w-full justify-start" type="submit">
              🚪 Sign Out
            </Button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64">
        <header className="border-b h-16 flex items-center justify-end px-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="text-sm">
              <div className="font-medium">{session.user.name || "User"}</div>
              <div className="text-muted-foreground">{session.user.email}</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              {session.user.name?.charAt(0) || session.user.email?.charAt(0) || "U"}
            </div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
