import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  GitCompareArrows,
  Plus,
  X,
  RefreshCw,
  CheckCircle2,
  Minus,
  Phone,
  MessageCircle,
  CalendarDays,
  ExternalLink,
  ChevronRight,
  Share2,
  Trash2,
  Filter,
} from 'lucide-react'
import { SEO } from '@/components/seo/SEO'
import { staticPageSEO } from '@/data/seoRegistry'
import { useCompare } from '@/hooks/useCompare'
import { useVehicles } from '@/hooks/useVehicles'
import { VehicleSelectModal } from '@/components/vehicle/VehicleSelectModal'
import { VehicleImage } from '@/components/vehicle/VehicleImage'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { formatINR, formatKm, cn } from '@/lib/utils'
import { getWhatsAppUrl, getCallUrl } from '@/lib/contact'
import type { Vehicle } from '@/types'

export default function Compare() {
  const [params] = useSearchParams()
  const {
    compare,
    addToCompare,
    removeFromCompare,
    clearCompare,
    replaceCompare,
    maxCap,
    showToast,
  } = useCompare()
  const { vehicles, getVehicleById } = useVehicles()

  const [diffOnly, setDiffOnly] = useState(false)
  const [selectorOpen, setSelectorOpen] = useState(false)
  const [targetSlot, setTargetSlot] = useState<number | null>(null)
  const [testDriveCar, setTestDriveCar] = useState<Vehicle | null>(null)
  const [testDriveSubmitted, setTestDriveSubmitted] = useState(false)

  // Sync compare IDs from URL params (?cars=1,2,3) if supplied on initial visit
  useEffect(() => {
    const carsParam = params.get('cars')
    if (carsParam) {
      const ids = carsParam
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
      ids.forEach((id) => {
        addToCompare(id)
      })
    }
  }, [params, addToCompare])

  // Get Vehicle objects for current compare IDs
  const comparedVehicles = useMemo(() => {
    return compare
      .map((id) => getVehicleById(id))
      .filter((v): v is Vehicle => Boolean(v))
  }, [compare, getVehicleById])

  // Handle opening vehicle selector for a slot
  function handleOpenSelector(slotIndex: number) {
    setTargetSlot(slotIndex)
    setSelectorOpen(true)
  }

  // Handle selection from modal
  function handleSelectVehicle(newVehicleId: string) {
    if (targetSlot !== null && targetSlot < comparedVehicles.length) {
      // Replacing existing slot
      const oldVehicle = comparedVehicles[targetSlot]
      replaceCompare(oldVehicle.id, newVehicleId)
    } else {
      // Adding new vehicle
      const car = getVehicleById(newVehicleId)
      addToCompare(newVehicleId, car ? `${car.brand} ${car.model}` : undefined)
    }
    setSelectorOpen(false)
    setTargetSlot(null)
  }

  // Share comparison via clipboard or WhatsApp
  function handleShare() {
    if (comparedVehicles.length === 0) return
    const ids = comparedVehicles.map((c) => c.id).join(',')
    const url = `${window.location.origin}/compare?cars=${ids}`
    navigator.clipboard?.writeText(url)
    showToast('Comparison link copied to clipboard!', 'success')
  }

  // Find unique all features among compared vehicles
  const allFeatures = useMemo(() => {
    const featureSet = new Set<string>()
    comparedVehicles.forEach((v) => {
      v.features?.forEach((f) => featureSet.add(f))
    })
    return Array.from(featureSet).sort()
  }, [comparedVehicles])

  // Calculate best highlights
  const highlights = useMemo(() => {
    if (comparedVehicles.length < 2) return {}
    const minPrice = Math.min(...comparedVehicles.map((c) => c.price))
    const minKm = Math.min(...comparedVehicles.map((c) => c.kmDriven))
    const maxYear = Math.max(...comparedVehicles.map((c) => c.year))

    return {
      minPriceId: comparedVehicles.find((c) => c.price === minPrice)?.id,
      minKmId: comparedVehicles.find((c) => c.kmDriven === minKm)?.id,
      maxYearId: comparedVehicles.find((c) => c.year === maxYear)?.id,
    }
  }, [comparedVehicles])

  // Popular stock comparisons for zero-state
  const popularStockPairs = useMemo(() => {
    if (vehicles.length < 2) return []

    const pairs: { title: string; desc: string; vehicles: Vehicle[] }[] = []

    // 1. SUVs pair
    const suvs = vehicles.filter((v) => v.bodyType === 'SUV' || v.bodyType === 'MUV')
    if (suvs.length >= 2) {
      pairs.push({
        title: 'Popular SUVs in Stock',
        desc: 'Compare road presence, clearance, and comfort.',
        vehicles: suvs.slice(0, 2),
      })
    }

    // 2. Budget Crossovers / Hatchbacks / Sedans
    const sedansOrBudget = vehicles.filter((v) => v.price <= 1500000)
    if (sedansOrBudget.length >= 2) {
      pairs.push({
        title: 'Value Cruisers Under ₹15 Lakh',
        desc: 'Compare practical daily drivers with high mileage.',
        vehicles: sedansOrBudget.slice(0, 2),
      })
    }

    // 3. Certified Automatics
    const automatics = vehicles.filter((v) => v.transmission === 'Automatic')
    if (automatics.length >= 2) {
      pairs.push({
        title: 'Effortless Automatics',
        desc: 'Compare smooth transmission pre-owned models.',
        vehicles: automatics.slice(0, 2),
      })
    }

    return pairs
  }, [vehicles])

  // Row helper: whether all compared cars have the exact same value for a property
  function areAllValuesSame(getValue: (v: Vehicle) => any): boolean {
    if (comparedVehicles.length <= 1) return true
    const firstVal = getValue(comparedVehicles[0])
    return comparedVehicles.every((v) => getValue(v) === firstVal)
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden min-h-screen bg-paper pb-28">
      <SEO {...staticPageSEO['/compare']} />

      {/* Top Header & Breadcrumbs */}
      <section className="bg-mist/60 border-b border-line pt-24 sm:pt-28 pb-10 sm:pb-12">
        <div className="container-lk">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate mb-4">
            <Link to="/" className="hover:text-ink transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <Link to="/inventory" className="hover:text-ink transition-colors">
              Inventory
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <span className="text-ink font-semibold">Compare Stock Cars</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-ink text-paper text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 mb-3">
                <GitCompareArrows className="h-3.5 w-3.5" /> Side-by-Side Comparison
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-display)] text-ink tracking-tight">
                Compare Our Stock Cars
              </h1>
              <p className="text-sm sm:text-base text-slate max-w-2xl mt-2 leading-relaxed">
                Compare transparent specifications, certified inspection history, monthly EMIs, and real equipment
                across verified cars in our Udaipur and Chittorgarh inventory.
              </p>
            </div>

            {/* Actions Bar */}
            {comparedVehicles.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {comparedVehicles.length > 1 && (
                  <button
                    onClick={() => setDiffOnly((v) => !v)}
                    className={cn(
                      'inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider border transition-colors',
                      diffOnly
                        ? 'bg-ink text-paper border-ink'
                        : 'bg-paper text-ink border-line hover:border-ink',
                    )}
                  >
                    <Filter className="h-3.5 w-3.5" />
                    {diffOnly ? 'Show All Specs' : 'Only Differences'}
                  </button>
                )}

                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider bg-paper text-ink border border-line hover:border-ink transition-colors"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  Share
                </button>

                <button
                  onClick={clearCompare}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider bg-paper text-slate hover:text-red-600 border border-line hover:border-red-200 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container-lk pt-8 sm:pt-10">
        {/* If NO cars are selected yet, provide an engaging setup state */}
        {comparedVehicles.length === 0 ? (
          <div className="py-8">
            {/* Slot Preview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {[0, 1, 2].map((slotIdx) => (
                <div
                  key={slotIdx}
                  onClick={() => handleOpenSelector(slotIdx)}
                  className="border-2 border-dashed border-line hover:border-ink/60 bg-mist/30 hover:bg-mist/60 p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 group min-h-[280px]"
                >
                  <div className="h-14 w-14 rounded-full bg-paper border border-line flex items-center justify-center text-ink/60 group-hover:scale-110 group-hover:text-ink group-hover:border-ink transition-all mb-4">
                    <Plus className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-base text-ink mb-1">
                    {slotIdx === 0 ? 'Select First Car' : slotIdx === 1 ? 'Select Second Car' : 'Select Third Car (Optional)'}
                  </h3>
                  <p className="text-xs text-slate max-w-xs mb-4">
                    Pick from verified stock in Udaipur or Chittorgarh
                  </p>
                  <Button variant="secondary" size="md">
                    + Choose Vehicle
                  </Button>
                </div>
              ))}
            </div>

            {/* Popular Comparisons from Current Stock */}
            {popularStockPairs.length > 0 && (
              <div className="border-t border-line pt-12">
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-widest text-slate font-semibold">1-Click Fast Comparison</p>
                  <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-ink">
                    Popular Stock Comparisons
                  </h2>
                  <p className="text-xs sm:text-sm text-slate mt-1">
                    Start comparing immediately with curated matchups from our current ready stock.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {popularStockPairs.map((pair, idx) => (
                    <div
                      key={idx}
                      className="border border-line bg-paper p-5 flex flex-col justify-between hover:shadow-elevated transition-shadow"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-mist px-2 py-0.5 border border-line">
                            Preset Matchup
                          </span>
                          <span className="text-xs text-slate">2 Cars</span>
                        </div>
                        <h4 className="text-base font-bold text-ink">{pair.title}</h4>
                        <p className="text-xs text-slate mt-1 mb-4">{pair.desc}</p>

                        <div className="space-y-2 mb-6">
                          {pair.vehicles.map((v) => (
                            <div key={v.id} className="flex items-center gap-2.5 p-2 bg-mist/50 border border-line text-xs">
                              <div className="h-8 w-12 shrink-0 overflow-hidden bg-black/10">
                                <VehicleImage src={v.photoUrl} alt={v.model} className="h-full w-full object-cover" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-semibold text-ink truncate">
                                  {v.year} {v.brand} {v.model}
                                </p>
                                <p className="text-[10px] text-slate">{formatINR(v.price)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button
                        size="md"
                        className="w-full"
                        onClick={() => {
                          pair.vehicles.forEach((v) => addToCompare(v.id))
                        }}
                      >
                        <GitCompareArrows className="h-3.5 w-3.5" /> Compare This Pair
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Stock Gallery */}
            <div className="border-t border-line mt-14 pt-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-display)] text-ink">
                    Available Stock to Compare
                  </h3>
                  <p className="text-xs text-slate mt-0.5">Click any car below to instantly add it to your comparison.</p>
                </div>
                <Link to="/inventory" className="text-xs font-semibold underline text-ink">
                  Browse All Inventory &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {vehicles.slice(0, 8).map((car) => (
                  <div
                    key={car.id}
                    className="border border-line p-3 bg-paper hover:border-ink transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[16/10] overflow-hidden bg-mist border border-line mb-3">
                        <VehicleImage
                          src={car.photoUrl}
                          alt={`${car.brand} ${car.model}`}
                          className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate mb-1">
                        <span>{car.year}</span> &bull; <span>{car.fuelType}</span> &bull; <span>{car.outletCity}</span>
                      </div>
                      <h4 className="text-sm font-bold text-ink leading-snug">
                        {car.brand} {car.model}
                      </h4>
                      <p className="text-xs text-slate mt-0.5 truncate">{car.variant}</p>
                      <p className="text-sm font-bold text-ink mt-2">{formatINR(car.price)}</p>
                    </div>

                    <button
                      onClick={() => addToCompare(car.id, `${car.brand} ${car.model}`)}
                      className="mt-3 w-full inline-flex items-center justify-center gap-1.5 py-2 text-xs font-semibold uppercase tracking-wider bg-mist hover:bg-ink hover:text-paper text-ink border border-line transition-colors"
                    >
                      <Plus className="h-3 w-3" /> Add to Compare
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* When 1, 2, or 3 cars ARE in comparison */
          <div>
            {/* Top comparison slots */}
            <div className="overflow-x-auto no-scrollbar pb-6">
              <div className="min-w-[720px]">
                {/* Vehicle Header Cards Grid */}
                <div className="grid grid-cols-4 gap-4 items-stretch mb-8">
                  {/* Left Column: Legend / Label */}
                  <div className="flex flex-col justify-end p-4 border border-transparent">
                    <p className="text-[11px] uppercase tracking-widest text-slate font-bold">
                      Comparing {comparedVehicles.length} of {maxCap}
                    </p>
                    <p className="text-xs text-slate mt-1">
                      {diffOnly ? 'Showing differences only' : 'Showing all vehicle specifications'}
                    </p>
                    {comparedVehicles.length < maxCap && (
                      <button
                        onClick={() => handleOpenSelector(comparedVehicles.length)}
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-ink hover:underline"
                      >
                        <Plus className="h-3.5 w-3.5" /> Add another car from stock
                      </button>
                    )}
                  </div>

                  {/* Vehicle Cards (up to 3) */}
                  {[0, 1, 2].map((idx) => {
                    const car = comparedVehicles[idx]

                    if (!car) {
                      // Empty Slot Card
                      return (
                        <div
                          key={`empty-${idx}`}
                          onClick={() => handleOpenSelector(idx)}
                          className="border-2 border-dashed border-line hover:border-ink/60 bg-mist/30 p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group min-h-[360px]"
                        >
                          <div className="h-12 w-12 rounded-full bg-paper border border-line flex items-center justify-center text-slate group-hover:text-ink group-hover:scale-105 transition-all mb-3">
                            <Plus className="h-5 w-5" />
                          </div>
                          <p className="text-xs font-bold uppercase tracking-wider text-ink">
                            + Add Vehicle {idx + 1}
                          </p>
                          <p className="text-[11px] text-slate mt-1 max-w-[160px]">
                            Choose from verified stock to compare
                          </p>
                        </div>
                      )
                    }

                    const isLowestPrice = highlights.minPriceId === car.id
                    const isLowestKm = highlights.minKmId === car.id
                    const isNewest = highlights.maxYearId === car.id

                    return (
                      <div
                        key={car.id}
                        className="border border-line bg-paper p-4 sm:p-5 flex flex-col justify-between relative shadow-sm hover:shadow-md transition-shadow"
                      >
                        {/* Remove / Swap row */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <button
                            onClick={() => handleOpenSelector(idx)}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate hover:text-ink transition-colors"
                            title="Replace this vehicle with another from stock"
                          >
                            <RefreshCw className="h-3 w-3" /> Swap
                          </button>
                          <button
                            onClick={() => removeFromCompare(car.id, `${car.brand} ${car.model}`)}
                            aria-label={`Remove ${car.brand} ${car.model}`}
                            className="h-6 w-6 flex items-center justify-center text-slate hover:text-red-600 bg-mist hover:bg-red-50 border border-line transition-colors"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Image */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-mist border border-line mb-3 group">
                          <VehicleImage
                            src={car.photoUrl}
                            alt={`${car.brand} ${car.model}`}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 left-2 flex flex-col gap-1">
                            {car.badges?.certified && (
                              <Badge variant="filled" className="text-[9px] py-0.5">
                                Certified
                              </Badge>
                            )}
                            {car.status === 'sold' && (
                              <Badge variant="filled" className="bg-purple-700 text-white text-[9px] py-0.5">
                                Sold
                              </Badge>
                            )}
                            {car.status === 'reserved' && (
                              <Badge variant="filled" className="bg-amber-600 text-white text-[9px] py-0.5">
                                Reserved
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Title & Highlights */}
                        <div>
                          <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                            {isLowestPrice && (
                              <span className="text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.5 border border-emerald-300">
                                💰 Best Price
                              </span>
                            )}
                            {isLowestKm && (
                              <span className="text-[9px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-1.5 py-0.5 border border-blue-300">
                                ⚡ Lowest KM
                              </span>
                            )}
                            {isNewest && (
                              <span className="text-[9px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 px-1.5 py-0.5 border border-purple-300">
                                📅 Newest
                              </span>
                            )}
                          </div>

                          <Link
                            to={`/inventory/${car.id}`}
                            className="hover:underline underline-offset-2 block"
                          >
                            <h3 className="font-bold text-base sm:text-lg text-ink leading-tight">
                              {car.year} {car.brand} {car.model}
                            </h3>
                          </Link>
                          <p className="text-xs text-slate truncate mt-0.5">{car.variant}</p>

                          <div className="mt-4 pt-3 border-t border-line">
                            <p className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-display)] text-ink">
                              {formatINR(car.price)}
                            </p>
                            <p className="text-xs text-slate mt-0.5">
                              EMI from <span className="font-semibold text-ink">{formatINR(car.emiFrom)}</span>/mo
                            </p>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="mt-4 pt-3 border-t border-line flex flex-col gap-2">
                          <button
                            onClick={() => {
                              setTestDriveCar(car)
                              setTestDriveSubmitted(false)
                            }}
                            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 bg-ink text-paper hover:bg-slate text-xs font-bold uppercase tracking-wider transition-colors"
                          >
                            <CalendarDays className="h-3.5 w-3.5" /> Book Test Drive
                          </button>

                          <div className="grid grid-cols-2 gap-2">
                            <a
                              href={getWhatsAppUrl(
                                `Hi Love Kush Cars, I am comparing the ${car.year} ${car.brand} ${car.model} (${car.variant}, ${formatINR(car.price)}). Can you share inspection details and best offer?`,
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1 py-2 text-[11px] font-semibold uppercase tracking-wider bg-mist hover:bg-emerald-50 text-emerald-800 border border-line hover:border-emerald-300 transition-colors"
                            >
                              <MessageCircle className="h-3 w-3" /> WhatsApp
                            </a>
                            <Link
                              to={`/inventory/${car.id}`}
                              className="inline-flex items-center justify-center gap-1 py-2 text-[11px] font-semibold uppercase tracking-wider bg-mist hover:bg-paper text-slate hover:text-ink border border-line hover:border-ink transition-colors"
                            >
                              Details <ExternalLink className="h-3 w-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* SPECIFICATION TABLES */}

                {/* Section 1: Core Specifications */}
                <div className="mb-8">
                  <div className="bg-mist px-4 py-3 border border-line font-bold text-xs uppercase tracking-wider text-ink flex items-center justify-between">
                    <span>1. Core Specifications</span>
                    <span className="text-[11px] text-slate font-normal">Condition & Ownership History</span>
                  </div>

                  <div className="divide-y divide-line border-x border-b border-line text-xs">
                    {/* Year */}
                    {(!diffOnly || !areAllValuesSame((v) => v.year)) && (
                      <div className="grid grid-cols-4 p-3 hover:bg-mist/30 items-center">
                        <div className="font-semibold text-slate">Year of Manufacture</div>
                        {[0, 1, 2].map((idx) => {
                          const c = comparedVehicles[idx]
                          return (
                            <div key={idx} className="font-bold text-ink">
                              {c ? c.year : '—'}
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {/* Kilometers Driven */}
                    {(!diffOnly || !areAllValuesSame((v) => v.kmDriven)) && (
                      <div className="grid grid-cols-4 p-3 hover:bg-mist/30 items-center">
                        <div className="font-semibold text-slate">Kilometers Driven</div>
                        {[0, 1, 2].map((idx) => {
                          const c = comparedVehicles[idx]
                          const isLowest = c && highlights.minKmId === c.id
                          return (
                            <div key={idx} className={cn('font-bold', isLowest ? 'text-emerald-700' : 'text-ink')}>
                              {c ? (
                                <span className="flex items-center gap-1.5">
                                  {formatKm(c.kmDriven)}
                                  {isLowest && (
                                    <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded font-normal">
                                      Lowest
                                    </span>
                                  )}
                                </span>
                              ) : (
                                '—'
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {/* Fuel Type */}
                    {(!diffOnly || !areAllValuesSame((v) => v.fuelType)) && (
                      <div className="grid grid-cols-4 p-3 hover:bg-mist/30 items-center">
                        <div className="font-semibold text-slate">Fuel Type</div>
                        {[0, 1, 2].map((idx) => {
                          const c = comparedVehicles[idx]
                          return (
                            <div key={idx} className="font-medium text-ink">
                              {c ? c.fuelType : '—'}
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {/* Transmission */}
                    {(!diffOnly || !areAllValuesSame((v) => v.transmission)) && (
                      <div className="grid grid-cols-4 p-3 hover:bg-mist/30 items-center">
                        <div className="font-semibold text-slate">Transmission</div>
                        {[0, 1, 2].map((idx) => {
                          const c = comparedVehicles[idx]
                          return (
                            <div key={idx} className="font-medium text-ink">
                              {c ? c.transmission : '—'}
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {/* Ownership */}
                    {(!diffOnly || !areAllValuesSame((v) => v.ownership)) && (
                      <div className="grid grid-cols-4 p-3 hover:bg-mist/30 items-center">
                        <div className="font-semibold text-slate">Ownership History</div>
                        {[0, 1, 2].map((idx) => {
                          const c = comparedVehicles[idx]
                          return (
                            <div key={idx} className="font-medium text-ink">
                              {c ? c.ownership : '—'}
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {/* Body Type */}
                    {(!diffOnly || !areAllValuesSame((v) => v.bodyType)) && (
                      <div className="grid grid-cols-4 p-3 hover:bg-mist/30 items-center">
                        <div className="font-semibold text-slate">Body Style</div>
                        {[0, 1, 2].map((idx) => {
                          const c = comparedVehicles[idx]
                          return (
                            <div key={idx} className="font-medium text-ink">
                              {c ? c.bodyType : '—'}
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {/* Color */}
                    {(!diffOnly || !areAllValuesSame((v) => v.color)) && (
                      <div className="grid grid-cols-4 p-3 hover:bg-mist/30 items-center">
                        <div className="font-semibold text-slate">Exterior Color</div>
                        {[0, 1, 2].map((idx) => {
                          const c = comparedVehicles[idx]
                          return (
                            <div key={idx} className="font-medium text-ink">
                              {c ? c.color : '—'}
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {/* Registration / RTO */}
                    {(!diffOnly || !areAllValuesSame((v) => v.rtoCode)) && (
                      <div className="grid grid-cols-4 p-3 hover:bg-mist/30 items-center">
                        <div className="font-semibold text-slate">RTO Registration</div>
                        {[0, 1, 2].map((idx) => {
                          const c = comparedVehicles[idx]
                          return (
                            <div key={idx} className="font-medium text-ink">
                              {c ? `${c.rtoCode} (${c.rtoDistrict})` : '—'}
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {/* Showroom Outlet Location */}
                    {(!diffOnly || !areAllValuesSame((v) => v.outletCity)) && (
                      <div className="grid grid-cols-4 p-3 hover:bg-mist/30 items-center">
                        <div className="font-semibold text-slate">Showroom Outlet</div>
                        {[0, 1, 2].map((idx) => {
                          const c = comparedVehicles[idx]
                          return (
                            <div key={idx} className="font-medium text-ink">
                              {c ? `${c.outletCity} Showroom` : '—'}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Section 2: Engine & Performance */}
                <div className="mb-8">
                  <div className="bg-mist px-4 py-3 border border-line font-bold text-xs uppercase tracking-wider text-ink flex items-center justify-between">
                    <span>2. Engine & Performance</span>
                    <span className="text-[11px] text-slate font-normal">Power & Economy</span>
                  </div>

                  <div className="divide-y divide-line border-x border-b border-line text-xs">
                    {/* Engine */}
                    {(!diffOnly || !areAllValuesSame((v) => v.specifications?.engine)) && (
                      <div className="grid grid-cols-4 p-3 hover:bg-mist/30 items-center">
                        <div className="font-semibold text-slate">Engine Displacement</div>
                        {[0, 1, 2].map((idx) => {
                          const c = comparedVehicles[idx]
                          return (
                            <div key={idx} className="font-medium text-ink">
                              {c ? c.specifications?.engine || 'Not specified' : '—'}
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {/* Mileage */}
                    {(!diffOnly || !areAllValuesSame((v) => v.specifications?.mileage)) && (
                      <div className="grid grid-cols-4 p-3 hover:bg-mist/30 items-center">
                        <div className="font-semibold text-slate">Fuel Efficiency / Mileage</div>
                        {[0, 1, 2].map((idx) => {
                          const c = comparedVehicles[idx]
                          return (
                            <div key={idx} className="font-medium text-ink">
                              {c ? c.specifications?.mileage || 'Not specified' : '—'}
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {/* Seating */}
                    {(!diffOnly || !areAllValuesSame((v) => v.specifications?.seating)) && (
                      <div className="grid grid-cols-4 p-3 hover:bg-mist/30 items-center">
                        <div className="font-semibold text-slate">Seating Capacity</div>
                        {[0, 1, 2].map((idx) => {
                          const c = comparedVehicles[idx]
                          return (
                            <div key={idx} className="font-medium text-ink">
                              {c ? `${c.specifications?.seating || 5} Seater` : '—'}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Section 3: Pricing & Financials */}
                <div className="mb-8">
                  <div className="bg-mist px-4 py-3 border border-line font-bold text-xs uppercase tracking-wider text-ink flex items-center justify-between">
                    <span>3. Price & Financial Breakdown</span>
                    <span className="text-[11px] text-slate font-normal">Multi-Bank Loan Offers Available</span>
                  </div>

                  <div className="divide-y divide-line border-x border-b border-line text-xs">
                    {/* Price */}
                    <div className="grid grid-cols-4 p-3 hover:bg-mist/30 items-center">
                      <div className="font-semibold text-slate">Listing Price</div>
                      {[0, 1, 2].map((idx) => {
                        const c = comparedVehicles[idx]
                        const isLowest = c && highlights.minPriceId === c.id
                        return (
                          <div key={idx} className={cn('font-bold text-sm', isLowest ? 'text-emerald-700' : 'text-ink')}>
                            {c ? (
                              <span className="flex items-center gap-1.5">
                                {formatINR(c.price)}
                                {isLowest && (
                                  <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded font-normal">
                                    Best Value
                                  </span>
                                )}
                              </span>
                            ) : (
                              '—'
                            )}
                          </div>
                        )
                      })}
                    </div>

                    {/* Original Price / Price Drop */}
                    <div className="grid grid-cols-4 p-3 hover:bg-mist/30 items-center">
                      <div className="font-semibold text-slate">Original Listed Price</div>
                      {[0, 1, 2].map((idx) => {
                        const c = comparedVehicles[idx]
                        return (
                          <div key={idx} className="text-slate">
                            {c && c.originalPrice ? (
                              <span className="line-through">{formatINR(c.originalPrice)}</span>
                            ) : (
                              'Fixed Fair Price'
                            )}
                          </div>
                        )
                      })}
                    </div>

                    {/* Monthly EMI */}
                    <div className="grid grid-cols-4 p-3 hover:bg-mist/30 items-center">
                      <div className="font-semibold text-slate">Estimated Monthly EMI</div>
                      {[0, 1, 2].map((idx) => {
                        const c = comparedVehicles[idx]
                        return (
                          <div key={idx} className="font-medium text-ink">
                            {c ? (
                              <span>
                                from <strong className="text-ink">{formatINR(c.emiFrom)}</strong>/mo
                              </span>
                            ) : (
                              '—'
                            )}
                          </div>
                        )
                      })}
                    </div>

                    {/* Price Negotiation */}
                    <div className="grid grid-cols-4 p-3 hover:bg-mist/30 items-center">
                      <div className="font-semibold text-slate">Price Flexibility</div>
                      {[0, 1, 2].map((idx) => {
                        const c = comparedVehicles[idx]
                        return (
                          <div key={idx} className="text-ink">
                            {c ? (c.negotiable ? 'Slightly Negotiable' : 'Fixed Transparent') : '—'}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Section 4: Features Checklist Matrix */}
                {allFeatures.length > 0 && (
                  <div className="mb-8">
                    <div className="bg-mist px-4 py-3 border border-line font-bold text-xs uppercase tracking-wider text-ink flex items-center justify-between">
                      <span>4. Features & Equipment Checklist</span>
                      <span className="text-[11px] text-slate font-normal">
                        {allFeatures.length} Verified Features Inspected
                      </span>
                    </div>

                    <div className="divide-y divide-line border-x border-b border-line text-xs">
                      {allFeatures.map((feature) => {
                        // Check if all cars have or lack this feature
                        const hasArray = comparedVehicles.map((c) => c.features?.includes(feature) ?? false)
                        const allSame = hasArray.length > 1 && hasArray.every((h) => h === hasArray[0])

                        if (diffOnly && allSame) return null

                        return (
                          <div key={feature} className="grid grid-cols-4 p-3 hover:bg-mist/30 items-center">
                            <div className="font-semibold text-slate">{feature}</div>
                            {[0, 1, 2].map((idx) => {
                              const c = comparedVehicles[idx]
                              if (!c) {
                                return (
                                  <div key={idx} className="text-slate/40">
                                    —
                                  </div>
                                )
                              }
                              const has = c.features?.includes(feature)
                              return (
                                <div key={idx}>
                                  {has ? (
                                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                                      <CheckCircle2 className="h-3.5 w-3.5" /> Included
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 text-slate/50">
                                      <Minus className="h-3.5 w-3.5" />
                                    </span>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Section 5: Love Kush Cars Guarantee */}
                <div className="mb-12">
                  <div className="bg-mist px-4 py-3 border border-line font-bold text-xs uppercase tracking-wider text-ink flex items-center justify-between">
                    <span>5. Love Kush Cars Guarantee & Services</span>
                    <span className="text-[11px] text-slate font-normal">24+ Years of Trust in Mewar</span>
                  </div>

                  <div className="divide-y divide-line border-x border-b border-line text-xs">
                    <div className="grid grid-cols-4 p-3 hover:bg-mist/30 items-center">
                      <div className="font-semibold text-slate">150-Point Technical Inspection</div>
                      {[0, 1, 2].map((idx) => {
                        const c = comparedVehicles[idx]
                        return (
                          <div key={idx} className="text-emerald-700 font-medium">
                            {c ? '✓ 100% Certified Passed' : '—'}
                          </div>
                        )
                      })}
                    </div>

                    <div className="grid grid-cols-4 p-3 hover:bg-mist/30 items-center">
                      <div className="font-semibold text-slate">RC Transfer & Legal Paperwork</div>
                      {[0, 1, 2].map((idx) => {
                        const c = comparedVehicles[idx]
                        return (
                          <div key={idx} className="text-ink">
                            {c ? 'Full Assistance Included' : '—'}
                          </div>
                        )
                      })}
                    </div>

                    <div className="grid grid-cols-4 p-3 hover:bg-mist/30 items-center">
                      <div className="font-semibold text-slate">Immediate Test Drive Available</div>
                      {[0, 1, 2].map((idx) => {
                        const c = comparedVehicles[idx]
                        return (
                          <div key={idx} className="text-ink">
                            {c ? `Yes, at ${c.outletCity} Outlet` : '—'}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Bottom Call to Action Grid */}
                <div className="grid grid-cols-4 gap-4 p-6 bg-mist/50 border border-line items-center">
                  <div>
                    <h4 className="font-bold text-base text-ink font-[family-name:var(--font-display)]">
                      Ready for the Next Step?
                    </h4>
                    <p className="text-xs text-slate mt-1">
                      Our vehicle consultants in Udaipur & Chittorgarh are ready to arrange back-to-back test drives.
                    </p>
                  </div>

                  {[0, 1, 2].map((idx) => {
                    const c = comparedVehicles[idx]
                    if (!c) {
                      return (
                        <div key={idx} className="text-center text-xs text-slate/50">
                          Empty Slot
                        </div>
                      )
                    }

                    return (
                      <div key={idx} className="flex flex-col gap-2">
                        <button
                          onClick={() => {
                            setTestDriveCar(c)
                            setTestDriveSubmitted(false)
                          }}
                          className="w-full py-2.5 bg-ink text-paper text-xs font-bold uppercase tracking-wider hover:bg-slate transition-colors"
                        >
                          Book Test Drive
                        </button>
                        <a
                          href={getCallUrl()}
                          className="w-full py-2 bg-paper text-ink border border-line text-center text-xs font-semibold uppercase tracking-wider hover:border-ink transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Phone className="h-3 w-3" /> Call Consultant
                        </a>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Vehicle Selection Modal */}
      <VehicleSelectModal
        open={selectorOpen}
        onClose={() => setSelectorOpen(false)}
        onSelect={handleSelectVehicle}
        excludeIds={compare}
        slotIndex={targetSlot ?? undefined}
      />

      {/* Test Drive Booking Modal */}
      {testDriveCar && (
        <Modal open={Boolean(testDriveCar)} onClose={() => setTestDriveCar(null)}>
          {testDriveSubmitted ? (
            <div className="text-center py-6">
              <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto mb-3" />
              <p className="font-bold text-lg text-ink mb-1">Test Drive Request Received!</p>
              <p className="text-xs text-slate max-w-sm mx-auto">
                Thank you. Our showroom team will call you shortly to confirm your slot for the{' '}
                <strong>
                  {testDriveCar.year} {testDriveCar.brand} {testDriveCar.model}
                </strong>{' '}
                at our {testDriveCar.outletCity} branch.
              </p>
              <Button className="mt-6" onClick={() => setTestDriveCar(null)}>
                Done
              </Button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setTestDriveSubmitted(true)
              }}
              className="flex flex-col gap-4"
            >
              <div>
                <p className="text-xs uppercase tracking-widest text-slate mb-1">Book a Test Drive</p>
                <h3 className="text-xl font-bold font-[family-name:var(--font-display)] text-ink">
                  {testDriveCar.year} {testDriveCar.brand} {testDriveCar.model}
                </h3>
                <p className="text-xs text-slate">{testDriveCar.variant} &bull; {testDriveCar.outletCity} Outlet</p>
              </div>

              <Input label="Your Name" placeholder="Full name" required />
              <Input label="Contact Phone" type="tel" placeholder="+91 98765 43210" required />
              <Input label="Preferred Date" type="date" required />

              <div className="pt-2">
                <Button type="submit" className="w-full">
                  Confirm Test Drive Request
                </Button>
              </div>
            </form>
          )}
        </Modal>
      )}
    </div>
  )
}
