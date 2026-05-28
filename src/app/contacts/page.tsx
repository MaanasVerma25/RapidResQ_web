"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Trash2, User, Phone, ShieldAlert, Heart, Shield, Settings, MessageSquare, PlusCircle, Star, AlertTriangle, Eye, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"
import { motion, AnimatePresence } from "framer-motion"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export default function ContactsPage() {
  const [user, setUser] = useState<any>(null)
  const [contacts, setContacts] = useState<any[]>([])
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [relation, setRelation] = useState("Primary Guardian")
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetch = async () => {
      // Mocked guest user to bypass login checks
      setUser({ id: 'guest', email: 'guest@rapidresq.ai' })
      const { data } = await supabase.from('contacts').select('*').limit(5)
      setContacts(data || [
        { id: '1', name: 'Sarah Miller', phone: '+1 (555) 012-3456', relation: 'Primary Guardian', online: true },
        { id: '2', name: 'Dr. Marcus Vance', phone: '+1 (555) 987-6543', relation: 'Family Physician', online: false }
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
    setName(""); setPhone(""); setRelation("Primary Guardian")
  }

  const deleteContact = async (id: string) => {
    setContacts(contacts.filter(c => c.id !== id))
  }

  return (
    <div className="min-h-screen bg-[#111317] text-[#e2e2e8] pb-24 font-sans selection:bg-[#ff5f1f]/30">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#111317]/80 backdrop-blur-xl border-b border-[#282a2e] px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#ff5f1f]/10 rounded-md">
            <ShieldAlert className="w-5 h-5 text-[#ff5f1f]" />
          </div>
          <h1 className="text-base font-black tracking-tight text-white uppercase font-sans">Guardians & Protocols</h1>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-[#2ff801]/10 rounded-full border border-[#2ff801]/20">
          <div className="w-2 h-2 bg-[#2ff801] rounded-full animate-pulse safety-glow-green" />
          <span className="text-[8px] font-bold font-geist text-[#2ff801] uppercase tracking-[0.2em]">System Armed</span>
        </div>
      </header>

      <main className="max-w-xl mx-auto p-6 space-y-10">
        
        {/* Emergency Protocol */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 px-2">
            <Shield className="w-4 h-4 text-[#ff5f1f]" />
            <h2 className="text-xs font-bold font-geist uppercase tracking-[0.2em] text-[#8e9aaf]">Emergency Protocol</h2>
          </div>
          
          <div className="bg-[#1a1c20] p-6 rounded-lg shadow-md space-y-4">
            <Label className="text-[9px] font-bold font-geist uppercase tracking-widest text-[#8e9aaf]">Incident Response Logic</Label>
            <Textarea
              placeholder="Describe exactly what should happen when a distress event is detected..."
              className="bg-[#111317] border border-[#2d2f36] rounded-md focus-visible:ring-1 focus-visible:ring-[#ff5f1f] text-sm min-h-[100px] resize-none p-3.5 leading-relaxed text-white font-medium placeholder-[#8e9aaf]/50"
              defaultValue="In case of distress detection, immediately alert all active guardians with my current GPS location and enable live audio stream. If unresponsive for 60 seconds, initiate direct link to emergency dispatch (911)."
            />
            <Button className="w-full bg-[#ff5f1f] text-[#111317] hover:bg-[#ff5f1f]/90 font-black text-[10px] h-10 tracking-widest uppercase rounded-md font-geist transition-all active:scale-[0.98] border-none shadow-md safety-glow-orange">
              Save Protocol Layout
            </Button>
          </div>
        </section>

        {/* Tracking Permissions (No-line grids, large click targets) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 px-2">
            <Eye className="w-4 h-4 text-[#ff5f1f]" />
            <h2 className="text-xs font-bold font-geist uppercase tracking-[0.2em] text-[#8e9aaf]">Tracking Permissions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="flex items-center justify-between p-5 bg-[#1a1c20] rounded-lg shadow-md">
              <div>
                <p className="text-xs font-bold text-white">Live GPS Broadcast</p>
                <p className="text-[10px] text-[#8e9aaf] font-medium mt-1">Real-time telemetry tags</p>
              </div>
              <Checkbox id="gps" defaultChecked className="h-5.5 w-5.5 border-2 border-[#ff5f1f] data-[state=checked]:bg-[#ff5f1f] data-[state=checked]:text-[#111317] rounded-sm" />
            </div>
            <div className="flex items-center justify-between p-5 bg-[#1a1c20] rounded-lg shadow-md">
              <div>
                <p className="text-xs font-bold text-white">Audio Feed (Listen-In)</p>
                <p className="text-[10px] text-[#8e9aaf] font-medium mt-1">Allows active mic link</p>
              </div>
              <Checkbox id="audio" className="h-5.5 w-5.5 border-2 border-[#ff5f1f] data-[state=checked]:bg-[#ff5f1f] data-[state=checked]:text-[#111317] rounded-sm" />
            </div>
          </div>
        </section>

        {/* Register Guardian Form */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 px-2">
            <PlusCircle className="w-4 h-4 text-[#ff5f1f]" />
            <h2 className="text-xs font-bold font-geist uppercase tracking-[0.2em] text-[#8e9aaf]">Register New Guardian</h2>
          </div>
          <form onSubmit={addContact} className="space-y-5 bg-[#1a1c20] p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[9px] font-bold font-geist uppercase tracking-widest text-[#8e9aaf]">Full Name</Label>
                <Input 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="bg-[#111317] border border-[#2d2f36] h-10 rounded-md focus-visible:ring-1 focus-visible:ring-[#ff5f1f] text-white transition-all placeholder-[#8e9aaf]/40"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[9px] font-bold font-geist uppercase tracking-widest text-[#8e9aaf]">Phone Number</Label>
                <Input 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="bg-[#111317] border border-[#2d2f36] h-10 rounded-md focus-visible:ring-1 focus-visible:ring-[#ff5f1f] text-white transition-all placeholder-[#8e9aaf]/40"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[9px] font-bold font-geist uppercase tracking-widest text-[#8e9aaf]">Priority Rank</Label>
              <select
                className="w-full bg-[#111317] border border-[#2d2f36] h-10 rounded-md px-3 text-xs font-medium focus:border-[#ff5f1f] outline-none text-white focus:ring-1 focus:ring-[#ff5f1f] transition-all"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
              >
                <option value="Primary Guardian">Primary Guardian</option>
                <option value="Secondary Contact">Secondary Contact</option>
                <option value="Family Member">Family Member</option>
              </select>
            </div>
            <Button type="submit" className="w-full bg-transparent border-2 border-[#2d2f36] hover:bg-[#2d2f36] text-[#e2e2e8] hover:text-white font-black text-[10px] h-10 tracking-widest uppercase rounded-md font-geist transition-all active:scale-[0.98]">
              Add Guardian Account
            </Button>
          </form>
        </section>

        {/* Active Guardians List (Tonal shifting lists, big touch buttons) */}
        <section className="space-y-6">
          <div className="flex justify-between items-end px-2">
            <h2 className="text-xs font-bold font-geist uppercase tracking-[0.2em] text-[#8e9aaf]">Active Guardians</h2>
            <span className="text-[9px] font-bold font-geist text-[#ff5f1f] uppercase tracking-wider">{contacts.length} Secured Channels</span>
          </div>

          <div className="space-y-3.5">
            <AnimatePresence>
              {contacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group relative overflow-hidden bg-[#1a1c20] rounded-lg p-5 transition-all shadow-md"
                >
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ff5f1f] to-[#ff5f1f]/20 p-[2px]">
                        <div className="w-full h-full rounded-full bg-[#111317] flex items-center justify-center overflow-hidden border border-[#282a2e]">
                          <User className="w-5 h-5 text-[#8e9aaf]" />
                        </div>
                      </div>
                      {contact.online && (
                        <>
                          <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#2ff801] border-2 border-[#1a1c20] rounded-full animate-pulse" />
                          <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#2ff801] border-2 border-[#1a1c20] rounded-full safety-glow-green" />
                        </>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="font-bold text-base leading-none text-white truncate">{contact.name}</h3>
                        {contact.relation === 'Primary Guardian' && (
                          <Star className="w-3.5 h-3.5 text-[#ff5f1f] fill-[#ff5f1f]" />
                        )}
                      </div>
                      <p className="text-[9px] font-bold font-geist text-[#8e9aaf] uppercase tracking-wider mb-3 truncate">
                        {contact.relation} • {contact.phone}
                      </p>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-8.5 bg-[#111317] border-[#2d2f36] hover:bg-[#2d2f36] hover:border-[#ff5f1f]/40 flex-1 gap-2 rounded-md text-white font-bold text-[10px]">
                          <Phone className="w-3.5 h-3.5 text-[#ff5f1f]" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8.5 bg-[#111317] border-[#2d2f36] hover:bg-[#2d2f36] hover:border-[#ff5f1f]/40 flex-1 gap-2 rounded-md text-white font-bold text-[10px]">
                          <MessageSquare className="w-3.5 h-3.5 text-[#ff5f1f]" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteContact(contact.id)}
                          className="h-8.5 hover:bg-[#ffb4ab]/10 hover:text-[#ffb4ab] text-[#8e9aaf] rounded-md transition-colors px-3.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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
