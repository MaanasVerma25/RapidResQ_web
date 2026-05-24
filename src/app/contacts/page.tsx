"use client"
import { useEffect, useState } from "react"
import { Plus, Trash2, UserPlus, Phone, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"

export default function ContactsPage() {
  const [user, setUser] = useState<any>(null); const [contacts, setContacts] = useState<any[]>([])
  const [name, setName] = useState(""); const [phone, setPhone] = useState(""); const [relation, setRelation] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setUser(user)
      const { data } = await supabase.from('emergency_contacts').select('*').eq('user_id', user.id)
      setContacts(data || []); setLoading(false)
    }
    fetch()
  }, [])

  const add = async (e: React.FormEvent) => {
    e.preventDefault(); if (!user) return
    const { data, error } = await supabase.from('emergency_contacts').insert({ user_id: user.id, name, phone_number: phone, relationship: relation }).select()
    if (!error && data) { setContacts([...contacts, data[0]]); setName(""); setPhone(""); setRelation("") }
  }

  const del = async (id: string) => {
    await supabase.from('emergency_contacts').delete().eq('id', id)
    setContacts(contacts.filter(c => c.id !== id))
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="flex-1 container max-w-2xl mx-auto p-4 space-y-8">
      <h2 className="text-3xl font-bold">Emergency Contacts</h2>
      <Card><CardHeader><CardTitle>Add Contact</CardTitle></CardHeader>
        <form onSubmit={add}><CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4"><div><Label>Name</Label><Input value={name} onChange={e => setName(e.target.value)} required /></div><div><Label>Relation</Label><Input value={relation} onChange={e => setRelation(e.target.value)} /></div></div>
          <div><Label>Phone</Label><Input value={phone} onChange={e => setPhone(e.target.value)} required /></div>
          <Button type="submit" className="w-full"><Plus className="mr-2 h-4 w-4" /> Add</Button>
        </CardContent></form>
      </Card>
      <div className="space-y-4">
        {contacts.map(c => (
          <Card key={c.id}><CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4"><div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><UserPlus /></div><div><p className="font-bold">{c.name}</p><p className="text-sm text-muted-foreground">{c.phone_number} • {c.relationship}</p></div></div>
            <Button variant="ghost" size="icon" onClick={() => del(c.id)}><Trash2 className="h-5 w-5" /></Button>
          </CardContent></Card>
        ))}
      </div>
    </div>
  )
}
