"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ApiKey {
  id: string
  name: string
  key: string
  lastUsed: string | null
  createdAt: string
}

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([])
  const [newKey, setNewKey] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch("/api/user/keys")
      .then((r) => r.json())
      .then((data) => setKeys(data.keys || []))
  }, [])

  async function createKey() {
    if (!name) return
    setLoading(true)
    try {
      const res = await fetch("/api/user/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })
      const data = await res.json()
      setNewKey(data.key)
      setName("")
      setKeys((prev) => [data, ...prev])
    } finally {
      setLoading(false)
    }
  }

  async function deleteKey(id: string) {
    await fetch(`/api/user/keys?id=${id}`, { method: "DELETE" })
    setKeys((prev) => prev.filter((k) => k.id !== id))
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">API Keys</h1>
        <p className="text-muted-foreground">Manage your API keys for programmatic access</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create API Key</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My API Key"
              className="flex h-10 w-full max-w-xs rounded-lg border border-input bg-background px-3 py-2 text-sm"
            />
            <Button onClick={createKey} loading={loading} disabled={!name}>
              Create Key
            </Button>
          </div>
          {newKey && (
            <div className="mt-4 p-4 rounded-lg border bg-muted">
              <p className="text-sm font-medium mb-2">Your new API key:</p>
              <code className="text-sm break-all">{newKey}</code>
              <p className="text-xs text-muted-foreground mt-2">
                ⚠️ Copy this key now. You won&apos;t be able to see it again.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        {keys.map((key) => (
          <div key={key.id} className="rounded-lg border p-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{key.name}</span>
                <Badge variant="secondary">Active</Badge>
              </div>
              <code className="text-sm text-muted-foreground">
                {key.key.slice(0, 12)}...
              </code>
              <div className="text-xs text-muted-foreground mt-1">
                Created {new Date(key.createdAt).toLocaleDateString()}
                {key.lastUsed && ` · Last used ${new Date(key.lastUsed).toLocaleDateString()}`}
              </div>
            </div>
            <Button variant="destructive" size="sm" onClick={() => deleteKey(key.id)}>
              Delete
            </Button>
          </div>
        ))}
        {keys.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">
            No API keys yet. Create one above.
          </p>
        )}
      </div>
    </div>
  )
}
