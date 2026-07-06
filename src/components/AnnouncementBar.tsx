'use client'

import { useState } from 'react'
import { X, Sparkles, Zap } from 'lucide-react'

interface AnnouncementBarProps {
  message?: string
  type?: 'info' | 'deal' | 'warning'
}

export function AnnouncementBar({
  message = '🔥 Welcome to CIA Store! Use code FIRST10 for 10% off your first order!',
  type = 'deal',
}: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const variants = {
    info: 'bg-electric/10 border-electric/20 text-electric',
    deal: 'bg-gradient-to-r from-orange-500/10 via-pink-500/10 to-purple-500/10 border-orange-500/20 text-orange-300',
    warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300',
  }

  const icons = {
    info: Zap,
    deal: Sparkles,
    warning: Zap,
  }

  const Icon = icons[type]

  return (
    <div className={`relative ${variants[type]} border-b`}>
      <div className="container mx-auto px-4 md:px-6 py-2.5 flex items-center justify-center gap-2 text-sm font-medium">
        <Icon className="w-4 h-4" />
        <span className="truncate">{message}</span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-current opacity-50 hover:opacity-100 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
