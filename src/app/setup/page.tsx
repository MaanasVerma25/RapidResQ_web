"use client"
import { useState } from "react"
import { Shield, Settings, Mic, Info, Gauge, Activity, Apple, Smartphone, LayoutDashboard, History, CheckCircle, Smartphone as FitBit, BrainCircuit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
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

      <main className="px-6 py-8 max-w-xl mx-auto w-full flex flex-col gap-8 pb-32">

        <section className="text-center space-y-2">
          <h2 className="text-2xl font-black tracking-tight uppercase text-white">Trigger Setup</h2>
          <p className="text-[10px] font-bold font-geist text-[#8e9aaf] max-w-sm mx-auto uppercase tracking-[0.2em] leading-relaxed">
            Configure hands-free protection layers and calibrate high-fidelity anomaly detection.
          </p>
        </section>

        {/* Voice Keyword Detection Block (Tonal level nesting) */}
        <section className="bg-[#1a1c20] p-6 rounded-lg shadow-md space-y-5">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3.5">
              <Mic className="h-5.5 w-5.5 text-[#ff5f1f]" />
              <h3 className="text-base font-bold text-white tracking-wide">Voice Keyword Detection</h3>
            </div>
            <button onClick={() => setShowVoiceTip(!showVoiceTip)} className="text-[#8e9aaf] hover:text-white transition-colors">
              <Info className="h-4.5 w-4.5" />
            </button>
          </div>
          
          <AnimatePresence>
            {showVoiceTip && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-[#111317] p-4 rounded-md text-[10px] text-[#bbc7dd] border border-[#2d2f36] font-bold font-geist tracking-wide leading-relaxed"
              >
                Keywords are processed locally on-device. When detected, the app initiates a countdown before contacting your Guardians.
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-3.5">
            <div className="flex items-center justify-between p-4 bg-[#111317] rounded-md border border-[#2d2f36]/40">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">Keyword: 'Help'</span>
                <span className="text-[9px] text-[#8e9aaf] font-bold font-geist tracking-wider uppercase mt-1">Emergency broadcast trigger</span>
              </div>
              <Switch defaultChecked className="data-[state=checked]:bg-[#ff5f1f] h-6 w-11 border-none" />
            </div>
            <div className="flex items-center justify-between p-4 bg-[#111317] rounded-md border border-[#2d2f36]/40">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">Keyword: 'Stop'</span>
                <span className="text-[9px] text-[#8e9aaf] font-bold font-geist tracking-wider uppercase mt-1">Detection cancellation</span>
              </div>
              <Switch defaultChecked className="data-[state=checked]:bg-[#ff5f1f] h-6 w-11 border-none" />
            </div>
          </div>
          
          <Button
            onClick={handleCalibration}
            className={`w-full py-5 rounded-md font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md border-none ${
              isCalibrating 
                ? 'bg-[#111317] text-[#ff5f1f] border border-[#ff5f1f]/30' 
                : isCalibrated
                  ? 'bg-[#2ff801] text-[#111317] safety-glow-green'
                  : 'bg-[#ff5f1f] text-[#111317] hover:bg-[#ff5f1f]/90 safety-glow-orange'
            }`}
          >
            {isCalibrating ? (
              <span className="animate-spin h-4 w-4 border-2 border-[#ff5f1f] border-t-transparent rounded-full" />
            ) : isCalibrated ? (
              <CheckCircle className="h-4.5 w-4.5 text-[#111317]" />
            ) : (
              <Activity className="h-4.5 w-4.5 text-[#111317]" />
            )}
            {isCalibrating ? 'Listening...' : isCalibrated ? 'Calibrated' : 'Test Trigger Calibration'}
          </Button>
        </section>

        {/* Behavioral Anomaly Detection Block */}
        <section className="bg-[#1a1c20] p-6 rounded-lg shadow-md space-y-5">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3.5">
              <BrainCircuit className="h-5.5 w-5.5 text-[#2ff801]" />
              <h3 className="text-base font-bold text-white tracking-wide">Behavioral Anomalies</h3>
            </div>
            <button onClick={() => setShowAiTip(!showAiTip)} className="text-[#8e9aaf] hover:text-white transition-colors">
              <Info className="h-4.5 w-4.5" />
            </button>
          </div>
          
          <AnimatePresence>
            {showAiTip && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-[#111317] p-4 rounded-md text-[10px] text-[#bbc7dd] border border-[#2d2f36] font-bold font-geist tracking-wide leading-relaxed"
              >
                Our AI monitors movement patterns (sudden stops, running, falls) to predict threats before you can even react.
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-6">
            <div className="space-y-3.5">
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold text-white">Movement Sensitivity</span>
                <span className="text-[#ff5f1f] font-black text-xs font-mono">{sensitivity}%</span>
              </div>
              <Slider 
                value={[sensitivity]} 
                onValueChange={(v) => setSensitivity(v[0])} 
                max={100} 
                step={1}
                className="[&_.relative]:bg-[#ff5f1f]"
              />
              <div className="flex justify-between text-[8px] font-bold font-geist text-[#8e9aaf] uppercase tracking-wider">
                <span>Passive</span>
                <span>High Response</span>
              </div>
            </div>
            
            <div className="p-4 bg-[#111317] rounded-md border border-[#2d2f36]/40 flex items-center gap-4">
              <div className="p-2.5 bg-[#2ff801]/10 rounded-md">
                <Gauge className="h-4.5 w-4.5 text-[#2ff801]" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Real-time Telemetry</p>
                <p className="text-[9px] text-[#8e9aaf] font-bold font-geist uppercase tracking-wider mt-0.5">AI is currently analyzing gait patterns</p>
              </div>
            </div>
          </div>
        </section>

        {/* Health Sync Block */}
        <section className="bg-[#1a1c20] p-6 rounded-lg shadow-md space-y-5">
          <div className="flex items-center gap-3.5">
            <Activity className="h-5.5 w-5.5 text-[#bbc7dd]" />
            <h3 className="text-base font-bold text-white tracking-wide">Physiological Sync</h3>
          </div>
          <p className="text-[10px] font-bold font-geist text-[#8e9aaf] uppercase tracking-wider leading-relaxed">
            Link your wearable devices to trigger alerts based on heart rate spikes or stress indicators.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <Button variant="outline" className="flex items-center justify-between p-5 bg-[#111317] rounded-md border border-[#2d2f36] hover:border-[#ff5f1f]/50 hover:bg-[#111317]/80 transition-colors group h-auto">
              <div className="flex items-center gap-3">
                <Apple className="h-4.5 w-4.5 text-[#e31b23] fill-[#e31b23]/10" />
                <span className="text-[9px] font-bold font-geist text-white uppercase tracking-wider">Apple Health</span>
              </div>
            </Button>
            <Button variant="outline" className="flex items-center justify-between p-5 bg-[#111317] rounded-md border border-[#2d2f36] hover:border-[#ff5f1f]/50 hover:bg-[#111317]/80 transition-colors group h-auto">
              <div className="flex items-center gap-3">
                <FitBit className="h-4.5 w-4.5 text-[#2ff801]" />
                <span className="text-[9px] font-bold font-geist text-white uppercase tracking-wider">Google Fit</span>
              </div>
            </Button>
          </div>
        </section>

        <div className="py-8 flex flex-col items-center justify-center text-center space-y-3 opacity-60">
          <Shield className="h-8 w-8 text-[#8e9aaf]" />
          <p className="text-[9px] font-bold font-geist uppercase tracking-[0.2em] text-[#8e9aaf]">End-to-End Encrypted Protection</p>
        </div>
      </main>
    </div>
  )
}
