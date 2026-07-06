'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Star, Zap } from 'lucide-react'
import type { Product } from '@/data/products'

interface ProductCardProps {
  product: Product
  featured?: boolean
}

export function ProductCard({ product, featured }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div
        className={`relative rounded-2xl bg-dark-100 border border-white/5 overflow-hidden transition-all duration-500 group-hover:border-electric/30 group-hover:shadow-[0_0_40px_rgba(0,163,255,0.08)] ${
          featured ? 'lg:col-span-2 lg:row-span-2' : ''
        }`}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] bg-gradient-to-br from-dark-50 to-dark overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-dark-100 via-transparent to-transparent z-10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-xl bg-electric/10 border border-electric/20 flex items-center justify-center group-hover:bg-electric/20 transition-all">
              <Zap className="w-8 h-8 text-electric" />
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
            {product.rarity && <Badge rarity={product.rarity}>{product.rarity}</Badge>}
            {discount > 0 && (
              <Badge variant="destructive">-{discount}%</Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-5 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs text-electric/70 font-medium mb-1">{product.category}</p>
              <h3 className="text-base md:text-lg font-bold text-white group-hover:text-electric transition-colors line-clamp-1">
                {product.name}
              </h3>
            </div>
          </div>

          <p className="text-sm text-white/40 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-white/30 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <Button
              size="sm"
              variant="glow"
              className="gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.preventDefault()
                // Add to cart logic
              }}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Add
            </Button>
          </div>

          {/* Features */}
          {product.features.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {product.features.slice(0, 2).map((feat) => (
                <span
                  key={feat}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/5"
                >
                  {feat}
                </span>
              ))}
              {product.features.length > 2 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40">
                  +{product.features.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
