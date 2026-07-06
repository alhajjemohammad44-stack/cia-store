import Link from 'next/link'
import { Zap, Heart, MessageCircle, Shield, Truck } from 'lucide-react'

const footerLinks = {
  shop: {
    title: 'Shop',
    links: [
      { label: 'All Products', href: '/shop' },
      { label: 'Blox Fruits', href: '/shop?category=bloxfruit' },
      { label: 'Robux', href: '/shop?category=robux' },
      { label: 'Accounts', href: '/shop?category=accounts' },
      { label: 'Gamepasses', href: '/shop?category=gamepasses' },
    ],
  },
  support: {
    title: 'Support',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Delivery Info', href: '/delivery' },
      { label: 'Refund Policy', href: '/refund' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Reviews', href: '/reviews' },
    ],
  },
}

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-dark-200">
      <div className="absolute inset-0 bg-gradient-to-t from-electric/[0.02] to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Features Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 md:mb-16">
          {[
            { icon: Zap, label: 'Instant Delivery', sub: 'Within minutes' },
            { icon: Shield, label: '100% Secure', sub: 'Gold guarantee' },
            { icon: MessageCircle, label: '24/7 Support', sub: 'Always online' },
            { icon: Truck, label: 'Best Prices', sub: 'Price match' },
          ].map((feat) => (
            <div
              key={feat.label}
              className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5"
            >
              <div className="p-2 rounded-lg bg-electric/10">
                <feat.icon className="w-4 h-4 text-electric" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">{feat.label}</div>
                <div className="text-xs text-white/40">{feat.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-electric/20 border border-electric/30 flex items-center justify-center">
                <Zap className="w-4 h-4 text-electric" />
              </div>
              <span className="text-lg font-heading font-black text-white">
                CIA <span className="text-electric">STORE</span>
              </span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed mb-4">
              Premium gaming digital goods store. Fast delivery, best prices, 100% secure.
            </p>
            <div className="flex gap-2">
              <Link
                href="https://discord.gg/ciastore"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-discord/10 border border-discord/20 text-discord hover:bg-discord/20 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {Object.values(footerLinks).map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-bold text-white mb-3">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-electric transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} CIA Store. All rights reserved. Made with{' '}
            <Heart className="w-3 h-3 inline text-red-400" /> for gamers.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/30">
            <span>Accepted Payments:</span>
            <span className="text-white/50">Stripe</span>
            <span className="text-white/50">PayPal</span>
            <span className="text-white/50">USDT</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
