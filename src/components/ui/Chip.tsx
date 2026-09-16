import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChipProps {
  children: ReactNode
  active?: boolean
  onClick?: () => void
  onRemove?: () => void
  className?: string
}

export function Chip({ children, active, onClick, onRemove, className }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 border px-3.5 py-2 text-xs font-medium transition-colors',
        active ? 'bg-ink text-paper border-ink' : 'bg-paper text-ink border-line hover:border-ink',
        className,
      )}
    >
      {children}
      {onRemove && (
        <span
          role="button"
          tabIndex={-1}
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="ml-0.5"
        >
          <X className="h-3 w-3" />
        </span>
      )}
    </button>
  )
}
