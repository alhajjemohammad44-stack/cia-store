import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-electric/10 text-electric border border-electric/20',
        secondary: 'bg-white/10 text-white/80 border border-white/10',
        destructive: 'bg-red-500/10 text-red-400 border border-red-500/20',
        success: 'bg-green-500/10 text-green-400 border border-green-500/20',
        warning: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
        purple: 'bg-neon-purple/10 text-neon-purple border border-neon-purple/20',
        pink: 'bg-neon-pink/10 text-neon-pink border border-neon-pink/20',
        cyan: 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20',
      },
      rarity: {
        Common: 'bg-white/10 text-white/70 border border-white/10',
        Uncommon: 'bg-green-500/10 text-green-400 border border-green-500/20',
        Rare: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
        Epic: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
        Legendary: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
        Mythical: 'bg-pink-500/10 text-pink-400 border border-pink-500/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, rarity, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, rarity }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
