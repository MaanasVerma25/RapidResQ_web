"use client"
import Link from "next/link"
import { Shield, LogOut, Settings, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { cn } from "@/lib/utils"

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  const isAuthPage = ['/login', '/signup', '/'].includes(pathname)
  const isEmergency = pathname === '/emergency'

  if (isEmergency) return null
  if (!user && !isAuthPage) return null

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        <Link href={user ? "/dashboard" : "/"} className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">RapidResQ</span>
        </Link>
        {user && (
          <div className="flex items-center space-x-1 md:space-x-4">
            <Link href="/dashboard">
              <Button variant={pathname === '/dashboard' ? 'secondary' : 'ghost'} size="sm" className="hidden md:flex">
                <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
              </Button>
              <Button variant={pathname === '/dashboard' ? 'secondary' : 'ghost'} size="icon" className="md:hidden">
                <LayoutDashboard className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contacts">
              <Button variant={pathname === '/contacts' ? 'secondary' : 'ghost'} size="sm" className="hidden md:flex">
                <Settings className="mr-2 h-4 w-4" /> Contacts
              </Button>
              <Button variant={pathname === '/contacts' ? 'secondary' : 'ghost'} size="icon" className="md:hidden">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={handleLogout}><LogOut className="h-5 w-5" /></Button>
          </div>
        )}
        {!user && isAuthPage && (
          <div className="flex items-center space-x-4">
            <Link href="/login"><Button variant="ghost">Login</Button></Link>
            <Link href="/signup"><Button>Get Started</Button></Link>
          </div>
        )}
      </div>
    </nav>
  )
}
