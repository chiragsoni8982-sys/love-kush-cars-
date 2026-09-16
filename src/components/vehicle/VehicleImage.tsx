import { Camera } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VehicleImageProps {
  tone: string
  src?: string
  brand: string
  model: string
  className?: string
  fit?: 'cover' | 'contain'
  showBackdrop?: boolean
}

/**
 * Renders actual vehicle photography if src is provided,
 * or an ultra-clean luxury tonal preview card.
 */
export function VehicleImage({
  tone,
  src,
  brand,
  model,
  className,
  fit = 'cover',
  showBackdrop = true,
}: VehicleImageProps) {
  if (src) {
    return (
      <div
        className={cn(
          'relative overflow-hidden flex items-center justify-center',
          fit === 'contain' ? 'bg-[#0a0a0a]' : 'bg-ink',
          className,
        )}
      >
        {fit === 'contain' && showBackdrop && (
          <img
            src={src}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover blur-2xl opacity-25 scale-110 pointer-events-none"
          />
        )}
        <img
          src={src}
          alt={`${brand} ${model}`}
          className={cn(
            'transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]',
            fit === 'contain'
              ? 'relative z-10 max-h-full max-w-full object-contain m-auto select-none'
              : 'h-full w-full object-cover group-hover:scale-105',
          )}
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <div
      className={cn('relative flex items-center justify-center overflow-hidden', className)}
      style={{ background: `linear-gradient(135deg, ${tone} 0%, #060606 100%)` }}
    >
      <div className="text-center px-4">
        <Camera className="mx-auto h-6 w-6 text-white/30 mb-2" strokeWidth={1.5} />
        <p className="text-white/40 text-[11px] uppercase tracking-widest font-medium">
          {brand} {model}
        </p>
      </div>
    </div>
  )
}
