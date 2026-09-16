import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Sparkles, SlidersHorizontal } from 'lucide-react'
import { VehicleCard } from '@/components/vehicle/VehicleCard'
import { mockVehicles } from '@/data/mockVehicles'
import { apiFetch } from '@/lib/api'
import { mapApiVehicle, type ApiVehicle } from '@/lib/mapVehicle'
import type { Vehicle } from '@/types'
import { cn } from '@/lib/utils'

const FILTER_TABS = [
  { id: 'all', label: 'All Certified' },
  { id: 'suv', label: 'Luxury & 4x4 SUVs' },
  { id: 'sedan', label: 'Executive Sedans' },
  { id: 'auto', label: 'Automatic Only' },
  { id: 'budget', label: 'Under ₹20 Lakh' },
]

export function FeaturedCollection() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles)

  useEffect(() => {
    let isMounted = true
    apiFetch<ApiVehicle[]>('/vehicles')
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setVehicles(data.map((raw, i) => mapApiVehicle(raw, i)))
        }
      })
      .catch(() => {
        // Fallback to mockVehicles if offline
      })
    return () => {
      isMounted = false
    }
  }, [])

  const filteredVehicles = useMemo(() => {
    switch (activeFilter) {
      case 'suv':
        return vehicles.filter((v) => v.bodyType === 'SUV' || v.bodyType === 'MUV').slice(0, 6)
      case 'sedan':
        return vehicles.filter((v) => v.bodyType === 'Sedan' || v.bodyType === 'Luxury').slice(0, 6)
      case 'auto':
        return vehicles.filter((v) => v.transmission === 'Automatic').slice(0, 6)
      case 'budget':
        return vehicles.filter((v) => v.price <= 2000000).slice(0, 6)
      default:
        return vehicles.filter((v) => v.badges?.featured || v.badges?.certified).slice(0, 6)
    }
  }, [vehicles, activeFilter])

  return (
    <section className="container-lk py-16 sm:py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-mist border border-line text-[10px] font-bold uppercase tracking-widest text-slate mb-2">
            <Sparkles className="h-3 w-3 text-amber-500" />
            <span>Curated Pre-Owned Inventory</span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl text-ink">
            Handpicked For Quality &amp; Performance
          </h2>
          <p className="text-xs sm:text-sm text-slate mt-1 max-w-xl leading-relaxed">
            Every vehicle passes a stringent 200-point physical and OBD diagnostic check before reaching our showroom floor.
          </p>
        </div>

        <Link
          to="/inventory"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink border border-line px-5 py-3 hover:bg-ink hover:text-paper transition-all shrink-0"
        >
          <span>View All 100+ Cars</span>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Filter Tabs Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 border-b border-line">
        <span className="text-xs text-slate font-semibold uppercase tracking-wider flex items-center gap-1 mr-2 shrink-0">
          <SlidersHorizontal className="h-3.5 w-3.5" /> Quick Filter:
        </span>
        {FILTER_TABS.map((tab) => {
          const isSelected = activeFilter === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={cn(
                'px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap rounded-[2px]',
                isSelected
                  ? 'bg-ink text-paper shadow-sm'
                  : 'bg-paper text-slate border border-line hover:border-ink hover:text-ink',
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Vehicles Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Mobile View All Button */}
      <div className="sm:hidden text-center mt-8">
        <Link
          to="/inventory"
          className="w-full inline-flex items-center justify-center gap-2 bg-ink text-paper text-xs font-bold uppercase tracking-wider py-4"
        >
          <span>View All 100+ Certified Cars</span>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
