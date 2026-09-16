import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, Phone, ArrowRight, Building2, Sparkles } from 'lucide-react'
import { outlets, mockVehicles } from '@/data/mockVehicles'

export function OutletShowcase() {
  const udaipurCount = mockVehicles.filter((v) => v.outletCity === 'Udaipur').length
  const chittorgarhCount = mockVehicles.filter((v) => v.outletCity === 'Chittorgarh').length

  return (
    <section className="bg-mist border-b border-line py-12 sm:py-16">
      <div className="container-lk">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-paper border border-line text-[10px] font-bold uppercase tracking-widest text-slate mb-2">
              <Building2 className="h-3 w-3 text-ink" />
              <span>Dual Showroom Network in Rajasthan</span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] font-extrabold text-2xl sm:text-3xl text-ink">
              Choose Your Nearest Showroom
            </h2>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink hover:underline"
          >
            <span>View Showroom Map &amp; Directions</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* 2 Outlet Banner Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {outlets.map((outlet, idx) => {
            const isChittor = outlet.city === 'Chittorgarh'
            const stockCount = isChittor ? chittorgarhCount : udaipurCount
            return (
              <motion.div
                key={outlet.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-paper border border-line p-6 sm:p-7 flex flex-col justify-between hover:border-ink hover:shadow-elevated transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-ink flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-amber-500" />
                      {outlet.name}
                    </span>
                    {outlet.isNew && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold uppercase tracking-wider rounded-full">
                        <Sparkles className="h-2.5 w-2.5" /> New Branch
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate/80 leading-relaxed mb-4">{outlet.address}</p>

                  <div className="flex items-center gap-4 text-xs text-slate/70 mb-5">
                    <span className="flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5 text-slate" /> {outlet.phone}
                    </span>
                    <span>&bull;</span>
                    <span className="font-bold text-ink">{stockCount}+ Certified Cars in Stock</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-line flex items-center justify-between">
                  <Link
                    to={`/inventory?location=${encodeURIComponent(outlet.city)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink group-hover:translate-x-1 transition-transform"
                  >
                    <span>Browse {outlet.city} Stock</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <a
                    href={`tel:${outlet.phone.replace(/\s+/g, '')}`}
                    className="text-xs text-slate hover:text-ink font-semibold"
                  >
                    Direct Call &rarr;
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
