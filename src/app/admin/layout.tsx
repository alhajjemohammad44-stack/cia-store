'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Package, ShoppingCart, Users, Star, FileText,
  CreditCard, Settings, Megaphone, Image, Tag, Gift, Wallet,
  Database, ChevronDown, Zap, Menu, X, LogOut, Search, Bell,
  BarChart3, Layers, Download, Shield
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const navSections = [
  {
    title: 'MANAGEMENT',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/admin', color: 'text-electric' },
      { icon: Package, label: 'Products', href: '/admin/products', color: 'text-neon-cyan' },
      { icon: Layers, label: 'Categories', href: '/admin/categories', color: 'text-neon-purple' },
      { icon: ShoppingCart, label: 'Orders', href: '/admin/orders', color: 'text-orange-400' },
      { icon: Users, label: 'Customers', href: '/admin/customers', color: 'text-green-400' },
      { icon: Star, label: 'Reviews', href: '/admin/reviews', color: 'text-yellow-400' },
    ],
  },
  {
    title: 'CONTENT',
    items: [
      { icon: FileText, label: 'Pages', href: '/admin/content', color: 'text-blue-400' },
      { icon: Megaphone, label: 'Announcement', href: '/admin/announcement', color: 'text-pink-400' },
      { icon: Image, label: 'Banners', href: '/admin/banners', color: 'text-neon-cyan' },
      { icon: Tag, label: 'Discount Codes', href: '/admin/discounts', color: 'text-yellow-400' },
    ],
  },
  {
    title: 'FINANCE',
    items: [
      { icon: CreditCard, label: 'Payment Methods', href: '/admin/payment-methods', color: 'text-green-400' },
      { icon: Wallet, label: 'Withdrawals', href: '/admin/withdrawals', color: 'text-purple-400' },
      { icon: Gift, label: 'Cashback & Wallet', href: '/admin/settings?tab=wallet', color: 'text-pink-400' },
    ],
  },
  {
    title: 'SYSTEM',
    items: [
      { icon: Settings, label: 'Settings', href: '/admin/settings', color: 'text-white/60' },
      { icon: Database, label: 'Backup', href: '/admin/backup', color: 'text-blue-400' },
      { icon: Download, label: 'Data Export', href: '/admin/settings?tab=export', color: 'text-green-400' },
      { icon: Shield, label: 'Activity Log', href: '/admin/settings?tab=activity', color: 'text-orange-400' },
    ],
  },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-dark">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed top-0 left-0 h-full w-64 bg-dark-200 border-r border-white/5 z-50 transition-transform duration-300 lg:translate-x-0 overflow-y-auto',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        {/* Logo */}
        <div className="p-5 border-b border-white/5">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-electric/20 border border-electric/30 flex items-center justify-center">
              <Zap className="w-4 h-4 text-electric" />
            </div>
            <span className="text-lg font-heading font-black text-white">
              CIA <span className="text-electric">ADMIN</span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-6">
          {navSections.map((section) => (
            <div key={section.title}>
              <p className="px-3 text-[10px] font-bold text-white/20 tracking-widest mb-2">{section.title}</p>
              {section.items.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/admin' && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-0.5',
                      isActive
                        ? 'bg-electric/10 text-electric border border-electric/20'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <item.icon className={cn('w-4 h-4', isActive ? item.color : '')} />
                    {item.label}
                    {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-electric" />}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-white/5 mt-auto">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all">
            <Zap className="w-4 h-4" />
            View Store
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 glass border-b border-white/5">
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-white/5">
                <Menu className="w-5 h-5 text-white/70" />
              </button>
              <div className="hidden sm:flex items-center gap-2 text-sm text-white/40">
                <span className="text-white/60 font-medium">Admin</span>
                <span>/</span>
                <span className="capitalize">{pathname.split('/').pop()?.replace(/-/g, ' ') || 'dashboard'}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-white/5 relative">
                <Bell className="w-5 h-5 text-white/50" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              </button>
              <div className="flex items-center gap-2 pl-3 border-l border-white/10">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-electric to-neon-purple flex items-center justify-center text-xs font-bold text-white">
                  A
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-white">Admin</div>
                  <div className="text-xs text-white/40">Super Admin</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  )
}
