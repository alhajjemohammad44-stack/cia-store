'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  User, Package, ShoppingCart, Heart, Settings, LogOut,
  Mail, Calendar, Shield, ChevronRight
} from 'lucide-react'
import Link from 'next/link'

const recentOrders = [
  { id: 'ORD-001', product: 'Dragon Fruit', amount: '$32.00', status: 'completed', date: '2 days ago' },
  { id: 'ORD-002', product: '1700 Robux Pack', amount: '$12.99', status: 'completed', date: '1 week ago' },
]

export default function DashboardPage() {
  return (
    <>
      <Header />
      <main className="pt-24 md:pt-28 pb-16 min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="p-6 rounded-2xl bg-dark-100 border border-white/5 sticky top-28">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-electric to-neon-purple flex items-center justify-center text-2xl font-black text-white mb-3">
                    G
                  </div>
                  <h3 className="font-bold text-white">GamerPro</h3>
                  <p className="text-sm text-white/40">gamer@email.com</p>
                  <Badge variant="default" className="mt-2">Customer</Badge>
                </div>
                <nav className="space-y-1">
                  {[
                    { icon: User, label: 'Profile', href: '/dashboard' },
                    { icon: Package, label: 'My Orders', href: '/dashboard/orders' },
                    { icon: Heart, label: 'Wishlist', href: '/dashboard/wishlist' },
                    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  ))}
                  <hr className="border-white/5 my-2" />
                  <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all w-full">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl md:text-3xl font-heading font-black text-white">
                  My Dashboard
                </h1>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Total Orders', value: '12' },
                  { label: 'Completed', value: '11' },
                  { label: 'Wishlist', value: '5' },
                  { label: 'Member Since', value: '2024' },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 rounded-xl bg-dark-100 border border-white/5 text-center">
                    <div className="text-2xl font-black text-white">{stat.value}</div>
                    <div className="text-xs text-white/40 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Recent Orders */}
              <div className="p-6 rounded-2xl bg-dark-100 border border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">Recent Orders</h3>
                  <Link href="/dashboard/orders" className="text-sm text-electric hover:text-electric-400 transition-colors flex items-center gap-1">
                    View All <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
                {recentOrders.length > 0 ? (
                  <div className="space-y-3">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 rounded-xl bg-dark border border-white/5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-electric/10 border border-electric/20 flex items-center justify-center">
                            <Package className="w-5 h-5 text-electric" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{order.product}</p>
                            <p className="text-xs text-white/40">{order.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-white">{order.amount}</p>
                          <Badge variant={order.status === 'completed' ? 'success' : 'warning'} className="text-[10px]">
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-white/40 text-sm">No orders yet</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
