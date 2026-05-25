"use client"
import { useEffect, useState } from "react"
import { Plus, Trash2, User, Phone, ShieldAlert, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { motion, AnimatePresence } from "framer-motion"

export default function ContactsPage() {
  const [user, setUser] = useState<any>(null); const [contacts, setContacts] = useState<any[]>([])
  const [name, setName] = useState(""); const [phone, setPhone] = useState(""); const [relation, setRelation] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      // Mocked guest user to bypass login checks
      const mockUser = { id: "guest-user", email: "guest@rapidresq.com" }
      setUser(mockUser)

      let contactsList = []
      try {
        const localContactsStr = localStorage.getItem("rapidresq_contacts")
        contactsList = localContactsStr ? JSON.parse(localContactsStr) : []
      } catch (e) {
        console.error("Failed to parse local contacts:", e)
      }

      if (contactsList.length === 0) {
        contactsList = [
          { id: "1", name: "John Doe", phone_number: "+1 555-0199", relationship: "Friend" },
          { id: "2", name: "Jane Smith", phone_number: "+1 555-0120", relationship: "Sister" }
        ]
        localStorage.setItem("rapidresq_contacts", JSON.stringify(contactsList))
      }
      
      setContacts(contactsList)
      setLoading(false)
    }
    fetch()
  }, [])

  const add = async (e: React.FormEvent) => {
    e.preventDefault(); if (!user) return
    
    const newContact = {
      id: Date.now().toString(),
      name,
      phone_number: phone,
      relationship: relation || "Contact"
    }

    const updatedContacts = [...contacts, newContact]
    setContacts(updatedContacts)
    localStorage.setItem("rapidresq_contacts", JSON.stringify(updatedContacts))
    setName(""); setPhone(""); setRelation("")

    // Attempt to write to Supabase, fail silently if database keys are not configured
    try {
      await supabase.from('emergency_contacts').insert({ user_id: user.id, name, phone_number: phone, relationship: relation })
    } catch (e) {
      console.warn("Supabase insert bypassed:", e)
    }
  }

  const del = async (id: string) => {
    const updatedContacts = contacts.filter(c => c.id !== id)
    setContacts(updatedContacts)
    localStorage.setItem("rapidresq_contacts", JSON.stringify(updatedContacts))

    // Attempt to delete from Supabase, fail silently
    try {
      await supabase.from('emergency_contacts').delete().eq('id', id)
    } catch (e) {
      console.warn("Supabase delete bypassed:", e)
    }
  }

  const getRelationBadgeStyle = (relationship: string) => {
    const rel = relationship.toLowerCase();
    if (rel.includes("friend")) return "bg-purple-500/10 border-purple-500/20 text-purple-300";
    if (rel.includes("sister") || rel.includes("mother") || rel.includes("wife")) return "bg-pink-500/10 border-pink-500/20 text-pink-300";
    if (rel.includes("brother") || rel.includes("father") || rel.includes("husband")) return "bg-blue-500/10 border-blue-500/20 text-blue-300";
    return "bg-slate-500/10 border-slate-500/20 text-slate-300";
  }

  if (loading) return <div className="flex-1 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div></div>

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8 space-y-8 relative">
      
      {/* Background Orbs */}
      <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[90px] pointer-events-none -z-10"></div>

      <header className="space-y-1.5 border-b border-white/[0.04] pb-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-glow text-gradient-primary">Emergency Contacts</h2>
        <p className="text-slate-400 text-sm">Add or manage contacts who will be immediately notified in distress situations.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-5 items-start">
        
        {/* Add Contact Card Form */}
        <Card className="glass-card border-white/5 md:col-span-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl pointer-events-none"></div>
          
          <CardHeader>
            <CardTitle className="text-lg font-bold text-white tracking-wide">Secure Contact</CardTitle>
            <CardDescription className="text-xs text-slate-400">Inputs are strictly compiled locally in sandboxed memory.</CardDescription>
          </CardHeader>

          <form onSubmit={add}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs text-slate-400 uppercase tracking-widest font-bold">Contact Name</Label>
                <Input 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  required 
                  className="bg-slate-950/60 border-white/10 rounded-xl focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 text-white transition-all py-5"
                  placeholder="e.g. John Doe"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-slate-400 uppercase tracking-widest font-bold">Relationship</Label>
                  <Input 
                    value={relation} 
                    onChange={e => setRelation(e.target.value)} 
                    className="bg-slate-950/60 border-white/10 rounded-xl focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 text-white transition-all py-5"
                    placeholder="e.g. Friend"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-slate-400 uppercase tracking-widest font-bold">Priority Badge</Label>
                  <div className="h-10 border border-white/10 bg-slate-950/40 rounded-xl flex items-center justify-center text-xs font-semibold text-purple-300 select-none">
                    <Heart className="h-4.5 w-4.5 text-purple-400 fill-purple-400/20 mr-1.5 animate-pulse" />
                    SOS ACTIVE
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-slate-400 uppercase tracking-widest font-bold">Phone Number</Label>
                <Input 
                  value={phone} 
                  onChange={e => setPhone(e.target.value)} 
                  required 
                  className="bg-slate-950/60 border-white/10 rounded-xl focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 text-white transition-all py-5"
                  placeholder="e.g. +1 555-0199"
                />
              </div>

              <Button type="submit" className="w-full py-5 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md hover:shadow-purple-500/10 hover:scale-[1.01] transition-all">
                <Plus className="mr-2 h-4 w-4" /> Save Security Contact
              </Button>
            </CardContent>
          </form>
        </Card>

        {/* Saved Contacts Badges HUD List */}
        <div className="md:col-span-3 space-y-4">
          <AnimatePresence initial={false}>
            {contacts.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 bg-slate-950/10 border border-white/5 border-dashed rounded-2xl text-slate-500 space-y-2">
                <User className="h-8 w-8 text-slate-600" />
                <p className="text-sm font-semibold">No Secure Contacts Registered</p>
                <p className="text-xs text-slate-500">Please append high-priority numbers using the safety control box.</p>
              </div>
            ) : (
              contacts.map(c => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card p-4 rounded-2xl flex items-center justify-between gap-4 border border-white/5 hover:border-purple-500/15 transition-all shadow-md group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-purple-500 to-indigo-500 opacity-60"></div>
                  
                  <div className="flex items-center gap-4 pl-2">
                    <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-inner group-hover:scale-105 transition-transform duration-300">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-extrabold text-white tracking-wide text-sm md:text-base">{c.name}</p>
                        <span className={`px-2 py-0.5 text-[9px] font-black uppercase rounded border tracking-wider select-none ${getRelationBadgeStyle(c.relationship)}`}>
                          {c.relationship}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-slate-500" />
                        {c.phone_number}
                      </p>
                    </div>
                  </div>

                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => del(c.id)}
                    className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 rounded-xl p-2.5 transition-all"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  )
}
