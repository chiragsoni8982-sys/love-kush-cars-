import { Link } from 'react-router-dom'
import { Heart, GitCompareArrows, Gauge, Fuel, Settings2, MapPin, ShieldCheck, ArrowRight, Phone } from 'lucide-react'
import type { Vehicle } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { VehicleImage } from './VehicleImage'
import { formatINR, formatKm, cn } from '@/lib/utils'
import { getWhatsAppUrl } from '@/lib/contact'
import { useWishlist } from '@/hooks/useWishlist'
import { useCompare } from '@/hooks/useCompare'

interface VehicleCardProps {
  vehicle: Vehicle
  compact?: boolean
  layout?: 'grid' | 'list'
}

export function VehicleCard({ vehicle, compact, layout = 'grid' }: VehicleCardProps) {
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { isComparing, toggleCompare } = useCompare()
  const wishlisted = isWishlisted(vehicle.id)
  const comparing = isComparing(vehicle.id)

  const isChittorgarh = vehicle.outletCity?.toLowerCase() === 'chittorgarh'

  const isSold = vehicle.status === 'sold' || vehicle.badges?.sold
  const isReserved = vehicle.status === 'reserved'

  const badgeLabel = isSold
    ? 'SOLD'
    : isReserved
      ? 'RESERVED'
      : vehicle.badges?.newArrival
        ? 'New Arrival'
        : vehicle.badges?.priceDrop
          ? 'Price Drop'
          : vehicle.badges?.certified
            ? 'Certified'
            : null

  if (layout === 'list') {
    return (
      <article
        className={cn(
          'group bg-paper border border-line transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
          'hover:shadow-elevated hover:border-ink/80 flex flex-col md:flex-row overflow-hidden',
        )}
      >
        {/* Left Side: Vehicle Image */}
        <div className="relative md:w-80 lg:w-96 shrink-0">
          <Link to={`/inventory/${vehicle.id}`} className="block h-full">
            <VehicleImage
              tone={vehicle.image}
              src={vehicle.photoUrl}
              brand={vehicle.brand}
              model={vehicle.model}
              className="h-56 md:h-full w-full object-cover min-h-[220px]"
            />
          </Link>
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
            {badgeLabel && <Badge variant="filled">{badgeLabel}</Badge>}
            {vehicle.outletCity && (
              <span
                className={cn(
                  'inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 shadow-sm uppercase tracking-wider',
                  isChittorgarh
                    ? 'bg-amber-500 text-ink font-bold ring-1 ring-amber-400'
                    : 'bg-paper/90 text-ink backdrop-blur-sm border border-line',
                )}
              >
                <MapPin className="h-2.5 w-2.5" />
                {vehicle.outletCity} Outlet
              </span>
            )}
          </div>
          <div className="absolute top-3 right-3 flex flex-col gap-1.5">
            <button
              aria-label="Add to wishlist"
              onClick={() => toggleWishlist(vehicle.id)}
              className="h-8 w-8 flex items-center justify-center bg-paper/90 backdrop-blur-sm hover:bg-paper transition-colors"
            >
              <Heart className={cn('h-3.5 w-3.5', wishlisted ? 'fill-ink text-ink' : 'text-ink')} />
            </button>
            <button
              aria-label={comparing ? 'Remove from compare' : 'Add to compare'}
              title={comparing ? 'Remove from compare' : 'Add to compare'}
              onClick={() => toggleCompare(vehicle.id, `${vehicle.year} ${vehicle.brand} ${vehicle.model}`)}
              className={cn(
                'h-8 w-8 flex items-center justify-center backdrop-blur-sm transition-all',
                comparing
                  ? 'bg-ink text-paper shadow-sm'
                  : 'bg-paper/90 text-ink/70 hover:bg-paper hover:text-ink',
              )}
            >
              <GitCompareArrows className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate bg-mist px-2 py-0.5 border border-line">
                    {vehicle.ownership} &bull; {vehicle.rtoCode} ({vehicle.rtoDistrict})
                  </span>
                  {vehicle.badges?.certified && (
                    <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200 flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" /> 200-Pt Verified
                    </span>
                  )}
                </div>
                <Link to={`/inventory/${vehicle.id}`}>
                  <h3 className="text-lg sm:text-xl font-bold leading-tight hover:underline underline-offset-2 font-[family-name:var(--font-display)]">
                    {vehicle.year} {vehicle.brand} {vehicle.model}
                  </h3>
                </Link>
                <p className="text-xs text-slate mt-0.5">{vehicle.variant}</p>
              </div>

              <div className="text-left sm:text-right mt-2 sm:mt-0">
                <p className="text-xl sm:text-2xl font-black font-[family-name:var(--font-display)] text-ink">
                  {formatINR(vehicle.price)}
                </p>
                <p className="text-xs text-slate">EMI from {formatINR(vehicle.emiFrom)}/mo</p>
              </div>
            </div>

            {/* Quick Specs Bar */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4 py-3 border-y border-line text-xs text-slate uppercase tracking-wide">
              <span className="flex items-center gap-1.5 font-medium">
                <Gauge className="h-3.5 w-3.5 text-ink" /> {formatKm(vehicle.kmDriven)}
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Fuel className="h-3.5 w-3.5 text-ink" /> {vehicle.fuelType}
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Settings2 className="h-3.5 w-3.5 text-ink" /> {vehicle.transmission}
              </span>
              <span className="text-slate/60 hidden sm:inline">&bull;</span>
              <span className="text-slate/80 text-[11px] hidden sm:inline">{vehicle.color}</span>
              <span className="text-slate/60 hidden sm:inline">&bull;</span>
              <span className="text-slate/80 text-[11px] hidden sm:inline">{vehicle.specifications.engine}</span>
            </div>

            {/* Features Tags */}
            {vehicle.features.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3.5">
                {vehicle.features.slice(0, 4).map((f) => (
                  <span
                    key={f}
                    className="text-[11px] bg-mist text-slate font-medium px-2 py-0.5 border border-line"
                  >
                    {f}
                  </span>
                ))}
                {vehicle.features.length > 4 && (
                  <span className="text-[11px] text-slate/70 font-semibold py-0.5">
                    +{vehicle.features.length - 4} more
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-4 border-t border-line">
            <div className="flex items-center gap-3">
              <Link
                to={`/finance?carId=${vehicle.id}&loanType=used-car-loan`}
                className="text-xs font-bold text-emerald-700 hover:underline uppercase tracking-tight bg-emerald-50 px-3 py-1.5 border border-emerald-200"
              >
                Instant Loan Eligibility &rarr;
              </Link>
              <a
                href={getWhatsAppUrl(`Hi Love Kush Cars, I am interested in the ${vehicle.year} ${vehicle.brand} ${vehicle.model} (${vehicle.variant}) listed for ${formatINR(vehicle.price)} at your ${vehicle.outletCity} showroom.`)}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-slate hover:text-ink inline-flex items-center gap-1"
              >
                <Phone className="h-3 w-3" /> Quick WhatsApp
              </a>
            </div>

            <Link
              to={`/inventory/${vehicle.id}`}
              className="inline-flex items-center gap-1.5 bg-ink text-paper text-xs font-bold uppercase tracking-wider px-4 py-2 hover:bg-slate transition-colors"
            >
              <span>Explore Car Details</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article
      className={cn(
        'group bg-paper border border-line transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
        'hover:shadow-elevated hover:-translate-y-1',
        compact ? 'w-72 shrink-0' : 'w-full',
      )}
    >
      <div className="relative">
        <Link to={`/inventory/${vehicle.id}`}>
          <VehicleImage
            tone={vehicle.image}
            src={vehicle.photoUrl}
            brand={vehicle.brand}
            model={vehicle.model}
            className={compact ? 'h-44' : 'h-56 sm:h-64'}
          />
        </Link>
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {badgeLabel && <Badge variant="filled">{badgeLabel}</Badge>}
          {vehicle.outletCity && (
            <span
              className={cn(
                'inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 shadow-sm uppercase tracking-wider',
                isChittorgarh
                  ? 'bg-amber-500 text-ink font-bold ring-1 ring-amber-400'
                  : 'bg-paper/90 text-ink backdrop-blur-sm border border-line',
              )}
            >
              <MapPin className="h-2.5 w-2.5" />
              {vehicle.outletCity} Outlet
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            aria-label="Add to wishlist"
            onClick={() => toggleWishlist(vehicle.id)}
            className="h-9 w-9 flex items-center justify-center bg-paper/90 backdrop-blur-sm hover:bg-paper transition-colors"
          >
            <Heart className={cn('h-4 w-4', wishlisted ? 'fill-ink text-ink' : 'text-ink')} />
          </button>
          <button
            aria-label={comparing ? 'Remove from compare' : 'Add to compare'}
            title={comparing ? 'Remove from compare' : 'Add to compare'}
            onClick={() => toggleCompare(vehicle.id, `${vehicle.year} ${vehicle.brand} ${vehicle.model}`)}
            className={cn(
              'h-9 w-9 flex items-center justify-center backdrop-blur-sm transition-all',
              comparing
                ? 'bg-ink text-paper shadow-sm'
                : 'bg-paper/90 text-ink/70 hover:bg-paper hover:text-ink',
            )}
          >
            <GitCompareArrows className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link to={`/inventory/${vehicle.id}`}>
              <h3 className="text-base font-semibold leading-tight hover:underline underline-offset-2">
                {vehicle.year} {vehicle.brand} {vehicle.model}
              </h3>
            </Link>
            <p className="text-xs text-slate mt-0.5">{vehicle.variant}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4 text-[11px] text-slate uppercase tracking-wide">
          <span className="flex items-center gap-1">
            <Gauge className="h-3.5 w-3.5" /> {formatKm(vehicle.kmDriven)}
          </span>
          <span className="flex items-center gap-1">
            <Fuel className="h-3.5 w-3.5" /> {vehicle.fuelType}
          </span>
          <span className="flex items-center gap-1">
            <Settings2 className="h-3.5 w-3.5" /> {vehicle.transmission}
          </span>
        </div>

        <div className="flex items-end justify-between mt-5 pt-4 border-t border-line">
          <div>
            <p className="text-lg font-bold font-[family-name:var(--font-display)]">{formatINR(vehicle.price)}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[11px] text-slate">EMI {formatINR(vehicle.emiFrom)}/mo</span>
              <Link
                to={`/finance?carId=${vehicle.id}&loanType=used-car-loan`}
                className="text-[10px] font-bold text-emerald-700 hover:underline uppercase tracking-tight bg-emerald-50 px-1.5 py-0.5 border border-emerald-200"
                onClick={(e) => e.stopPropagation()}
              >
                Apply Loan
              </Link>
            </div>
          </div>
          <Link
            to={`/inventory/${vehicle.id}`}
            className="text-xs font-semibold uppercase tracking-wide underline-offset-4 group-hover:underline shrink-0"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  )
}
