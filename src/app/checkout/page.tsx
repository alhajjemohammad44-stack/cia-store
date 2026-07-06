'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CreditCard, Wallet, Shield, ArrowLeft, Copy, Check } from 'lucide-react'

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal' | 'usdt'>('stripe')
  const [copied, setCopied] = useState(false)
  const usdtAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18'

  const copyToClipboard = () => {
    navigator.clipboard.writeText(usdtAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Header />
      <main className="pt-24 md:pt-28 pb-16 min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8">
            <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-electric transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Cart
            </Link>
            <h1 className="text-3xl md:text-5xl font-heading font-black text-white">
              Secure{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-neon-cyan glow-text">
                Checkout
              </span>
            </h1>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Main Checkout Form */}
            <div className="lg:col-span-3 space-y-6">
              {/* Contact Info */}
              <div className="p-6 rounded-2xl bg-dark-100 border border-white/5">
                <h3 className="text-lg font-bold text-white mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full h-12 px-4 rounded-xl bg-dark border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-electric/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5">In-Game Username</label>
                    <input
                      type="text"
                      placeholder="Your Roblox/Game username"
                      className="w-full h-12 px-4 rounded-xl bg-dark border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-electric/50 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="p-6 rounded-2xl bg-dark-100 border border-white/5">
                <h3 className="text-lg font-bold text-white mb-4">Payment Method</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'stripe', label: 'Card', icon: CreditCard, desc: 'Visa, MC, Amex' },
                    { id: 'paypal', label: 'PayPal', icon: Wallet, desc: 'Fast & Secure' },
                    { id: 'usdt', label: 'USDT', icon: Shield, desc: 'Crypto (BEP20)' },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={`p-4 rounded-xl border text-center transition-all ${
                        paymentMethod === method.id
                          ? 'border-electric bg-electric/10'
                          : 'border-white/10 bg-dark hover:border-white/20'
                      }`}
                    >
                      <method.icon className={`w-6 h-6 mx-auto mb-2 ${
                        paymentMethod === method.id ? 'text-electric' : 'text-white/40'
                      }`} />
                      <div className={`text-sm font-bold ${
                        paymentMethod === method.id ? 'text-electric' : 'text-white'
                      }`}>{method.label}</div>
                      <div className="text-xs text-white/40 mt-0.5">{method.desc}</div>
                    </button>
                  ))}
                </div>

                {/* USDT Instructions */}
                {paymentMethod === 'usdt' && (
                  <div className="mt-4 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                    <p className="text-sm text-yellow-400 font-bold mb-2">⚠️ Send exact amount in USDT (BEP20)</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-xs text-white/60 bg-dark px-3 py-2 rounded-lg truncate">
                        {usdtAddress}
                      </code>
                      <Button variant="outline" size="sm" onClick={copyToClipboard} className="gap-1">
                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copied ? 'Copied' : 'Copy'}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Stripe Card (placeholder) */}
                {paymentMethod === 'stripe' && (
                  <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="h-12 flex items-center px-4 rounded-lg bg-dark border border-white/10 text-white/30 text-sm">
                      Card details will be rendered here via Stripe Elements
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-2">
              <div className="p-6 rounded-2xl bg-dark-100 border border-white/5 sticky top-28">
                <h3 className="text-lg font-bold text-white mb-4">Order Summary</h3>

                <div className="space-y-3 mb-4">
                  {[].map((item: any) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-electric/10 flex items-center justify-center shrink-0">
                        <CreditCard className="w-4 h-4 text-electric" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{item.name}</p>
                        <p className="text-xs text-white/40">Qty: {item.qty}</p>
                      </div>
                      <span className="text-sm font-bold text-white">${item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center mb-6">
                  <p className="text-white/40 text-sm">Your cart is empty</p>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm text-white/60">
                    <span>Subtotal</span>
                    <span className="text-white font-bold">$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm text-white/60">
                    <span>Delivery</span>
                    <span className="text-electric font-bold">Free</span>
                  </div>
                  <div className="h-px bg-white/5" />
                  <div className="flex justify-between text-lg">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-electric font-black">$0.00</span>
                  </div>
                </div>

                <Button size="xl" className="w-full gap-2 text-base shadow-[0_0_30px_rgba(0,163,255,0.3)]" disabled>
                  Complete Payment
                </Button>

                <div className="flex items-center justify-center gap-4 text-xs text-white/30 mt-4">
                  <Shield className="w-3 h-3" />
                  <span>256-bit SSL encrypted</span>
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
