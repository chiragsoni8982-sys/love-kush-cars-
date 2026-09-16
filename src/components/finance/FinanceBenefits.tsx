import { motion } from 'framer-motion'
import {
  Sparkles,
  Percent,
  Banknote,
  Clock,
  ShieldCheck,
  FileCheck2,
  BadgePercent,
  Home,
  CheckCircle2,
  Zap,
} from 'lucide-react'

const BENEFITS = [
  {
    icon: Banknote,
    title: 'Up to 100% On-Road Funding',
    description:
      'Zero or minimal down payment schemes available for eligible buyers on certified pre-owned cars.',
    highlight: 'Zero Down Payment Options',
  },
  {
    icon: Percent,
    title: 'Competitive Rates (11% to 20% p.a.)',
    description:
      'Special discounted rate tiers for salaried and self-employed professionals through our multi-bank bidding desk.',
    highlight: 'Lowest Multi-Bank Quotes',
  },
  {
    icon: Clock,
    title: 'Fast 30-Minute In-Principle Approval',
    description:
      'Digital application and instant credit checks provide sanction approval without lengthy waiting periods.',
    highlight: 'Instant Online Sanction',
  },
  {
    icon: BadgePercent,
    title: 'Flexible Repayment (12 to 84 Months)',
    description:
      'Customize your monthly EMI with tenure options ranging up to 7 years to fit your monthly budget comfortably.',
    highlight: 'Customized EMI Tenures',
  },
  {
    icon: Home,
    title: 'Doorstep Document Collection',
    description:
      'Our field representatives collect documents at your home or office across Udaipur, Chittorgarh, and surrounding districts.',
    highlight: 'Free Doorstep Service',
  },
  {
    icon: FileCheck2,
    title: 'Zero Paperwork Headache',
    description:
      'Complete end-to-end management of bank documentation, RTO HP endorsement (hypothecation), and loan clearance NOC.',
    highlight: 'Full RTO & Bank Handling',
  },
  {
    icon: ShieldCheck,
    title: '100% Transparent Terms',
    description:
      'No hidden appraisal fees, no surprise administrative levies, and crystal-clear foreclosure & prepayment policies.',
    highlight: 'No Hidden Charges',
  },
  {
    icon: Zap,
    title: 'Multi-Lender Quote Bidding',
    description:
      'Instead of applying to one bank, 9 leading lenders compete for your application to give you the lowest quote.',
    highlight: '9 Banks Compete For You',
  },
]

export function FinanceBenefits() {
  return (
    <section className="container-lk py-16 sm:py-24 border-t border-line">
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-mist border border-line text-slate text-xs font-semibold uppercase tracking-[0.2em] mb-4">
          <Sparkles className="h-3.5 w-3.5 text-ink" />
          <span>The Love Kush Advantage</span>
        </div>

        <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink">
          Benefits of Used Car Loans from Love Kush Cars
        </h2>

        <p className="text-slate text-xs sm:text-sm md:text-base mt-3 leading-relaxed">
          Financing your dream car should be as thrilling as driving it. Here is why thousands of car owners across
          Rajasthan finance with Love Kush Cars.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {BENEFITS.map((benefit, idx) => {
          const Icon = benefit.icon
          return (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-paper border border-line p-6 flex flex-col justify-between hover:border-ink hover:shadow-elevated transition-all duration-300 group"
            >
              <div>
                <div className="h-12 w-12 rounded-[2px] bg-mist flex items-center justify-center mb-5 group-hover:bg-ink group-hover:text-paper transition-colors">
                  <Icon className="h-6 w-6 text-ink group-hover:text-paper transition-colors" />
                </div>

                <span className="text-[10px] uppercase font-bold text-slate/60 tracking-wider block mb-1">
                  {benefit.highlight}
                </span>

                <h3 className="font-[family-name:var(--font-display)] font-bold text-base text-ink mb-2">
                  {benefit.title}
                </h3>

                <p className="text-xs text-slate/80 leading-relaxed">{benefit.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-line/60 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Verified Benefit</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
