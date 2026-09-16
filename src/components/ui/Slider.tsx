import { cn } from '@/lib/utils'

interface SliderProps {
  label?: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (value: number) => void
  formatValue?: (value: number) => string
  className?: string
}

export function Slider({ label, value, min, max, step = 1, onChange, formatValue, className }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wide text-slate">{label}</span>
          <span className="text-sm font-semibold text-ink">{formatValue ? formatValue(value) : value}</span>
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 appearance-none cursor-pointer bg-line accent-ink"
        style={{
          background: `linear-gradient(to right, #111111 ${pct}%, #e4e4e4 ${pct}%)`,
        }}
      />
    </div>
  )
}
