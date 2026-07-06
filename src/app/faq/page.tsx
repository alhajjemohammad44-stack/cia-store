'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ChevronDown, Search } from 'lucide-react'

const faqs = [
  {
    q: 'How long does delivery take?',
    a: 'Most orders are delivered within minutes. For items that require trade (like Blox Fruits), delivery is typically within 5-30 minutes. In rare cases, it may take up to a few hours. Our team works 24/7 to ensure the fastest possible delivery.',
  },
  {
    q: 'Is it safe to buy from CIA Store?',
    a: 'Absolutely! We use official trading methods (Trade, Gift, Group Funds) that are 100% safe and approved by Roblox. We have a gold guarantee: if anything happens to your account due to our products, we will replace or refund it.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept Stripe (credit/debit cards), PayPal, and USDT (BEP20). All payments are processed securely through encrypted channels. Your payment information is never stored on our servers.',
  },
  {
    q: 'Do I need to be a certain level to receive items?',
    a: 'For Blox Fruits trades, you need to be level 700+ to trade in the Second Sea. For permanent fruits (Perms), delivery via gift has no level requirement. Robux and gamepasses have no level restrictions.',
  },
  {
    q: 'What is your refund policy?',
    a: 'We offer a full refund if the product has not been delivered within 24 hours. For delivered items, we provide exchanges or store credit in case of issues. Please contact our support team within 48 hours of purchase.',
  },
  {
    q: 'How do I receive my Robux?',
    a: 'Robux is delivered via the Group Funds method, which is the safest way to transfer Robux. We add you to our group and the Robux is deposited directly into your account. Alternatively, we can use Gamepass or Gift methods.',
  },
  {
    q: 'Can I buy products for someone else?',
    a: 'Yes! Just enter their username during checkout. For gifts, we can deliver directly to their account. Make sure you have the correct username as we cannot change it after the order is placed.',
  },
  {
    q: 'What if I enter the wrong username?',
    a: 'Contact us immediately! If the order hasn\'t been processed yet, we can update the username. If it\'s already been delivered, unfortunately we cannot reverse it. Always double-check your username before purchasing.',
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFaqs = searchQuery
    ? faqs.filter(f => f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase()))
    : faqs

  return (
    <>
      <Header />
      <main className="pt-24 md:pt-28 pb-16 min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-5xl font-heading font-black text-white mb-3">
                Frequently Asked{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-neon-cyan glow-text">Questions</span>
              </h1>
              <p className="text-white/50">Everything you need to know about shopping at CIA Store</p>
            </div>

            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search FAQs..."
                className="w-full h-12 pl-11 pr-4 rounded-xl bg-dark-100 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-electric/50 transition-all"
              />
            </div>

            <div className="space-y-3">
              {filteredFaqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-dark-100 border border-white/5 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-bold text-white pr-4">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-white/30 shrink-0 transition-transform ${
                        openIndex === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="px-5 pb-5 text-white/50 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
