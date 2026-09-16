import { motion } from 'framer-motion'
import { FileText, Cpu, CheckCircle2, KeyRound } from 'lucide-react'

const STEPS = [
  {
    step: '01',
    icon: FileText,
    title: 'Submit Online Application',
    description:
      'Choose your vehicle or loan requirement, fill your basic contact & income details in our 2-minute digital form.',
  },
  {
    step: '02',
    icon: Cpu,
    title: 'Instant Multi-Bank Bidding',
    description:
      'Our finance engine compares offers across HDFC, ICICI, Mahindra Finance, AU Bank, etc., to find your lowest interest quote.',
  },
  {
    step: '03',
    icon: CheckCircle2,
    title: 'Fast Doorstep / Digital KYC',
    description:
      'Our relationship manager collects minimal documents at your doorstep or verifies online via Aadhaar OTP.',
  },
  {
    step: '04',
    icon: KeyRound,
    title: 'Instant Sanction & Delivery',
    description:
      'Loan is sanctioned and disbursed directly. Complete vehicle handover and keys delivered on the same or next day.',
  },
]

export function HowFinanceWorks() {
  return (
    <section className="container-lk py-16 sm:py-24 border-t border-line">
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-mist border border-line text-slate text-xs font-semibold uppercase tracking-[0.2em] mb-4">
          <Cpu className="h-3.5 w-3.5 text-ink" />
          <span>Simple 4-Step Process</span>
        </div>

        <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink">
          How Car Financing Works At Love Kush Cars
        </h2>

        <p className="text-slate text-xs sm:text-sm md:text-base mt-3 leading-relaxed">
          From checking your eligibility to driving away in your dream car, we have streamlined the auto loan journey
          to be completely seamless and transparent.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STEPS.map((s, idx) => {
          const Icon = s.icon
          return (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-paper border border-line p-6 relative hover:border-ink transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-[family-name:var(--font-display)] font-extrabold text-3xl text-ink/20">
                  {s.step}
                </span>
                <div className="h-10 w-10 rounded-[2px] bg-mist flex items-center justify-center text-ink">
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <h3 className="font-[family-name:var(--font-display)] font-bold text-lg text-ink mb-2">
                {s.title}
              </h3>

              <p className="text-xs text-slate/80 leading-relaxed">{s.description}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
