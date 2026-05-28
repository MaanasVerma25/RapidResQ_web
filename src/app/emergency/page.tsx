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
    <div className="min-h-screen bg-[#111317] text-[#e2e2e8] flex flex-col font-mono selection:bg-[#ff5f1f]/30 overflow-hidden">
      {/* Top Status Bar */}
      <div className="flex items-center justify-between p-6 border-b border-[#2d2f36] bg-[#111317]/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#ff5f1f]/10 rounded-lg">
            <Shield className="w-5 h-5 text-[#ff5f1f]" />
          </div>
          <div>
            <h1 className="text-xs font-bold tracking-[0.2em] uppercase text-[#909196]">Emergency Core</h1>
            <p className="text-[10px] font-bold text-[#ff5f1f]">ACTIVE INCIDENT: {reason.toUpperCase()}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[8px] font-bold text-[#909196] uppercase tracking-tighter">System Health</p>
            <p className="text-[10px] font-bold text-[#2ff801]">STABLE</p>
          </div>
          <Activity className="w-4 h-4 text-[#2ff801] animate-pulse" />
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-8 space-y-12">
        {/* Giant Countdown Pulse */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {alarmActive ? (
              <motion.div
                key="countdown"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative z-10 w-64 h-64 rounded-full flex flex-col items-center justify-center bg-black border-4 border-[#ff5f1f] shadow-[0_0_80px_rgba(255,95,31,0.3)]"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-[10px] border-[#ff5f1f]"
                />
                <span className="text-7xl font-black italic tracking-tighter text-[#ff5f1f] mb-1">{timeLeft}</span>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#909196]">Seconds Left</span>
              </motion.div>
            ) : (
              <motion.div
                key="secured"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-64 h-64 rounded-full flex flex-col items-center justify-center bg-black border-4 border-[#2ff801] shadow-[0_0_80px_rgba(47,248,1,0.2)]"
              >
                <ShieldCheck className="w-20 h-20 text-[#2ff801] mb-2" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#2ff801]">Secured</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Telemetry Grid */}
        <div className="w-full max-w-md grid grid-cols-2 gap-px bg-[#2d2f36] border border-[#2d2f36] rounded-xl overflow-hidden">
          <div className="bg-[#111317] p-4 space-y-1">
            <div className="flex items-center gap-2 text-[#909196]">
              <Navigation className="w-3 h-3" />
              <span className="text-[9px] font-bold uppercase tracking-widest">Latitude</span>
            </div>
            <p className="text-sm font-bold">{coords.lat.toFixed(6)}</p>
          </div>
          <div className="bg-[#111317] p-4 space-y-1">
            <div className="flex items-center gap-2 text-[#909196]">
              <Navigation className="w-3 h-3" />
              <span className="text-[9px] font-bold uppercase tracking-widest">Longitude</span>
            </div>
            <p className="text-sm font-bold">{coords.lng.toFixed(6)}</p>
          </div>
          <div className="bg-[#111317] p-4 space-y-1">
            <div className="flex items-center gap-2 text-[#909196]">
              <Radio className="w-3 h-3" />
              <span className="text-[9px] font-bold uppercase tracking-widest">Accuracy</span>
            </div>
            <p className="text-sm font-bold text-[#2ff801]">{accuracy.toFixed(1)}m</p>
          </div>
          <div className="bg-[#111317] p-4 space-y-1">
            <div className="flex items-center gap-2 text-[#909196]">
              <Volume2 className="w-3 h-3" />
              <span className="text-[9px] font-bold uppercase tracking-widest">Audio Status</span>
            </div>
            <p className="text-sm font-bold">STREAMING</p>
          </div>
        </div>

        {/* Cancel Action */}
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <p className="text-[10px] font-bold text-[#909196] uppercase tracking-[0.2em]">Hold to Abort Protocol</p>
            <div className="h-1 bg-[#2d2f36] rounded-full overflow-hidden">
              <motion.div
                animate={{ width: isPressing ? '100%' : '0%' }}
                transition={{ duration: 2, ease: "linear" }}
                className="h-full bg-[#ff5f1f]"
              />
            </div>
          </div>

          <Button
            onMouseDown={handleCancelStart}
            onMouseUp={handleCancelEnd}
            onMouseLeave={handleCancelEnd}
            onTouchStart={handleCancelStart}
            onTouchEnd={handleCancelEnd}
            className="w-full h-20 bg-transparent border-2 border-[#2d2f36] hover:bg-[#2d2f36]/50 text-[#e2e2e8] rounded-2xl relative overflow-hidden group active:scale-[0.98] transition-transform"
          >
            <div className="flex flex-col items-center">
              <Delete className="w-6 h-6 mb-1 text-[#909196] group-hover:text-white transition-colors" />
              <span className="text-xs font-black uppercase tracking-[0.4em]">Cancel Alert</span>
            </div>
          </Button>
        </div>
      </main>

      {/* Footer System Log */}
      <footer className="p-4 border-t border-[#2d2f36] bg-black/40">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-[#ff5f1f] rounded-full animate-ping" />
          <p className="text-[9px] font-bold text-[#909196] tracking-widest">
            [SYS_LOG]: NOTIFYING GUARDIANS... BROADCASTING GEOSPATIAL DATA...
          </p>
        </div>
      </footer>
    </div>
  )
}

export default function EmergencyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#111317] flex items-center justify-center text-white">Initializing Core...</div>}>
      <EmergencyContent />
    </Suspense>
  )
}
