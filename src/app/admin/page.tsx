'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  DollarSign, ShoppingCart, Package, Users, TrendingUp, TrendingDown,
  BarChart3, ArrowRight, Plus, RefreshCw, Download, Eye, Clock,
  Zap, CircleDollarSign, CreditCard, Wallet, Activity
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const stats = [
  { label: 'Total Revenue', value: '$48,294.00', change: '+23.5%', trend: 'up', icon: DollarSign, color: 'from-green-400 to-emerald-500' },
  { label: 'Orders', value: '1,247', change: '+12.3%', trend: 'up', icon: ShoppingCart, color: 'from-electric to-neon-cyan' },
  { label: 'Products', value: '64', change: '+8', trend: 'up', icon: Package, color: 'from-neon-purple to-purple-500' },
  { label: 'Customers', value: '892', change: '+18.7%', trend: 'up', icon: Users, color: 'from-orange-400 to-pink-500' },
  { label: 'Conversion Rate', value: '4.8%', change: '+0.6%', trend: 'up', icon: BarChart3, color: 'from-teal-400 to-cyan-500' },
  { label: 'Avg. Order Value', value: '$38.72', change: '-2.1%', trend: 'down', icon: DollarSign, color: 'from-red-400 to-pink-500' },
]

const recentOrders = [
  { id: '#ORD-2026-0042', customer: 'ShadowX_Pro', product: 'Dragon Fruit', amount: '$32.00', status: 'completed', payment: 'Stripe', date: '2 min ago', email: 'shadow@email.com' },
  { id: '#ORD-2026-0041', customer: 'BloxKing99', product: 'Max Account Lv2550', amount: '$55.00', status: 'processing', payment: 'PayPal', date: '15 min ago', email: 'bloxking@email.com' },
  { id: '#ORD-2026-0040', customer: 'NinjaWarrior', product: '1700 Robux Pack', amount: '$12.99', status: 'completed', payment: 'USDT', date: '1 hour ago', email: 'ninja@email.com' },
  { id: '#ORD-2026-0039', customer: 'DragonSlayerOP', product: 'Dark Blade Gamepass', amount: '$15.00', status: 'pending', payment: 'Stripe', date: '2 hours ago', email: 'dragon@email.com' },
  { id: '#ORD-2026-0038', customer: 'FruitMaster', product: 'Venom Permanent', amount: '$38.00', status: 'completed', payment: 'PayPal', date: '3 hours ago', email: 'fruit@email.com' },
  { id: '#ORD-2026-0037', customer: 'SeaKing_22', product: 'Light Fruit', amount: '$12.00', status: 'completed', payment: 'Stripe', date: '4 hours ago', email: 'sea@email.com' },
  { id: '#ORD-2026-0036', customer: 'PirateLord', product: '2x Mastery Gamepass', amount: '$8.99', status: 'cancelled', payment: 'USDT', date: '5 hours ago', email: 'pirate@email.com' },
]

const topProducts = [
  { name: 'Dragon Fruit', sales: 234, revenue: '$7,488', trend: '+18%' },
  { name: '1700 Robux Pack', sales: 198, revenue: '$2,572', trend: '+12%' },
  { name: 'Blox Fruit Max Account', sales: 156, revenue: '$8,580', trend: '+25%' },
  { name: 'Venom Permanent', sales: 134, revenue: '$5,092', trend: '+8%' },
  { name: 'Dark Blade Gamepass', sales: 112, revenue: '$1,680', trend: '+15%' },
]

export default function AdminDashboardPage() {
  const [timeRange, setTimeRange] = useState('7d')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-black text-white">
            Admin Dashboard
          </h1>
          <p className="text-white/40 text-sm mt-1">Welcome back! Here&apos;s what&apos;s happening today.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-dark-100 rounded-xl border border-white/5 p-1">
            {['24h', '7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  timeRange === range ? 'bg-electric text-white' : 'text-white/40 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="p-4 rounded-2xl bg-dark-100 border border-white/5 hover:border-white/10 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-xl bg-gradient-to-br ${stat.color} opacity-80`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
              <span className={`text-xs font-bold flex items-center gap-0.5 ${
                stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <div className="text-xl font-black text-white">{stat.value}</div>
            <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 rounded-2xl bg-dark-100 border border-white/5">
          <div className="flex items-center justify-between p-5 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <ShoppingCart className="w-4 h-4 text-orange-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Recent Orders</h3>
              <Badge variant="warning" className="text-[10px]">Live</Badge>
            </div>
            <Link href="/admin/orders">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                View All <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-[10px] text-white/30 uppercase tracking-wider">
                  <th className="p-4 font-medium">Order</th>
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Product</th>
                  <th className="p-4 font-medium">Amount</th>
                  <th className="p-4 font-medium">Payment</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 text-xs font-mono text-white font-medium">{order.id}</td>
                    <td className="p-4">
                      <div>
                        <div className="text-sm font-medium text-white">{order.customer}</div>
                        <div className="text-[10px] text-white/30">{order.email}</div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-white/70">{order.product}</td>
                    <td className="p-4 text-sm font-bold text-white">{order.amount}</td>
                    <td className="p-4 text-xs text-white/40">{order.payment}</td>
                    <td className="p-4">
                      <Badge variant={
                        order.status === 'completed' ? 'success' :
                        order.status === 'processing' ? 'warning' :
                        order.status === 'cancelled' ? 'destructive' : 'default'
                      } className="text-[10px] px-2 py-0.5">
                        {order.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-xs text-white/40">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products & Quick Actions */}
        <div className="space-y-6">
          {/* Top Products */}
          <div className="rounded-2xl bg-dark-100 border border-white/5">
            <div className="p-5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-electric/10">
                  <BarChart3 className="w-4 h-4 text-electric" />
                </div>
                <h3 className="text-lg font-bold text-white">Top Products</h3>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {topProducts.map((product, i) => (
                <div key={product.name} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-dark border border-white/5 flex items-center justify-center text-xs font-bold text-white/40">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">{product.name}</div>
                    <div className="text-xs text-white/30">{product.sales} sales · {product.revenue}</div>
                  </div>
                  <span className="text-xs text-green-400 font-medium">{product.trend}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl bg-dark-100 border border-white/5">
            <div className="p-5 border-b border-white/5">
              <h3 className="text-lg font-bold text-white">Quick Actions</h3>
            </div>
            <div className="p-4 grid grid-cols-2 gap-2">
              {[
                { icon: Plus, label: 'Add Product', href: '/admin/products/new', color: 'text-electric' },
                { icon: Tag, label: 'New Category', href: '/admin/categories/new', color: 'text-neon-purple' },
                { icon: Megaphone, label: 'Announcement', href: '/admin/announcement', color: 'text-pink-400' },
                { icon: Download, label: 'Export Data', href: '/admin/settings?tab=export', color: 'text-green-400' },
                { icon: Eye, label: 'View Store', href: '/', color: 'text-blue-400' },
                { icon: Clock, label: 'Activity Log', href: '/admin/settings?tab=activity', color: 'text-orange-400' },
              ].map((action) => (
                <Link key={action.label} href={action.href}>
                  <div className="p-3 rounded-xl bg-dark border border-white/5 hover:border-electric/20 hover:bg-dark-50 transition-all cursor-pointer text-center">
                    <action.icon className={`w-4 h-4 mx-auto mb-1.5 ${action.color}`} />
                    <div className="text-xs font-medium text-white/60">{action.label}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-2xl bg-dark-100 border border-white/5">
            <div className="p-5 border-b border-white/5 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Activity className="w-4 h-4 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Recent Activity</h3>
            </div>
            <div className="p-4 space-y-3">
              {[
                { action: 'Order #ORD-2026-0042 completed', time: '2 min ago', type: 'success' },
                { action: 'New product added: Dragon Fruit', time: '10 min ago', type: 'info' },
                { action: 'Withdrawal request #WD-003 approved', time: '25 min ago', type: 'warning' },
                { action: 'Customer ShadowX_Pro registered', time: '1 hour ago', type: 'info' },
                { action: 'Discount code SUMMER20 created', time: '2 hours ago', type: 'info' },
              ].map((activity) => (
                <div key={activity.action} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    activity.type === 'success' ? 'bg-green-400' :
                    activity.type === 'warning' ? 'bg-yellow-400' : 'bg-electric'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white/70 truncate">{activity.action}</div>
                    <div className="text-xs text-white/30">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Pending Orders', value: '23', icon: Clock, color: 'text-yellow-400' },
          { label: 'Low Stock Items', value: '8', icon: Package, color: 'text-red-400' },
          { label: 'Unread Reviews', value: '5', icon: Star, color: 'text-purple-400' },
          { label: 'New Customers', value: '47', icon: Users, color: 'text-green-400' },
        ].map((item) => (
          <div key={item.label} className="p-4 rounded-xl bg-dark-100 border border-white/5 flex items-center gap-3">
            <item.icon className={`w-5 h-5 ${item.color}`} />
            <div>
              <div className="text-lg font-black text-white">{item.value}</div>
              <div className="text-xs text-white/40">{item.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
