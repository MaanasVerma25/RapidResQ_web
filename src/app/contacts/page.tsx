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
    <div className="min-h-screen bg-[#111317] text-[#e2e2e8] pb-20 font-sans selection:bg-[#ff5f1f]/30">
      {/* Dynamic Header */}
      <header className="sticky top-0 z-50 bg-[#111317]/80 backdrop-blur-xl border-b border-[#2d2f36] px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#ff5f1f]/10 rounded-lg">
              <ShieldAlert className="w-6 h-6 text-[#ff5f1f]" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Guardians & Protocols</h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-[#2ff801]/10 rounded-full border border-[#2ff801]/20">
            <div className="w-2 h-2 bg-[#2ff801] rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-[#2ff801] uppercase tracking-widest">System Armed</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-10">
        {/* Emergency Protocol Textarea */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-[#ff5f1f]" />
            <h2 className="text-lg font-bold">Emergency Protocol</h2>
          </div>
          <div className="glass-panel p-1 rounded-xl">
            <div className="bg-[#111317] rounded-lg p-4 space-y-4">
              <Label className="text-[10px] uppercase tracking-widest text-[#909196] font-bold">Incident Response Logic</Label>
              <Textarea
                placeholder="Describe exactly what should happen when a distress event is detected..."
                className="bg-transparent border-none focus-visible:ring-0 text-sm min-h-[100px] resize-none p-0 leading-relaxed"
                defaultValue="In case of distress detection, immediately alert all active guardians with my current GPS location and enable live audio stream. If unresponsive for 60 seconds, initiate direct link to emergency dispatch (911)."
              />
              <Button className="w-full bg-[#e2e2e8] text-[#111317] hover:bg-white font-bold text-[11px] h-9 tracking-widest uppercase">
                Save Protocol
              </Button>
            </div>
          </div>
        </section>

        {/* Tracking Permissions */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-5 h-5 text-[#ff5f1f]" />
            <h2 className="text-lg font-bold">Tracking Permissions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-[#1c1e24] rounded-xl border border-[#2d2f36]">
              <div>
                <p className="text-sm font-bold">Live GPS Broadcast</p>
                <p className="text-[10px] text-[#909196]">Guardians see real-time location during alerts</p>
              </div>
              <Checkbox id="gps" defaultChecked className="border-[#ff5f1f] data-[state=checked]:bg-[#ff5f1f]" />
            </div>
            <div className="flex items-center justify-between p-4 bg-[#1c1e24] rounded-xl border border-[#2d2f36]">
              <div>
                <p className="text-sm font-bold">Audio Feed (Listen-In)</p>
                <p className="text-[10px] text-[#909196]">Allows Primary Guardian to activate mic</p>
              </div>
              <Checkbox id="audio" className="border-[#ff5f1f] data-[state=checked]:bg-[#ff5f1f]" />
            </div>
          </div>
        </section>

        {/* Register Guardian Form */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <PlusCircle className="w-5 h-5 text-[#ff5f1f]" />
            <h2 className="text-lg font-bold">Register New Guardian</h2>
          </div>
          <form onSubmit={addContact} className="space-y-4 bg-[#1c1e24] p-6 rounded-2xl border border-[#2d2f36]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest text-[#909196]">Name</Label>
                <Input 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="bg-[#111317] border-[#2d2f36] h-11 focus:border-[#ff5f1f] transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest text-[#909196]">Phone</Label>
                <Input 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="bg-[#111317] border-[#2d2f36] h-11 focus:border-[#ff5f1f] transition-colors"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-widest text-[#909196]">Priority Rank</Label>
              <select
                className="w-full bg-[#111317] border-[#2d2f36] h-11 rounded-md px-3 text-sm focus:border-[#ff5f1f] outline-none"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
              >
                <option value="Primary Guardian">Primary Guardian</option>
                <option value="Secondary Contact">Secondary Contact</option>
                <option value="Family Member">Family Member</option>
              </select>
            </div>
            <Button type="submit" className="w-full bg-transparent border border-[#2d2f36] hover:bg-[#2d2f36] text-[#e2e2e8] font-bold text-[11px] h-11 tracking-widest uppercase">
              Add Guardian Account
            </Button>
          </form>
        </section>

        {/* Active Guardians List */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <h2 className="text-xl font-black uppercase tracking-tighter">Active Guardians</h2>
            <span className="text-[10px] text-[#909196] font-bold uppercase tracking-widest">2 Secured</span>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {contacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group relative overflow-hidden bg-[#1c1e24] rounded-2xl border border-[#2d2f36] p-5 transition-all hover:border-[#ff5f1f]/50"
                >
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ff5f1f] to-[#ff5f1f]/20 p-[2px]">
                        <div className="w-full h-full rounded-full bg-[#111317] flex items-center justify-center overflow-hidden">
                          <User className="w-6 h-6 text-[#909196]" />
                        </div>
                      </div>
                      {contact.online && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#2ff801] border-2 border-[#1c1e24] rounded-full" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Star className="w-3 h-3 text-[#ff5f1f] fill-[#ff5f1f]" />
                        <h3 className="font-bold text-lg leading-none">{contact.name}</h3>
                      </div>
                      <p className="text-[10px] text-[#909196] font-medium uppercase tracking-wider mb-2">
                        {contact.relation} • {contact.phone}
                      </p>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-8 bg-[#111317] border-[#2d2f36] hover:bg-[#2d2f36] flex-1 gap-2">
                          <Phone className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 bg-[#111317] border-[#2d2f36] hover:bg-[#2d2f36] flex-1 gap-2">
                          <MessageSquare className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteContact(contact.id)}
                          className="h-8 hover:bg-red-500/10 hover:text-red-500 text-[#909196]"
                        >
                          <Trash2 className="w-3 h-3" />
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
