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
    <div className="flex-1 bg-[#111317] text-[#e2e2e8] min-h-screen font-sans selection:bg-[#ff5f1f]/30">

      {/* Header */}
      <header className="sticky top-0 left-0 w-full h-16 flex justify-between items-center px-6 z-50 border-b border-[#282a2e] bg-[#111317]/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Shield className="h-6 w-6 text-[#ff5f1f] fill-[#ff5f1f]/10" />
            <div className="absolute inset-0 h-6 w-6 text-[#ff5f1f] animate-pulse blur-[4px] opacity-40 pointer-events-none" />
          </div>
          <span className="text-base font-black tracking-tight text-white uppercase font-sans">
            RAPID <span className="text-[#ff5f1f]">REQ</span>
          </span>
        </div>
        <Button variant="ghost" size="icon" className="rounded-md border border-[#2d2f36] bg-[#1a1c20] hover:border-[#ff5f1f]/50 hover:bg-[#1a1c20] transition-all">
          <Settings className="w-5 h-5 text-[#8e9aaf]" />
        </Button>
      </header>

      <main className="px-6 py-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 pb-32">

        {/* Sidebar: Case List */}
        <aside className="lg:col-span-4 space-y-6">
          <h2 className="text-xs font-bold font-geist uppercase tracking-[0.2em] text-[#8e9aaf] px-2">Incident Logs</h2>
          <div className="space-y-3">
            {cases.map((c) => (
              <motion.div
                key={c.id}
                onClick={() => setSelectedCase(c.id)}
                className={`p-4.5 rounded-lg cursor-pointer transition-all flex items-center justify-between group shadow-sm border ${
                  selectedCase === c.id 
                    ? 'bg-[#1a1c20] border-[#ff5f1f] border-l-4' 
                    : 'bg-[#1a1c20] border-transparent hover:border-[#ff5f1f]/30'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-md flex items-center justify-center ${
                    selectedCase === c.id ? 'bg-[#ff5f1f]/10 text-[#ff5f1f]' : 'bg-[#111317] text-[#8e9aaf]'
                  }`}>
                    <Shield className="h-5.5 w-5.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-white font-mono leading-none">{c.id} • {c.date}</h3>
                    <p className="text-[9px] font-bold font-geist text-[#ff5f1f] uppercase tracking-widest mt-2">{c.type}</p>
                    <p className="text-[9px] font-bold font-geist text-[#8e9aaf] mt-1 uppercase tracking-wider">Duration: {c.duration}</p>
                  </div>
                </div>
                <ChevronRight className="h-4.5 w-4.5 text-[#8e9aaf] group-hover:text-white transition-colors" />
              </motion.div>
            ))}
          </div>
        </aside>

        {/* Right Column: Event Detail View */}
        <section className="lg:col-span-8 flex flex-col gap-6">

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#1a1c20] p-6 rounded-lg shadow-md">
            <div>
              <div className="flex items-center gap-3 mb-1.5">
                <CheckCircle className="h-5.5 w-5.5 text-[#2ff801]" />
                <h2 className="text-xl font-black tracking-tight text-white uppercase font-sans">Case #{selectedCase}</h2>
              </div>
              <p className="text-[9px] font-bold font-geist text-[#8e9aaf] uppercase tracking-widest">
                Oct 24, 2023 • 22:14 EST • Mission District, SF
              </p>
            </div>
            <Button className="bg-[#ff5f1f] text-[#111317] hover:bg-[#ff5f1f]/90 font-black text-[10px] px-6 h-10 rounded-md transition-all active:scale-[0.98] flex items-center gap-2 border-none shadow-md uppercase tracking-widest font-geist safety-glow-orange">
              <FileText className="h-4 w-4" />
              EXPORT REPORT
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Map Tracking */}
            <Card className="bg-[#1a1c20] rounded-lg overflow-hidden flex flex-col border-none shadow-md">
              <div className="p-4 border-b border-[#2d2f36] flex items-center justify-between bg-[#1a1c20]">
                <span className="text-[9px] font-bold font-geist uppercase tracking-widest flex items-center gap-2 text-[#8e9aaf]">
                  <Route className="h-4 w-4 text-[#ff5f1f]" />
                  GEOSPATIAL TRACKING
                </span>
                <span className="text-[9px] text-[#2ff801] font-bold font-geist uppercase tracking-wider">2.4 km covered</span>
              </div>
              <div className="relative h-64 w-full bg-[#111317]">
                <img
                  className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDE88H_4R1wcEY-nFqueTFLj0c7kYLA3qiMGEl3xR-ES7DDvhu5mD76XSGN5UrVkGUSyZY702ONy1IpTyI0Hd0neel2OP2ktv0faSjODOJkkohJS6Ae-KqvLMyf6vZG0rRtBnt_gSFw7reZtp2mlq5LtmItnJKYosJWsqszz7wJnTYWVQ6gLln5DDyqTOlSHEKEhgb1IZPqd72b-OsJ2ZhN4h_KhIqrBKlQuH8ZrgYS7M_Jf9UxDR4bGaINEZruflmBfB3jBj3Gss"
                  alt="Incident Map"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-4 h-4 bg-[#ff5f1f] rounded-full ring-4 ring-[#ff5f1f]/30 safety-glow-orange"></div>
                </div>
              </div>
            </Card>

            {/* Biometric Telemetry */}
            <Card className="bg-[#1a1c20] rounded-lg p-6 flex flex-col gap-4 border-none shadow-md">
              <span className="text-[9px] font-bold font-geist uppercase tracking-widest flex items-center gap-2 text-[#8e9aaf] mb-2">
                <Activity className="h-4 w-4 text-[#ff5f1f]" />
                BIOMETRIC TELEMETRY
              </span>
              <div className="flex flex-col gap-3.5 flex-1 justify-center">
                <div className="flex items-center justify-between p-4 bg-[#111317] rounded-md border border-[#2d2f36]/40">
                  <div>
                    <p className="text-[9px] text-[#8e9aaf] font-bold font-geist uppercase tracking-widest">Peak Heart Rate</p>
                    <p className="text-3xl font-black text-[#e31b23] mt-1 font-mono">142 <span className="text-xs font-normal text-[#8e9aaf]">BPM</span></p>
                  </div>
                  <Heart className="h-9 w-9 text-[#e31b23] fill-[#e31b23]/10" />
                </div>
                <div className="flex items-center justify-between p-4 bg-[#111317] rounded-md border border-[#2d2f36]/40">
                  <div>
                    <p className="text-[9px] text-[#8e9aaf] font-bold font-geist uppercase tracking-widest">Stress Index</p>
                    <p className="text-3xl font-black text-[#ff5f1f] mt-1 font-mono">High <span className="text-xs font-normal text-[#8e9aaf]">(8.2)</span></p>
                  </div>
                  <AlertTriangle className="h-9 w-9 text-[#ff5f1f]" />
                </div>
              </div>
            </Card>

            {/* Audio Evidence Log */}
            <Card className="md:col-span-2 bg-[#1a1c20] rounded-lg p-6 border-none shadow-md">
              <div className="flex items-center justify-between mb-5">
                <span className="text-[9px] font-bold font-geist uppercase tracking-widest flex items-center gap-2 text-[#8e9aaf]">
                  <Activity className="h-4 w-4 text-[#ff5f1f]" />
                  AUDIO EVIDENCE LOG
                </span>
                <div className="flex items-center gap-2 text-[#8e9aaf]">
                  <Lock className="h-3.5 w-3.5 text-[#2ff801]" />
                  <span className="text-[8px] font-bold font-geist uppercase tracking-widest text-[#2ff801]">Secure Channel</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-[#111317] p-4 rounded-md border border-[#2d2f36]/40">
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-11 h-11 rounded-md bg-[#ff5f1f] text-[#111317] flex items-center justify-center hover:scale-[1.02] active:scale-[0.98] transition-all border-none shadow-md safety-glow-orange hover:bg-[#ff5f1f]/90"
                >
                  {isPlaying ? <Pause className="h-5.5 w-5.5" /> : <Play className="h-5.5 w-5.5 fill-current" />}
                </Button>
                
                <div className="flex-1 h-9 flex items-center gap-1.5">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-1 rounded-full ${i % 3 === 0 ? 'bg-[#ff5f1f]' : i % 2 === 0 ? 'bg-[#2ff801]' : 'bg-[#2d2f36]'}`}
                      animate={{ height: isPlaying ? `${Math.random() * 80 + 20}%` : `${Math.random() * 20 + 10}%` }}
                      style={{ height: '30%' }}
                    />
                  ))}
                </div>
                
                <span className="text-[9px] font-bold text-[#8e9aaf] font-mono tracking-wider">00:42 / 12:42</span>
              </div>
            </Card>
          </div>

        </section>

      </main>

    </div>
  )
}
