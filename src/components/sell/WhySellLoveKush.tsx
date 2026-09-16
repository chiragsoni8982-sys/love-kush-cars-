import { motion } from 'framer-motion'
import {
  Banknote,
  ShieldCheck,
  FileCheck2,
  BadgePercent,
  Clock,
  Sparkles,
  Award,
  CheckCircle,
} from 'lucide-react'

const benefits = [
  {
    icon: Banknote,
    tag: 'Instant Payment',
    title: 'Payment Directly In Bank Before Keys Handoff',
    desc: 'No waiting for buyer loan approval or delayed cheques. 100% full amount credited to your bank account via instant RTGS / IMPS before you hand over keys.',
  },
  {
    icon: ShieldCheck,
    tag: 'Zero Cost',
    title: '100% Free Doorstep Vehicle Inspection',
    desc: 'Our certified evaluation engineers inspect 150+ check points right at your doorstep in Udaipur, Chittorgarh, Bhilwara, Rajsamand at ₹0 fee.',
  },
  {
    icon: FileCheck2,
    tag: 'Legal Protection',
    title: 'Hassle-Free RC Transfer & Legal Indemnity',
    desc: 'We handle all RTO documentation, challan verifications, and ownership transfer. You get a signed Legal Handover Certificate protecting you from day one.',
  },
  {
    icon: BadgePercent,
    tag: 'Best Price',
    title: 'Best Market Price Guarantee with Zero Commission',
    desc: 'No middleman broker cuts or dealer commissions. We offer competitive market value based on live Rajasthan and North Indian luxury market demand.',
  },
  {
    icon: Clock,
    tag: 'Fast Turnaround',
    title: 'Sell Your Car In As Little As 24 Hours',
    desc: 'Skip endless test drives and negotiating with random classified strangers. From online valuation to money in bank, complete everything in a single day.',
  },
  {
    icon: Award,
    tag: 'Loan Clearance',
    title: 'Active Loan & Hypothecation Clearance Assistance',
    desc: 'Car still under bank loan? We calculate your loan foreclosure balance, settle directly with your bank/NBFC, and pay the remaining balance to you.',
  },
]

export function WhySellLoveKush() {
  return (
    <section className="bg-ink text-paper py-20 sm:py-28 relative overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 20% 30%, #3a3a3a 0%, transparent 60%)',
        }}
      />

      <div className="container-lk relative z-10">
        <div className="max-w-3xl mb-14 sm:mb-18">
          <p className="text-xs uppercase tracking-[0.25em] text-white/50 mb-3 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" /> Why Sell To Love Kush Cars
          </p>
          <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight">
            The Safest, Fastest Way To Sell Your Luxury &amp; Family Car.
          </h2>
          <p className="text-sm sm:text-base text-white/60 mt-4 leading-relaxed">
            Eliminate all the hassles of traditional car sales — no shady middlemen, no repeated stranger visits, no delayed payments, and zero RTO transfer liability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[#191919] border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-white/25 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-[2px] bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-ink transition-colors">
                    <b.icon className="h-6 w-6" strokeWidth={1.7} />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 bg-white/10 text-white/80 border border-white/5">
                    {b.tag}
                  </span>
                </div>

                <h3 className="font-[family-name:var(--font-display)] font-bold text-lg sm:text-xl text-paper group-hover:text-white leading-snug">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/60 mt-3 leading-relaxed">
                  {b.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-2 text-[11px] font-semibold text-white/40 group-hover:text-white/80 transition-colors">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                <span>Love Kush Verified Promise</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
