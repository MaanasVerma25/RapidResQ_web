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

      <main className="px-4 py-8 max-w-2xl mx-auto w-full flex flex-col gap-8 pb-32">

        <section className="text-center space-y-2">
          <h2 className="text-3xl font-black tracking-tighter uppercase text-on-surface">Trigger Setup</h2>
          <p className="text-sm text-on-surface-variant max-w-md mx-auto font-bold uppercase tracking-tight">Configure hands-free protection layers and calibrate high-fidelity anomaly detection.</p>
        </section>

        {/* Voice Keyword Detection Block */}
        <Card className="glass-card rounded-xl border-l-4 border-primary-container p-6 space-y-4 shadow-xl shadow-black/20 border-0 bg-surface-container">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <Mic className="h-6 w-6 text-primary-container" />
              <h3 className="text-xl font-bold text-on-surface">Voice Keyword Detection</h3>
            </div>
            <button onClick={() => setShowVoiceTip(!showVoiceTip)}>
              <Info className="h-5 w-5 text-outline" />
            </button>
          </div>
          <AnimatePresence>
            {showVoiceTip && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-surface-container-high p-3 rounded-lg text-[10px] text-on-surface-variant border border-outline-variant font-bold"
              >
                Keywords are processed locally on-device. When detected, the app initiates a countdown before contacting your Guardians.
              </motion.div>
            )}
          </AnimatePresence>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-surface-dim rounded-lg border border-outline-variant/30 active:scale-[0.98] transition-transform">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-on-surface">Keyword: 'Help'</span>
                <span className="text-[10px] text-on-surface-variant font-bold">Emergency broadcast trigger</span>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 bg-surface-dim rounded-lg border border-outline-variant/30 active:scale-[0.98] transition-transform">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-on-surface">Keyword: 'Stop'</span>
                <span className="text-[10px] text-on-surface-variant font-bold">Detection cancellation</span>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
          <Button
            onClick={handleCalibration}
            className={`w-full py-6 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg border-0 ${
              isCalibrating ? 'bg-secondary-container text-on-secondary-container' : 'bg-primary-container text-on-primary-container hover:opacity-90'
            }`}
          >
            {isCalibrating ? (
              <span className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
            ) : isCalibrated ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <Activity className="h-5 w-5" />
            )}
            {isCalibrating ? 'Listening...' : isCalibrated ? 'Calibrated' : 'Test Trigger Calibration'}
          </Button>
        </Card>

        {/* Behavioral Anomaly Detection Block */}
        <Card className="glass-card rounded-xl border-l-4 border-secondary-container p-6 space-y-6 shadow-xl shadow-black/20 border-0 bg-surface-container">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <BrainCircuit className="h-6 w-6 text-secondary-container" />
              <h3 className="text-xl font-bold text-on-surface">Behavioral Anomalies</h3>
            </div>
            <button onClick={() => setShowAiTip(!showAiTip)}>
              <Info className="h-5 w-5 text-outline" />
            </button>
          </div>
          <AnimatePresence>
            {showAiTip && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-surface-container-high p-3 rounded-lg text-[10px] text-on-surface-variant border border-outline-variant font-bold"
              >
                Our AI monitors movement patterns (sudden stops, running, falls) to predict threats before you can even react.
              </motion.div>
            )}
          </AnimatePresence>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-xs font-bold text-on-surface">Movement Sensitivity</span>
                <span className="text-primary font-bold text-xs">{sensitivity}%</span>
              </div>
              <Slider value={[sensitivity]} onValueChange={(v) => setSensitivity(v[0])} max={100} step={1} />
              <div className="flex justify-between text-[10px] font-bold text-on-surface-variant uppercase">
                <span>Passive</span>
                <span>High Response</span>
              </div>
            </div>
            <div className="p-4 bg-surface-dim rounded-lg border border-outline-variant/30 flex items-center gap-4">
              <div className="p-2 bg-secondary-container/10 rounded-lg">
                <Gauge className="h-5 w-5 text-secondary-container" />
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface">Real-time Telemetry</p>
                <p className="text-[10px] text-on-surface-variant font-bold">AI is currently analyzing gait patterns.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Health Sync Block */}
        <Card className="glass-card rounded-xl border-l-4 border-tertiary-container p-6 space-y-4 shadow-xl shadow-black/20 border-0 bg-surface-container">
          <div className="flex items-center gap-3">
            <Activity className="h-6 w-6 text-tertiary" />
            <h3 className="text-xl font-bold text-on-surface">Physiological Sync</h3>
          </div>
          <p className="text-xs font-bold text-on-surface-variant uppercase">Link your wearable devices to trigger alerts based on heart rate spikes or stress indicators.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="flex items-center justify-between p-6 bg-surface-dim rounded-xl border-outline-variant hover:border-primary-container transition-colors group h-auto">
              <div className="flex items-center gap-3">
                <Apple className="h-5 w-5 text-error fill-error/20" />
                <span className="text-xs font-bold text-on-surface uppercase">Apple Health</span>
              </div>
            </Button>
            <Button variant="outline" className="flex items-center justify-between p-6 bg-surface-dim rounded-xl border-outline-variant hover:border-primary-container transition-colors group h-auto">
              <div className="flex items-center gap-3">
                <FitBit className="h-5 w-5 text-secondary-container" />
                <span className="text-xs font-bold text-on-surface uppercase">Google Fit</span>
              </div>
            </Button>
          </div>
        </Card>

        <div className="py-8 flex flex-col items-center justify-center text-center space-y-4 opacity-50">
          <Shield className="h-10 w-10 text-on-surface-variant" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">End-to-End Encrypted Protection</p>
        </div>
      </main>
    </div>
  )
}
