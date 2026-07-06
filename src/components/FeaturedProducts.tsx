'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ProductCard } from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import { products } from '@/data/products'

export function FeaturedProducts() {
  const featuredProducts = products.slice(0, 6)

  return (
    <section className="relative py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric/10 border border-electric/20 text-electric text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Top Picks
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-white leading-tight">
              Premium{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-neon-cyan glow-text">
                Products
              </span>
            </h2>
            <p className="text-white/50 mt-3 max-w-xl">
              Hand-picked premium items at unbeatable prices. Instant delivery guaranteed.
            </p>
          </div>
          <Link href="/shop">
            <Button variant="outline" className="gap-2">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
