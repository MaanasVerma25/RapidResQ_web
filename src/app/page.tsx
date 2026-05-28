"use client"
import { Shield, Radar, Lock, AlertTriangle, ArrowRight, Activity, Mic } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  const features = [
    {
      icon: <Radar className="h-6 w-6 text-[#ff5f1f]" />,
      title: "AI Anomalous Sound Scan",
      description: "Constantly filters ambient microphone waves, detecting spikes, distress frequencies, and sudden crash signatures.",
      color: "border-[#ff5f1f]"
    },
    {
      icon: <Activity className="h-6 w-6 text-[#2ff801]" />,
      title: "Real-Time Motion Tracker",
      description: "Direct web-telemetry integration tracks sudden deceleration, impacts, and anomalies in device position.",
      color: "border-[#2ff801]"
    },
    {
      icon: <Shield className="h-6 w-6 text-[#bbc7dd]" />,
      title: "Zero-Knowledge Encryption",
      description: "Your sensitive safety records and contact channels are cryptographically locked directly inside your browser cache.",
      color: "border-[#bbc7dd]"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-[#111317] font-sans selection:bg-[#ff5f1f]/30">
      
      {/* Background Floating Ambient Orbs (Stitch High-Visibility Colors) */}
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#ff5f1f]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-[60%] right-[-10%] w-[450px] h-[450px] bg-[#2ff801]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <main className="flex-1 z-10 flex flex-col justify-center items-center px-6 py-16 md:py-28 max-w-7xl mx-auto w-full">
        
        {/* Main Hero Header */}
        <section className="text-center max-w-3xl space-y-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full bg-[#1e2024] border border-[#2d2f36] text-[10px] font-bold font-geist tracking-widest text-[#2ff801] uppercase shadow-inner"
          >
            <Shield className="h-3.5 w-3.5 animate-pulse text-[#2ff801]" />
            Next-Gen Emergency Engine Active
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl uppercase leading-none text-white"
          >
            Safety Reimagined with <br />
            <span className="text-gradient-accent text-glow-orange">RapidResQ</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-[620px] text-[#bbc7dd] md:text-base font-medium leading-relaxed"
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
              <Button size="lg" className="relative group overflow-hidden px-8 py-6 rounded-md font-black bg-[#ff5f1f] text-[#111317] hover:bg-[#ff5f1f]/90 safety-glow-orange transition-all duration-300 hover:scale-[1.02] border-none uppercase tracking-widest text-xs font-geist">
                <span className="flex items-center gap-2">
                  Launch Safety Console
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* Feature Cards Grid (Using Stitch Tonal levels instead of rigid 1px borders) */}
        <section className="w-full mt-24 md:mt-32">
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 * idx + 0.3 }}
                className={`bg-[#1a1c20] p-6 rounded-lg flex flex-col justify-between border-l-4 ${feature.color} shadow-lg`}
              >
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-md bg-[#111317] flex items-center justify-center border border-[#2d2f36]">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-wide">{feature.title}</h3>
                  <p className="text-sm text-[#bbc7dd] leading-relaxed">{feature.description}</p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#2d2f36] flex items-center justify-between text-[10px] font-bold font-geist text-[#8e9aaf] uppercase tracking-wider">
                  <span>Engine active</span>
                  <div className="h-2 w-2 rounded-full bg-[#2ff801] animate-pulse safety-glow-green"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
