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
    <div className="min-h-screen bg-background text-foreground pb-24 font-sans selection:bg-primary/30">
      {/* HUD Header */}
      <header className="p-6 flex justify-between items-center border-b border-border bg-background/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/30 flex items-center justify-center shadow-lg shadow-primary/20">
              <Shield className="w-7 h-7 text-primary-foreground" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-secondary border-2 border-background rounded-full animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-black italic tracking-tighter uppercase leading-none">Rapid ResQ</h1>
            <p className="text-xs font-bold text-muted-foreground tracking-widest mt-1 uppercase">Next-Gen Sentinel v4.0</p>
          </div>
        </div>
        <Link href="/setup">
          <Button variant="ghost" size="icon" className="rounded-2xl border border-border bg-card hover:border-primary/50 transition-all">
            <Settings className="w-6 h-6 text-muted-foreground" />
          </Button>
        </Link>
      </header>

      <main className="p-6 space-y-10 max-w-xl mx-auto">
        {/* Core Status Card */}
        <section className="glass-panel p-1 rounded-[2rem] overflow-hidden">
          <div className="bg-card rounded-[calc(2rem-4px)] p-8 space-y-8">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] mb-3">Defense Status</p>
                <div className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded-full ${isMonitoring ? 'bg-secondary safety-glow-green' : 'bg-muted-foreground'}`} />
                  <h2 className="text-5xl font-black tracking-tighter uppercase">
                    {isMonitoring ? 'Armed' : 'Standby'}
                  </h2>
                </div>
              </div>
              <Switch
                checked={isMonitoring}
                onCheckedChange={setIsMonitoring}
                className="data-[state=checked]:bg-secondary h-9 w-16"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background/40 p-5 rounded-2xl border border-border space-y-2">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Environment</p>
                <div className="flex items-center gap-2">
                  <Radar className="w-4 h-4 text-primary" />
                  <span className="text-sm font-bold">{isMonitoring ? 'Scanning...' : 'Offline'}</span>
                </div>
              </div>
              <div className="bg-background/40 p-5 rounded-2xl border border-border space-y-2">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Privacy</p>
                <button onClick={() => setIsPrivate(!isPrivate)} className="flex items-center gap-2">
                  {isPrivate ? <EyeOff className="w-4 h-4 text-primary" /> : <Eye className="w-4 h-4 text-secondary" />}
                  <span className="text-sm font-bold uppercase">{isPrivate ? 'Cloaked' : 'Public'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Real-time Telemetry */}
        <section className="space-y-6">
          <div className="flex justify-between items-end px-2">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">AI Sentinel Telemetry</h3>
            <span className="text-xs font-bold text-secondary animate-pulse uppercase tracking-widest">Live Feed</span>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {[
              { icon: Heart, label: 'Bio-Metric Sync', value: '72 BPM', color: 'hsl(var(--primary))' },
              { icon: Mic, label: 'Acoustic Tone', value: 'Baseline', color: 'hsl(var(--secondary))' },
              { icon: Activity, label: 'Gait Match', value: '98.4%', color: 'hsl(var(--secondary))' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-6 rounded-2xl border border-border flex items-center justify-between group hover:border-primary/40 transition-all shadow-sm"
              >
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-background rounded-xl border border-border group-hover:border-primary/50 transition-colors">
                    <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{stat.label}</p>
                    <p className="text-lg font-black">{stat.value}</p>
                  </div>
                </div>
                <div className="h-2 w-24 bg-background rounded-full overflow-hidden">
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
        <section className="pt-6">
          <Button
            variant="destructive"
            size="xl"
            onClick={() => router.push('/emergency?reason=manual')}
            className="w-full h-28 rounded-[2rem] bg-black border-4 border-primary text-primary text-3xl font-black italic tracking-tighter hover:bg-primary hover:text-primary-foreground transition-all active:scale-[0.96] group overflow-hidden relative shadow-2xl shadow-primary/20"
          >
            <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
            <div className="relative flex flex-col items-center">
              <span className="leading-none">INITIATE SOS</span>
              <span className="text-xs font-bold tracking-[0.4em] mt-2 uppercase opacity-80">Manual Override</span>
            </div>
          </Button>
        </section>
      </main>
    </div>
  )
}
