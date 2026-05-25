"use client"
import { Shield, Radar, Lock, AlertTriangle, ArrowRight, Activity, Mic } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  const features = [
    {
      icon: <Radar className="h-6 w-6 text-purple-400" />,
      title: "AI Anomalous Sound Scan",
      description: "Constantly filters ambient microphone waves, detecting spikes, distress frequencies, and sudden crash signatures."
    },
    {
      icon: <Activity className="h-6 w-6 text-blue-400" />,
      title: "Real-Time Motion Tracker",
      description: "Direct web-telemetry integration tracks sudden deceleration, impacts, and anomalies in device position."
    },
    {
      icon: <Shield className="h-6 w-6 text-emerald-400" />,
      title: "Zero-Knowledge Encryption",
      description: "Your sensitive safety records and contact channels are cryptographically locked directly inside your browser cache."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden mesh-grid bg-slate-950/20">
      
      {/* Background Floating Ambient Orbs */}
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-[60%] right-[-10%] w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <main className="flex-1 z-10 flex flex-col justify-center items-center px-4 py-16 md:py-28 max-w-7xl mx-auto w-full">
        
        {/* Main Hero Header */}
        <section className="text-center max-w-3xl space-y-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold tracking-wider text-purple-300 uppercase shadow-inner"
          >
            <Shield className="h-3.5 w-3.5 animate-pulse text-purple-400" />
            Next-Gen Emergency Engine Active
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl/none"
          >
            Safety Reimagined with <br />
            <span className="text-gradient-accent text-glow">RapidResQ</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-[620px] text-slate-400 md:text-lg leading-relaxed"
          >
            Advanced client-side AI analysis that detects safety emergencies automatically using real-time audio anomaly and motion physics.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center pt-4"
          >
            <Link href="/dashboard">
              <Button size="lg" className="relative group overflow-hidden px-8 py-6 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_30px_rgba(147,51,234,0.4)] hover:shadow-[0_0_40px_rgba(147,51,234,0.65)] transition-all duration-300 hover:scale-[1.02]">
                <span className="flex items-center gap-2 text-sm md:text-base">
                  Launch Safety Console
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></span>
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* Feature Cards Grid */}
        <section className="w-full mt-24 md:mt-32">
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 * idx + 0.3 }}
                className="glass-card glass-card-interactive p-6 rounded-2xl flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-center shadow-inner">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-wide">{feature.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
                </div>
                <div className="pt-6 mt-6 border-t border-white/[0.04] flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-purple-300 transition-colors">
                  <span>Engine active</span>
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
