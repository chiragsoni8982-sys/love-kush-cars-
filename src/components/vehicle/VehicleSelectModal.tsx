import { useState, useMemo } from 'react'
import { Search, X, Check, Gauge, Fuel, Settings2, MapPin } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { VehicleImage } from './VehicleImage'
import { useVehicles } from '@/hooks/useVehicles'
import { formatINR, formatKm, cn } from '@/lib/utils'

interface VehicleSelectModalProps {
  open: boolean
  onClose: () => void
  onSelect: (vehicleId: string) => void
  excludeIds?: string[]
  slotIndex?: number
}

const BODY_FILTERS = ['All', 'SUV', 'Sedan', 'Hatchback', 'Luxury']
const FUEL_FILTERS = ['All Fuels', 'Petrol', 'Diesel', 'CNG', 'Electric']

export function VehicleSelectModal({
  open,
  onClose,
  onSelect,
  excludeIds = [],
  slotIndex,
}: VehicleSelectModalProps) {
  const { vehicles, loading } = useVehicles()
  const [search, setSearch] = useState('')
  const [selectedBody, setSelectedBody] = useState('All')
  const [selectedFuel, setSelectedFuel] = useState('All Fuels')

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      // Search query filter
      if (search.trim()) {
        const q = search.toLowerCase()
        const fullTitle = `${v.year} ${v.brand} ${v.model} ${v.variant} ${v.outletCity}`.toLowerCase()
        if (!fullTitle.includes(q)) return false
      }

      // Body type filter
      if (selectedBody !== 'All') {
        if (selectedBody === 'Luxury') {
          if (v.bodyType !== 'Luxury' && !v.badges?.featured) return false
        } else if (v.bodyType !== selectedBody) {
          return false
        }
      }

      // Fuel type filter
      if (selectedFuel !== 'All Fuels' && v.fuelType !== selectedFuel) {
        return false
      }

      return true
    })
  }, [vehicles, search, selectedBody, selectedFuel])

  function handleSelect(id: string) {
    onSelect(id)
    onClose()
    setSearch('')
  }

  return (
    <Modal open={open} onClose={onClose} className="w-full max-w-3xl p-6 sm:p-8">
      <div>
        <div className="mb-4">
          <p className="text-[11px] uppercase tracking-widest text-slate font-semibold">
            {slotIndex !== undefined ? `Select Vehicle for Slot ${slotIndex + 1}` : 'Select Vehicle to Compare'}
          </p>
          <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-display)] text-ink">
            Choose from Available Stock
          </h2>
          <p className="text-xs text-slate mt-0.5">
            Pick any verified pre-owned car from our Udaipur & Chittorgarh showrooms to compare side-by-side.
          </p>
        </div>

        {/* Search input */}
        <div className="relative mb-3">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by brand, model, variant (e.g. Brezza, Fortuner, Thar)..."
            className="w-full bg-mist border border-line pl-10 pr-9 py-2.5 text-sm text-ink placeholder:text-slate focus:outline-none focus:border-ink transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap items-center gap-1.5 mb-5 pb-3 border-b border-line text-xs">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full sm:w-auto">
            {BODY_FILTERS.map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBody(b)}
                className={cn(
                  'px-3 py-1 text-[11px] font-medium border transition-colors shrink-0',
                  selectedBody === b
                    ? 'bg-ink text-paper border-ink'
                    : 'bg-mist text-slate border-line hover:text-ink hover:border-ink/40',
                )}
              >
                {b}
              </button>
            ))}
            <span className="text-line mx-1">|</span>
            {FUEL_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFuel(f)}
                className={cn(
                  'px-2.5 py-1 text-[11px] font-medium border transition-colors shrink-0',
                  selectedFuel === f
                    ? 'bg-ink text-paper border-ink'
                    : 'bg-mist text-slate border-line hover:text-ink hover:border-ink/40',
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle list */}
        <div className="max-h-[50vh] overflow-y-auto pr-1 flex flex-col gap-2.5">
          {loading && (
            <div className="text-center py-10 text-slate text-sm">
              Loading available stock...
            </div>
          )}

          {!loading && filteredVehicles.length === 0 && (
            <div className="text-center py-10">
              <p className="text-sm font-semibold text-ink">No vehicles match your search</p>
              <p className="text-xs text-slate mt-1">Try clearing filters or searching another brand or keyword.</p>
              <button
                onClick={() => {
                  setSearch('')
                  setSelectedBody('All')
                  setSelectedFuel('All Fuels')
                }}
                className="mt-3 text-xs font-semibold underline text-ink"
              >
                Reset filters
              </button>
            </div>
          )}

          {!loading &&
            filteredVehicles.map((car) => {
              const isAlreadyAdded = excludeIds.includes(car.id)

              return (
                <div
                  key={car.id}
                  className={cn(
                    'flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 border transition-colors',
                    isAlreadyAdded
                      ? 'border-line/60 bg-mist/50 opacity-60'
                      : 'border-line hover:border-ink/60 bg-paper hover:bg-mist/30',
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-16 w-24 shrink-0 overflow-hidden bg-mist border border-line">
                      <VehicleImage
                        src={car.photoUrl}
                        alt={`${car.brand} ${car.model}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate bg-mist px-1.5 py-0.5 border border-line">
                          {car.year} &bull; {car.ownership}
                        </span>
                        <span className="text-[10px] text-slate flex items-center gap-0.5">
                          <MapPin className="h-2.5 w-2.5" /> {car.outletCity}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-ink mt-0.5">
                        {car.brand} {car.model}
                      </h4>
                      <p className="text-xs text-slate truncate max-w-[200px] sm:max-w-xs">{car.variant}</p>
                      <div className="flex items-center gap-3 text-[11px] text-slate mt-1">
                        <span className="flex items-center gap-1">
                          <Gauge className="h-3 w-3" /> {formatKm(car.kmDriven)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Fuel className="h-3 w-3" /> {car.fuelType}
                        </span>
                        <span className="flex items-center gap-1">
                          <Settings2 className="h-3 w-3" /> {car.transmission}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-line">
                    <div className="text-left sm:text-right">
                      <p className="text-sm font-bold text-ink font-[family-name:var(--font-display)]">
                        {formatINR(car.price)}
                      </p>
                      <p className="text-[10px] text-slate">EMI {formatINR(car.emiFrom)}/mo</p>
                    </div>

                    {isAlreadyAdded ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate bg-mist px-3 py-1.5 border border-line">
                        <Check className="h-3 w-3" /> Added
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSelect(car.id)}
                        className="bg-ink hover:bg-slate text-paper text-xs font-semibold uppercase tracking-wider px-4 py-1.5 transition-colors"
                      >
                        Select Car
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </Modal>
  )
}
