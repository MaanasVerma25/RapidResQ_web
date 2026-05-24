"use client"
import { useSearchParams, useRouter } from "next/navigation"
import { AlertCircle, MapPin, Phone, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useEffect, useRef, Suspense } from "react"
import { supabase } from "@/lib/supabase"

function EmergencyContent() {
  const searchParams = useSearchParams(); const router = useRouter()
  const reason = searchParams.get('reason') || 'Unknown'; const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/951/951-preview.mp3')
    audio.loop = true; audio.play().catch(() => {}); audioRef.current = audio
    return () => audio.pause()
  }, [])

  const handleIAmSafe = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) await supabase.from('profiles').update({ current_status: 'safe' }).eq('id', user.id)
    if (audioRef.current) audioRef.current.pause()
    router.push("/dashboard")
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-red-950 text-white p-6 relative overflow-hidden">
      <motion.div className="absolute inset-0 bg-red-600 opacity-20" animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 1.5, repeat: Infinity }} />
      <div className="z-10 flex flex-col items-center space-y-8 text-center">
        <AlertCircle className="h-24 w-24 text-red-500 shadow-xl" />
        <div className="space-y-2"><h1 className="text-4xl font-black uppercase">Emergency Detected</h1><p className="text-xl text-red-200 italic">Reason: {reason}</p></div>
        <Card className="bg-white/10 border-white/20 backdrop-blur-md w-full max-w-md"><CardContent className="p-6 space-y-4 text-left">
          <div className="flex items-center gap-4 text-red-100"><CheckCircle2 className="h-5 w-5 text-green-400" /><p className="text-sm">Contacts notified</p></div>
          <div className="flex items-center gap-4 text-red-100"><MapPin className="h-5 w-5 text-blue-400" /><p className="text-sm">Live tracking active</p></div>
        </CardContent></Card>
        <Button variant="secondary" size="lg" className="h-16 text-xl font-bold w-full max-w-md bg-white text-red-950" onClick={handleIAmSafe}>I AM SAFE</Button>
      </div>
    </div>
  )
}

export default function EmergencyPage() {
  return <Suspense fallback={<div>Loading...</div>}><EmergencyContent /></Suspense>
}
