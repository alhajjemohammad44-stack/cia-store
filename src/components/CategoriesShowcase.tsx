'use client'

import Link from 'next/link'
import { CategoryCard } from '@/components/CategoryCard'
import { Button } from '@/components/ui/button'
import { ArrowRight, LayoutGrid } from 'lucide-react'
import { categories } from '@/data/products'

export function CategoriesShowcase() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-xs font-bold mb-4">
              <LayoutGrid className="w-3.5 h-3.5" />
              Categories
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-white leading-tight">
              Browse by{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-pink glow-text">
                Category
              </span>
            </h2>
            <p className="text-white/50 mt-3 max-w-xl">
              Find exactly what you need. Each category is packed with premium items.
            </p>
          </div>
          <Link href="/shop">
            <Button variant="outline" className="gap-2">
              All Categories
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
