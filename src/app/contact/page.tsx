'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Mail, MessageCircle, HeadphonesIcon, Clock, Send, Check } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <>
      <Header />
      <main className="pt-24 md:pt-28 pb-16 min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-5xl font-heading font-black text-white mb-3">
                Contact{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-neon-cyan glow-text">Us</span>
              </h1>
              <p className="text-white/50 max-w-lg mx-auto">
                Got questions? We&apos;re here to help. Reach out to our support team.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {[
                  { icon: MessageCircle, label: 'Discord', value: '@ciastore', desc: 'Fastest response', color: 'text-discord', bg: 'bg-discord/10' },
                  { icon: Mail, label: 'Email', value: 'support@ciastore.com', desc: 'Response within 24h', color: 'text-electric', bg: 'bg-electric/10' },
                  { icon: HeadphonesIcon, label: 'Live Chat', value: 'Available 24/7', desc: 'Instant support', color: 'text-neon-cyan', bg: 'bg-neon-cyan/10' },
                  { icon: Clock, label: 'Response Time', value: 'Under 5 min', desc: 'During business hours', color: 'text-green-400', bg: 'bg-green-400/10' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 p-5 rounded-2xl bg-dark-100 border border-white/5">
                    <div className={`p-3 rounded-xl ${item.bg} ${item.color} shrink-0`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{item.label}</h3>
                      <p className={`text-sm font-medium ${item.color}`}>{item.value}</p>
                      <p className="text-xs text-white/40">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-dark-100 border border-white/5">
                <h3 className="text-lg font-bold text-white mb-4">Send us a message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-white/60 mb-1.5">Name</label>
                      <input type="text" className="w-full h-11 px-4 rounded-xl bg-dark border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-electric/50" placeholder="Your name" required />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-1.5">Email</label>
                      <input type="email" className="w-full h-11 px-4 rounded-xl bg-dark border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-electric/50" placeholder="your@email.com" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5">Subject</label>
                    <select className="w-full h-11 px-4 rounded-xl bg-dark border border-white/10 text-white focus:outline-none focus:border-electric/50">
                      <option>General Inquiry</option>
                      <option>Order Issue</option>
                      <option>Payment Problem</option>
                      <option>Delivery Question</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5">Message</label>
                    <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-dark border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-electric/50 resize-none" placeholder="How can we help you?" required />
                  </div>
                  <Button type="submit" className="w-full gap-2 shadow-[0_0_20px_rgba(0,163,255,0.3)]">
                    {submitted ? (
                      <><Check className="w-4 h-4" /> Message Sent!</>
                    ) : (
                      <><Send className="w-4 h-4" /> Send Message</>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
