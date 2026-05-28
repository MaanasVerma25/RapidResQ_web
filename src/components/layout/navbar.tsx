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
      {/* Desktop Top Nav */}
      <nav className="sticky top-0 z-50 w-full bg-[#111317]/80 backdrop-blur-xl border-b border-[#282a2e] hidden md:block">
        <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="relative">
              <Shield className="h-6 w-6 text-[#ff5f1f] fill-[#ff5f1f]/10 group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 h-6 w-6 text-[#ff5f1f] animate-pulse blur-[4px] opacity-40 pointer-events-none" />
            </div>
            <span className="text-lg font-black tracking-tight text-white uppercase font-sans">
              RAPID <span className="text-[#ff5f1f]">REQ</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.path
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant="ghost"
                    className={`flex items-center gap-2 font-bold font-geist text-[10px] uppercase tracking-widest px-4.5 h-10 rounded-md transition-all duration-300 ${
                      isActive 
                        ? 'bg-[#ff5f1f] text-[#111317] font-black safety-glow-orange hover:bg-[#ff5f1f]/90' 
                        : 'text-[#e2e2e8]/80 hover:text-white hover:bg-[#1a1c20]'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
            <div className="w-[1px] h-6 bg-[#282a2e] mx-2"></div>
            <Button 
              variant="ghost" 
              onClick={() => router.push('/')}
              className="text-[#e2e2e8]/60 hover:text-[#ffb4ab] hover:bg-[#ffb4ab]/10 h-10 w-10 p-0 rounded-md transition-colors"
            >
              <LogOut className="h-4.5 w-4.5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-[#1e2024]/90 backdrop-blur-xl border-t border-[#282a2e] flex justify-around items-center px-4 py-3.5 pb-safe shadow-xl rounded-t-xl">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.path
          return (
            <Link key={item.path} href={item.path} className="flex-1 max-w-[80px]">
              <div className={`flex flex-col items-center justify-center gap-1.5 py-1.5 rounded-md transition-all duration-300 ${
                isActive 
                  ? 'bg-[#ff5f1f] text-[#111317] font-black scale-95 safety-glow-orange' 
                  : 'text-[#e2e2e8]/75 hover:text-white'
              }`}>
                <Icon className="h-4.5 w-4.5" />
                <span className="text-[9px] font-bold font-geist uppercase tracking-wider">{item.name}</span>
              </div>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
