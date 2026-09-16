import { motion } from 'framer-motion'
import { FileText, SearchCheck, Banknote } from 'lucide-react'

const steps = [
  {
    num: '01',
    icon: FileText,
    title: 'Get Instant Online Valuation',
    subtitle: 'Takes 60 seconds',
    desc: 'Enter your car registration number and vehicle condition details to get an instant, transparent valuation based on real Rajasthan market data.',
    points: ['No obligation to sell', 'Live algorithmic estimate', 'Instant inspection slot booking'],
  },
  {
    num: '02',
    icon: SearchCheck,
    title: 'Free Doorstep or Showroom Inspection',
    subtitle: '30-45 minutes only',
    desc: 'Our certified evaluation engineer visits your home or office anywhere across Udaipur, Chittorgarh, or nearby towns for a 150+ point health check at zero cost.',
    points: ['₹0 inspection charges', 'Physical condition appraisal', 'Exact price quote locked on-spot'],
  },
  {
    num: '03',
    icon: Banknote,
    title: 'Instant Payment & Safe RC Transfer',
    subtitle: 'Same-day payout',
    desc: 'Accept our fair offer and receive 100% of the funds directly in your bank account before handover. We take over all legal liability and complete RC transfer smoothly.',
    points: ['Instant RTGS / IMPS credit', 'Legal indemnity handover slip', '100% free RTO transfer'],
  },
]

export function HowItWorksSteps() {
  return (
    <section className="bg-paper py-20 sm:py-28 border-b border-line">
      <div className="container-lk">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-slate mb-3">Simple &amp; Frictionless</p>
          <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl text-ink">
            Sell Your Car in 3 Easy Steps
          </h2>
          <p className="text-sm text-slate/70 mt-3">
            Designed for car owners who value speed, privacy, fair pricing, and complete legal protection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, idx) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="bg-mist/60 border border-line p-8 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-[family-name:var(--font-display)] font-extrabold text-4xl text-ink/20">
                    {s.num}
                  </span>
                  <div className="h-12 w-12 rounded-[2px] bg-ink text-paper flex items-center justify-center">
                    <s.icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                </div>

                <span className="text-[10px] uppercase font-bold tracking-widest text-slate/70 block mb-1">
                  {s.subtitle}
                </span>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-xl text-ink">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate/70 mt-3 leading-relaxed">
                  {s.desc}
                </p>

                <ul className="mt-6 space-y-2 pt-6 border-t border-line/60">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-xs text-ink font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
