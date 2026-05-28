"use client"
import { useState } from "react"
import { Shield, Settings, Mic, Info, Gauge, Activity, Apple, Smartphone, LayoutDashboard, History, CheckCircle, Smartphone as FitBit, BrainCircuit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { motion, AnimatePresence } from "framer-motion"

export default function SetupPage() {
  const [showVoiceTip, setShowVoiceTip] = useState(false)
  const [showAiTip, setShowAiTip] = useState(false)
  const [sensitivity, setSensitivity] = useState(75)
  const [isCalibrating, setIsCalibrating] = useState(false)
  const [isCalibrated, setIsCalibrated] = useState(false)

  const handleCalibration = () => {
    setIsCalibrating(true)
    setTimeout(() => {
      setIsCalibrating(false)
      setIsCalibrated(true)
      setTimeout(() => setIsCalibrated(false), 2000)
    }, 3000)
  }

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

      <main className="px-6 py-12 max-w-2xl mx-auto w-full flex flex-col gap-12 pb-32">

        <section className="text-center space-y-4">
          <h2 className="text-4xl font-black tracking-tighter uppercase italic">Trigger Setup</h2>
          <p className="text-base text-muted-foreground font-bold uppercase tracking-wide leading-relaxed">Configure hands-free protection layers and calibrate high-fidelity anomaly detection.</p>
        </section>

        {/* Voice Keyword Detection Block */}
        <Card className="rounded-[2rem] border-l-8 border-primary p-8 space-y-6 shadow-2xl bg-card border-y-0 border-r-0">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <Mic className="h-8 w-8 text-primary" />
              <h3 className="text-2xl font-black uppercase italic tracking-tight">Voice Keywords</h3>
            </div>
            <button onClick={() => setShowVoiceTip(!showVoiceTip)} className="p-2 hover:bg-muted/10 rounded-full transition-colors">
              <Info className="h-6 w-6 text-muted-foreground" />
            </button>
          </div>
          <AnimatePresence>
            {showVoiceTip && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-background/50 p-4 rounded-xl text-sm text-muted-foreground border border-border font-medium leading-relaxed"
              >
                Keywords are processed locally on-device. When detected, the app initiates a countdown before contacting your Guardians.
              </motion.div>
            )}
          </AnimatePresence>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-5 bg-background/40 rounded-2xl border border-border active:scale-[0.98] transition-transform">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-black uppercase italic tracking-wide">Keyword: 'Help'</span>
                <span className="text-xs text-muted-foreground font-bold uppercase">Emergency broadcast trigger</span>
              </div>
              <Switch defaultChecked className="h-8 w-14" />
            </div>
            <div className="flex items-center justify-between p-5 bg-background/40 rounded-2xl border border-border active:scale-[0.98] transition-transform">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-black uppercase italic tracking-wide">Keyword: 'Stop'</span>
                <span className="text-xs text-muted-foreground font-bold uppercase">Detection cancellation</span>
              </div>
              <Switch defaultChecked className="h-8 w-14" />
            </div>
          </div>
          <Button
            onClick={handleCalibration}
            size="lg"
            className={`w-full h-16 rounded-2xl font-black uppercase tracking-[0.2em] italic flex items-center justify-center gap-3 transition-all shadow-xl ${
              isCalibrating ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground hover:scale-[1.02]'
            }`}
          >
            {isCalibrating ? (
              <span className="animate-spin h-6 w-6 border-3 border-current border-t-transparent rounded-full" />
            ) : isCalibrated ? (
              <CheckCircle className="h-6 w-6" />
            ) : (
              <Activity className="h-6 w-6" />
            )}
            {isCalibrating ? 'Listening...' : isCalibrated ? 'Calibrated' : 'Calibrate AI Trigger'}
          </Button>
        </Card>

        {/* Behavioral Anomaly Detection Block */}
        <Card className="rounded-[2rem] border-l-8 border-secondary p-8 space-y-8 shadow-2xl bg-card border-y-0 border-r-0">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <BrainCircuit className="h-8 w-8 text-secondary" />
              <h3 className="text-2xl font-black uppercase italic tracking-tight">AI Behavior</h3>
            </div>
            <button onClick={() => setShowAiTip(!showAiTip)} className="p-2 hover:bg-muted/10 rounded-full transition-colors">
              <Info className="h-6 w-6 text-muted-foreground" />
            </button>
          </div>
          <AnimatePresence>
            {showAiTip && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-background/50 p-4 rounded-xl text-sm text-muted-foreground border border-border font-medium leading-relaxed"
              >
                Our AI monitors movement patterns (sudden stops, running, falls) to predict threats before you can even react.
              </motion.div>
            )}
          </AnimatePresence>
          <div className="space-y-8">
            <div className="space-y-4 px-2">
              <div className="flex justify-between items-end">
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Movement Sensitivity</span>
                <span className="text-secondary font-black text-lg">{sensitivity}%</span>
              </div>
              <Slider value={[sensitivity]} onValueChange={(v) => setSensitivity(v[0])} max={100} step={1} className="py-4" />
              <div className="flex justify-between text-xs font-black text-muted-foreground uppercase tracking-tighter">
                <span>Passive Monitoring</span>
                <span>High Response Threshold</span>
              </div>
            </div>
            <div className="p-6 bg-background/40 rounded-2xl border border-border flex items-center gap-5">
              <div className="p-3 bg-secondary/10 rounded-xl">
                <Gauge className="h-6 w-6 text-secondary shadow-sm" />
              </div>
              <div>
                <p className="text-sm font-black uppercase italic tracking-tight">Real-time Telemetry</p>
                <p className="text-xs text-muted-foreground font-bold uppercase mt-1">AI is analyzing gait patterns.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Health Sync Block */}
        <Card className="rounded-[2rem] border-l-8 border-muted p-8 space-y-6 shadow-2xl bg-card border-y-0 border-r-0">
          <div className="flex items-center gap-4">
            <Activity className="h-8 w-8 text-primary" />
            <h3 className="text-2xl font-black uppercase italic tracking-tight">Physiological</h3>
          </div>
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-wide leading-relaxed">Link your wearable devices to trigger alerts based on heart rate spikes or stress indicators.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Button variant="outline" className="flex items-center justify-between h-20 px-6 bg-background/40 rounded-2xl border-border hover:border-primary/50 transition-all group">
              <div className="flex items-center gap-4">
                <Apple className="h-6 w-6 text-red-500 fill-red-500/10" />
                <span className="text-sm font-black uppercase italic tracking-widest">Apple Health</span>
              </div>
            </Button>
            <Button variant="outline" className="flex items-center justify-between h-20 px-6 bg-background/40 rounded-2xl border-border hover:border-secondary/50 transition-all group">
              <div className="flex items-center gap-4">
                <FitBit className="h-6 w-6 text-secondary shadow-sm" />
                <span className="text-sm font-black uppercase italic tracking-widest">Google Fit</span>
              </div>
            </Button>
          </div>
        </Card>

        <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 opacity-30">
          <Shield className="h-12 w-12 text-muted-foreground" />
          <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground italic">End-to-End Encrypted Protection</p>
        </div>
      </main>
    </div>
  )
}
