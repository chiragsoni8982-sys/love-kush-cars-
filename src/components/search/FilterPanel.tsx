import { useState, type ReactNode } from 'react'
import { MapPin, Sparkles, Search, RotateCcw } from 'lucide-react'
import { Slider } from '@/components/ui/Slider'
import { Chip } from '@/components/ui/Chip'
import { formatINR } from '@/lib/utils'
import { outlets, mockVehicles } from '@/data/mockVehicles'
import type { BodyType, FuelType, Transmission, Ownership } from '@/types'

const bodyTypes: BodyType[] = ['SUV', 'Sedan', 'Luxury', 'Hatchback', 'MUV', 'Coupe']
const fuelTypes: FuelType[] = ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid']
const transmissions: Transmission[] = ['Automatic', 'Manual']
const ownerships: Ownership[] = ['1st Owner', '2nd Owner', '3rd Owner', '4th+ Owner']

const BUDGET_PRESETS = [
  { label: 'Under ₹20L', max: 2000000 },
  { label: 'Under ₹40L', max: 4000000 },
  { label: 'Under ₹75L', max: 7500000 },
  { label: 'Any Budget', max: 15000000 },
]

export interface FilterState {
  locations: string[]
  brands: string[]
  bodyTypes: string[]
  fuelTypes: string[]
  transmissions: string[]
  ownerships: string[]
  maxPrice: number
  searchQuery?: string
}

export const emptyFilterState: FilterState = {
  locations: [],
  brands: [],
  bodyTypes: [],
  fuelTypes: [],
  transmissions: [],
  ownerships: [],
  maxPrice: 15000000,
  searchQuery: '',
}

interface FilterPanelProps {
  filters: FilterState
  onChange: (next: FilterState) => void
  onReset: () => void
}

function toggle(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

function Section({
  title,
  count = 0,
  defaultOpen = true,
  children,
}: {
  title: string
  count?: number
  defaultOpen?: boolean
  children: ReactNode
}) {
  return (
    <details className="border-b border-line py-4 group" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-extrabold uppercase tracking-wider text-ink select-none">
        <span className="flex items-center gap-2">
          {title}
          {count > 0 && (
            <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-ink text-paper text-[10px] font-bold">
              {count}
            </span>
          )}
        </span>
        <span className="text-slate transition-transform duration-200 group-open:rotate-180 text-xs font-bold">&#9662;</span>
      </summary>
      <div className="mt-3.5 flex flex-wrap gap-1.5">{children}</div>
    </details>
  )
}

export function FilterPanel({ filters, onChange, onReset }: FilterPanelProps) {
  const [brandSearch, setBrandSearch] = useState('')

  // Extract all unique brands actually present in mock data plus sort alphabetically
  const availableBrands = Array.from(new Set(mockVehicles.map((v) => v.brand))).sort()

  const displayedBrands = brandSearch.trim()
    ? availableBrands.filter((b) => b.toLowerCase().includes(brandSearch.toLowerCase()))
    : availableBrands

  const hasActiveFilters =
    filters.locations.length > 0 ||
    filters.brands.length > 0 ||
    filters.bodyTypes.length > 0 ||
    filters.fuelTypes.length > 0 ||
    filters.transmissions.length > 0 ||
    filters.ownerships.length > 0 ||
    filters.maxPrice < 15000000 ||
    Boolean(filters.searchQuery)

  return (
    <div className="space-y-1">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-line">
        <div className="flex items-center gap-2">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-ink">Filter Inventory</p>
          {hasActiveFilters && (
            <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 border border-amber-300">
              Active
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs font-bold text-slate hover:text-ink underline underline-offset-4 transition-colors"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        )}
      </div>

      {/* 1. Showroom Outlet / Location */}
      <Section title="Showroom Outlet" count={filters.locations.length}>
        {outlets.map((outlet) => {
          const isSelected = filters.locations.includes(outlet.city)
          const carCount = mockVehicles.filter((v) => v.outletCity === outlet.city).length
          return (
            <button
              key={outlet.id}
              type="button"
              onClick={() => onChange({ ...filters, locations: toggle(filters.locations, outlet.city) })}
              className={`w-full flex items-center justify-between p-2.5 text-xs font-medium border transition-all ${
                isSelected
                  ? 'bg-ink text-paper border-ink shadow-sm'
                  : 'bg-paper text-ink border-line hover:border-ink hover:bg-mist/60'
              }`}
            >
              <span className="flex items-center gap-1.5 font-semibold">
                <MapPin className={`h-3 w-3 ${isSelected ? 'text-amber-300' : 'text-amber-600'}`} />
                {outlet.city} Showroom
                {outlet.isNew && (
                  <span
                    className={`inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.2 uppercase ${
                      isSelected ? 'bg-amber-400 text-ink' : 'bg-amber-100 text-amber-900 border border-amber-300'
                    }`}
                  >
                    <Sparkles className="h-2 w-2" /> New
                  </span>
                )}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 ${
                  isSelected ? 'bg-white/20 text-paper' : 'bg-mist text-slate border border-line'
                }`}
              >
                {carCount} Cars
              </span>
            </button>
          )
        })}
      </Section>

      {/* 2. Brand Filter */}
      <Section title="Car Brand" count={filters.brands.length}>
        {availableBrands.length > 6 && (
          <div className="w-full relative mb-2">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-slate" />
            <input
              type="text"
              placeholder="Search make (e.g. BMW, Audi)..."
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              className="w-full bg-mist border border-line pl-7 pr-3 py-1.5 text-xs text-ink placeholder:text-slate/60 focus:outline-none focus:border-ink"
            />
          </div>
        )}
        {displayedBrands.map((b) => {
          const brandCount = mockVehicles.filter((v) => v.brand === b).length
          return (
            <Chip
              key={b}
              active={filters.brands.includes(b)}
              onClick={() => onChange({ ...filters, brands: toggle(filters.brands, b) })}
              className="text-xs"
            >
              <span>{b}</span>
              <span className="text-[10px] opacity-70">({brandCount})</span>
            </Chip>
          )
        })}
      </Section>

      {/* 3. Body Type */}
      <Section title="Body Type" count={filters.bodyTypes.length}>
        {bodyTypes.map((b) => {
          const count = mockVehicles.filter((v) => v.bodyType === b).length
          return (
            <Chip
              key={b}
              active={filters.bodyTypes.includes(b)}
              onClick={() => onChange({ ...filters, bodyTypes: toggle(filters.bodyTypes, b) })}
            >
              <span>{b}</span>
              {count > 0 && <span className="text-[10px] opacity-70">({count})</span>}
            </Chip>
          )
        })}
      </Section>

      {/* 4. Fuel Type */}
      <Section title="Fuel Type" count={filters.fuelTypes.length}>
        {fuelTypes.map((f) => (
          <Chip
            key={f}
            active={filters.fuelTypes.includes(f)}
            onClick={() => onChange({ ...filters, fuelTypes: toggle(filters.fuelTypes, f) })}
          >
            {f}
          </Chip>
        ))}
      </Section>

      {/* 5. Transmission */}
      <Section title="Transmission" count={filters.transmissions.length}>
        {transmissions.map((t) => (
          <Chip
            key={t}
            active={filters.transmissions.includes(t)}
            onClick={() => onChange({ ...filters, transmissions: toggle(filters.transmissions, t) })}
          >
            {t}
          </Chip>
        ))}
      </Section>

      {/* 6. Ownership */}
      <Section title="Ownership" count={filters.ownerships.length} defaultOpen={false}>
        {ownerships.map((o) => (
          <Chip
            key={o}
            active={filters.ownerships.includes(o)}
            onClick={() => onChange({ ...filters, ownerships: toggle(filters.ownerships, o) })}
          >
            {o}
          </Chip>
        ))}
      </Section>

      {/* 7. Max Budget Slider & Fast Presets */}
      <div className="pt-4 pb-2">
        <Slider
          label="Max Budget"
          value={filters.maxPrice}
          min={500000}
          max={15000000}
          step={100000}
          onChange={(v) => onChange({ ...filters, maxPrice: v })}
          formatValue={formatINR}
        />
        <div className="grid grid-cols-2 gap-1.5 mt-3">
          {BUDGET_PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => onChange({ ...filters, maxPrice: preset.max })}
              className={`text-[11px] font-semibold py-1 px-2 border text-center transition-colors ${
                filters.maxPrice === preset.max
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-mist text-slate border-line hover:border-ink hover:text-ink'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
