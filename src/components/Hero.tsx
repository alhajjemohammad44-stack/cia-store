'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Shield, Clock, Star } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-purple/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-electric/10 border border-electric/20 text-electric text-sm font-bold">
              <Zap className="w-4 h-4" />
              <span>Premium Gaming Digital Store</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white leading-[1.1] tracking-tight">
              Level Up Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-neon-cyan glow-text">
                Gaming Arsenal
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/50 max-w-xl leading-relaxed">
              Premium accounts, rare in-game items, currency packs, and exclusive gamepasses
              at unbeatable prices. Instant delivery, 100% secure.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/shop">
                <Button size="xl" className="gap-2 text-base shadow-[0_0_30px_rgba(0,163,255,0.3)] hover:shadow-[0_0_50px_rgba(0,163,255,0.5)]">
                  Explore Store
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/shop?category=bloxfruit">
                <Button variant="outline" size="xl" className="text-base">
                  Blox Fruits
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-4">
              {[
                { icon: Zap, label: 'Instant', sub: 'Delivery' },
                { icon: Shield, label: '100%', sub: 'Secure' },
                { icon: Clock, label: '24/7', sub: 'Support' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-electric/10 border border-electric/20">
                    <stat.icon className="w-4 h-4 text-electric" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{stat.label}</div>
                    <div className="text-xs text-white/40">{stat.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="relative w-full max-w-lg aspect-square">
              {/* Glowing Card */}
              <div className="absolute inset-0 bg-gradient-to-br from-electric/20 to-neon-purple/20 rounded-3xl blur-3xl" />
              <div className="relative w-full h-full rounded-3xl border border-white/10 bg-dark-100/80 backdrop-blur-sm overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-electric/20 border border-electric/30 flex items-center justify-center mb-6 animate-float">
                    <Zap className="w-10 h-10 text-electric" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-white mb-2">
                    CIA STORE
                  </h3>
                  <p className="text-white/40 text-sm mb-6">Premium Gaming Digital Goods</p>
                  <div className="grid grid-cols-2 gap-3">
                    {['Accounts', 'Robux', 'Skins', 'Gamepasses'].map((item) => (
                      <div
                        key={item}
                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-white/70 text-sm font-medium"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
