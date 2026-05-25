"use client"
import Link from "next/link"
import { Shield, LogOut, Settings, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Automatically set a guest user to bypass login checks
    setUser({ email: "guest@rapidresq.com", id: "guest-user" })
  }, [])

  const handleLogout = async () => {
    router.push("/")
  }

  const isAuthPage = ['/login', '/signup', '/'].includes(pathname)
  const isEmergency = pathname === '/emergency'

  if (isEmergency) return null
  if (!user && !isAuthPage) return null

  return (
    <nav className="sticky top-0 z-50 w-full px-4 py-3 bg-slate-950/40 backdrop-blur-md border-b border-white/[0.05]">
      <div className="container max-w-7xl mx-auto flex h-14 items-center justify-between">
        
        {/* Animated Brand Logo */}
        <Link href={user ? "/dashboard" : "/"} className="flex items-center space-x-3 group">
          <div className="relative flex items-center justify-center p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 group-hover:border-purple-500/40 transition-colors duration-300">
            <Shield className="h-5 w-5 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="absolute inset-0 rounded-xl bg-purple-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </div>
          <span className="text-xl font-bold tracking-tight text-glow bg-gradient-to-r from-white via-slate-200 to-purple-400 bg-clip-text text-transparent">
            RapidResQ
          </span>
        </Link>

        {/* Navigation Actions */}
        {user && (
          <div className="flex items-center space-x-2 md:space-x-4">
            
            {/* Dashboard Link */}
            <Link href="/dashboard">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`relative px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-300 hidden md:flex items-center gap-2 border ${
                  pathname === '/dashboard' 
                    ? 'bg-purple-500/10 border-purple-500/30 text-purple-300' 
                    : 'border-transparent text-slate-400 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                <LayoutDashboard className="h-4.5 w-4.5" />
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`md:hidden p-2 rounded-lg border ${
                  pathname === '/dashboard' 
                    ? 'bg-purple-500/10 border-purple-500/30 text-purple-300' 
                    : 'border-transparent text-slate-400'
                }`}
              >
                <LayoutDashboard className="h-5 w-5" />
              </Button>
            </Link>

            {/* Contacts Link */}
            <Link href="/contacts">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`relative px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-300 hidden md:flex items-center gap-2 border ${
                  pathname === '/contacts' 
                    ? 'bg-purple-500/10 border-purple-500/30 text-purple-300' 
                    : 'border-transparent text-slate-400 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                <Settings className="h-4.5 w-4.5" />
                Contacts
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`md:hidden p-2 rounded-lg border ${
                  pathname === '/contacts' 
                    ? 'bg-purple-500/10 border-purple-500/30 text-purple-300' 
                    : 'border-transparent text-slate-400'
                }`}
              >
                <Settings className="h-5 w-5" />
              </Button>
            </Link>

            {/* Premium Logout Button */}
            <div className="h-5 w-[1px] bg-white/[0.08] mx-1"></div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLogout}
              className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 p-2 rounded-lg transition-all duration-300"
            >
              <LogOut className="h-5 w-5" />
            </Button>

          </div>
        )}

        {/* Fallback Unauthenticated Links */}
        {!user && isAuthPage && (
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-slate-300 hover:text-white">Dashboard</Button>
            </Link>
          </div>
        )}

      </div>
    </nav>
  )
}
