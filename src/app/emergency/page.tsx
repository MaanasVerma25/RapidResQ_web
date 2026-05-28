"use client"
import { useSearchParams, useRouter } from "next/navigation"
import { AlertTriangle, MapPin, Phone, CheckCircle2, ShieldCheck, Navigation, Radio, Volume2, VolumeX, Delete, Shield, Settings, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useRef, Suspense } from "react"
import { supabase } from "@/lib/supabase"

function EmergencyContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const reason = searchParams.get('reason') || 'Unknown Impact'
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  // High-fidelity GPS Coordinate Simulation
  const [coords, setCoords] = useState({ lat: 34.0522, lng: -118.2437 })
  const [accuracy, setAccuracy] = useState(3.0)
  const [timeLeft, setTimeLeft] = useState(10)
  const [alarmActive, setAlarmActive] = useState(true)
  const [isPressing, setIsPressing] = useState(false)
  const pressTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (timeLeft > 0 && alarmActive) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && alarmActive) {
      // Logic for triggering actual emergency protocols
      console.log("Emergency protocols triggered")
    }
  }, [timeLeft, alarmActive])

  useEffect(() => {
    // Simulate high-frequency GPS jitter
    const interval = setInterval(() => {
      setCoords(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.0001,
        lng: prev.lng + (Math.random() - 0.5) * 0.0001
      }))
      setAccuracy(prev => Math.max(1.2, prev + (Math.random() - 0.5) * 0.2))
    }, 800)
    return () => clearInterval(interval)
  }, [])

  const handleCancelStart = () => {
    setIsPressing(true)
    pressTimerRef.current = setTimeout(() => {
      setAlarmActive(false)
      setIsPressing(false)
      router.push('/dashboard')
    }, 2000) // 2-second long press to cancel
  }

  const handleCancelEnd = () => {
    setIsPressing(false)
    if (pressTimerRef.current) clearTimeout(pressTimerRef.current)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-mono selection:bg-primary/30 overflow-hidden">
      {/* Top Status Bar */}
      <div className="flex items-center justify-between p-6 border-b border-border bg-background/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground">Emergency Core</h1>
            <p className="text-xs font-bold text-primary tracking-wider">ACTIVE INCIDENT: {reason.toUpperCase()}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">System Health</p>
            <p className="text-sm font-bold text-secondary">STABLE</p>
          </div>
          <Activity className="w-5 h-5 text-secondary animate-pulse" />
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-8 space-y-16">
        {/* Giant Countdown Pulse */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {alarmActive ? (
              <motion.div
                key="countdown"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative z-10 w-72 h-72 rounded-full flex flex-col items-center justify-center bg-black border-4 border-primary shadow-[0_0_100px_rgba(255,95,31,0.4)]"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-[12px] border-primary"
                />
                <span className="text-8xl font-black italic tracking-tighter text-primary mb-2">{timeLeft}</span>
                <span className="text-xs font-bold tracking-[0.4em] uppercase text-muted-foreground">Seconds Left</span>
              </motion.div>
            ) : (
              <motion.div
                key="secured"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-72 h-72 rounded-full flex flex-col items-center justify-center bg-black border-4 border-secondary shadow-[0_0_100px_rgba(47,248,1,0.3)]"
              >
                <ShieldCheck className="w-24 h-24 text-secondary mb-3" />
                <span className="text-xs font-bold tracking-[0.4em] uppercase text-secondary">Secured</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Telemetry Grid */}
        <div className="w-full max-w-lg grid grid-cols-2 gap-px bg-border border border-border rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-card p-6 space-y-2">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Navigation className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Latitude</span>
            </div>
            <p className="text-lg font-black">{coords.lat.toFixed(6)}</p>
          </div>
          <div className="bg-card p-6 space-y-2">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Navigation className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Longitude</span>
            </div>
            <p className="text-lg font-black">{coords.lng.toFixed(6)}</p>
          </div>
          <div className="bg-card p-6 space-y-2">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Radio className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Accuracy</span>
            </div>
            <p className="text-lg font-black text-secondary">{accuracy.toFixed(1)}m</p>
          </div>
          <div className="bg-card p-6 space-y-2">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Volume2 className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Audio Status</span>
            </div>
            <p className="text-lg font-black">STREAMING</p>
          </div>
        </div>

        {/* Cancel Action */}
        <div className="w-full max-w-lg space-y-8">
          <div className="text-center space-y-3">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.3em]">Hold to Abort Protocol</p>
            <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: isPressing ? '100%' : '0%' }}
                transition={{ duration: 2, ease: "linear" }}
                className="h-full bg-primary"
              />
            </div>
          </div>

          <Button
            onMouseDown={handleCancelStart}
            onMouseUp={handleCancelEnd}
            onMouseLeave={handleCancelEnd}
            onTouchStart={handleCancelStart}
            onTouchEnd={handleCancelEnd}
            className="w-full h-24 bg-transparent border-2 border-border hover:bg-muted/10 text-foreground rounded-2xl relative overflow-hidden group active:scale-[0.98] transition-all"
          >
            <div className="flex flex-col items-center">
              <Delete className="w-7 h-7 mb-2 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-black uppercase tracking-[0.5em]">Cancel Alert</span>
            </div>
          </Button>
        </div>
      </main>

      {/* Footer System Log */}
      <footer className="p-6 border-t border-border bg-black/40">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
          <p className="text-xs font-bold text-muted-foreground tracking-widest uppercase">
            [SYS_LOG]: NOTIFYING GUARDIANS... BROADCASTING GEOSPATIAL DATA...
          </p>
        </div>
      </footer>
    </div>
  )
}

export default function EmergencyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-white">Initializing Core...</div>}>
      <EmergencyContent />
    </Suspense>
  )
}
