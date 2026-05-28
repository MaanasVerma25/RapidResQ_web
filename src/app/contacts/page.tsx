"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Trash2, User, Phone, ShieldAlert, Heart, Shield, Settings, MessageSquare, PlusCircle, Star, AlertTriangle, Eye, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { motion, AnimatePresence } from "framer-motion"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export default function ContactsPage() {
  const [user, setUser] = useState<any>(null)
  const [contacts, setContacts] = useState<any[]>([])
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [relation, setRelation] = useState("")
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetch = async () => {
      // Mocked guest user to bypass login checks
      setUser({ id: 'guest', email: 'guest@rapidresq.ai' })
      const { data } = await supabase.from('contacts').select('*').limit(5)
      setContacts(data || [
        { id: '1', name: 'Sarah Miller', phone: '+1 (555) 012-3456', relation: 'Primary Guardian', online: true }
      ])
      setLoading(false)
    }
    fetch()
  }, [])

  const addContact = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone) return
    const newContact = { id: Math.random().toString(), name, phone, relation, online: false }
    setContacts([...contacts, newContact])
    setName(""); setPhone(""); setRelation("")
  }

  const deleteContact = async (id: string) => {
    setContacts(contacts.filter(c => c.id !== id))
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 font-sans selection:bg-primary/30">
      {/* Dynamic Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <ShieldAlert className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight italic">Guardians & Protocols</h1>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 bg-secondary/10 rounded-full border border-secondary/20 shadow-sm shadow-secondary/5">
            <div className="w-2.5 h-2.5 bg-secondary rounded-full animate-pulse" />
            <span className="text-xs font-bold text-secondary uppercase tracking-widest">System Armed</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-12">
        {/* Emergency Protocol Textarea */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold italic uppercase tracking-tight">Emergency Protocol</h2>
          </div>
          <div className="glass-panel p-1 rounded-2xl">
            <div className="bg-card rounded-[calc(1rem-4px)] p-6 space-y-6">
              <Label className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-black">Incident Response Logic</Label>
              <Textarea
                placeholder="Describe exactly what should happen when a distress event is detected..."
                className="bg-background/50 border-border focus-visible:ring-primary text-base min-h-[120px] resize-none p-4 leading-relaxed rounded-xl"
                defaultValue="In case of distress detection, immediately alert all active guardians with my current GPS location and enable live audio stream. If unresponsive for 60 seconds, initiate direct link to emergency dispatch (911)."
              />
              <Button size="lg" className="w-full font-black text-sm tracking-[0.2em] uppercase italic">
                Save Protocol
              </Button>
            </div>
          </div>
        </section>

        {/* Tracking Permissions */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Eye className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold italic uppercase tracking-tight">Tracking Permissions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-6 bg-card rounded-2xl border border-border group hover:border-primary/30 transition-all">
              <div>
                <p className="text-base font-black uppercase italic">Live GPS Broadcast</p>
                <p className="text-xs text-muted-foreground font-medium mt-1">Guardians see real-time location during alerts</p>
              </div>
              <Checkbox id="gps" defaultChecked className="w-6 h-6 border-2 border-primary data-[state=checked]:bg-primary" />
            </div>
            <div className="flex items-center justify-between p-6 bg-card rounded-2xl border border-border group hover:border-primary/30 transition-all">
              <div>
                <p className="text-base font-black uppercase italic">Audio Feed (Listen-In)</p>
                <p className="text-xs text-muted-foreground font-medium mt-1">Allows Primary Guardian to activate mic</p>
              </div>
              <Checkbox id="audio" className="w-6 h-6 border-2 border-primary data-[state=checked]:bg-primary" />
            </div>
          </div>
        </section>

        {/* Register Guardian Form */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <PlusCircle className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold italic uppercase tracking-tight">Register New Guardian</h2>
          </div>
          <form onSubmit={addContact} className="space-y-6 bg-card p-8 rounded-[2rem] border border-border shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-black">Full Name</Label>
                <Input 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="bg-background border-border h-14 rounded-xl focus-visible:ring-primary text-base px-5"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-black">Phone Number</Label>
                <Input 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="bg-background border-border h-14 rounded-xl focus-visible:ring-primary text-base px-5"
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-black">Priority Rank</Label>
              <select
                className="w-full bg-background border border-border h-14 rounded-xl px-5 text-base focus:border-primary outline-none transition-colors appearance-none"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
              >
                <option value="Primary Guardian">Primary Guardian</option>
                <option value="Secondary Contact">Secondary Contact</option>
                <option value="Family Member">Family Member</option>
              </select>
            </div>
            <Button type="submit" size="lg" className="w-full font-black text-sm tracking-[0.2em] uppercase italic bg-transparent border-2 border-border text-foreground hover:bg-muted/10 hover:border-primary/50">
              Add Guardian Account
            </Button>
          </form>
        </section>

        {/* Active Guardians List */}
        <section className="space-y-8">
          <div className="flex justify-between items-end px-2">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter">Active Guardians</h2>
            <span className="text-xs text-muted-foreground font-black uppercase tracking-[0.2em]">{contacts.length} Secured</span>
          </div>

          <div className="space-y-6">
            <AnimatePresence>
              {contacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="group relative overflow-hidden bg-card rounded-[2rem] border border-border p-6 transition-all hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <div className="relative self-start sm:self-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/20 p-[2px] shadow-lg shadow-primary/10">
                        <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center overflow-hidden">
                          <User className="w-8 h-8 text-muted-foreground" />
                        </div>
                      </div>
                      {contact.online && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-secondary border-4 border-card rounded-full shadow-sm shadow-secondary/50" />
                      )}
                    </div>

                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Star className="w-4 h-4 text-primary fill-primary" />
                          <h3 className="font-black text-xl italic leading-none tracking-tight">{contact.name}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground font-black uppercase tracking-[0.2em]">
                          {contact.relation} • {contact.phone}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button variant="outline" size="sm" className="h-11 px-6 rounded-xl flex-1 sm:flex-none gap-3 font-bold uppercase tracking-widest text-xs">
                          <Phone className="w-4 h-4 text-secondary" />
                          Call
                        </Button>
                        <Button variant="outline" size="sm" className="h-11 px-6 rounded-xl flex-1 sm:flex-none gap-3 font-bold uppercase tracking-widest text-xs">
                          <MessageSquare className="w-4 h-4 text-primary" />
                          Signal
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteContact(contact.id)}
                          className="h-11 w-11 rounded-xl hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </main>
    </div>
  )
}
