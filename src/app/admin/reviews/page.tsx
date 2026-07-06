'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, CheckCircle, XCircle, Trash2, Search, MessageCircle } from 'lucide-react'

const reviews = [
  { id: 1, user: 'ShadowX_Pro', avatar: 'S', rating: 5, comment: 'Best store on the market! Got my Dragon Fruit in under 5 minutes. Insane service!', product: 'Dragon Fruit', date: '2 days ago', approved: true },
  { id: 2, user: 'ProGamer99', avatar: 'P', rating: 5, comment: 'Been buying here for months. Always reliable, best prices, and support is super fast.', product: '1700 Robux', date: '1 week ago', approved: true },
  { id: 3, user: 'NewUser_X', avatar: 'N', rating: 4, comment: 'Good product but delivery took longer than expected. Still happy with the purchase.', product: 'Venom Fruit', date: '2 hours ago', approved: false },
  { id: 4, user: 'BloxKing99', avatar: 'B', rating: 5, comment: 'The Max Account I bought was stacked. All fighting styles maxed, tons of beli. Worth every penny.', product: 'Blox Fruit Max Account', date: '2 weeks ago', approved: true },
  { id: 5, user: 'TestUser', avatar: 'T', rating: 1, comment: 'Scam! Never received my item.', product: 'Dragon Fruit', date: '1 day ago', approved: false },
  { id: 6, user: 'NinjaWarrior', avatar: 'N', rating: 5, comment: 'Fast delivery even at 3AM! These guys never sleep.', product: 'Venom Permanent', date: '3 weeks ago', approved: true },
]

export default function AdminReviewsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all')

  const filtered = reviews.filter(r => {
    if (filter === 'pending' && r.approved) return false
    if (filter === 'approved' && !r.approved) return false
    if (search && !r.comment.toLowerCase().includes(search.toLowerCase()) && !r.user.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const pendingCount = reviews.filter(r => !r.approved).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-black text-white">Reviews</h1>
          <p className="text-white/40 text-sm mt-1">{reviews.length} total reviews · {pendingCount} pending moderation</p>
        </div>
      </div>

      <div className="flex gap-2">
        {[
          { key: 'all', label: `All (${reviews.length})` },
          { key: 'pending', label: `Pending (${pendingCount})` },
          { key: 'approved', label: `Approved (${reviews.length - pendingCount})` },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === tab.key ? 'bg-electric text-white' : 'bg-dark-100 text-white/50 border border-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search reviews..." className="w-full h-11 pl-10 pr-4 rounded-xl bg-dark-100 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-electric/50" />
      </div>

      <div className="space-y-3">
        {filtered.map(review => (
          <div key={review.id} className={`p-5 rounded-2xl border transition-all ${
            review.approved ? 'bg-dark-100 border-white/5' : 'bg-yellow-500/5 border-yellow-500/20'
          }`}>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric to-neon-purple flex items-center justify-center text-sm font-bold text-white shrink-0">
                {review.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold text-white">{review.user}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/10'}`} />
                    ))}
                  </div>
                  <Badge variant={review.approved ? 'success' : 'warning'} className="text-[9px] px-1.5">
                    {review.approved ? 'Approved' : 'Pending'}
                  </Badge>
                </div>
                <p className="text-sm text-white/60 mb-1">&ldquo;{review.comment}&rdquo;</p>
                <div className="flex items-center gap-3 text-xs text-white/30">
                  <span>{review.product}</span>
                  <span>•</span>
                  <span>{review.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {!review.approved && (
                  <>
                    <button className="p-2 rounded-lg hover:bg-green-500/10 text-green-400 transition-all">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-all">
                      <XCircle className="w-4 h-4" />
                    </button>
                  </>
                )}
                <button className="p-2 rounded-lg hover:bg-white/5 text-white/30 hover:text-red-400 transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
