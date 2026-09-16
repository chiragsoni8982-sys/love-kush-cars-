import { motion } from 'framer-motion'
import { ShieldCheck, Award, Handshake, MapPin } from 'lucide-react'

const STATS = [
  { value: '15+ Years', label: 'Legacy in Rajasthan', sub: 'Founded on Trust & Transparency' },
  { value: '10,000+', label: 'Vehicles Financed', sub: 'Across Udaipur, Chittorgarh & Beyond' },
  { value: '98.4%', label: 'Approval Success Rate', sub: 'Highest Multi-Bank Conversion' },
  { value: '9+ Partners', label: 'Top Tier Lenders', sub: 'Bidding For Your Best Rate' },
]

export function WhyFinanceLoveKush() {
  return (
    <section className="bg-ink text-paper py-16 sm:py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at 80% 20%, #2e2e2e 0%, transparent 60%)',
        }}
      />

      <div className="container-lk relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Story */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 border border-white/15 text-white/90 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              <Award className="h-3.5 w-3.5 text-amber-300" />
              <span>Why Finance With Us</span>
            </div>

            <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl md:text-5xl text-paper leading-tight">
              Financing Built on 15 Years of Rajasthan Trust
            </h2>

            <p className="text-white/70 text-xs sm:text-sm md:text-base mt-4 leading-relaxed max-w-2xl">
              Unlike traditional brokers who push you toward a single high-commission bank, Love Kush Cars operates an
              independent multi-bank desk. We compare loan offers across all 9 premier lending partners simultaneously,
              guaranteeing you the lowest EMI, maximum loan amount, and seamless doorstep service.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="p-4 bg-white/5 border border-white/10 rounded-[2px]">
                <div className="flex items-center gap-2 text-paper font-bold text-sm mb-1">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>Single-Window Multi-Bank Desk</span>
                </div>
                <p className="text-xs text-white/60">
                  Fill one simple form and let HDFC, ICICI, AU Bank, Mahindra Finance &amp; others compete for your file.
                </p>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-[2px]">
                <div className="flex items-center gap-2 text-paper font-bold text-sm mb-1">
                  <Handshake className="h-4 w-4 text-amber-300" />
                  <span>Dedicated In-House Loan Manager</span>
                </div>
                <p className="text-xs text-white/60">
                  Your dedicated finance relationship manager manages all bank paperwork, physical verification, and disbursement.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-white/70">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-white" /> Udaipur Main Showroom (RJ27)
              </span>
              <span className="text-white/30">&bull;</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-amber-300" /> Chittorgarh Outlet (RJ09)
              </span>
            </div>
          </div>

          {/* Right Column: Key Statistics Matrix & Consultation Photo */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="h-44 w-full overflow-hidden border border-white/10 relative">
              <img
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80"
                alt="Love Kush Cars Finance Desk"
                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent flex items-end p-4">
                <div>
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">
                    Transparent Auto Advisory
                  </span>
                  <span className="text-xs font-semibold text-paper">
                    Dedicated Single-Window Lending Desk in Udaipur &amp; Chittorgarh
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-[#191919] border border-white/10 p-5 flex flex-col justify-center text-center sm:text-left hover:border-white/25 transition-colors"
                >
                  <span className="font-[family-name:var(--font-display)] font-extrabold text-2xl sm:text-3xl text-paper">
                    {stat.value}
                  </span>
                  <span className="text-[11px] font-bold text-white/90 mt-1 uppercase tracking-wide">
                    {stat.label}
                  </span>
                  <span className="text-[10px] text-white/50 mt-0.5">{stat.sub}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
