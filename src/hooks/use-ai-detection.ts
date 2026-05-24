"use client"
import { useState, useEffect, useRef } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export function useAiDetection(isActive: boolean) {
  const [amplitude, setAmplitude] = useState(0)
  const [motion, setMotion] = useState({ x: 0, y: 0, z: 0 })
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (!isActive) {
      if (audioContextRef.current) {
        audioContextRef.current.close()
        audioContextRef.current = null
      }
      return
    }

    const startAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
        const audioContext = new AudioContextClass()
        const analyser = audioContext.createAnalyser()
        const source = audioContext.createMediaStreamSource(stream)
        source.connect(analyser)
        analyser.fftSize = 256
        analyserRef.current = analyser
        audioContextRef.current = audioContext
        const dataArray = new Uint8Array(analyser.frequencyBinCount)
        const checkAudio = () => {
          if (!analyserRef.current) return
          analyserRef.current.getByteFrequencyData(dataArray)
          let sum = 0
          for (let i = 0; i < dataArray.length; i++) sum += dataArray[i]
          const normalized = (sum / dataArray.length) / 255
          setAmplitude(normalized)
          if (normalized > 0.6) triggerEmergency("Audio Distress Detected")
          if (isActive) requestAnimationFrame(checkAudio)
        }
        checkAudio()
      } catch (err) { console.error("Audio access denied", err) }
    }
    startAudio()
    return () => { if (audioContextRef.current) audioContextRef.current.close() }
  }, [isActive])

  useEffect(() => {
    if (!isActive || typeof window === 'undefined') return
    const handleMotion = (event: DeviceMotionEvent) => {
      const acc = event.accelerationIncludingGravity
      if (!acc) return
      const { x, y, z } = acc
      const currentX = x || 0; const currentY = y || 0; const currentZ = z || 0
      setMotion({ x: currentX, y: currentY, z: currentZ })
      const magnitude = Math.sqrt(currentX**2 + currentY**2 + currentZ**2)
      if (magnitude > 25) triggerEmergency("Motion Anomaly Detected")
    }
    window.addEventListener('devicemotion', handleMotion)
    return () => window.removeEventListener('devicemotion', handleMotion)
  }, [isActive])

  const triggerEmergency = async (reason: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('alerts').insert({ user_id: user.id, type: 'auto', status: 'triggered', reason, message: `Automatic emergency triggered: ${reason}` })
    router.push(`/emergency?reason=${encodeURIComponent(reason)}`)
  }
  return { amplitude, motion }
}
