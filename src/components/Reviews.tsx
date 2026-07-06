'use client'

import { Star, MessageCircle } from 'lucide-react'

const reviews = [
  {
    id: 1,
    name: 'XxShadowxX',
    avatar: 'S',
    rating: 5,
    comment: 'Best store on the market! Got my Dragon Fruit in under 5 minutes. Insane service!',
    date: '2 days ago',
    product: 'Dragon Fruit',
  },
  {
    id: 2,
    name: 'ProGamer99',
    avatar: 'P',
    rating: 5,
    comment: 'Been buying here for months. Always reliable, best prices, and support is super fast.',
    date: '1 week ago',
    product: '1700 Robux',
  },
  {
    id: 3,
    name: 'BloxKing',
    avatar: 'B',
    rating: 5,
    comment: 'The Max Account I bought was stacked. All fighting styles maxed, tons of beli. Worth every penny.',
    date: '2 weeks ago',
    product: 'Blox Fruit Max Account',
  },
  {
    id: 4,
    name: 'NinjaPro',
    avatar: 'N',
    rating: 5,
    comment: 'Fast delivery even at 3AM! These guys never sleep. Highly recommend.',
    date: '3 weeks ago',
    product: 'Venom Permanent',
  },
]

export function Reviews() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold mb-4">
            <Star className="w-3.5 h-3.5" />
            Trusted by Gamers
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-white leading-tight">
            What Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-neon-cyan glow-text">
              Customers Say
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-5 rounded-2xl bg-dark-100 border border-white/5 hover:border-electric/20 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric to-neon-purple flex items-center justify-center text-sm font-bold text-white">
                  {review.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{review.name}</div>
                  <div className="text-xs text-white/30">{review.date}</div>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < review.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-white/10'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-white/60 leading-relaxed mb-3">
                &ldquo;{review.comment}&rdquo;
              </p>
              <span className="text-xs text-electric/60">{review.product}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
