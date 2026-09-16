import { motion } from 'framer-motion'
import { Star, Quote, CheckCircle2 } from 'lucide-react'
import { testimonials } from '@/data/mockVehicles'

export function TestimonialsSection() {
  return (
    <section className="bg-mist py-16 sm:py-24 border-y border-line">
      <div className="container-lk">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-paper border border-line text-[10px] font-bold uppercase tracking-widest text-slate mb-3">
            <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
            <span>4.9★ Customer Satisfaction Across Mewar</span>
          </div>

          <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl text-ink">
            TRUSTED BY 20,000+ CAR OWNERS
          </h2>

          <p className="text-xs sm:text-sm text-slate mt-2 max-w-xl mx-auto leading-relaxed">
            Real stories from buyers and sellers across Udaipur, Chittorgarh, Bhilwara, and Rajasthan who found their
            dream cars with us.
          </p>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-paper p-6 sm:p-8 border border-line flex flex-col justify-between hover:border-ink hover:shadow-elevated transition-all duration-300 relative group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="h-5 w-5 text-slate/30 group-hover:text-ink transition-colors" />
                </div>

                <p className="text-xs sm:text-sm leading-relaxed text-slate italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-line mt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs sm:text-sm text-ink block">{t.customerName}</span>
                    <span className="text-[11px] text-slate/70 block mt-0.5">
                      Rajasthan Customer
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Verified Buyer
                  </span>
                </div>

                <div className="mt-3 p-2 bg-mist border border-line text-[11px] font-semibold text-ink truncate">
                  🚗 Purchased: {t.vehiclePurchased}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
