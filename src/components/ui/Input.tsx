import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ label, className, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-medium uppercase tracking-wide text-slate">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'w-full border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-slate/50',
          'focus:outline-none focus:border-ink transition-colors',
          className,
        )}
        {...props}
      />
    </div>
  )
}
