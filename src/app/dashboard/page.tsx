"use client"
import { useEffect, useState } from "react"
import { Shield, Radar, AlertTriangle, Activity, Mic } from "lucide-react"
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
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push("/login"); return }
      setUser(user)
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      setProfile(profile); setIsMonitoring(profile?.current_status === 'monitoring'); setLoading(false)
    }
    checkAuth()
  }, [router])

  const toggleMonitoring = async (checked: boolean) => {
    setIsMonitoring(checked); const newStatus = checked ? 'monitoring' : 'safe'
    await supabase.from('profiles').update({ current_status: newStatus }).eq('id', user?.id)
  }

  const triggerManualSOS = async () => {
    if (!user) return
    await supabase.from('alerts').insert({ user_id: user.id, type: 'auto', status: 'triggered', reason: 'Manual SOS', message: `Emergency SOS triggered by ${profile?.name || user.email}` })
    router.push("/emergency?reason=Manual%20SOS")
  }

  if (loading) return <div className="flex-1 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div></div>

  return (
    <div className="flex-1 container max-w-4xl mx-auto p-4 space-y-6">
      <header className="flex items-center justify-between"><div className="space-y-1"><h2 className="text-3xl font-bold tracking-tight">Dashboard</h2><p className="text-muted-foreground">Welcome back, {profile?.name || user?.email}</p></div></header>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className={`relative overflow-hidden border-2 transition-colors duration-500 ${isMonitoring ? 'border-blue-500/50 bg-blue-500/5' : 'border-border'}`}>
          <CardHeader><CardTitle className="flex items-center gap-2">
            <AnimatePresence mode="wait">
              {isMonitoring ? (
                <motion.div key="radar" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}><Radar className="h-6 w-6 text-blue-500 animate-pulse" /></motion.div>
              ) : (
                <motion.div key="shield" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}><Shield className="h-6 w-6 text-green-500" /></motion.div>
              )}
            </AnimatePresence>
            Status: {isMonitoring ? 'Monitoring Active' : 'Safe'}
          </CardTitle><CardDescription>{isMonitoring ? 'AI is active. Detecting anomalies in sound and motion.' : 'Safety monitoring is currently paused.'}</CardDescription></CardHeader>
          <CardContent className="space-y-4">
             <div className="flex justify-between items-center"><span className="text-sm font-medium">Toggle AI Monitoring</span><Switch checked={isMonitoring} onCheckedChange={toggleMonitoring} /></div>
             {isMonitoring && (
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-4 pt-2">
                 <div className="p-3 rounded-lg bg-background border flex items-center gap-3"><Mic className="h-4 w-4 text-primary" /><div className="flex-1 space-y-1"><div className="h-1 bg-muted rounded-full overflow-hidden"><motion.div className="h-full bg-primary" animate={{ width: `${amplitude * 100}%` }} /></div><p className="text-[10px] text-muted-foreground uppercase font-bold">Audio</p></div></div>
                 <div className="p-3 rounded-lg bg-background border flex items-center gap-3"><Activity className="h-4 w-4 text-blue-500" /><div className="flex-1 space-y-1 text-xs"><p className="font-mono">X: {motionData.x.toFixed(1)}</p><p className="text-[10px] text-muted-foreground uppercase font-bold">Motion</p></div></div>
               </motion.div>
             )}
          </CardContent>
        </Card>
        <Card className="border-red-500/20 bg-red-500/5">
          <CardHeader><CardTitle className="text-red-500 flex items-center gap-2"><AlertTriangle className="h-6 w-6" />Emergency SOS</CardTitle><CardDescription>Immediate alert to all emergency contacts.</CardDescription></CardHeader>
          <CardContent><Button variant="destructive" className="w-full h-16 text-xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform" onClick={triggerManualSOS}>Manual SOS</Button></CardContent>
        </Card>
      </div>
      <Card><CardHeader><CardTitle>Safety Overview</CardTitle><CardDescription>Real-time telemetry and recent logs.</CardDescription></CardHeader>
        <CardContent className="space-y-4"><div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border"><div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Radar className="h-5 w-5" /></div><div className="flex-1"><p className="text-sm font-medium">AI Microservice (Web Engine)</p><p className="text-xs text-muted-foreground">Operational • Active in browser</p></div><div className="h-2 w-2 rounded-full bg-green-500"></div></div><div className="grid grid-cols-3 gap-4 text-center"><div className="p-4 rounded-lg border bg-card"><p className="text-xs text-muted-foreground uppercase font-bold">Sensors</p><p className="text-xl font-bold">2 Active</p></div><div className="p-4 rounded-lg border bg-card"><p className="text-xs text-muted-foreground uppercase font-bold">Alerts</p><p className="text-xl font-bold">0</p></div><div className="p-4 rounded-lg border bg-card"><p className="text-xs text-muted-foreground uppercase font-bold">Security</p><p className="text-xl font-bold">E2EE</p></div></div></CardContent>
      </Card>
    </div>
  )
}
