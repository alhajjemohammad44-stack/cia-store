'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import { Search, X, Zap, Package, TrendingUp, Clock } from 'lucide-react'
import { products } from '@/data/products'
import { Badge } from '@/components/ui/badge'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        if (isOpen) onClose()
        else onClose() // toggle actually
      }
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.features.some((f) => f.toLowerCase().includes(q))
      )
      .slice(0, 8)
  }, [query])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl mx-4 bg-dark-100 border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden animate-slide-up">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-white/5">
          <Search className="w-5 h-5 text-white/30 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, categories, features..."
            className="flex-1 bg-transparent text-white placeholder:text-white/30 focus:outline-none text-lg"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-white/30 hover:text-white/60">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden md:inline-flex px-2 py-0.5 text-xs text-white/30 bg-dark border border-white/5 rounded-md">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {query.trim() && results.length === 0 && (
            <div className="p-8 text-center">
              <Package className="w-10 h-10 text-white/10 mx-auto mb-3" />
              <p className="text-white/40 font-medium">No products found</p>
              <p className="text-white/20 text-sm mt-1">Try a different search term</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="p-2">
              <p className="px-3 py-2 text-xs text-white/30 font-medium">
                {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
              </p>
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric/10 to-neon-purple/10 border border-white/5 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-electric/60" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white group-hover:text-electric transition-colors truncate">
                        {product.name}
                      </h4>
                      {product.rarity && (
                        <Badge rarity={product.rarity} className="text-[10px] px-1.5 py-0">{product.rarity}</Badge>
                      )}
                    </div>
                    <p className="text-xs text-white/40 truncate">{product.category} — {product.description.slice(0, 60)}...</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-black text-electric">${product.price.toFixed(2)}</div>
                    {product.originalPrice && (
                      <div className="text-xs text-white/30 line-through">${product.originalPrice.toFixed(2)}</div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!query.trim() && (
            <div className="p-4">
              <p className="px-3 py-2 text-xs text-white/30 font-medium flex items-center gap-2">
                <TrendingUp className="w-3 h-3" />
                Trending Products
              </p>
              <div className="grid grid-cols-2 gap-2">
                {products.slice(0, 4).map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="p-3 rounded-xl bg-dark border border-white/5 hover:border-electric/20 transition-all"
                  >
                    <p className="text-sm font-medium text-white truncate">{product.name}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-white/40">{product.category}</span>
                      <span className="text-xs font-bold text-electric">${product.price.toFixed(2)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/5 flex items-center gap-4 text-xs text-white/20">
          <span>⌘K to open</span>
          <span>↑↓ to navigate</span>
          <span>Enter to select</span>
          <span>Esc to close</span>
        </div>
      </div>
    </div>
  )
}
