"use client"
import { useEffect, useState } from "react"
import { Shield, Radar, Activity, Mic, Settings, Heart, Radio, Eye, EyeOff, LayoutDashboard, History, ShieldAlert, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { User } from "@supabase/supabase-js"
import { motion, AnimatePresence } from "framer-motion"
import { useAiDetection } from "@/hooks/use-ai-detection"
import Link from "next/link"

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<any>(null)
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [isPrivate, setIsPrivate] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useAiDetection(isMonitoring)

  useEffect(() => {
    const fetch = async () => {
      // Mocked guest user
      setUser({ id: 'guest', email: 'guest@rapidresq.ai' } as any)
      setProfile({ full_name: 'Resident Zero' })
      setLoading(false)
    }
    fetch()
  }, [])

  if (loading) return null

  return (
    <div className="min-h-screen bg-[#111317] text-[#e2e2e8] pb-24 font-sans selection:bg-[#ff5f1f]/30">
      
      {/* HUD Header */}
      <header className="p-6 flex justify-between items-center border-b border-[#282a2e] bg-[#111317]/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-lg bg-[#ff5f1f] flex items-center justify-center safety-glow-orange">
              <Shield className="w-6 h-6 text-[#111317]" />
            </div>
            {isMonitoring && (
              <>
                <div className="absolute -bottom-1 -right-1 w-4.5 h-4.5 bg-[#2ff801] border-2 border-[#111317] rounded-full animate-pulse-ring" />
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#2ff801] border-2 border-[#111317] rounded-full" />
              </>
            )}
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight uppercase leading-none text-white">Rapid ResQ</h1>
            <p className="text-[9px] font-bold font-geist text-[#8e9aaf] tracking-[0.25em] mt-1.5 uppercase">Next-Gen Sentinel v4.0</p>
          </div>
        </div>
        <Link href="/setup">
          <Button variant="ghost" size="icon" className="rounded-md border border-[#2d2f36] bg-[#1a1c20] hover:border-[#ff5f1f]/50 hover:bg-[#1a1c20] transition-all">
            <Settings className="w-5 h-5 text-[#8e9aaf]" />
          </Button>
        </Link>
      </header>

      <main className="p-6 space-y-8 max-w-xl mx-auto w-full">
        
        {/* Core Status Card (Tonal Level 1 Layering over Background) */}
        <section className="bg-[#1a1c20] p-6 rounded-lg shadow-xl space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold font-geist text-[#8e9aaf] uppercase tracking-[0.3em] mb-2">Defense Status</p>
              <div className="flex items-center gap-3.5">
                <div className={`w-3.5 h-3.5 rounded-full ${isMonitoring ? 'bg-[#2ff801] safety-glow-green animate-pulse' : 'bg-[#8e9aaf]'}`} />
                <h2 className="text-4xl font-black tracking-tight uppercase text-white">
                  {isMonitoring ? 'Armed' : 'Standby'}
                </h2>
              </div>
            </div>
            <Switch
              checked={isMonitoring}
              onCheckedChange={setIsMonitoring}
              className="data-[state=checked]:bg-[#2ff801] h-8 w-14 border-none"
            />
          </div>

          {/* Environmental Context Sub-Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#111317] p-4 rounded-md border border-[#282a2e] space-y-1">
              <p className="text-[9px] font-bold font-geist text-[#8e9aaf] uppercase tracking-widest">Environment</p>
              <div className="flex items-center gap-2">
                <Radar className={`w-3.5 h-3.5 text-[#ff5f1f] ${isMonitoring ? 'animate-spin' : ''}`} />
                <span className="text-xs font-bold text-white">{isMonitoring ? 'Scanning...' : 'Offline'}</span>
              </div>
            </div>
            <div className="bg-[#111317] p-4 rounded-md border border-[#282a2e] space-y-1">
              <p className="text-[9px] font-bold font-geist text-[#8e9aaf] uppercase tracking-widest">Privacy Mode</p>
              <button onClick={() => setIsPrivate(!isPrivate)} className="flex items-center gap-2 outline-none">
                {isPrivate ? <EyeOff className="w-3.5 h-3.5 text-[#ff5f1f]" /> : <Eye className="w-3.5 h-3.5 text-[#2ff801]" />}
                <span className="text-xs font-bold uppercase text-white">{isPrivate ? 'Cloaked' : 'Public'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Real-time Telemetry (Dossier-style telemetry meters) */}
        <section className="space-y-4">
          <div className="flex justify-between items-end px-2">
            <h3 className="text-[10px] font-bold font-geist uppercase tracking-[0.25em] text-[#8e9aaf]">AI Sentinel Telemetry</h3>
            {isMonitoring && (
              <span className="text-[9px] font-bold font-geist text-[#2ff801] animate-pulse uppercase tracking-wider">Live Feed</span>
            )}
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {[
              { icon: Heart, label: 'Bio-Metric Sync', value: '72 BPM', color: '#ff5f1f' },
              { icon: Mic, label: 'Acoustic Tone', value: 'Baseline', color: '#2ff801' },
              { icon: Activity, label: 'Gait Match', value: '98.4%', color: '#2ff801' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#1a1c20] p-5 rounded-lg flex items-center justify-between group hover:border-[#ff5f1f]/35 transition-colors border border-transparent shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#111317] rounded-md border border-[#2d2f36] group-hover:border-[#ff5f1f]/50 transition-colors">
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold font-geist text-[#8e9aaf] uppercase tracking-wider">{stat.label}</p>
                    <p className="text-sm font-black text-white">{stat.value}</p>
                  </div>
                </div>
                <div className="h-1.5 w-20 bg-[#111317] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: isMonitoring ? '70%' : '0%' }}
                    className="h-full bg-current"
                    style={{ color: stat.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SOS Action Area */}
        <section className="pt-4">
          <Button
            variant="destructive"
            onClick={() => router.push('/emergency?reason=manual')}
            className="w-full h-24 rounded-lg bg-transparent border-2 border-[#e31b23] text-[#e31b23] hover:bg-[#e31b23] hover:text-[#111317] text-2xl font-black italic tracking-tighter transition-all active:scale-[0.96] group overflow-hidden relative safety-glow-red"
          >
            <div className="absolute inset-0 bg-[#e31b23]/5 group-hover:bg-transparent transition-colors" />
            <div className="relative flex flex-col items-center">
              <span className="leading-none tracking-tight">INITIATE SOS</span>
              <span className="text-[9px] font-bold font-geist tracking-[0.4em] mt-1.5 uppercase">Manual Override</span>
            </div>
          </Button>
        </section>
      </main>
    </div>
  )
}
