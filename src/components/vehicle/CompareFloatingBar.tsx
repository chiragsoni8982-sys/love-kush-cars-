import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { GitCompareArrows, X, ArrowRight, ChevronUp, ChevronDown } from 'lucide-react'
import { useCompare } from '@/hooks/useCompare'
import { useVehicles } from '@/hooks/useVehicles'
import { VehicleImage } from './VehicleImage'
import { formatINR } from '@/lib/utils'

export function CompareFloatingBar() {
  const location = useLocation()
  const { compare, removeFromCompare, clearCompare, maxCap } = useCompare()
  const { getVehicleById } = useVehicles()
  const [collapsed, setCollapsed] = useState(false)

  // Don't show floating bar on the compare page itself or when empty
  if (location.pathname === '/compare' || compare.length === 0) {
    return null
  }

  const comparedVehicles = compare
    .map((id) => getVehicleById(id))
    .filter((v): v is NonNullable<typeof v> => Boolean(v))

  return (
    <AnimatePresence>
      <motion.aside
        aria-label="Vehicle comparison dock"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-20 sm:bottom-6 left-3 right-3 sm:left-6 sm:right-auto sm:max-w-xl z-40"
      >
        <div className="bg-ink/95 backdrop-blur-md text-paper border border-white/15 shadow-2xl p-3 sm:p-4 rounded-none">
          {/* Header row with counter & collapse */}
          <div className="flex items-center justify-between gap-3 pb-2 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold uppercase tracking-wider text-[11px] text-paper">
                Comparing {compare.length} of {maxCap} Vehicles
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={clearCompare}
                className="text-[11px] text-paper/60 hover:text-paper transition-colors underline underline-offset-2"
              >
                Clear all
              </button>
              <button
                onClick={() => setCollapsed((v) => !v)}
                aria-label={collapsed ? 'Expand comparison dock' : 'Minimize comparison dock'}
                className="text-paper/60 hover:text-paper p-0.5"
              >
                {collapsed ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {!collapsed && (
            <div className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Selected Vehicles List */}
              <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-0.5">
                {comparedVehicles.map((car) => (
                  <div
                    key={car.id}
                    className="relative flex items-center gap-2 bg-white/10 p-1.5 pr-2.5 text-left border border-white/10 group shrink-0 max-w-[170px]"
                  >
                    <div className="h-10 w-14 shrink-0 overflow-hidden bg-black/40">
                      <VehicleImage
                        src={car.photoUrl}
                        alt={`${car.brand} ${car.model}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 pr-4">
                      <p className="text-[11px] font-semibold truncate leading-tight">
                        {car.brand} {car.model}
                      </p>
                      <p className="text-[10px] text-paper/70 leading-none mt-1">
                        {formatINR(car.price)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCompare(car.id, `${car.brand} ${car.model}`)}
                      aria-label={`Remove ${car.brand} ${car.model} from compare`}
                      className="absolute top-1 right-1 h-4 w-4 flex items-center justify-center text-paper/60 hover:text-paper bg-black/40 hover:bg-black transition-colors"
                    >
                      <X className="h-2.5 w-2.5" />
                    </button>
                  </div>
                ))}

                {/* Empty slot placeholder */}
                {compare.length < maxCap && (
                  <Link
                    to="/inventory"
                    className="flex items-center justify-center h-13 px-3 border border-dashed border-white/30 text-[11px] text-paper/70 hover:text-paper hover:border-white/60 transition-colors shrink-0 whitespace-nowrap"
                  >
                    + Add {maxCap - compare.length} more
                  </Link>
                )}
              </div>

              {/* Action Button */}
              <Link
                to="/compare"
                className="inline-flex items-center justify-center gap-2 bg-paper text-ink hover:bg-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 transition-colors shrink-0 shadow-sm"
              >
                <GitCompareArrows className="h-3.5 w-3.5" />
                Compare Now
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          )}
        </div>
      </motion.aside>
    </AnimatePresence>
  )
}
