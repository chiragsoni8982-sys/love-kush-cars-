import { motion } from 'framer-motion'
import {
  ShieldCheck,
  FileCheck2,
  Gauge,
  CircleDollarSign,
  Landmark,
  HeartHandshake,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'

const PILLARS = [
  {
    icon: ShieldCheck,
    title: '200+ Point Mechanical & Electrical Certification',
    description:
      'Every vehicle undergoes a rigorous 200+ point diagnostic inspection in our specialized bay covering engine compression, gearbox response, suspension geometry, battery health, and AC performance before display.',
    tag: 'No Compromise Quality',
  },
  {
    icon: Gauge,
    title: 'Zero Meter Tampering & Genuine Service History',
    description:
      'We cross-verify digital odometer readings with authorized brand service networks (Maruti, Hyundai, Toyota, Mercedes, BMW, etc.) to guarantee genuine mileage records on every car we deliver.',
    tag: '100% Genuine Mileage',
  },
  {
    icon: FileCheck2,
    title: 'Non-Accidental & Flood-Free Structural Guarantee',
    description:
      'Our certified technicians inspect structural aprons, pillars, chassis rails, and floor pans with precision paint depth gauges to ensure zero major accident history, non-tampered chassis numbers, and zero flood immersion.',
    tag: 'Certified Structural Integrity',
  },
  {
    icon: Landmark,
    title: 'Complete Legal RC Transfer & Clean RTO Titles',
    description:
      'Zero paperwork headaches for buyers or sellers. Our in-house RTO liaison desk handles complete hypothecation endorsement, bank NOCs, and RC transfer across RJ27 (Udaipur), RJ09 (Chittorgarh), and all Rajasthan RTOs.',
    tag: 'Full RTO Legal Handling',
  },
  {
    icon: CircleDollarSign,
    title: 'Fair Transparent Pricing & 9+ Bank Loan Bidding',
    description:
      'Fixed, fair market pricing benchmarked on genuine car condition. Plus, single-window loan bidding across 9 premier lending partners (HDFC, ICICI, Mahindra Finance, AU Bank) for the lowest EMI rates.',
    tag: 'Lowest Interest Rates',
  },
  {
    icon: HeartHandshake,
    title: 'Multi-Generational Rajasthani Relationship',
    description:
      'We don&apos;t consider a deal finished when keys are handed over. From future trade-in upgrades and doorstep maintenance guidance to friendly advisory over tea, we stand by you for life.',
    tag: 'Lifelong Family Trust',
  },
]

export function TrustPillars() {
  return (
    <section className="bg-ink text-paper py-16 sm:py-24 relative overflow-hidden">
      {/* Subtle background ambient texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle at 20% 80%, #2e2e2e 0%, transparent 60%)',
        }}
      />

      <div className="container-lk relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 border border-white/15 text-white/90 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>The 6 Uncompromising Standards</span>
          </div>

          <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl md:text-5xl text-paper">
            Why 20,000+ Rajasthan Buyers Choose Love Kush Cars
          </h2>

          <p className="text-white/70 text-xs sm:text-sm md:text-base mt-3 leading-relaxed">
            Our reputation was not built overnight. For 24 years, we have adhered to six rigorous pillars that ensure
            every car on our floor meets strict luxury and reliability benchmarks.
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="bg-[#181818] border border-white/10 p-7 flex flex-col justify-between hover:border-white/30 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="h-12 w-12 rounded-[2px] bg-white/10 flex items-center justify-center text-amber-300 group-hover:bg-amber-400 group-hover:text-ink transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-white/5 border border-white/10 text-white/70">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="font-[family-name:var(--font-display)] font-bold text-lg text-paper mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">{pillar.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Guaranteed By Love Kush Cars</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
