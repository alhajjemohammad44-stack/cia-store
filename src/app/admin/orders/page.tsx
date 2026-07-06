'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Search, Filter, Download, MoreHorizontal, Eye, CheckCircle, XCircle,
  MessageCircle, Clock, Package, ShoppingCart, ChevronDown, ArrowUpDown
} from 'lucide-react'

const orders = [
  { id: '#ORD-2026-0042', customer: 'ShadowX_Pro', email: 'shadow@email.com', product: 'Dragon Fruit', qty: 1, amount: 32.00, status: 'completed', payment: 'Stripe', method: 'Card', date: '2026-07-06', priority: 'normal', username: 'ShadowX_Pro', notes: '' },
  { id: '#ORD-2026-0041', customer: 'BloxKing99', email: 'bloxking@email.com', product: 'Max Account Lv2550', qty: 1, amount: 55.00, status: 'processing', payment: 'PayPal', method: 'PayPal', date: '2026-07-06', priority: 'high', username: 'BloxKing99', notes: 'Customer wants fastest delivery' },
  { id: '#ORD-2026-0040', customer: 'NinjaWarrior', email: 'ninja@email.com', product: '1700 Robux Pack', qty: 2, amount: 25.98, status: 'pending', payment: 'USDT', method: 'Crypto', date: '2026-07-05', priority: 'normal', username: 'NinjaWarrior', notes: '' },
  { id: '#ORD-2026-0039', customer: 'DragonSlayerOP', email: 'dragon@email.com', product: 'Dark Blade Gamepass', qty: 1, amount: 15.00, status: 'pending_review', payment: 'Stripe', method: 'Card', date: '2026-07-05', priority: 'high', username: 'DragonSlayer_OP', notes: 'High value order - manual review' },
  { id: '#ORD-2026-0038', customer: 'FruitMaster', email: 'fruit@email.com', product: 'Venom Permanent', qty: 1, amount: 38.00, status: 'waiting_customer', payment: 'PayPal', method: 'PayPal', date: '2026-07-05', priority: 'normal', username: 'FruitMaster_22', notes: 'Need to confirm username' },
  { id: '#ORD-2026-0037', customer: 'SeaKing', email: 'sea@email.com', product: 'Light Fruit', qty: 1, amount: 12.00, status: 'in_progress', payment: 'Stripe', method: 'Card', date: '2026-07-04', priority: 'normal', username: 'SeaKing_22', notes: '' },
  { id: '#ORD-2026-0036', customer: 'PirateLord', email: 'pirate@email.com', product: '2x Mastery Gamepass', qty: 1, amount: 8.99, status: 'cancelled', payment: 'USDT', method: 'Crypto', date: '2026-07-04', priority: 'low', username: 'PirateLord_X', notes: 'Payment timeout' },
]

const statuses = ['all', 'pending', 'pending_review', 'waiting_customer', 'in_progress', 'processing', 'delivering', 'completed', 'cancelled']

const statusVariants: Record<string, 'default' | 'warning' | 'success' | 'destructive' | 'purple' | 'pink' | 'cyan'> = {
  pending: 'default',
  pending_review: 'warning',
  waiting_customer: 'purple',
  in_progress: 'cyan',
  processing: 'warning',
  delivering: 'pink',
  completed: 'success',
  cancelled: 'destructive',
}

const statusIcons: Record<string, any> = {
  pending: Clock,
  pending_review: Eye,
  waiting_customer: MessageCircle,
  in_progress: Package,
  processing: Package,
  delivering: Package,
  completed: CheckCircle,
  cancelled: XCircle,
}

export default function AdminOrdersPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const filteredOrders = orders.filter(o => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false
    if (search && !o.id.toLowerCase().includes(search.toLowerCase()) && !o.customer.toLowerCase().includes(search.toLowerCase()) && !o.email.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const orderCounts = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1
    acc.total = (acc.total || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const totalRevenue = orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.amount, 0)
  const pendingRevenue = orders.filter(o => ['pending', 'pending_review', 'waiting_customer', 'in_progress', 'processing'].includes(o.status)).reduce((sum, o) => sum + o.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-black text-white">Orders</h1>
          <p className="text-white/40 text-sm mt-1">{orders.length} orders · ${totalRevenue.toFixed(2)} completed · ${pendingRevenue.toFixed(2)} pending</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${statusFilter === 'all' ? 'bg-electric text-white' : 'bg-dark-100 text-white/50 border border-white/5 hover:border-white/20'}`}
        >
          All ({orders.length})
        </button>
        {statuses.filter(s => s !== 'all').map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
              statusFilter === status
                ? 'bg-electric text-white'
                : 'bg-dark-100 text-white/50 border border-white/5 hover:border-white/20'
            }`}
          >
            {status.replace(/_/g, ' ')} ({orderCounts[status] || 0})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by order ID, customer name, or email..."
          className="w-full h-12 pl-11 pr-4 rounded-xl bg-dark-100 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-electric/50"
        />
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.map((order) => {
          const StatusIcon = statusIcons[order.status] || Package
          const isExpanded = expandedOrder === order.id
          return (
            <div
              key={order.id}
              className="rounded-2xl bg-dark-100 border border-white/5 hover:border-white/10 transition-all overflow-hidden"
            >
              <div
                className="p-4 cursor-pointer"
                onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl ${
                    order.status === 'completed' ? 'bg-green-500/10' :
                    order.status === 'cancelled' ? 'bg-red-500/10' :
                    order.status === 'pending_review' ? 'bg-yellow-500/10' :
                    'bg-electric/10'
                  }`}>
                    <StatusIcon className={`w-5 h-5 ${
                      order.status === 'completed' ? 'text-green-400' :
                      order.status === 'cancelled' ? 'text-red-400' :
                      'text-electric'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono font-bold text-white">{order.id}</span>
                      <Badge variant={statusVariants[order.status] || 'default'} className="text-[9px] px-1.5 py-0 capitalize">
                        {order.status.replace(/_/g, ' ')}
                      </Badge>
                      {order.priority === 'high' && (
                        <Badge variant="destructive" className="text-[9px] px-1.5 py-0">Priority</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-white/40">
                      <span>{order.customer}</span>
                      <span>•</span>
                      <span>{order.product} × {order.qty}</span>
                      <span>•</span>
                      <span>{order.payment}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-white">${order.amount.toFixed(2)}</div>
                    <div className="text-[10px] text-white/30">{order.date}</div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-white/30 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-white/5 pt-4 space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-[10px] text-white/30 uppercase tracking-wider">Customer</label>
                      <div className="text-sm text-white font-medium">{order.customer}</div>
                      <div className="text-xs text-white/40">{order.email}</div>
                    </div>
                    <div>
                      <label className="text-[10px] text-white/30 uppercase tracking-wider">Game Username</label>
                      <div className="text-sm text-white font-medium">{order.username}</div>
                    </div>
                    <div>
                      <label className="text-[10px] text-white/30 uppercase tracking-wider">Payment</label>
                      <div className="text-sm text-white font-medium">{order.payment} ({order.method})</div>
                    </div>
                    <div>
                      <label className="text-[10px] text-white/30 uppercase tracking-wider">Amount</label>
                      <div className="text-sm font-bold text-white">${order.amount.toFixed(2)}</div>
                    </div>
                  </div>
                  {order.notes && (
                    <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                      <p className="text-xs text-yellow-400"><span className="font-bold">Notes:</span> {order.notes}</p>
                    </div>
                  )}
                  <div className="flex items-center gap-2 pt-2">
                    <Button size="sm" variant="default" className="gap-1 text-xs">
                      <CheckCircle className="w-3 h-3" /> Mark Complete
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1 text-xs">
                      <MessageCircle className="w-3 h-3" /> Contact Customer
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1 text-xs">
                      <Eye className="w-3 h-3" /> View Details
                    </Button>
                    <Button size="sm" variant="ghost" className="gap-1 text-xs text-red-400">
                      <XCircle className="w-3 h-3" /> Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
