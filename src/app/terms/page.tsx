'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-24 md:pt-28 pb-16 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-heading font-black text-white mb-6">
            Terms of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-neon-cyan glow-text">Service</span>
          </h1>
          <div className="prose prose-invert prose-sm max-w-none space-y-6 text-white/60">
            <p className="text-lg text-white/80">Last updated: January 2026</p>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
              <p>By accessing or using CIA Store (&ldquo;the Store&rdquo;), you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">2. Description of Services</h2>
              <p>CIA Store provides digital gaming goods including but not limited to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>In-game currency and items</li>
                <li>Game accounts</li>
                <li>Gamepasses and upgrades</li>
                <li>Maps and skins</li>
              </ul>
              <p>All items are digital and non-tangible. No physical goods are sold.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">3. User Accounts</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>You must provide accurate information when creating an account</li>
                <li>You are responsible for maintaining the confidentiality of your account</li>
                <li>You must be at least 13 years old to use our services</li>
                <li>We reserve the right to suspend accounts that violate our terms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">4. Payment Terms</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>All prices are in USD unless otherwise stated</li>
                <li>Payments are processed securely by Stripe, PayPal, or USDT</li>
                <li>Prices are subject to change without notice</li>
                <li>Refunds are handled according to our Refund Policy</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">5. Delivery Policy</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Digital goods are delivered within minutes to a few hours</li>
                <li>Delivery times vary by product type</li>
                <li>You must provide accurate in-game usernames for delivery</li>
                <li>CIA Store is not responsible for incorrect usernames provided</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">6. Refund Policy</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Full refund if order is not delivered within 24 hours</li>
                <li>Store credit or exchange for delivered items with issues</li>
                <li>Refund requests must be made within 48 hours of purchase</li>
                <li>We reserve the right to refuse refunds for abuse</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">7. Prohibited Activities</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Chargeback fraud</li>
                <li>Using stolen payment methods</li>
                <li>Attempting to exploit or hack our systems</li>
                <li>Harassing our staff or other customers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">8. Limitation of Liability</h2>
              <p>CIA Store is not liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability is limited to the amount paid for the specific product in question.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">9. Changes to Terms</h2>
              <p>We reserve the right to modify these terms at any time. Users will be notified of significant changes via email or site announcement.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">10. Contact</h2>
              <p>For questions about these terms, contact us at <span className="text-electric">legal@ciastore.com</span></p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
