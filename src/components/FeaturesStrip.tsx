'use client'

import { Zap, Shield, Clock, Users, Sparkles, Gem } from 'lucide-react'

const features = [
  {
    icon: Zap,
    label: 'Instant Delivery',
    desc: 'Automated delivery within minutes',
    color: 'from-electric to-neon-cyan',
  },
  {
    icon: Shield,
    label: '100% Secure',
    desc: 'Gold guarantee on all purchases',
    color: 'from-green-400 to-emerald-500',
  },
  {
    icon: Clock,
    label: '24/7 Support',
    desc: 'Always here to help you',
    color: 'from-neon-purple to-purple-500',
  },
  {
    icon: Users,
    label: 'Trusted Community',
    desc: 'Join 10,000+ happy customers',
    color: 'from-orange-400 to-pink-500',
  },
  {
    icon: Sparkles,
    label: 'Best Prices',
    desc: 'Cheaper than official stores',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    icon: Gem,
    label: 'Premium Quality',
    desc: 'Only verified and tested items',
    color: 'from-neon-cyan to-blue-500',
  },
]

export function FeaturesStrip() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {features.map((feature) => (
            <div
              key={feature.label}
              className="group p-4 md:p-5 rounded-2xl bg-dark-100 border border-white/5 hover:border-white/10 transition-all text-center"
            >
              <div className="w-11 h-11 mx-auto rounded-xl bg-gradient-to-br opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center mb-3"
                style={{ backgroundImage: `linear-gradient(135deg, ${feature.color.replace('from-', '').split(' ')[0]}, ${feature.color.replace('to-', '').split(' ')[0]})` }}
              >
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-sm font-bold text-white mb-0.5">{feature.label}</h4>
              <p className="text-xs text-white/40">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
