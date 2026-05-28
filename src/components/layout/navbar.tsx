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
      <nav className="sticky top-0 z-50 w-full bg-surface/80 backdrop-blur-md border-b-2 border-outline-variant hidden md:block">
        <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <Shield className="h-6 w-6 text-primary-container fill-primary-container group-hover:scale-110 transition-transform" />
            <span className="text-xl font-black tracking-tighter text-primary uppercase">RAPID REQ</span>
          </Link>

          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.path
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant="ghost"
                    className={`flex items-center gap-2 font-bold text-xs uppercase tracking-widest px-4 h-10 rounded-lg transition-all ${
                      isActive ? 'bg-primary-container text-on-primary-container shadow-lg shadow-primary-container/20' : 'text-on-surface-variant hover:text-primary hover:bg-surface-variant'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
            <div className="w-[1px] h-6 bg-outline-variant mx-2"></div>
            <Button 
              variant="ghost" 
              onClick={() => router.push('/')}
              className="text-on-surface-variant hover:text-error hover:bg-error/10 h-10 w-10 p-0 rounded-lg"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-surface-container-highest border-t-2 border-outline-variant flex justify-around items-center px-4 py-2 pb-safe shadow-lg shadow-primary/10 rounded-t-xl">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.path
          return (
            <Link key={item.path} href={item.path} className="flex-1 max-w-[80px]">
              <div className={`flex flex-col items-center justify-center gap-1 py-1 rounded-xl transition-all ${
                isActive ? 'bg-primary-container text-on-primary-container scale-90' : 'text-on-surface-variant hover:text-primary'
              }`}>
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-bold uppercase tracking-tighter">{item.name}</span>
              </div>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
