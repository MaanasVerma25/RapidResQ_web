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
      <header className="p-6 flex justify-between items-center border-b border-[#2d2f36] bg-[#111317]/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff5f1f] to-[#ff5f1f]/30 flex items-center justify-center shadow-[0_0_20px_rgba(255,95,31,0.2)]">
              <Shield className="w-6 h-6 text-[#111317]" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#2ff801] border-2 border-[#111317] rounded-full animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-black italic tracking-tighter uppercase leading-none">Rapid ResQ</h1>
            <p className="text-[10px] font-bold text-[#909196] tracking-[0.2em] mt-1 uppercase">Next-Gen Sentinel v4.0</p>
          </div>
        </div>
        <Link href="/setup">
          <Button variant="ghost" size="icon" className="rounded-2xl border border-[#2d2f36] bg-[#1c1e24] hover:border-[#ff5f1f]/50 transition-all">
            <Settings className="w-5 h-5 text-[#909196]" />
          </Button>
        </Link>
      </header>

      <main className="p-6 space-y-8 max-w-xl mx-auto">
        {/* Core Status Card */}
        <section className="glass-panel p-1 rounded-3xl overflow-hidden">
          <div className="bg-[#111317] rounded-[calc(1.5rem-4px)] p-8 space-y-8">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-black text-[#909196] uppercase tracking-[0.3em] mb-2">Defense Status</p>
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${isMonitoring ? 'bg-[#2ff801] shadow-[0_0_10px_#2ff801]' : 'bg-[#909196]'}`} />
                  <h2 className="text-4xl font-black tracking-tighter uppercase">
                    {isMonitoring ? 'Armed' : 'Standby'}
                  </h2>
                </div>
              </div>
              <Switch
                checked={isMonitoring}
                onCheckedChange={setIsMonitoring}
                className="data-[state=checked]:bg-[#2ff801] h-8 w-14"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1c1e24] p-4 rounded-2xl border border-[#2d2f36] space-y-1">
                <p className="text-[9px] font-bold text-[#909196] uppercase tracking-widest">Environment</p>
                <div className="flex items-center gap-2">
                  <Radar className="w-3 h-3 text-[#ff5f1f]" />
                  <span className="text-xs font-bold">{isMonitoring ? 'Scanning...' : 'Offline'}</span>
                </div>
              </div>
              <div className="bg-[#1c1e24] p-4 rounded-2xl border border-[#2d2f36] space-y-1">
                <p className="text-[9px] font-bold text-[#909196] uppercase tracking-widest">Privacy</p>
                <button onClick={() => setIsPrivate(!isPrivate)} className="flex items-center gap-2">
                  {isPrivate ? <EyeOff className="w-3 h-3 text-[#ff5f1f]" /> : <Eye className="w-3 h-3 text-[#2ff801]" />}
                  <span className="text-xs font-bold uppercase">{isPrivate ? 'Cloaked' : 'Public'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Real-time Telemetry */}
        <section className="space-y-4">
          <div className="flex justify-between items-end px-2">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#909196]">AI Sentinel Telemetry</h3>
            <span className="text-[8px] font-bold text-[#2ff801] animate-pulse uppercase">Live Feed</span>
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
                className="bg-[#1c1e24] p-5 rounded-2xl border border-[#2d2f36] flex items-center justify-between group hover:border-[#ff5f1f]/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#111317] rounded-xl border border-[#2d2f36] group-hover:border-[#ff5f1f]/50">
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#909196] uppercase tracking-wider">{stat.label}</p>
                    <p className="text-sm font-black">{stat.value}</p>
                  </div>
                </div>
                <div className="h-1.5 w-16 bg-[#111317] rounded-full overflow-hidden">
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
            className="w-full h-24 rounded-3xl bg-black border-4 border-[#ff5f1f] text-[#ff5f1f] text-2xl font-black italic tracking-tighter hover:bg-[#ff5f1f] hover:text-[#111317] transition-all active:scale-[0.95] group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-[#ff5f1f]/10 group-hover:bg-transparent transition-colors" />
            <div className="relative flex flex-col items-center">
              <span className="leading-none">INITIATE SOS</span>
              <span className="text-[9px] font-bold tracking-[0.4em] mt-1 uppercase">Manual Override</span>
            </div>
          </Button>
        </section>
      </main>
    </div>
  )
}
