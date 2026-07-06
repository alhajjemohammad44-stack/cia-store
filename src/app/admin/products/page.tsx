'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { products as staticProducts } from '@/data/products'
import { 
  Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Copy,
  Eye, Star, Package, Zap, ArrowUpDown, Download, ToggleLeft, ToggleRight
} from 'lucide-react'

type SortField = 'name' | 'price' | 'stock' | 'createdAt'
type SortOrder = 'asc' | 'desc'

export default function AdminProductsPage() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortField, setSortField] = useState<SortField>('createdAt')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [viewProduct, setViewProduct] = useState<string | null>(null)

  const categories = [...new Set(staticProducts.map(p => p.category))]

  let filtered = staticProducts.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.id.toLowerCase().includes(search.toLowerCase())) return false
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false
    return true
  })

  filtered.sort((a, b) => {
    const mod = sortOrder === 'asc' ? 1 : -1
    if (sortField === 'price') return (a.price - b.price) * mod
    if (sortField === 'name') return a.name.localeCompare(b.name) * mod
    if (sortField === 'stock') return (a.stockCount - b.stockCount) * mod
    return 0
  })

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-black text-white">Products</h1>
          <p className="text-white/40 text-sm mt-1">{filtered.length} products total</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="w-3.5 h-3.5" />
            Export
          </Button>
          <Link href="/admin/products/new">
            <Button className="gap-1.5 shadow-[0_0_20px_rgba(0,163,255,0.2)]">
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by name or ID..."
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-dark-100 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-electric/50 transition-all"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-11 px-4 rounded-xl bg-dark-100 border border-white/10 text-white/70 text-sm focus:outline-none focus:border-electric/50"
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="rounded-2xl bg-dark-100 border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-[10px] text-white/30 uppercase tracking-wider border-b border-white/5">
                <th className="p-4 font-medium">
                  <button onClick={() => toggleSort('name')} className="flex items-center gap-1 hover:text-white transition-colors">
                    Product <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">
                  <button onClick={() => toggleSort('price')} className="flex items-center gap-1 hover:text-white transition-colors">
                    Price <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="p-4 font-medium">
                  <button onClick={() => toggleSort('stock')} className="flex items-center gap-1 hover:text-white transition-colors">
                    Stock <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="p-4 font-medium">Rarity</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric/10 to-neon-purple/10 border border-white/5 flex items-center justify-center shrink-0">
                        <Package className="w-5 h-5 text-electric/60" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{product.name}</div>
                        <div className="text-[10px] text-white/30 font-mono">{product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-white/50">{product.category}</td>
                  <td className="p-4">
                    <div className="text-sm font-bold text-white">${product.price.toFixed(2)}</div>
                    {product.originalPrice && (
                      <div className="text-[10px] text-white/30 line-through">${product.originalPrice.toFixed(2)}</div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-bold text-white">{product.stockCount}</div>
                      {product.stockCount < 10 && (
                        <Badge variant="destructive" className="text-[9px] px-1.5 py-0">Low</Badge>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    {product.rarity && <Badge rarity={product.rarity} className="text-[10px]">{product.rarity}</Badge>}
                  </td>
                  <td className="p-4">
                    <Badge variant={product.inStock ? 'success' : 'destructive'} className="text-[10px]">
                      {product.inStock ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Link href={`/product/${product.slug}`}>
                        <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-electric transition-all">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </Link>
                      <Link href={`/admin/products/edit?id=${product.id}`}>
                        <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-electric transition-all">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      </Link>
                      <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-red-400 transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white/60 transition-all">
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
