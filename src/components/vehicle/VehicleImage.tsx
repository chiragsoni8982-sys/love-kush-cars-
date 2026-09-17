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
  const [isLoaded, setIsLoaded] = useState(false)

  // Reset states when the image source changes
  useEffect(() => {
    setHasError(false)
    setIsLoaded(false)
  }, [src])

  const safeTone = tone && tone.startsWith('#') ? tone : '#1a1a1a'

  if (src && !hasError) {
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
            'transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]',
            !isLoaded && 'opacity-0',
            isLoaded && 'opacity-100',
            fit === 'contain'
              ? 'relative z-10 max-h-full max-w-full object-contain m-auto select-none'
              : 'h-full w-full object-cover group-hover:scale-105',
          )}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
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

