'use client'

import { useState } from 'react'
// @ts-ignore - useParams available in Next.js 13.2+ app router at runtime
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getProductBySlug, products } from '@/data/products'
import { ShoppingCart, Shield, Zap, Clock, ArrowLeft, Star, Check, Package, Minus, Plus, Copy, Info } from 'lucide-react'

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = getProductBySlug(slug)

  if (!product) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 md:px-6 text-center py-16">
            <h1 className="text-3xl font-heading font-bold text-white mb-4">Product Not Found</h1>
            <p className="text-white/50 mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/shop">
              <Button>Back to Shop</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const [selectedOption, setSelectedOption] = useState(0)
  const [playerId, setPlayerId] = useState('')
  const [quantity, setQuantity] = useState(1)

  const priceOptions = [
    { label: 'Standard', price: product.price, desc: 'Standard delivery' },
    { label: 'Express', price: product.price * 1.5, desc: 'Priority delivery (under 5 min)' },
  ]

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  const relatedProducts = products
    .filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4)

  return (
    <>
      <Header />
      <main className="pt-24 md:pt-28 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/30 mb-6">
            <Link href="/" className="hover:text-electric transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-electric transition-colors">Shop</Link>
            <span>/</span>
            <Link href={`/shop?category=${product.categorySlug}`} className="hover:text-electric transition-colors">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-white/50">{product.name}</span>
          </div>

          {/* Product Detail */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-16">
            {/* Image */}
            <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-dark-50 to-dark border border-white/5 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-2xl bg-electric/20 border border-electric/30 flex items-center justify-center mb-4">
                    <Package className="w-12 h-12 text-electric" />
                  </div>
                  <p className="text-white/30 text-sm">{product.name}</p>
                </div>
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.rarity && <Badge rarity={product.rarity} className="text-sm px-3 py-1">{product.rarity}</Badge>}
                {discount > 0 && <Badge variant="destructive" className="text-sm px-3 py-1">-{discount}% OFF</Badge>}
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-electric font-medium mb-2">{product.category} {product.subCategory && `• ${product.subCategory}`}</p>
                <h1 className="text-3xl md:text-5xl font-heading font-black text-white leading-tight mb-3">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4">
                  <span className="text-3xl md:text-4xl font-black text-electric glow-text">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-white/30 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <Badge variant={product.inStock ? 'success' : 'destructive'}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </Badge>
                </div>
              </div>

              <p className="text-white/60 leading-relaxed">
                {product.description}
              </p>

              {/* Price Options */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white/70 uppercase tracking-wider">Delivery Options</h3>
                <div className="grid grid-cols-2 gap-2">
                  {priceOptions.map((option, i) => (
                    <button
                      key={option.label}
                      onClick={() => setSelectedOption(i)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        selectedOption === i
                          ? 'border-electric bg-electric/10'
                          : 'border-white/10 bg-dark hover:border-white/20'
                      }`}
                    >
                      <div className={`text-sm font-bold ${
                        selectedOption === i ? 'text-electric' : 'text-white'
                      }`}>{option.label}</div>
                      <div className={`text-lg font-black mt-1 ${
                        selectedOption === i ? 'text-electric' : 'text-white'
                      }`}>${option.price.toFixed(2)}</div>
                      <div className="text-xs text-white/40 mt-0.5">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Player ID Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-sm font-bold text-white/70 uppercase tracking-wider">
                  In-Game Username / Player ID
                  <div className="relative group">
                    <Info className="w-3 h-3 text-white/30" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-dark-100 border border-white/10 rounded-lg text-xs text-white/60 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      Enter your exact in-game username for delivery
                    </div>
                  </div>
                </label>
                <input
                  type="text"
                  value={playerId}
                  onChange={(e) => setPlayerId(e.target.value)}
                  placeholder="Enter your Roblox/Game username"
                  className="w-full h-12 px-4 rounded-xl bg-dark border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-electric/50 transition-all"
                />
                <p className="text-xs text-white/30">⚠️ Double-check your username. Delivery cannot be changed after order placement.</p>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-white/70 uppercase tracking-wider">Quantity</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-9 h-9"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-10 text-center font-bold text-white text-lg">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-9 h-9"
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
                <span className="text-xs text-white/30">{product.stockCount} available</span>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white/70 uppercase tracking-wider">What&apos;s Included</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-sm text-white/60">
                      <Check className="w-4 h-4 text-electric" />
                      {feat}
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Info */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-dark-100 border border-white/5">
                {[
                  { icon: Zap, label: 'Instant', sub: 'Delivery' },
                  { icon: Shield, label: '100%', sub: 'Secure' },
                  { icon: Clock, label: '24/7', sub: 'Support' },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <item.icon className="w-5 h-5 text-electric mx-auto mb-1" />
                    <div className="text-sm font-bold text-white">{item.label}</div>
                    <div className="text-xs text-white/40">{item.sub}</div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button size="xl" className="flex-1 gap-2 text-base shadow-[0_0_30px_rgba(0,163,255,0.3)]">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </Button>
                <Button size="xl" variant="outline" className="px-6">
                  Buy Now
                </Button>
              </div>

              {/* Security badges */}
              <div className="flex items-center gap-4 text-xs text-white/30 pt-2">
                <span>🔒 Secure checkout</span>
                <span>💳 Stripe • PayPal • USDT</span>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-6">
                Related Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {relatedProducts.map((p) => (
                  <Link key={p.id} href={`/product/${p.slug}`} className="group">
                    <div className="p-5 rounded-2xl bg-dark-100 border border-white/5 hover:border-electric/30 transition-all">
                      <div className="w-12 h-12 rounded-xl bg-electric/10 border border-electric/20 flex items-center justify-center mb-3">
                        <Package className="w-6 h-6 text-electric" />
                      </div>
                      <h3 className="font-bold text-white group-hover:text-electric transition-colors mb-1">
                        {p.name}
                      </h3>
                      <p className="text-sm text-white/40 line-clamp-2 mb-3">{p.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-black text-white">${p.price.toFixed(2)}</span>
                        {p.originalPrice && (
                          <span className="text-xs text-white/30 line-through">${p.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
