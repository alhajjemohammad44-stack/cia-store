'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-24 md:pt-28 pb-16 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-heading font-black text-white mb-6">
            Privacy{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-neon-cyan glow-text">Policy</span>
          </h1>
          <div className="prose prose-invert prose-sm max-w-none space-y-6 text-white/60">
            <p className="text-lg text-white/80">Last updated: January 2026</p>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
              <p>When you use CIA Store, we may collect the following information:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Email address and account credentials</li>
                <li>In-game usernames for order delivery</li>
                <li>Payment information (processed securely by Stripe/PayPal)</li>
                <li>Order history and preferences</li>
                <li>Device and browser information for analytics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">2. How We Use Your Information</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>To process and deliver your orders</li>
                <li>To communicate with you about your orders</li>
                <li>To improve our products and services</li>
                <li>To prevent fraud and ensure security</li>
                <li>To send promotional offers (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">3. Data Protection</h2>
              <p>We implement industry-standard security measures including:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>256-bit SSL encryption for all data transmission</li>
                <li>Encrypted password storage using SHA-256</li>
                <li>PCI-compliant payment processing via Stripe/PayPal</li>
                <li>Regular security audits and monitoring</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">4. Third-Party Services</h2>
              <p>We use the following third-party services:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Stripe — Payment processing</li>
                <li>PayPal — Payment processing</li>
                <li>Cloudflare — CDN and hosting</li>
                <li>Resend — Email delivery</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Access your personal data</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
                <li>Export your order history</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">6. Contact</h2>
              <p>For privacy-related inquiries, contact us at <span className="text-electric">privacy@ciastore.com</span></p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
