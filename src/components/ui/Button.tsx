import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'primary-inverse' | 'secondary-inverse' | 'ghost-inverse'
type Size = 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}

const base =
  'inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-wider transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] disabled:opacity-40 disabled:pointer-events-none whitespace-nowrap'

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-paper hover:bg-slate',
  'primary-inverse': 'bg-paper text-ink hover:bg-mist',
  secondary: 'bg-transparent text-ink border border-ink hover:bg-ink hover:text-paper',
  'secondary-inverse': 'bg-transparent text-paper border border-white/40 hover:bg-paper hover:text-ink',
  ghost: 'bg-transparent text-ink hover:bg-mist',
  'ghost-inverse': 'bg-transparent text-paper hover:bg-white/10',
}

const sizes: Record<Size, string> = {
  md: 'text-xs px-6 py-3',
  lg: 'text-sm px-8 py-4',
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </button>
  )
}
