import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  SlidersHorizontal,
  SearchX,
  MapPin,
  Sparkles,
  Search,
  RotateCcw,
  Building2,
  Phone,
  ArrowRight,
  X,
  LayoutGrid,
  List,
  ShieldCheck,
  CheckCircle2,
  Car,
  Clock,
  Landmark,
  MessageCircle,
} from 'lucide-react'
import { VehicleCard } from '@/components/vehicle/VehicleCard'
import { FilterPanel, type FilterState, emptyFilterState } from '@/components/search/FilterPanel'
import { Select } from '@/components/ui/Select'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { mockVehicles, outlets } from '@/data/mockVehicles'
import { apiFetch } from '@/lib/api'
import { mapApiVehicle, type ApiVehicle } from '@/lib/mapVehicle'
import { formatINR, cn } from '@/lib/utils'
import type { Vehicle } from '@/types'

type SortKey = 'newest' | 'price-asc' | 'price-desc' | 'year-desc' | 'km-asc'
type ViewMode = 'grid' | 'list'

const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'newest', label: 'Newest Arrivals First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'year-desc', label: 'Year: Newest' },
  { value: 'km-asc', label: 'KM: Lowest First' },
]

// Quick Curation Preset Chips
const CURATION_PRESETS = [
  { id: 'all', label: '✨ All Vehicles' },
  { id: 'new-arrivals', label: '🔥 New Arrivals' },
  { id: 'suv-4x4', label: '🏔️ 4x4 & SUVs' },
  { id: 'german-luxury', label: '👑 Luxury & German' },
  { id: 'automatic', label: '⚡ Automatic Only' },
  { id: 'under-30l', label: '🏷️ Under ₹30 Lakh' },
  { id: 'price-drop', label: '💰 Price Drop Deals' },
]

export default function Inventory() {
  const [params, setParams] = useSearchParams()

  // Baseline data initialized with complete verified mockVehicles
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [sort, setSort] = useState<SortKey>('newest')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [activeCuration, setActiveCuration] = useState<string>('all')

  useEffect(() => {
    document.title = 'Certified Pre-Owned Car Inventory | Udaipur & Chittorgarh | Love Kush Cars'
    window.scrollTo(0, 0)
  }, [])

  // Parse initial filters from URL query parameters
  const [filters, setFilters] = useState<FilterState>(() => {
    const locParam = params.get('location') || params.get('outlet') || params.get('city')
    const brandParam = params.get('brand')
    const bodyTypeParam = params.get('bodyType')
    const fuelTypeParam = params.get('fuelType')
    const transmissionParam = params.get('transmission')
    const budgetParam = params.get('budget')
    const maxPriceParam = params.get('maxPrice')

    let maxPrice = emptyFilterState.maxPrice
    if (budgetParam) {
      const parts = budgetParam.split('-')
      if (parts[1]) {
        maxPrice = Number(parts[1]) || emptyFilterState.maxPrice
      }
    } else if (maxPriceParam) {
      maxPrice = Number(maxPriceParam) || emptyFilterState.maxPrice
    }

    return {
      locations: locParam ? [locParam] : [],
      brands: brandParam ? [brandParam] : [],
      bodyTypes: bodyTypeParam ? [bodyTypeParam] : [],
      fuelTypes: fuelTypeParam ? [fuelTypeParam] : [],
      transmissions: transmissionParam ? [transmissionParam] : [],
      ownerships: [],
      maxPrice,
      searchQuery: '',
    }
  })

  // Sync state if URL search params change externally
  useEffect(() => {
    const locParam = params.get('location') || params.get('outlet') || params.get('city')
    const brandParam = params.get('brand')
    const bodyTypeParam = params.get('bodyType')
    const fuelTypeParam = params.get('fuelType')
    const transmissionParam = params.get('transmission')
    const budgetParam = params.get('budget')

    if (locParam || brandParam || bodyTypeParam || fuelTypeParam || transmissionParam || budgetParam) {
      setFilters((prev) => {
        let maxPrice = prev.maxPrice
        if (budgetParam) {
          const parts = budgetParam.split('-')
          if (parts[1]) maxPrice = Number(parts[1]) || prev.maxPrice
        }
        return {
          ...prev,
          locations: locParam ? [locParam] : prev.locations,
          brands: brandParam ? [brandParam] : prev.brands,
          bodyTypes: bodyTypeParam ? [bodyTypeParam] : prev.bodyTypes,
          fuelTypes: fuelTypeParam ? [fuelTypeParam] : prev.fuelTypes,
          transmissions: transmissionParam ? [transmissionParam] : prev.transmissions,
          maxPrice,
        }
      })
    }
  }, [params])

  // Try optional live backend fetch, but seamlessly preserve mock data on failure
  useEffect(() => {
    let isMounted = true
    apiFetch<ApiVehicle[]>('/vehicles')
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setVehicles(data.map((raw, i) => mapApiVehicle(raw, i)))
        }
      })
      .catch(() => {
        // Backend not running; preserve rich mockVehicles
      })
    return () => {
      isMounted = false
    }
  }, [])

  // Location tabs helpers
  const udaipurCount = useMemo(() => vehicles.filter((v) => v.outletCity === 'Udaipur').length, [vehicles])
  const chittorgarhCount = useMemo(() => vehicles.filter((v) => v.outletCity === 'Chittorgarh').length, [vehicles])

  const selectedOutletCity = filters.locations.length === 1 ? filters.locations[0] : null
  const selectedOutletInfo = outlets.find((o) => o.city.toLowerCase() === selectedOutletCity?.toLowerCase())

  // Filtering and Sorting computation
  const filtered = useMemo(() => {
    let list = vehicles.filter((v) => {
      // Location / Outlet
      if (filters.locations.length > 0) {
        const matchesLocation = filters.locations.some(
          (loc) => v.outletCity?.toLowerCase() === loc.toLowerCase() || v.rtoDistrict?.toLowerCase() === loc.toLowerCase(),
        )
        if (!matchesLocation) return false
      }

      // Brand
      if (filters.brands.length > 0 && !filters.brands.includes(v.brand)) {
        return false
      }

      // Body Type
      if (filters.bodyTypes.length > 0 && !filters.bodyTypes.includes(v.bodyType)) {
        return false
      }

      // Fuel Type
      if (filters.fuelTypes.length > 0 && !filters.fuelTypes.includes(v.fuelType)) {
        return false
      }

      // Transmission
      if (filters.transmissions.length > 0 && !filters.transmissions.includes(v.transmission)) {
        return false
      }

      // Ownership
      if (filters.ownerships.length > 0 && !filters.ownerships.includes(v.ownership)) {
        return false
      }

      // Max Price
      if (v.price > filters.maxPrice) {
        return false
      }

      // Quick Curation Presets
      if (activeCuration === 'new-arrivals' && !v.badges?.newArrival) {
        return false
      }
      if (activeCuration === 'suv-4x4' && v.bodyType !== 'SUV' && v.bodyType !== 'MUV') {
        return false
      }
      if (activeCuration === 'german-luxury') {
        const luxuryBrands = ['Mercedes-Benz', 'BMW', 'Audi', 'Porsche', 'Land Rover', 'Jaguar', 'Volvo']
        if (!luxuryBrands.includes(v.brand) && v.bodyType !== 'Luxury') return false
      }
      if (activeCuration === 'automatic' && v.transmission !== 'Automatic') {
        return false
      }
      if (activeCuration === 'under-30l' && v.price > 3000000) {
        return false
      }
      if (activeCuration === 'price-drop' && !v.badges?.priceDrop) {
        return false
      }

      // Text Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const textToMatch = `${v.brand} ${v.model} ${v.variant} ${v.year} ${v.color} ${v.rtoCode} ${v.outletCity} ${v.features.join(' ')}`.toLowerCase()
        if (!textToMatch.includes(q)) return false
      }

      return true
    })

    list = [...list].sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'year-desc':
          return b.year - a.year
        case 'km-asc':
          return a.kmDriven - b.kmDriven
        default:
          if (a.badges.newArrival && !b.badges.newArrival) return -1
          if (!a.badges.newArrival && b.badges.newArrival) return 1
          return 0
      }
    })

    return list
  }, [vehicles, filters, activeCuration, searchQuery, sort])

  function handleLocationTabClick(city: string | null) {
    const nextLocations = city ? [city] : []
    setFilters((prev) => ({ ...prev, locations: nextLocations }))

    const nextParams = new URLSearchParams(params)
    if (city) {
      nextParams.set('location', city)
    } else {
      nextParams.delete('location')
      nextParams.delete('outlet')
      nextParams.delete('city')
    }
    setParams(nextParams, { replace: true })
  }

  function handleResetAll() {
    setFilters(emptyFilterState)
    setSearchQuery('')
    setActiveCuration('all')
    setParams(new URLSearchParams(), { replace: true })
  }

  const hasActiveFilters =
    filters.locations.length > 0 ||
    filters.brands.length > 0 ||
    filters.bodyTypes.length > 0 ||
    filters.fuelTypes.length > 0 ||
    filters.transmissions.length > 0 ||
    filters.ownerships.length > 0 ||
    filters.maxPrice < 15000000 ||
    activeCuration !== 'all' ||
    Boolean(searchQuery)

  return (
    <div className="min-h-screen bg-paper">
      {/* 1. CINEMATIC LUXURY HERO HEADER */}
      <section className="relative bg-ink text-white pt-32 sm:pt-36 pb-14 sm:pb-18 overflow-hidden">
        {/* Subtle Ambient Glowing Gradients */}
        <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 -right-20 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Geometric Matrix Pattern */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="container-lk relative z-10">
          {/* Heritage Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 border border-white/20 text-white/90 text-[11px] font-bold uppercase tracking-[0.2em] mb-4 backdrop-blur-md">
            <Sparkles className="h-3 w-3 text-amber-300" />
            <span>2002 – 2026 &bull; Rajasthan&apos;s Trusted Luxury Destination</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight">
                THE CERTIFIED COLLECTION
              </h1>
              <p className="text-white/70 text-xs sm:text-base mt-3 leading-relaxed">
                Explore handpicked, 200-point inspected pre-owned luxury sedans, rugged 4x4 SUVs, and executive cars with
                clean title guarantee and instant RTO transfer across Rajasthan.
              </p>
            </div>

            {/* Quick Stats Box in Hero */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-white/5 border border-white/10 p-4 backdrop-blur-md rounded-[2px] shrink-0">
              <div className="border-r border-white/10 pr-3">
                <span className="text-2xl font-black font-[family-name:var(--font-display)] text-amber-300 block">
                  {vehicles.length}+
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-white/60">Cars in Stock</span>
              </div>
              <div className="border-r border-white/10 pr-3">
                <span className="text-2xl font-black font-[family-name:var(--font-display)] text-emerald-400 block">
                  200
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-white/60">Points Inspected</span>
              </div>
              <div>
                <span className="text-2xl font-black font-[family-name:var(--font-display)] text-white block">
                  100%
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-white/60">RC Transfer Free</span>
              </div>
            </div>
          </div>

          {/* 4 Trust Highlights Pill Bar */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 mt-8 pt-6 border-t border-white/15 text-xs text-white/80">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> 200-Point Physical &amp; OBD Diagnostic
            </span>
            <span className="text-white/20 hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-amber-300" /> Zero Odometer Tampering Guarantee
            </span>
            <span className="text-white/20 hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-white" /> 30-Min Fast Loan Desk (9+ Banks)
            </span>
            <span className="text-white/20 hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1.5">
              <Car className="h-3.5 w-3.5 text-amber-400" /> Free Doorstep Test Drive
            </span>
          </div>
        </div>
      </section>

      {/* 2. DUAL SHOWROOM LOCATION SWITCHBOARD */}
      <section className="bg-mist border-b border-line py-5">
        <div className="container-lk">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate flex items-center gap-1.5 shrink-0">
                <Building2 className="h-3.5 w-3.5 text-amber-500" /> Choose Showroom:
              </span>
            </div>

            {/* 3 Location Tab Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full md:w-auto">
              <button
                type="button"
                onClick={() => handleLocationTabClick(null)}
                className={cn(
                  'flex items-center justify-between gap-3 px-4 py-2.5 text-xs font-bold uppercase tracking-wider border transition-all text-left',
                  filters.locations.length === 0
                    ? 'bg-ink text-paper border-ink shadow-sm'
                    : 'bg-paper text-ink border-line hover:border-ink hover:bg-white',
                )}
              >
                <div className="flex items-center gap-2">
                  <Building2 className="h-3.5 w-3.5" />
                  <span>All Showrooms</span>
                </div>
                <span
                  className={cn(
                    'text-[10px] px-2 py-0.5 font-bold',
                    filters.locations.length === 0 ? 'bg-white/20 text-paper' : 'bg-mist text-slate',
                  )}
                >
                  {vehicles.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleLocationTabClick('Udaipur')}
                className={cn(
                  'flex items-center justify-between gap-3 px-4 py-2.5 text-xs font-bold uppercase tracking-wider border transition-all text-left',
                  filters.locations.includes('Udaipur') && filters.locations.length === 1
                    ? 'bg-ink text-paper border-ink shadow-sm'
                    : 'bg-paper text-ink border-line hover:border-ink hover:bg-white',
                )}
              >
                <div className="flex items-center gap-2">
                  <MapPin
                    className={cn(
                      'h-3.5 w-3.5',
                      filters.locations.includes('Udaipur') && filters.locations.length === 1
                        ? 'text-amber-300'
                        : 'text-amber-600',
                    )}
                  />
                  <span>Udaipur (100 Ft Rd)</span>
                </div>
                <span
                  className={cn(
                    'text-[10px] px-2 py-0.5 font-bold',
                    filters.locations.includes('Udaipur') && filters.locations.length === 1
                      ? 'bg-white/20 text-paper'
                      : 'bg-mist text-slate',
                  )}
                >
                  {udaipurCount}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleLocationTabClick('Chittorgarh')}
                className={cn(
                  'flex items-center justify-between gap-3 px-4 py-2.5 text-xs font-bold uppercase tracking-wider border transition-all text-left',
                  filters.locations.includes('Chittorgarh') && filters.locations.length === 1
                    ? 'bg-ink text-paper border-ink shadow-sm'
                    : 'bg-paper text-ink border-line hover:border-ink hover:bg-white',
                )}
              >
                <div className="flex items-center gap-2">
                  <Sparkles
                    className={cn(
                      'h-3.5 w-3.5',
                      filters.locations.includes('Chittorgarh') && filters.locations.length === 1
                        ? 'text-amber-300'
                        : 'text-amber-600',
                    )}
                  />
                  <span>Chittorgarh (NH-27)</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 bg-amber-400 text-ink rounded-full uppercase">
                    New
                  </span>
                </div>
                <span
                  className={cn(
                    'text-[10px] px-2 py-0.5 font-bold',
                    filters.locations.includes('Chittorgarh') && filters.locations.length === 1
                      ? 'bg-white/20 text-paper'
                      : 'bg-mist text-slate',
                  )}
                >
                  {chittorgarhCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SHOWROOM LOCATION INFO CARD (When an outlet is selected) */}
      {selectedOutletInfo && (
        <div className="container-lk mt-6">
          <div className="bg-paper border-l-4 border-l-amber-500 border border-line p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-ink flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-amber-500" />
                  {selectedOutletInfo.name}
                </h2>
                {selectedOutletInfo.isNew && (
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300">
                    🌟 Newly Opened Branch
                  </span>
                )}
              </div>
              <p className="text-xs text-slate max-w-2xl">{selectedOutletInfo.address}</p>
              <p className="text-xs text-slate/80 mt-1 font-medium italic">{selectedOutletInfo.description}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={`tel:${selectedOutletInfo.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 bg-ink text-paper hover:bg-slate text-xs font-bold uppercase tracking-wider px-4 py-2.5 transition-colors shadow-sm"
              >
                <Phone className="h-3.5 w-3.5 text-amber-300" />
                <span>Call Showroom ({selectedOutletInfo.phone})</span>
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-ink border border-line px-4 py-2.5 hover:bg-mist transition-colors uppercase tracking-wider"
              >
                <span>Directions &amp; Map</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 4. CURATED QUICK PRESET CHIPS BAR */}
      <div className="container-lk mt-6">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {CURATION_PRESETS.map((preset) => {
            const isSelected = activeCuration === preset.id
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => setActiveCuration(preset.id)}
                className={cn(
                  'px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border',
                  isSelected
                    ? 'bg-ink text-paper border-ink shadow-sm'
                    : 'bg-paper text-slate border-line hover:border-ink hover:text-ink',
                )}
              >
                {preset.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* 5. MAIN CONTENT AREA */}
      <main className="container-lk py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 xl:gap-10">
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 bg-paper border border-line p-6 shadow-sm">
              <FilterPanel filters={filters} onChange={setFilters} onReset={handleResetAll} />
            </div>
          </aside>

          {/* Right Vehicle Area */}
          <div>
            {/* Toolbar: Search input, View Mode Switcher, Sort Dropdown & Mobile Filter Trigger */}
            <div className="bg-mist border border-line p-3 sm:p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Search input */}
              <div className="relative flex-1 min-w-[240px]">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate" />
                <input
                  type="text"
                  placeholder="Search make, model, variant (e.g. Fortuner, E-Class, Thar, Creta)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-paper border border-line pl-10 pr-10 py-2 text-xs sm:text-sm text-ink placeholder:text-slate/60 focus:outline-none focus:border-ink transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate hover:text-ink"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Controls: View Mode & Sort Dropdown */}
              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                {/* Mobile Filters button */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 text-xs font-bold uppercase tracking-wider border border-ink bg-paper px-3.5 py-2 text-ink shadow-sm"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span>Filters</span>
                  {hasActiveFilters && (
                    <span className="h-4 w-4 rounded-full bg-ink text-paper text-[10px] flex items-center justify-center font-bold">
                      !
                    </span>
                  )}
                </button>

                {/* View Mode Toggle */}
                <div className="hidden sm:flex items-center border border-line bg-paper p-0.5">
                  <button
                    type="button"
                    title="Grid View"
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      'p-1.5 transition-colors',
                      viewMode === 'grid' ? 'bg-ink text-paper' : 'text-slate hover:text-ink',
                    )}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    title="Editorial List View"
                    onClick={() => setViewMode('list')}
                    className={cn(
                      'p-1.5 transition-colors',
                      viewMode === 'list' ? 'bg-ink text-paper' : 'text-slate hover:text-ink',
                    )}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>

                {/* Sort Selector */}
                <div className="w-[180px] sm:w-[200px]">
                  <Select
                    options={sortOptions}
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                    className="!py-1.5 !text-xs !bg-paper"
                  />
                </div>
              </div>
            </div>

            {/* Results Count & Active Filter Pills Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-line">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-ink">
                Showing{' '}
                <span className="text-emerald-700 font-extrabold">{filtered.length}</span>{' '}
                {filtered.length === 1 ? 'Certified Car' : 'Certified Cars'}
                {selectedOutletCity && <span className="text-slate font-medium"> in {selectedOutletCity}</span>}
              </p>

              {hasActiveFilters && (
                <button
                  onClick={handleResetAll}
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate hover:text-ink underline uppercase tracking-wider"
                >
                  <RotateCcw className="h-3 w-3" /> Clear All Filters
                </button>
              )}
            </div>

            {/* Removable Active Filter Chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-mist border border-line text-xs">
                <span className="text-slate font-semibold uppercase tracking-wider text-[10px] mr-1">Active:</span>

                {filters.locations.map((loc) => (
                  <span
                    key={loc}
                    className="inline-flex items-center gap-1.5 bg-paper border border-line px-2.5 py-1 text-ink font-medium shadow-2xs"
                  >
                    <MapPin className="h-3 w-3 text-amber-600" /> {loc} Showroom
                    <button
                      onClick={() =>
                        setFilters({ ...filters, locations: filters.locations.filter((l) => l !== loc) })
                      }
                      className="hover:text-red-600 ml-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}

                {filters.brands.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1.5 bg-paper border border-line px-2.5 py-1 text-ink font-medium shadow-2xs"
                  >
                    {b}
                    <button
                      onClick={() => setFilters({ ...filters, brands: filters.brands.filter((brand) => brand !== b) })}
                      className="hover:text-red-600 ml-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}

                {filters.bodyTypes.map((bt) => (
                  <span
                    key={bt}
                    className="inline-flex items-center gap-1.5 bg-paper border border-line px-2.5 py-1 text-ink font-medium shadow-2xs"
                  >
                    {bt}
                    <button
                      onClick={() =>
                        setFilters({ ...filters, bodyTypes: filters.bodyTypes.filter((type) => type !== bt) })
                      }
                      className="hover:text-red-600 ml-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}

                {filters.fuelTypes.map((ft) => (
                  <span
                    key={ft}
                    className="inline-flex items-center gap-1.5 bg-paper border border-line px-2.5 py-1 text-ink font-medium shadow-2xs"
                  >
                    {ft}
                    <button
                      onClick={() =>
                        setFilters({ ...filters, fuelTypes: filters.fuelTypes.filter((fuel) => fuel !== ft) })
                      }
                      className="hover:text-red-600 ml-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}

                {filters.transmissions.map((tr) => (
                  <span
                    key={tr}
                    className="inline-flex items-center gap-1.5 bg-paper border border-line px-2.5 py-1 text-ink font-medium shadow-2xs"
                  >
                    {tr}
                    <button
                      onClick={() =>
                        setFilters({ ...filters, transmissions: filters.transmissions.filter((t) => t !== tr) })
                      }
                      className="hover:text-red-600 ml-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}

                {filters.maxPrice < 15000000 && (
                  <span className="inline-flex items-center gap-1.5 bg-paper border border-line px-2.5 py-1 text-ink font-medium shadow-2xs">
                    Max: {formatINR(filters.maxPrice)}
                    <button
                      onClick={() => setFilters({ ...filters, maxPrice: 15000000 })}
                      className="hover:text-red-600 ml-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}

                {activeCuration !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 bg-paper border border-line px-2.5 py-1 text-ink font-medium shadow-2xs">
                    Curation: {CURATION_PRESETS.find((p) => p.id === activeCuration)?.label}
                    <button onClick={() => setActiveCuration('all')} className="hover:text-red-600 ml-0.5">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}

                {searchQuery && (
                  <span className="inline-flex items-center gap-1.5 bg-paper border border-line px-2.5 py-1 text-ink font-medium shadow-2xs">
                    Query: &quot;{searchQuery}&quot;
                    <button onClick={() => setSearchQuery('')} className="hover:text-red-600 ml-0.5">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Vehicle Listings or Empty State */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-20 px-6 border border-dashed border-line bg-paper">
                <div className="h-16 w-16 rounded-full bg-mist flex items-center justify-center mb-4 border border-line">
                  <SearchX className="h-8 w-8 text-slate" strokeWidth={1.5} />
                </div>
                <h2 className="font-extrabold text-xl text-ink mb-1 font-[family-name:var(--font-display)]">
                  No Cars Found Matching Your Selection
                </h2>
                <p className="text-xs sm:text-sm text-slate max-w-md mb-6 leading-relaxed">
                  Try widening your budget range, resetting brand filters, or switching between our Udaipur and Chittorgarh showrooms.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button variant="primary" onClick={handleResetAll}>
                    Reset All Filters
                  </Button>
                  {filters.locations.length > 0 && (
                    <Button variant="secondary" onClick={() => handleLocationTabClick(null)}>
                      Browse All {vehicles.length} Showroom Cars
                    </Button>
                  )}
                </div>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.map((v) => (
                    <div key={v.id}>
                      <VehicleCard vehicle={v} layout="grid" />
                    </div>
                  ))}
                </div>

                {/* Inline VIP Sourcing Card */}
                <div className="bg-ink text-white p-6 sm:p-8 border border-white/20 mt-8 relative overflow-hidden">
                  <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="max-w-xl">
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-300 mb-2">
                        <Sparkles className="h-3 w-3" />
                        <span>Bespoke Car Sourcing Concierge</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-display)]">
                        Looking for a Specific Model or Color?
                      </h3>
                      <p className="text-xs sm:text-sm text-white/70 mt-1 leading-relaxed">
                        Can&apos;t find your desired Mercedes, BMW, Audi, or 4x4 Thar? Our direct Rajasthan dealer network
                        sources certified pre-owned vehicles tailored to your specification within 7 days.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      <a
                        href="https://wa.me/919694266827?text=Hi%20Love%20Kush%20Cars,%20I%20am%20looking%20for%20a%20specific%20vehicle%20not%20currently%20in%20your%20inventory."
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-white text-ink text-xs font-bold uppercase tracking-wider px-5 py-3 hover:bg-white/90 transition-all shadow-md"
                      >
                        <MessageCircle className="h-4 w-4 text-emerald-600" />
                        <span>Request A Car On WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Editorial List View */
              <div className="space-y-6">
                {filtered.map((v) => (
                  <VehicleCard key={v.id} vehicle={v} layout="list" />
                ))}

                {/* Inline VIP Sourcing Card in List View */}
                <div className="bg-ink text-white p-6 sm:p-8 border border-white/20 relative overflow-hidden">
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 block mb-1">
                        Bespoke Vehicle Sourcing
                      </span>
                      <h3 className="text-xl font-bold font-[family-name:var(--font-display)]">
                        Looking for a Specific Trim or Luxury Spec?
                      </h3>
                      <p className="text-xs text-white/70 mt-1">
                        Our sourcing team will procure and inspect any car across Rajasthan within 7 business days.
                      </p>
                    </div>
                    <a
                      href="https://wa.me/919694266827?text=Hi%20Love%20Kush%20Cars,%20I%20am%20looking%20for%20a%20specific%20vehicle%20not%20currently%20in%20your%20inventory."
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-white text-ink text-xs font-bold uppercase tracking-wider px-5 py-3 hover:bg-white/90 transition-all shrink-0"
                    >
                      <MessageCircle className="h-4 w-4 text-emerald-600" />
                      <span>Request Car On WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 6. TRUST & GUARANTEE SECTION (Footer Assurance) */}
      <section className="bg-mist border-t border-line py-14 sm:py-18">
        <div className="container-lk">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-xs uppercase font-extrabold tracking-[0.2em] text-slate mb-2">The Love Kush Guarantee</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-[family-name:var(--font-display)] text-ink">
              Buy With 100% Peace Of Mind
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-paper border border-line p-6 hover:shadow-soft transition-all">
              <ShieldCheck className="h-8 w-8 text-emerald-600 mb-3" strokeWidth={1.5} />
              <h3 className="text-sm font-bold uppercase tracking-wide text-ink mb-1.5">200-Point Inspection</h3>
              <p className="text-xs text-slate leading-relaxed">
                Every vehicle passes rigorous engine compression, suspension, transmission, electronics, and OBD diagnostic checks.
              </p>
            </div>

            <div className="bg-paper border border-line p-6 hover:shadow-soft transition-all">
              <CheckCircle2 className="h-8 w-8 text-amber-600 mb-3" strokeWidth={1.5} />
              <h3 className="text-sm font-bold uppercase tracking-wide text-ink mb-1.5">Zero Meter Tampering</h3>
              <p className="text-xs text-slate leading-relaxed">
                Odometer readings are verified against official service history and government RTO database records.
              </p>
            </div>

            <div className="bg-paper border border-line p-6 hover:shadow-soft transition-all">
              <Landmark className="h-8 w-8 text-ink mb-3" strokeWidth={1.5} />
              <h3 className="text-sm font-bold uppercase tracking-wide text-ink mb-1.5">Instant Banking EMI</h3>
              <p className="text-xs text-slate leading-relaxed">
                Fast-track financing from HDFC, ICICI, SBI, Axis, and Kotak with lowest interest rates from 10.5% p.a.
              </p>
            </div>

            <div className="bg-paper border border-line p-6 hover:shadow-soft transition-all">
              <Car className="h-8 w-8 text-slate mb-3" strokeWidth={1.5} />
              <h3 className="text-sm font-bold uppercase tracking-wide text-ink mb-1.5">Free RTO Transfer</h3>
              <p className="text-xs text-slate leading-relaxed">
                Complete documentation, transfer of ownership, and pan-India NOC handled entirely by our in-house RTO desk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. MOBILE FILTERS DRAWER MODAL */}
      <Modal
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        className="w-full max-w-md p-6 h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-line">
          <h2 className="font-extrabold text-sm uppercase tracking-widest text-ink">Filter Inventory</h2>
          <button onClick={() => setMobileFiltersOpen(false)} className="p-1 hover:text-slate">
            <X className="h-5 w-5" />
          </button>
        </div>
        <FilterPanel
          filters={filters}
          onChange={setFilters}
          onReset={() => {
            handleResetAll()
            setMobileFiltersOpen(false)
          }}
        />
        <div className="sticky bottom-0 bg-paper pt-4 mt-6 border-t border-line">
          <Button className="w-full" size="lg" onClick={() => setMobileFiltersOpen(false)}>
            Show {filtered.length} {filtered.length === 1 ? 'Car' : 'Cars'}
          </Button>
        </div>
      </Modal>
    </div>
  )
}
