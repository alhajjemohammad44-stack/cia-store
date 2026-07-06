'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tag, Plus, Copy, Trash2, Percent, Calendar, Users } from 'lucide-react'

const initialCodes = [
  { id: 1, code: 'FIRST10', type: 'percent', value: 10, minAmount: 0, maxUses: 100, used: 23, expires: '2026-12-31', active: true, products: 'all' },
  { id: 2, code: 'SUMMER20', type: 'percent', value: 20, minAmount: 50, maxUses: 50, used: 12, expires: '2026-09-01', active: true, products: 'bloxfruit' },
  { id: 3, code: 'VIP5', type: 'fixed', value: 5, minAmount: 30, maxUses: 200, used: 45, expires: '2026-12-31', active: true, products: 'all' },
  { id: 4, code: 'ROBUX10', type: 'percent', value: 10, minAmount: 10, maxUses: 500, used: 67, expires: '2026-12-31', active: true, products: 'robux' },
]

export default function AdminDiscountsPage() {
  const [codes, setCodes] = useState(initialCodes)
  const [showNew, setShowNew] = useState(false)
  const [newCode, setNewCode] = useState({ code: '', type: 'percent', value: '', minAmount: '', maxUses: '', expires: '', products: 'all' })

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code = ''
    for (let i = 0; i < 8; i++) code += chars.charAt(Math.floor(Math.random() * chars.length))
    return code
  }

  const addCode = () => {
    if (!newCode.code || !newCode.value) return
    setCodes([...codes, {
      id: Date.now(),
      code: newCode.code,
      type: newCode.type as 'percent' | 'fixed',
      value: parseInt(newCode.value),
      minAmount: parseInt(newCode.minAmount) || 0,
      maxUses: parseInt(newCode.maxUses) || 999,
      used: 0,
      expires: newCode.expires || '2026-12-31',
      active: true,
      products: newCode.products,
    }])
    setNewCode({ code: '', type: 'percent', value: '', minAmount: '', maxUses: '', expires: '', products: 'all' })
    setShowNew(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-black text-white">Discount Codes</h1>
          <p className="text-white/40 text-sm mt-1">Create and manage promotional discount codes</p>
        </div>
        <Button onClick={() => setShowNew(true)} className="gap-1.5">
          <Plus className="w-4 h-4" /> New Code
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-dark-100 border border-white/5">
          <div className="text-2xl font-black text-white">{codes.length}</div>
          <div className="text-xs text-white/40">Active Codes</div>
        </div>
        <div className="p-4 rounded-xl bg-dark-100 border border-white/5">
          <div className="text-2xl font-black text-white">{codes.reduce((s, c) => s + c.used, 0)}</div>
          <div className="text-xs text-white/40">Total Uses</div>
        </div>
        <div className="p-4 rounded-xl bg-dark-100 border border-white/5">
          <div className="text-2xl font-black text-white">{codes.filter(c => c.used >= c.maxUses).length}</div>
          <div className="text-xs text-white/40">Exhausted</div>
        </div>
      </div>

      {showNew && (
        <div className="p-6 rounded-2xl bg-dark-100 border border-electric/20 space-y-4">
          <h3 className="text-lg font-bold text-white">New Discount Code</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2">
              <label className="block text-sm text-white/60 mb-1.5">Code</label>
              <div className="flex gap-2">
                <input type="text" value={newCode.code} onChange={e => setNewCode({ ...newCode, code: e.target.value.toUpperCase() })} className="flex-1 h-11 px-4 rounded-xl bg-dark border border-white/10 text-white text-lg font-bold tracking-wider font-mono focus:outline-none focus:border-electric/50 uppercase" placeholder="SUMMER50" />
                <Button variant="outline" size="sm" onClick={() => setNewCode({ ...newCode, code: generateCode() })}>Generate</Button>
              </div>
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1.5">Type</label>
              <select value={newCode.type} onChange={e => setNewCode({ ...newCode, type: e.target.value })} className="w-full h-11 px-4 rounded-xl bg-dark border border-white/10 text-white focus:outline-none focus:border-electric/50">
                <option value="percent">Percentage (%)</option>
                <option value="fixed">Fixed Amount ($)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1.5">Value</label>
              <input type="number" value={newCode.value} onChange={e => setNewCode({ ...newCode, value: e.target.value })} className="w-full h-11 px-4 rounded-xl bg-dark border border-white/10 text-white focus:outline-none focus:border-electric/50" placeholder="10" />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1.5">Min. Amount</label>
              <input type="number" value={newCode.minAmount} onChange={e => setNewCode({ ...newCode, minAmount: e.target.value })} className="w-full h-11 px-4 rounded-xl bg-dark border border-white/10 text-white focus:outline-none focus:border-electric/50" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1.5">Max Uses</label>
              <input type="number" value={newCode.maxUses} onChange={e => setNewCode({ ...newCode, maxUses: e.target.value })} className="w-full h-11 px-4 rounded-xl bg-dark border border-white/10 text-white focus:outline-none focus:border-electric/50" placeholder="100" />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1.5">Expires</label>
              <input type="date" value={newCode.expires} onChange={e => setNewCode({ ...newCode, expires: e.target.value })} className="w-full h-11 px-4 rounded-xl bg-dark border border-white/10 text-white focus:outline-none focus:border-electric/50" />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1.5">Apply To</label>
              <select value={newCode.products} onChange={e => setNewCode({ ...newCode, products: e.target.value })} className="w-full h-11 px-4 rounded-xl bg-dark border border-white/10 text-white focus:outline-none focus:border-electric/50">
                <option value="all">All Products</option>
                <option value="bloxfruit">Blox Fruits Only</option>
                <option value="robux">Robux Only</option>
                <option value="accounts">Accounts Only</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button onClick={addCode}>Create Code</Button>
            <Button variant="outline" onClick={() => setShowNew(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {codes.map(code => (
          <div key={code.id} className="p-5 rounded-2xl bg-dark-100 border border-white/5 hover:border-electric/20 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-500/10">
                <Tag className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold font-mono text-white">{code.code}</span>
                  <button onClick={() => navigator.clipboard.writeText(code.code)} className="p-1 rounded hover:bg-white/5 text-white/30 hover:text-electric">
                    <Copy className="w-3 h-3" />
                  </button>
                  <Badge variant={code.type === 'percent' ? 'default' : 'success'} className="text-[9px]">
                    {code.type === 'percent' ? `${code.value}% OFF` : `$${code.value} OFF`}
                  </Badge>
                  <Badge variant={code.active ? 'success' : 'destructive'} className="text-[9px]">
                    {code.active ? 'Active' : 'Disabled'}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mt-1 text-xs text-white/40">
                  <span>Min: ${code.minAmount}</span>
                  <span>Used: {code.used}/{code.maxUses}</span>
                  <span>Expires: {code.expires}</span>
                  <span>Applies: {code.products}</span>
                </div>
              </div>
              <button className="p-2 rounded-lg hover:bg-white/5 text-white/30 hover:text-red-400">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
