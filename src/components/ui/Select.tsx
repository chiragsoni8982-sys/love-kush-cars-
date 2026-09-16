import type { SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
  placeholder?: string
  labelClassName?: string
}

export function Select({ label, options, placeholder, className, labelClassName, id, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className={cn('text-xs font-medium uppercase tracking-wide text-slate', labelClassName)}>
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          className={cn(
            'w-full appearance-none border border-line bg-paper px-4 py-3 pr-10 text-sm text-ink',
            'focus:outline-none focus:border-ink transition-colors',
            className,
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate" />
      </div>
    </div>
  )
}
