"use client"
import { useState } from "react"
import { Shield, Settings, CheckCircle, Clock, ChevronRight, FileText, Route, Activity, Heart, AlertTriangle, Play, Pause, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

export default function HistoryPage() {
  const [selectedCase, setSelectedCase] = useState("REQ-99201")
  const [isPlaying, setIsPlaying] = useState(false)

  const cases = [
    { id: "REQ-99201", type: "Manual SOS", date: "Oct 24", status: "Resolved", duration: "22m 10s" },
    { id: "REQ-99182", type: "Sudden Impact", date: "Sep 12", status: "Resolved", duration: "15m 04s" },
    { id: "REQ-98921", type: "Fall Detected", date: "Aug 05", status: "Resolved", duration: "22m 10s" }
  ]

  return (
    <div className="flex-1 bg-background text-on-background min-h-screen">

      <header className="sticky top-0 left-0 w-full h-16 flex justify-between items-center px-4 z-50 border-b-2 border-outline-variant bg-surface/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary-container fill-primary-container" />
          <h1 className="text-xl font-black tracking-tighter text-primary uppercase">RAPID REQ</h1>
        </div>
        <button className="bg-surface-variant p-2 rounded-lg hover:opacity-80 transition-transform active:scale-95">
          <Settings className="h-5 w-5 text-on-surface" />
        </button>
      </header>

      <main className="px-4 py-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 pb-32">

        {/* Sidebar: Case List */}
        <aside className="lg:col-span-4 space-y-6">
          <h2 className="text-2xl font-black tracking-tighter uppercase text-on-surface px-2">Incident Logs</h2>
          <div className="space-y-3">
            {cases.map((c) => (
              <motion.div
                key={c.id}
                onClick={() => setSelectedCase(c.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between group ${
                  selectedCase === c.id ? 'bg-surface-container border-primary-container shadow-lg' : 'bg-surface-container-low border-outline-variant hover:border-outline'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    selectedCase === c.id ? 'bg-primary-container/20 text-primary-container' : 'bg-surface-dim text-on-surface-variant'
                  }`}>
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-on-surface">{c.id} • {c.date}</h3>
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">{c.type}</p>
                    <p className="text-[10px] text-on-surface-variant mt-1 font-bold">Duration: {c.duration}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-on-surface-variant" />
              </motion.div>
            ))}
          </div>
        </aside>

        {/* Right Column: Event Detail View */}
        <section className="lg:col-span-8 flex flex-col gap-6">

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface-container-low p-6 rounded-2xl border border-outline-variant shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="h-6 w-6 text-primary-container" />
                <h2 className="text-2xl font-black tracking-tighter uppercase">Case #{selectedCase}</h2>
              </div>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Oct 24, 2023 • 22:14 EST • Mission District, SF</p>
            </div>
            <Button className="bg-primary-container text-on-primary-container font-black text-xs px-6 py-6 rounded-xl hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 shadow-lg border-0 uppercase tracking-widest">
              <FileText className="h-5 w-5" />
              EXPORT REPORT
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Map Tracking */}
            <Card className="bg-surface-container-low rounded-2xl border border-outline-variant overflow-hidden flex flex-col border-0">
              <div className="p-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
                <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <Route className="h-4 w-4 text-primary-container" />
                  GEOSPATIAL TRACKING
                </span>
                <span className="text-[10px] text-on-surface-variant font-bold uppercase">2.4 km covered</span>
              </div>
              <div className="relative h-64 w-full bg-surface-container-highest">
                <img
                  className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDE88H_4R1wcEY-nFqueTFLj0c7kYLA3qiMGEl3xR-ES7DDvhu5mD76XSGN5UrVkGUSyZY702ONy1IpTyI0Hd0neel2OP2ktv0faSjODOJkkohJS6Ae-KqvLMyf6vZG0rRtBnt_gSFw7reZtp2mlq5LtmItnJKYosJWsqszz7wJnTYWVQ6gLln5DDyqTOlSHEKEhgb1IZPqd72b-OsJ2ZhN4h_KhIqrBKlQuH8ZrgYS7M_Jf9UxDR4bGaINEZruflmBfB3jBj3Gss"
                  alt="Incident Map"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-4 h-4 bg-primary-container rounded-full ring-4 ring-primary-container/30"></div>
                </div>
              </div>
            </Card>

            {/* Biometric Telemetry */}
            <Card className="bg-surface-container-low rounded-2xl border border-outline-variant p-6 flex flex-col gap-4 border-0">
              <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary-container" />
                BIOMETRIC TELEMETRY
              </span>
              <div className="flex flex-col gap-4 flex-1 justify-center">
                <div className="flex items-center justify-between p-4 bg-surface-container-high rounded-xl border-l-4 border-error">
                  <div>
                    <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest">Peak Heart Rate</p>
                    <p className="text-4xl font-black text-error">142 <span className="text-xs font-normal">BPM</span></p>
                  </div>
                  <Heart className="h-10 w-10 text-error fill-error/20" />
                </div>
                <div className="flex items-center justify-between p-4 bg-surface-container-high rounded-xl border-l-4 border-primary">
                  <div>
                    <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest">Stress Index</p>
                    <p className="text-4xl font-black text-primary">High <span className="text-xs font-normal">(8.2)</span></p>
                  </div>
                  <AlertTriangle className="h-10 w-10 text-primary" />
                </div>
              </div>
            </Card>

            {/* Audio Evidence Log */}
            <Card className="md:col-span-2 bg-surface-container-low rounded-2xl border border-outline-variant p-6 border-0">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary-container" />
                  AUDIO EVIDENCE LOG
                </span>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <Lock className="h-3 w-3 text-secondary" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Secure Channel</span>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-surface-container-highest p-4 rounded-xl border border-outline-variant">
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center hover:scale-105 active:scale-95 transition-all border-0 shadow-lg"
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 fill-current" />}
                </Button>
                <div className="flex-1 h-10 flex items-center gap-1">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-1 rounded-full ${i % 3 === 0 ? 'bg-primary-container' : i % 2 === 0 ? 'bg-primary' : 'bg-outline'}`}
                      animate={{ height: isPlaying ? `${Math.random() * 80 + 20}%` : `${Math.random() * 20 + 10}%` }}
                      style={{ height: '30%' }}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-on-surface-variant font-mono">00:42 / 12:42</span>
              </div>
            </Card>
          </div>

        </section>

      </main>

    </div>
  )
}
