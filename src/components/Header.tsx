'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'
import { Menu, X, ShoppingCart, User, ChevronDown, Search, Zap } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/shop?category=bloxfruit', label: 'Blox Fruits' },
  { href: '/shop?category=robux', label: 'Robux' },
  { href: '/shop?category=accounts', label: 'Accounts' },
  { href: '/shop?category=gamepasses', label: 'Gamepasses' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'glass shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-electric/20 border border-electric/30 flex items-center justify-center group-hover:bg-electric/30 transition-all">
              <Zap className="w-5 h-5 text-electric" />
            </div>
            <span className="text-xl font-heading font-black text-white tracking-tight">
              CIA <span className="text-electric glow-text">STORE</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="w-5 h-5" />
            </Button>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-electric text-[10px] font-bold text-white flex items-center justify-center shadow-[0_0_10px_rgba(0,163,255,0.5)]">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
                <User className="w-4 h-4" />
                Sign In
              </Button>
            </Link>
            <Link href="/shop">
              <Button size="sm" className="hidden sm:flex shadow-[0_0_20px_rgba(0,163,255,0.2)]">
                Shop Now
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden transition-all duration-300 overflow-hidden',
          isMobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="glass border-t border-white/5 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className="block px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 flex gap-2">
            <Link href="/auth/login" className="flex-1" onClick={() => setIsMobileOpen(false)}>
              <Button variant="outline" className="w-full">Sign In</Button>
            </Link>
            <Link href="/shop" className="flex-1" onClick={() => setIsMobileOpen(false)}>
              <Button className="w-full">Shop Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
