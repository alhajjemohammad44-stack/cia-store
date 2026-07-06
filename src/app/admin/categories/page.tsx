'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { categories, getProductsByCategory } from '@/data/products'
import { Plus, Edit, Trash2, Eye, ArrowUp, ArrowDown, Layers, Package } from 'lucide-react'

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-black text-white">Categories</h1>
          <p className="text-white/40 text-sm mt-1">Manage your store categories and subcategories</p>
        </div>
        <Link href="/admin/categories/new">
          <Button className="gap-1.5 shadow-[0_0_20px_rgba(0,163,255,0.2)]">
            <Plus className="w-4 h-4" />
            Add Category
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {categories.map((cat, i) => {
          const productCount = getProductsByCategory(cat.slug).length
          return (
            <div key={cat.id} className="p-5 rounded-2xl bg-dark-100 border border-white/5 hover:border-electric/20 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric/10 to-neon-purple/10 border border-white/5 flex items-center justify-center">
                    <Layers className="w-6 h-6 text-electric/60" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-electric transition-colors">{cat.name}</h3>
                    <p className="text-xs text-white/30 font-mono">{cat.slug}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-electric transition-all">
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-electric transition-all">
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-electric transition-all">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-red-400 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-white/50 line-clamp-2 mb-4">{cat.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="text-xs">{productCount} Products</Badge>
                  <Badge variant="secondary" className="text-xs">{cat.slug === 'bloxfruit' ? '3 Subcategories' : '0 Subcategories'}</Badge>
                </div>
                <Link href={`/shop?category=${cat.slug}`}>
                  <Button variant="ghost" size="sm" className="text-xs gap-1">
                    <Eye className="w-3 h-3" /> View
                  </Button>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
