'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Package } from 'lucide-react'
import type { Category } from '@/data/products'

interface CategoryCardProps {
  category: Category
  index: number
}

export function CategoryCard({ category, index }: CategoryCardProps) {
  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 bg-dark-100 hover:border-electric/30 transition-all duration-500"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-50 via-dark-100 to-dark" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent z-10" />

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-24 h-24 bg-electric/5 rounded-full blur-3xl group-hover:bg-electric/10 transition-all" />
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-neon-purple/5 rounded-full blur-2xl" />

      {/* Icon */}
      <div className="absolute top-6 right-6 z-20">
        <div className="p-3 rounded-xl bg-electric/10 border border-electric/20 group-hover:bg-electric/20 group-hover:shadow-[0_0_20px_rgba(0,163,255,0.15)] transition-all">
          <Package className="w-6 h-6 text-electric" />
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
        <Badge variant="default" className="mb-2">
          {category.productCount} Products
        </Badge>
        <h3 className="text-xl font-heading font-bold text-white mb-1 group-hover:text-electric transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-white/40 line-clamp-2 leading-relaxed mb-4">
          {category.description}
        </p>
        <div className="flex items-center gap-2 text-electric text-sm font-bold group-hover:gap-3 transition-all">
          Browse
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  )
}
