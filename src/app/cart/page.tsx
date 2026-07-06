'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Trash2, ArrowLeft, Minus, Plus, Shield, Zap } from 'lucide-react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  category: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <main className="pt-24 md:pt-28 pb-16 min-h-screen">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center py-20 max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <ShoppingCart className="w-10 h-10 text-white/20" />
              </div>
              <h1 className="text-3xl font-heading font-black text-white mb-3">Your Cart is Empty</h1>
              <p className="text-white/40 mb-8">
                Looks like you haven&apos;t added anything yet. Browse our store and find something awesome!
              </p>
              <Link href="/shop">
                <Button size="xl" className="gap-2 shadow-[0_0_30px_rgba(0,163,255,0.3)]">
                  <ArrowLeft className="w-5 h-5" />
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="pt-24 md:pt-28 pb-16 min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-5xl font-heading font-black text-white">
                Shopping{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-neon-cyan glow-text">
                  Cart
                </span>
              </h1>
              <p className="text-white/50 mt-2">{itemCount} items in your cart</p>
            </div>
            <Link href="/shop">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-dark-100 border border-white/5 flex items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-electric/10 to-neon-purple/10 border border-white/5 flex items-center justify-center shrink-0">
                    <ShoppingCart className="w-6 h-6 text-electric/60" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-electric/60 mb-0.5">{item.category}</p>
                    <h3 className="font-bold text-white">{item.name}</h3>
                    <p className="text-lg font-black text-electric">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="w-8 h-8">
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center font-bold text-white">{item.quantity}</span>
                    <Button variant="outline" size="icon" className="w-8 h-8">
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="p-6 rounded-2xl bg-dark-100 border border-white/5 sticky top-28">
                <h3 className="text-lg font-bold text-white mb-4">Order Summary</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-white/60">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-white/60">
                    <span>Delivery</span>
                    <span className="text-electric font-bold">Free</span>
                  </div>
                  <div className="h-px bg-white/5" />
                  <div className="flex justify-between text-lg">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-electric font-black">${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button size="xl" className="w-full gap-2 text-base shadow-[0_0_30px_rgba(0,163,255,0.3)] mb-3">
                    Proceed to Checkout
                  </Button>
                </Link>

                <div className="flex items-center justify-center gap-4 text-xs text-white/30 pt-2">
                  <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Secure</span>
                  <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Instant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
