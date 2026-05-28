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
    <div className="flex-1 bg-background text-foreground min-h-screen font-sans">

      <header className="sticky top-0 left-0 w-full h-20 flex justify-between items-center px-6 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Shield className="h-7 w-7 text-primary shadow-sm" />
          <h1 className="text-2xl font-black tracking-tighter text-primary uppercase italic">RAPID REQ</h1>
        </div>
        <Button variant="ghost" size="icon" className="bg-card rounded-xl border border-border">
          <Settings className="h-6 w-6 text-muted-foreground" />
        </Button>
      </header>

      <main className="px-6 py-12 max-w-7xl mx-auto w-full grid grid-cols-1 lg:col-span-12 lg:grid-cols-12 gap-12 pb-32">

        {/* Sidebar: Case List */}
        <aside className="lg:col-span-4 space-y-8">
          <h2 className="text-3xl font-black tracking-tighter uppercase italic px-2">Incident Logs</h2>
          <div className="space-y-4">
            {cases.map((c) => (
              <motion.div
                key={c.id}
                onClick={() => setSelectedCase(c.id)}
                className={`p-6 rounded-[1.5rem] border-2 cursor-pointer transition-all flex items-center justify-between group ${
                  selectedCase === c.id ? 'bg-card border-primary shadow-xl shadow-primary/5 scale-[1.02]' : 'bg-card/40 border-border hover:border-primary/30'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                    selectedCase === c.id ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-background text-muted-foreground'
                  }`}>
                    <Shield className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase italic tracking-tight">{c.id} • {c.date}</h3>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">{c.type}</p>
                    <p className="text-xs text-muted-foreground mt-1 font-black uppercase italic opacity-70">Duration: {c.duration}</p>
                  </div>
                </div>
                <ChevronRight className={`h-6 w-6 transition-transform ${selectedCase === c.id ? 'text-primary translate-x-1' : 'text-muted-foreground'}`} />
              </motion.div>
            ))}
          </div>
        </aside>

        {/* Right Column: Event Detail View */}
        <section className="lg:col-span-8 flex flex-col gap-8">

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-card p-8 rounded-[2rem] border border-border shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-secondary" />
                <h2 className="text-4xl font-black tracking-tighter uppercase italic">Case #{selectedCase}</h2>
              </div>
              <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] italic">Oct 24, 2023 • 22:14 EST • Mission District, SF</p>
            </div>
            <Button size="lg" className="h-16 px-10 rounded-2xl hover:scale-105 transition-all flex items-center gap-4 shadow-xl border-0 uppercase tracking-[0.2em] font-black italic">
              <FileText className="h-6 w-6" />
              Export Report
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Map Tracking */}
            <Card className="bg-card rounded-[2rem] border border-border overflow-hidden flex flex-col shadow-xl">
              <div className="p-6 border-b border-border flex items-center justify-between bg-card/50">
                <span className="text-xs font-black uppercase tracking-[0.2em] italic flex items-center gap-3">
                  <Route className="h-5 w-5 text-primary" />
                  Geospatial
                </span>
                <span className="text-xs text-secondary font-black uppercase tracking-widest">2.4 km covered</span>
              </div>
              <div className="relative h-80 w-full bg-muted/20">
                <img
                  className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDE88H_4R1wcEY-nFqueTFLj0c7kYLA3qiMGEl3xR-ES7DDvhu5mD76XSGN5UrVkGUSyZY702ONy1IpTyI0Hd0neel2OP2ktv0faSjODOJkkohJS6Ae-KqvLMyf6vZG0rRtBnt_gSFw7reZtp2mlq5LtmItnJKYosJWsqszz7wJnTYWVQ6gLln5DDyqTOlSHEKEhgb1IZPqd72b-OsJ2ZhN4h_KhIqrBKlQuH8ZrgYS7M_Jf9UxDR4bGaINEZruflmBfB3jBj3Gss"
                  alt="Incident Map"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-5 h-5 bg-primary rounded-full ring-8 ring-primary/20 animate-pulse"></div>
                </div>
              </div>
            </Card>

            {/* Biometric Telemetry */}
            <Card className="bg-card rounded-[2rem] border border-border p-8 flex flex-col gap-6 shadow-xl">
              <span className="text-xs font-black uppercase tracking-[0.2em] italic flex items-center gap-3">
                <Activity className="h-5 w-5 text-primary" />
                Biometrics
              </span>
              <div className="flex flex-col gap-6 flex-1 justify-center">
                <div className="flex items-center justify-between p-6 bg-background rounded-2xl border-l-8 border-destructive shadow-sm">
                  <div>
                    <p className="text-xs text-muted-foreground font-black uppercase tracking-widest mb-1">Peak Pulse</p>
                    <p className="text-5xl font-black text-destructive italic tracking-tighter">142 <span className="text-sm font-black opacity-50">BPM</span></p>
                  </div>
                  <Heart className="h-12 w-12 text-destructive fill-destructive/10 animate-pulse" />
                </div>
                <div className="flex items-center justify-between p-6 bg-background rounded-2xl border-l-8 border-primary shadow-sm">
                  <div>
                    <p className="text-xs text-muted-foreground font-black uppercase tracking-widest mb-1">Stress Index</p>
                    <p className="text-5xl font-black text-primary italic tracking-tighter">High <span className="text-sm font-black opacity-50">(8.2)</span></p>
                  </div>
                  <AlertTriangle className="h-12 w-12 text-primary shadow-lg shadow-primary/10" />
                </div>
              </div>
            </Card>

            {/* Audio Evidence Log */}
            <Card className="md:col-span-2 bg-card rounded-[2rem] border border-border p-8 shadow-xl border-0 overflow-hidden relative">
               <div className="absolute top-0 right-0 p-8">
                  <div className="flex items-center gap-3 bg-secondary/10 px-4 py-2 rounded-full border border-secondary/20 shadow-sm shadow-secondary/5">
                    <Lock className="h-4 w-4 text-secondary" />
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-secondary">Secure Encrypted Channel</span>
                  </div>
               </div>

              <div className="mb-8">
                <span className="text-xs font-black uppercase tracking-[0.2em] italic flex items-center gap-3">
                  <Activity className="h-5 w-5 text-primary" />
                  Audio Evidence
                </span>
              </div>

              <div className="flex items-center gap-6 bg-background p-6 rounded-2xl border border-border shadow-inner">
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 border-0"
                >
                  {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 fill-current" />}
                </Button>
                <div className="flex-1 h-14 flex items-end gap-1.5 pb-2">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-1.5 rounded-full ${i % 4 === 0 ? 'bg-primary' : i % 2 === 0 ? 'bg-secondary' : 'bg-muted'}`}
                      animate={{ height: isPlaying ? `${Math.random() * 80 + 20}%` : `${Math.random() * 20 + 10}%` }}
                      style={{ height: '30%' }}
                    />
                  ))}
                </div>
                <span className="text-sm font-black text-muted-foreground font-mono tracking-tighter italic">00:42 / 12:42</span>
              </div>
            </Card>
          </div>

        </section>

      </main>

    </div>
  )
}
