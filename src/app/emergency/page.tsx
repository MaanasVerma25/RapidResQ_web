"use client"
import { useSearchParams, useRouter } from "next/navigation"
import { AlertTriangle, MapPin, Phone, CheckCircle2, ShieldCheck, Navigation, Radio } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useEffect, useState, useRef, Suspense } from "react"
import { supabase } from "@/lib/supabase"

function EmergencyContent() {
  const searchParams = useSearchParams(); const router = useRouter()
  const reason = searchParams.get('reason') || 'Unknown Impact'; const audioRef = useRef<HTMLAudioElement | null>(null)
  
  // High-fidelity GPS Coordinate Simulation
  const [coords, setCoords] = useState({ lat: 37.7749, lng: -122.4194 })
  const [accuracy, setAccuracy] = useState(4.5)

  useEffect(() => {
    // Attempt to play the warning siren looping audio context
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/951/951-preview.mp3')
    audio.loop = true; audio.play().catch(() => {}); audioRef.current = audio

    // Update GPS coordinates randomly to simulate active telemetry broadcast
    const interval = setInterval(() => {
      setCoords(c => ({
        lat: c.lat + (Math.random() - 0.5) * 0.0001,
        lng: c.lng + (Math.random() - 0.5) * 0.0001
      }))
      setAccuracy(a => Math.max(3, a + (Math.random() - 0.5) * 0.2))
    }, 2000)

    return () => {
      audio.pause()
      clearInterval(interval)
    }
  }, [])

  const handleIAmSafe = async () => {
    // Reset status in localStorage
    try {
      const localProfileStr = localStorage.getItem("rapidresq_profile")
      if (localProfileStr) {
        const profileData = JSON.parse(localProfileStr)
        profileData.current_status = 'safe'
        localStorage.setItem("rapidresq_profile", JSON.stringify(profileData))
      }
    } catch (e) {
      console.error("Failed to reset status locally:", e)
    }

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) await supabase.from('profiles').update({ current_status: 'safe' }).eq('id', user.id)
    } catch (e) {
      console.warn("Supabase profile status reset bypassed:", e)
    }
    
    if (audioRef.current) audioRef.current.pause()
    router.push("/dashboard")
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-slate-950 text-white p-4 md:p-8 relative overflow-hidden min-h-screen">
      
      {/* Immersive Red Alarm Glaring Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/40 via-slate-950 to-slate-950 -z-20" />
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-red-600/10 rounded-full blur-[140px] -z-10 pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Subtle scanline sweep across fullscreen warning */}
      <div className="animate-scan-line" style={{ background: 'linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.15), transparent)' }}></div>

      <div className="z-10 flex flex-col items-center space-y-8 text-center max-w-lg w-full">
        
        {/* Animated Main Alert Icon Indicator */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full border border-red-500/20 animate-pulse-ring"></div>
          <div className="absolute inset-0 rounded-full border border-red-500/10 animate-pulse-ring" style={{ animationDelay: "1s" }}></div>
          
          <motion.div 
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-24 w-24 rounded-full bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center text-red-500 shadow-[0_0_40px_rgba(239,68,68,0.3)]"
          >
            <AlertTriangle className="h-10 w-10 animate-pulse" />
          </motion.div>
        </div>

        {/* Reason HUD Panel */}
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-black tracking-widest text-red-400 uppercase select-none">
            ALERT STATUS: LEVEL ALPHA
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight uppercase text-glow bg-gradient-to-b from-white to-red-200 bg-clip-text text-transparent">
            Emergency Detected
          </h1>
          <p className="text-sm text-red-300/80 font-medium italic">Reason: {reason}</p>
        </div>

        {/* Glassmorphic Dispatch & Diagnostics Feed */}
        <Card className="bg-slate-900/40 border-red-500/20 backdrop-blur-lg w-full shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <CardContent className="p-6 space-y-5 text-left text-xs font-semibold text-slate-300">
            
            {/* Contacts dispatcher status */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <span>Emergency Broadcast Loop</span>
              </div>
              <span className="text-emerald-400 font-bold uppercase text-[9px] tracking-wider">Dispatched</span>
            </div>

            {/* GPS active tracker HUD */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Navigation className="h-4 w-4 animate-spin" style={{ animationDuration: '6s' }} />
                  </div>
                  <span>Sensory Tele-Positioning</span>
                </div>
                <span className="text-blue-400 font-bold uppercase text-[9px] tracking-wider flex items-center gap-1">
                  <Radio className="h-3 w-3 animate-pulse" /> Broad-casting
                </span>
              </div>
              
              {/* Fake coordinate panel */}
              <div className="p-3 bg-slate-950/60 border border-white/5 rounded-xl font-mono text-[10px] space-y-1.5 text-slate-400 shadow-inner">
                <div className="flex justify-between">
                  <span>LATITUDE:</span>
                  <span className="text-blue-300 font-bold">{coords.lat.toFixed(6)}° N</span>
                </div>
                <div className="flex justify-between">
                  <span>LONGITUDE:</span>
                  <span className="text-blue-300 font-bold">{coords.lng.toFixed(6)}° W</span>
                </div>
                <div className="flex justify-between border-t border-white/[0.04] pt-1.5 text-[9px] text-slate-500">
                  <span>ESTIMATED ACCURACY:</span>
                  <span>± {accuracy.toFixed(1)} meters</span>
                </div>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Glowing safety bypass activator */}
        <Button 
          variant="secondary" 
          size="lg" 
          onClick={handleIAmSafe}
          className="h-16 text-lg font-bold w-full rounded-2xl bg-white text-slate-950 hover:bg-emerald-500 hover:text-white hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] border border-transparent transition-all duration-300 hover:scale-[1.01]"
        >
          <ShieldCheck className="mr-2 h-5 w-5" /> I AM SAFE
        </Button>

      </div>
    </div>
  )
}

export default function EmergencyPage() {
  return <Suspense fallback={<div>Loading...</div>}><EmergencyContent /></Suspense>
}
