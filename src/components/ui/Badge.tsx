import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps {
  children: ReactNode
  variant?: 'filled' | 'outline'
  className?: string
}

export function Badge({ children, variant = 'outline', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest',
        variant === 'filled' ? 'bg-ink text-paper' : 'bg-paper/90 text-ink border border-ink/20 backdrop-blur-sm',
        className,
      )}
    >
      {children}
    </span>
  )
}
