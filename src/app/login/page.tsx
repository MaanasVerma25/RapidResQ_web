"use client"
import { useState } from "react"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false); const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false) } else { router.push("/dashboard") }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center"><Shield className="h-12 w-12 text-primary mb-2" /><CardTitle className="text-2xl">Welcome back</CardTitle><CardDescription>Enter your email to sign in</CardDescription></CardHeader>
        <form onSubmit={handleLogin}><CardContent className="grid gap-4">
          <div className="grid gap-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
          <div className="grid gap-2"><Label htmlFor="password">Password</Label><Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
          {error && <p className="text-sm text-destructive font-medium">{error}</p>}
        </CardContent><CardFooter className="flex flex-col gap-4"><Button className="w-full" type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign In"}</Button><p className="text-sm text-muted-foreground text-center">Don't have an account? <Link href="/signup" className="text-primary hover:underline">Sign up</Link></p></CardFooter></form>
      </Card>
    </div>
  )
}
