'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CreditCard, Wallet, Bitcoin, Banknote, Shield, Check, X, Edit, Settings } from 'lucide-react'

const paymentMethods = [
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Credit/Debit cards, Apple Pay, Google Pay',
    icon: CreditCard,
    enabled: true,
    testMode: false,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    fields: [
      { key: 'Publishable Key', value: 'pk_live_********************', masked: true },
      { key: 'Secret Key', value: 'sk_live_********************', masked: true },
      { key: 'Webhook Secret', value: 'whsec_********************', masked: true },
    ],
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'PayPal Checkout, Venmo, PayLater',
    icon: Wallet,
    enabled: true,
    testMode: false,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    fields: [
      { key: 'Client ID', value: 'Ae********************', masked: true },
      { key: 'Client Secret', value: 'EN********************', masked: true },
      { key: 'Webhook ID', value: 'WH********************', masked: true },
    ],
  },
  {
    id: 'usdt',
    name: 'USDT (Crypto)',
    description: 'BEP20 USDT, automatic confirmation',
    icon: Bitcoin,
    enabled: true,
    testMode: false,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    fields: [
      { key: 'Wallet Address', value: '0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18', masked: false },
      { key: 'Network', value: 'BSC (BEP20)', masked: false },
      { key: 'Confirmation Blocks', value: '15', masked: false },
    ],
  },
  {
    id: 'manual',
    name: 'Bank Transfer',
    description: 'Manual bank transfer, admin confirmation',
    icon: Banknote,
    enabled: false,
    testMode: false,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    fields: [
      { key: 'Bank Name', value: 'Example Bank', masked: false },
      { key: 'Account Number', value: 'SA00 0000 0000 0000 0000 0000', masked: false },
      { key: 'IBAN', value: 'SA0000000000000000000000', masked: false },
    ],
  },
  {
    id: 'moyasar',
    name: 'Moyasar (Mada)',
    description: 'Saudi Mada cards, Apple Pay, STC Pay',
    icon: CreditCard,
    enabled: false,
    testMode: true,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    fields: [
      { key: 'Publishable Key', value: 'pk_test_********************', masked: true },
      { key: 'Secret Key', value: 'sk_test_********************', masked: true },
    ],
  },
]

export default function AdminPaymentMethodsPage() {
  const [methods, setMethods] = useState(paymentMethods)

  const toggleGateway = (id: string) => {
    setMethods(methods.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-black text-white">Payment Methods</h1>
        <p className="text-white/40 text-sm mt-1">Configure payment gateways for your store</p>
      </div>

      <div className="grid gap-4">
        {methods.map((method) => (
          <div key={method.id} className="p-6 rounded-2xl bg-dark-100 border border-white/5 hover:border-white/10 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${method.bg}`}>
                  <method.icon className={`w-6 h-6 ${method.color}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{method.name}</h3>
                    <Badge variant={method.enabled ? 'success' : 'destructive'} className="text-[10px]">
                      {method.enabled ? 'Active' : 'Disabled'}
                    </Badge>
                    {method.testMode && (
                      <Badge variant="warning" className="text-[10px]">Test Mode</Badge>
                    )}
                  </div>
                  <p className="text-sm text-white/50 mt-0.5">{method.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleGateway(method.id)}
                  className={`relative w-12 h-6 rounded-full transition-all ${method.enabled ? 'bg-electric' : 'bg-white/10'}`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${method.enabled ? 'right-0.5' : 'left-0.5'}`} />
                </button>
                <Button variant="ghost" size="icon">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              {method.fields.map((field) => (
                <div key={field.key} className="p-3 rounded-xl bg-dark border border-white/5">
                  <div className="text-[10px] text-white/30 uppercase tracking-wider mb-1">{field.key}</div>
                  <div className="text-sm text-white font-mono truncate">
                    {field.masked ? field.value : field.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Test Cards Info */}
      <div className="p-6 rounded-2xl bg-dark-100 border border-white/5">
        <h3 className="text-lg font-bold text-white mb-4">Test Cards (Stripe Test Mode)</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { brand: 'Visa', number: '4242 4242 4242 4242', cvv: '123', date: '12/28' },
            { brand: 'Mastercard', number: '5555 5555 5555 4444', cvv: '123', date: '12/28' },
            { brand: 'Mada', number: '5430 0000 0000 0000', cvv: '123', date: '12/28' },
          ].map(card => (
            <div key={card.brand} className="p-4 rounded-xl bg-dark border border-white/5">
              <div className="text-xs font-bold text-electric mb-2">{card.brand}</div>
              <div className="text-sm text-white font-mono">{card.number}</div>
              <div className="flex gap-3 mt-1 text-xs text-white/30">
                <span>CVV: {card.cvv}</span>
                <span>Exp: {card.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
