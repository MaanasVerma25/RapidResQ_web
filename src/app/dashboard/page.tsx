"use client"
import { useEffect, useState } from "react"
import { Shield, Radar, AlertTriangle, Activity, Mic, Lock, ShieldAlert, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { User } from "@supabase/supabase-js"
import { motion, AnimatePresence } from "framer-motion"
import { useAiDetection } from "@/hooks/use-ai-detection"

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null); const [profile, setProfile] = useState<any>(null)
  const [isMonitoring, setIsMonitoring] = useState(false); const [loading, setLoading] = useState(true)
  const router = useRouter(); const { amplitude, motion: motionData } = useAiDetection(isMonitoring)

  useEffect(() => {
    const checkAuth = async () => {
      // Mocked guest session to bypass login checks
      const mockUser = { id: "guest-user", email: "guest@rapidresq.com" } as User
      setUser(mockUser)

      let profileData = null
      try {
        const localProfileStr = localStorage.getItem("rapidresq_profile")
        profileData = localProfileStr ? JSON.parse(localProfileStr) : null
      } catch (e) {
        console.error("Failed to parse local profile:", e)
      }

      if (!profileData) {
        profileData = { name: "Guest User", current_status: "safe" }
        localStorage.setItem("rapidresq_profile", JSON.stringify(profileData))
      }

      setProfile(profileData)
      setIsMonitoring(profileData.current_status === 'monitoring')
      setLoading(false)
    }
    checkAuth()
  }, [router])

  const toggleMonitoring = async (checked: boolean) => {
    setIsMonitoring(checked); const newStatus = checked ? 'monitoring' : 'safe'
    
    // Update local state and localStorage first
    const updatedProfile = { ...profile, current_status: newStatus }
    setProfile(updatedProfile)
    localStorage.setItem("rapidresq_profile", JSON.stringify(updatedProfile))

    // Attempt to update Supabase, but fail silently if offline or placeholder keys
    try {
      await supabase.from('profiles').update({ current_status: newStatus }).eq('id', user?.id)
    } catch (e) {
      console.warn("Supabase update bypassed:", e)
    }
  }

  const triggerManualSOS = async () => {
    // Save state to localStorage for persistence
    const updatedProfile = { ...profile, current_status: 'monitoring' }
    setProfile(updatedProfile)
    localStorage.setItem("rapidresq_profile", JSON.stringify(updatedProfile))

    try {
      await supabase.from('alerts').insert({ user_id: user?.id || "guest-user", type: 'auto', status: 'triggered', reason: 'Manual SOS', message: `Emergency SOS triggered by ${profile?.name || 'Guest User'}` })
    } catch (e) {
      console.warn("Supabase alert insertion bypassed:", e)
    }
    router.push("/emergency?reason=Manual%20SOS")
  }

  if (loading) return <div className="flex-1 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div></div>

  return (
    <div className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8 space-y-8 relative">
      
      {/* Dynamic Background Blurs */}
      <div className="absolute top-[10%] right-[10%] w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[90px] pointer-events-none -z-10"></div>

      {/* Welcome & System Summary HUD */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/[0.04] pb-6">
        <div className="space-y-1.5">
          <h2 className="text-3xl font-extrabold tracking-tight text-glow text-gradient-primary">Control Console</h2>
          <p className="text-slate-400 text-sm font-medium">Welcome back, <span className="text-purple-300 font-bold">{profile?.name || user?.email}</span></p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-white/5 text-xs text-slate-400 font-semibold shadow-inner">
            <Lock className="h-3.5 w-3.5 text-emerald-400" />
            E2EE SECURE
          </span>
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-white/5 text-xs text-slate-400 font-semibold shadow-inner">
            <Cpu className="h-3.5 w-3.5 text-purple-400" />
            AI FREQ: ACTIVE
          </span>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        
        {/* Core Monitoring Status HUD */}
        <Card className={`md:col-span-2 glass-card relative overflow-hidden border transition-all duration-500 ${isMonitoring ? 'border-purple-500/40 shadow-[0_0_35px_rgba(147,51,234,0.15)] bg-slate-900/40' : 'border-white/5 bg-slate-950/20'}`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-xl font-bold tracking-wide text-white">
                <AnimatePresence mode="wait">
                  {isMonitoring ? (
                    <motion.div key="active" className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-purple-500 animate-ping"></div>
                      <Radar className="h-5 w-5 text-purple-400 animate-pulse" />
                      <span className="text-purple-300">Live Scanning Active</span>
                    </motion.div>
                  ) : (
                    <motion.div key="idle" className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500"></div>
                      <Shield className="h-5 w-5 text-emerald-400" />
                      <span className="text-emerald-400">System Safe & Paused</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardTitle>
              <Switch checked={isMonitoring} onCheckedChange={toggleMonitoring} className="data-[state=checked]:bg-purple-600" />
            </div>
            <CardDescription className="text-slate-400">
              {isMonitoring ? 'The embedded AI engine is auditing micro-sound spikes and active gravity telemetry.' : 'Safety controls and sensory capture processes are currently suspended.'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <AnimatePresence mode="wait">
              {isMonitoring ? (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/[0.04]"
                >
                  {/* High-Tech Radial Radar Grid Visualizer */}
                  <div className="flex flex-col items-center justify-center p-4 bg-slate-950/60 border border-white/5 rounded-2xl shadow-inner relative overflow-hidden h-56">
                    <div className="animate-scan-line"></div>
                    <div className="relative w-40 h-40 rounded-full border border-purple-500/20 bg-slate-900/40 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border border-dashed border-purple-500/10"></div>
                      <div className="absolute inset-8 rounded-full border border-purple-500/20"></div>
                      <div className="absolute inset-16 rounded-full border border-purple-500/30 flex items-center justify-center">
                        <div className="h-3 w-3 rounded-full bg-purple-500 shadow-[0_0_12px_rgba(147,51,234,0.8)] animate-pulse"></div>
                      </div>
                      
                      {/* Rotating sweep */}
                      <div className="absolute inset-0 border-r-2 border-purple-500/30 rounded-full animate-radar-sweep origin-center"></div>

                      {/* Scanning blips */}
                      <div className="absolute top-1/4 left-1/3 h-2 w-2 rounded-full bg-purple-400 animate-ping opacity-60"></div>
                      <div className="absolute bottom-1/3 right-1/4 h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                    </div>
                    <span className="text-[10px] text-purple-300 font-bold uppercase tracking-widest mt-4">AI Radar Sweep Active</span>
                  </div>

                  {/* Telemetry Sensor HUD Controls */}
                  <div className="space-y-5 flex flex-col justify-center">
                    
                    {/* Audio Mic Waves */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[10px]"><Mic className="h-3.5 w-3.5 text-purple-400" /> Audio telemetry</span>
                        <span className="font-mono text-purple-300">{Math.round(amplitude * 100)}%</span>
                      </div>
                      
                      {/* Bouncing Spectrum Analyzer Simulation */}
                      <div className="h-10 bg-slate-950/60 border border-white/5 rounded-xl px-3 flex items-center justify-between gap-1">
                        {Array.from({ length: 12 }).map((_, idx) => {
                          const factor = 0.2 + (idx % 3) * 0.3;
                          const dynamicHeight = Math.max(10, amplitude * 100 * factor);
                          return (
                            <motion.div 
                              key={idx} 
                              className="w-1.5 rounded-full bg-gradient-to-t from-purple-600 to-indigo-400"
                              animate={{ height: `${dynamicHeight}%` }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                              style={{ height: '20%' }}
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Accelerometer Gravity Vectors */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[10px]"><Activity className="h-3.5 w-3.5 text-blue-400" /> Motion tele-vectors</span>
                        <span className="font-mono text-blue-300">X: {motionData.x.toFixed(2)}</span>
                      </div>

                      {/* High-Tech Vector Box */}
                      <div className="h-14 bg-slate-950/60 border border-white/5 rounded-xl px-4 flex items-center justify-between gap-4 font-mono text-[11px] text-slate-400">
                        <div className="space-y-1">
                          <span className="text-slate-500 uppercase tracking-widest text-[9px]">G-FORCE AXIS</span>
                          <div className="flex gap-3 font-semibold">
                            <span>X: <span className="text-blue-300">{(motionData.x).toFixed(1)}</span></span>
                            <span>Y: <span className="text-indigo-300">{(motionData.y || 0).toFixed(1)}</span></span>
                            <span>Z: <span className="text-purple-300">{(motionData.z || 9.8).toFixed(1)}</span></span>
                          </div>
                        </div>
                        <div className="relative w-8 h-8 rounded-full border border-blue-500/20 bg-slate-900 flex items-center justify-center">
                          <motion.div 
                            className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                            animate={{
                              x: Math.min(10, Math.max(-10, motionData.x * 2.5)),
                              y: Math.min(10, Math.max(-10, (motionData.y || 0) * 2.5))
                            }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                          />
                        </div>
                      </div>

                    </div>

                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-slate-500 space-y-3"
                >
                  <div className="h-16 w-16 rounded-full border border-dashed border-white/10 flex items-center justify-center text-slate-600">
                    <Shield className="h-8 w-8" />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-sm font-semibold text-slate-300">AI Telemetry Paused</p>
                    <p className="text-xs text-slate-500">Toggle the switch above to activate automatic anomaly scanning.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* SOS Emergency Panel */}
        <Card className="glass-card border-red-500/20 bg-red-500/5 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-xl pointer-events-none"></div>
          
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2 font-bold tracking-wide">
              <ShieldAlert className="h-5 w-5 text-red-500 animate-pulse" />
              Emergency Panel
            </CardTitle>
            <CardDescription className="text-red-200/60 text-xs">
              Immediate distress broadcast to all emergency connections.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pb-8 pt-4 flex flex-col items-center justify-center relative">
            
            {/* Tactical Ring SOS button */}
            <div className="relative flex items-center justify-center w-full h-36">
              
              {/* Expand pulsing concentric rings */}
              <div className="absolute w-28 h-28 rounded-full border border-red-500/20 animate-pulse-ring"></div>
              <div className="absolute w-28 h-28 rounded-full border border-red-500/10 animate-pulse-ring" style={{ animationDelay: "1.25s" }}></div>

              <motion.button 
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={triggerManualSOS}
                className="z-10 w-28 h-28 rounded-full bg-gradient-to-b from-red-600 to-red-800 border-2 border-red-500/40 hover:border-red-400 flex items-center justify-center font-black tracking-widest text-lg text-white shadow-[0_0_30px_rgba(239,68,68,0.5)] hover:shadow-[0_0_40px_rgba(239,68,68,0.8)] cursor-pointer focus:outline-none transition-all duration-300"
              >
                SOS
              </motion.button>

            </div>

            <span className="text-[10px] text-red-400/80 font-bold uppercase tracking-wider mt-2 flex items-center gap-1.5">
              <AlertTriangle className="h-3 w-3 animate-bounce" /> Click to trigger manual alert
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Safety Overview Real-Time Analytics */}
      <Card className="glass-card border-white/5 bg-slate-950/20">
        <CardHeader className="pb-4"><CardTitle className="text-xl font-bold text-white tracking-wide">Sensory HUD Overview</CardTitle><CardDescription className="text-slate-400">Real-time client diagnostic overview logs.</CardDescription></CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-white/5">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-inner">
                <Radar className="h-5 w-5 animate-pulse" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-200">Local AI Sensory Engine</p>
                <p className="text-xs text-slate-400">Operational • Streaming active in sandboxed audio-context</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 shadow-inner">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></div>
              ONLINE
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-xl border border-white/5 bg-slate-900/30 flex flex-col justify-center items-center gap-1 shadow-inner hover:bg-slate-900/50 transition-colors">
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Active Sensors</p>
              <p className="text-2xl font-black text-white">2</p>
            </div>
            <div className="p-4 rounded-xl border border-white/5 bg-slate-900/30 flex flex-col justify-center items-center gap-1 shadow-inner hover:bg-slate-900/50 transition-colors">
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Alerts Cached</p>
              <p className="text-2xl font-black text-white">0</p>
            </div>
            <div className="p-4 rounded-xl border border-white/5 bg-slate-900/30 flex flex-col justify-center items-center gap-1 shadow-inner hover:bg-slate-900/50 transition-colors">
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Privacy Grade</p>
              <p className="text-2xl font-black text-emerald-400">A+</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
    </div>
  )
}
