import { motion } from 'framer-motion'
import { Building2, ShieldCheck } from 'lucide-react'
import { financePartners } from '@/data/financePartners'

export function FinancePartners() {
  return (
    <section className="container-lk py-14 sm:py-20 border-t border-line">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-mist border border-line text-slate text-xs font-semibold uppercase tracking-[0.2em] mb-3">
          <Building2 className="h-3.5 w-3.5 text-ink" />
          <span>Official Lending Network</span>
        </div>

        <h2 className="font-[family-name:var(--font-display)] font-extrabold text-2xl sm:text-3xl md:text-4xl text-ink">
          Our Banking &amp; Finance Partners
        </h2>

        <p className="text-slate text-xs sm:text-sm mt-2 max-w-2xl mx-auto leading-relaxed">
          Love Kush Cars is an authorized channel partner with India's leading banks and financial institutions,
          bringing you trusted auto loan financing across Rajasthan.
        </p>
      </div>

      {/* 9 Partners Clean Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
        {financePartners.map((partner, idx) => (
          <motion.div
            key={partner.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.04 }}
            className="bg-paper border border-line p-5 sm:p-6 flex items-center gap-4 hover:border-ink/80 hover:shadow-soft transition-all duration-200 group"
          >
            {/* Bank Logo Emblem */}
            <div
              className="h-12 w-12 sm:h-14 sm:w-14 rounded-[2px] flex items-center justify-center shrink-0 border border-line transition-transform duration-200 group-hover:scale-105"
              style={{ backgroundColor: `${partner.brandColor}12` }}
            >
              <span
                className="font-extrabold text-xs sm:text-sm font-[family-name:var(--font-display)] tracking-tighter"
                style={{ color: partner.brandColor }}
              >
                {partner.logoInitial}
              </span>
            </div>

            {/* Bank Name & Subtext */}
            <div className="min-w-0">
              <h3 className="font-[family-name:var(--font-display)] font-bold text-sm sm:text-base text-ink truncate group-hover:text-slate transition-colors">
                {partner.name}
              </h3>
              <p className="text-[11px] text-slate/70 truncate mt-0.5">{partner.subText}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Information Assurance */}
      <div className="mt-8 pt-6 border-t border-line flex items-center justify-center gap-2 text-xs text-slate/80 text-center">
        <ShieldCheck className="h-4 w-4 text-emerald-700 shrink-0" />
        <span>
          Single application evaluated across all 9 partner lenders for transparent in-principle loan approval.
        </span>
      </div>
    </section>
  )
}
