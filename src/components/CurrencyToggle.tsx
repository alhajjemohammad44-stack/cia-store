'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const currencies = [
  { code: 'USD', symbol: '$', label: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', label: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', label: 'British Pound', flag: '🇬🇧' },
  { code: 'SAR', symbol: '﷼', label: 'Saudi Riyal', flag: '🇸🇦' },
  { code: 'AED', symbol: 'د.إ', label: 'UAE Dirham', flag: '🇦🇪' },
  { code: 'EGP', symbol: 'E£', label: 'Egyptian Pound', flag: '🇪🇬' },
]

const exchangeRates: Record<string, number> = {
  USD: 1,
  EUR: 0.87,
  GBP: 0.75,
  SAR: 3.75,
  AED: 3.67,
  EGP: 49.12,
}

export function CurrencyToggle() {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(currencies[0])

  const convertPrice = (usdPrice: number): string => {
    const rate = exchangeRates[selected.code] || 1
    return (usdPrice * rate).toFixed(2)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all"
      >
        <span className="text-base">{selected.flag}</span>
        <span className="font-medium">{selected.symbol}{selected.code}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-56 bg-dark-100 border border-white/10 rounded-xl shadow-2xl shadow-black/50 z-50 overflow-hidden animate-fade-in">
            {currencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => {
                  setSelected(currency)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all hover:bg-white/5 ${
                  selected.code === currency.code
                    ? 'text-electric bg-electric/5'
                    : 'text-white/60'
                }`}
              >
                <span className="text-lg">{currency.flag}</span>
                <div className="text-left">
                  <div className="font-medium">{currency.label}</div>
                  <div className="text-xs text-white/30">{currency.symbol}1 = {currency.code}</div>
                </div>
                {selected.code === currency.code && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-electric" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
