import { Shield, Lock, Bell, Activity } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background relative overflow-hidden">
          <div className="container px-4 md:px-6 mx-auto relative z-10 text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">Safety Reimagined with <span className="text-primary">RapidResQ</span></h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">Advanced AI-powered monitoring that detects distress situations automatically.</p>
            <div className="space-x-4"><Link href="/signup"><Button size="lg" className="px-8">Get Started</Button></Link><Link href="/login"><Button variant="outline" size="lg">Sign In</Button></Link></div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-0"></div>
        </section>
      </main>
    </div>
  );
}
