'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ProductCard } from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { products, categories } from '@/data/products'
import { Search, SlidersHorizontal, X, Grid3X3, List } from 'lucide-react'

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name' | 'default'>('default')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Get unique subcategories from products
  const subCategories = useMemo(() => {
    const subs = new Set(products.filter(p => p.subCategory).map(p => p.subCategory!))
    return Array.from(subs)
  }, [])

  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(p => p.categorySlug === selectedCategory)
    }

    if (selectedSubCategory) {
      filtered = filtered.filter(p => p.subCategory === selectedSubCategory)
    }

    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return filtered
  }, [searchQuery, selectedCategory, selectedSubCategory, sortBy])

  const activeFilters = [selectedCategory, selectedSubCategory].filter(Boolean).length

  return (
    <>
      <Header />
      <main className="pt-24 md:pt-28 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-5xl font-heading font-black text-white mb-3">
              Products{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-neon-cyan glow-text">
                Store
              </span>
            </h1>
            <p className="text-white/50 max-w-xl">
              Browse our collection of premium gaming digital goods. Fast delivery, best prices.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-11 pr-4 rounded-xl bg-dark-100 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-electric/50 focus:shadow-[0_0_20px_rgba(0,163,255,0.1)] transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="whitespace-nowrap"
              >
                All
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat.slug}
                  variant={selectedCategory === cat.slug ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.slug === selectedCategory ? null : cat.slug)}
                  className="whitespace-nowrap"
                >
                  {cat.name}
                </Button>
              ))}
            </div>

            {/* Sort & View */}
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="h-12 px-4 rounded-xl bg-dark-100 border border-white/10 text-white/70 text-sm focus:outline-none focus:border-electric/50"
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              >
                {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {activeFilters > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs text-white/40">Active filters:</span>
              {selectedCategory && (
                <Badge variant="default" className="gap-1.5">
                  {categories.find(c => c.slug === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory(null)}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {selectedSubCategory && (
                <Badge variant="secondary" className="gap-1.5">
                  {selectedSubCategory}
                  <button onClick={() => setSelectedSubCategory(null)}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              <button
                onClick={() => {
                  setSelectedCategory(null)
                  setSelectedSubCategory(null)
                  setSearchQuery('')
                }}
                className="text-xs text-electric hover:text-electric-400 transition-colors"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Results count */}
          <p className="text-sm text-white/30 mb-6">
            Showing {filteredProducts.length} of {products.length} products
          </p>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'
                  : 'space-y-4'
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-white/20" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">No products found</h3>
              <p className="text-white/40 text-sm">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
