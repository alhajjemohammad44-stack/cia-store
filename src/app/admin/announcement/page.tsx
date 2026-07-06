'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Megaphone, Save, Eye, EyeOff, Plus, Trash2, Sparkles, Bell, AlertTriangle, Info } from 'lucide-react'

export default function AdminAnnouncementPage() {
  const [announcements, setAnnouncements] = useState([
    { id: 1, message: '🔥 Welcome to CIA Store! Use code FIRST10 for 10% off your first order!', type: 'deal', active: true },
    { id: 2, message: '🚀 New Dragon Fruit skin available! Limited stock, order now!', type: 'info', active: true },
  ])

  const [newMessage, setNewMessage] = useState('')
  const [newType, setNewType] = useState('deal')

  const addAnnouncement = () => {
    if (!newMessage.trim()) return
    setAnnouncements([...announcements, { id: Date.now(), message: newMessage, type: newType, active: true }])
    setNewMessage('')
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-black text-white">Announcement Bar</h1>
        <p className="text-white/40 text-sm mt-1">Manage the announcement bar displayed at the top of your store</p>
      </div>

      {/* Preview */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-white/70">Preview</h3>
        {announcements.filter(a => a.active).slice(0, 1).map(a => (
          <div key={a.id} className={`px-6 py-3 rounded-xl text-sm font-medium flex items-center gap-2 ${
            a.type === 'deal' ? 'bg-gradient-to-r from-orange-500/10 via-pink-500/10 to-purple-500/10 border border-orange-500/20 text-orange-300' :
            a.type === 'info' ? 'bg-electric/10 border border-electric/20 text-electric' :
            'bg-yellow-500/10 border border-yellow-500/20 text-yellow-300'
          }`}>
            {a.type === 'deal' ? <Sparkles className="w-4 h-4" /> : a.type === 'info' ? <Info className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            {a.message}
          </div>
        ))}
      </div>

      {/* Add New */}
      <div className="p-6 rounded-2xl bg-dark-100 border border-white/5 space-y-4">
        <h3 className="text-lg font-bold text-white">Add Announcement</h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="Enter announcement message..."
            className="flex-1 h-11 px-4 rounded-xl bg-dark border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-electric/50"
          />
          <select
            value={newType}
            onChange={e => setNewType(e.target.value)}
            className="h-11 px-4 rounded-xl bg-dark border border-white/10 text-white focus:outline-none focus:border-electric/50"
          >
            <option value="deal">🔥 Deal</option>
            <option value="info">ℹ️ Info</option>
            <option value="warning">⚠️ Warning</option>
          </select>
          <Button onClick={addAnnouncement} className="gap-1.5">
            <Plus className="w-4 h-4" /> Add
          </Button>
        </div>
      </div>

      {/* List */}
      <div className="space-y-2">
        {announcements.map(a => (
          <div key={a.id} className="p-4 rounded-xl bg-dark-100 border border-white/5 flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              a.type === 'deal' ? 'bg-orange-500/10' :
              a.type === 'info' ? 'bg-electric/10' : 'bg-yellow-500/10'
            }`}>
              {a.type === 'deal' ? <Sparkles className="w-4 h-4 text-orange-300" /> :
               a.type === 'info' ? <Info className="w-4 h-4 text-electric" /> :
               <AlertTriangle className="w-4 h-4 text-yellow-300" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white/80 truncate">{a.message}</p>
              <Badge variant={a.type === 'deal' ? 'warning' : a.type === 'info' ? 'default' : 'destructive'} className="text-[9px] mt-1">{a.type}</Badge>
            </div>
            <button
              onClick={() => setAnnouncements(announcements.map(ann => ann.id === a.id ? { ...ann, active: !ann.active } : ann))}
              className={`p-2 rounded-lg transition-all ${a.active ? 'text-electric' : 'text-white/20'}`}
            >
              {a.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
            <button onClick={() => setAnnouncements(announcements.filter(ann => ann.id !== a.id))} className="p-2 rounded-lg hover:bg-white/5 text-white/30 hover:text-red-400">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <Button className="gap-1.5">
        <Save className="w-4 h-4" /> Save Changes
      </Button>
    </div>
  )
}
