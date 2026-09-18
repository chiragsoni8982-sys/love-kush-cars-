import { useState, useEffect } from 'react'
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
 * with automatic fallback to luxury tonal preview if image fails or 404s.
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
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setHasError(false)
  }, [src])

  const safeTone = tone && tone.startsWith('#') ? tone : '#1a1a1a'

  if (src && !hasError) {
    return (
      <div
        className={cn(
          'relative overflow-hidden flex items-center justify-center bg-neutral-900',
          fit === 'contain' ? 'bg-[#0a0a0a]' : 'bg-neutral-900',
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
          decoding="async"
          className={cn(
            'transition-transform duration-500 ease-out',
            fit === 'contain'
              ? 'relative z-10 max-h-full max-w-full object-contain m-auto select-none'
              : 'h-full w-full object-cover object-center group-hover:scale-105',
          )}
          onError={() => setHasError(true)}
        />
      </div>
    )
  }

  return (
    <div
      className={cn('relative flex items-center justify-center overflow-hidden', className)}
      style={{ background: `linear-gradient(135deg, ${safeTone} 0%, #060606 100%)` }}
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

