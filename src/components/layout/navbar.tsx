"use client"
import Link from "next/link"
import { Shield, LayoutDashboard, History, Radio as AntennaIcon, ShieldCheck, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    setUser({ email: "guest@rapidresq.com", id: "guest-user" })
  }, [])

  const isEmergency = pathname === '/emergency'
  if (isEmergency) return null

  const navItems = [
    { name: 'Home', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Setup', path: '/setup', icon: AntennaIcon },
    { name: 'Guardians', path: '/contacts', icon: ShieldCheck },
    { name: 'History', path: '/history', icon: History },
  ]

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border hidden md:block">
        <div className="container max-w-7xl mx-auto flex h-20 items-center justify-between px-6">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <Shield className="h-7 w-7 text-primary group-hover:scale-110 transition-transform shadow-sm" />
            <span className="text-2xl font-black tracking-tighter text-primary uppercase italic">RAPID REQ</span>
          </Link>

          <div className="flex items-center gap-3">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.path
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`flex items-center gap-2 font-black text-xs uppercase tracking-[0.2em] px-5 h-11 rounded-xl transition-all italic ${
                      isActive ? 'shadow-lg shadow-primary/20' : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
            <div className="w-[1px] h-6 bg-border mx-2"></div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => router.push('/')}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-11 w-11 rounded-xl"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-card border-t border-border flex justify-around items-center px-4 py-3 pb-safe shadow-2xl shadow-primary/10">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.path
          return (
            <Link key={item.path} href={item.path} className="flex-1 max-w-[90px]">
              <div className={`flex flex-col items-center justify-center gap-1.5 py-2.5 rounded-2xl transition-all ${
                isActive ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105' : 'text-muted-foreground hover:text-primary'
              }`}>
                <Icon className="h-6 w-6" />
                <span className="text-[10px] font-black uppercase tracking-widest italic">{item.name}</span>
              </div>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
