import { motion } from 'framer-motion'
import {
  Sparkles,
  ShieldCheck,
  Banknote,
  Building2,
  Car,
  Landmark,
  ArrowRight,
  TrendingUp,
  Percent,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { EmiCalculator } from './EmiCalculator'

interface FinanceHeroProps {
  onOpenApplyModal: (loanType?: 'used-car-loan' | 'loan-against-car') => void
  onOpenCibilModal: () => void
}

export function FinanceHero({ onOpenApplyModal, onOpenCibilModal }: FinanceHeroProps) {
  return (
    <section className="relative bg-ink text-paper pt-32 sm:pt-36 pb-20 sm:pb-28 overflow-hidden">
      {/* Ambient Dark Gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-80"
        style={{
          background:
            'radial-gradient(circle at 50% 15%, #2a2a2a 0%, #111111 70%), linear-gradient(180deg, #181818 0%, #0d0d0d 100%)',
        }}
      />

      <div className="container-lk relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 border border-white/15 text-white/90 text-xs font-semibold uppercase tracking-[0.2em] mb-4"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Rajasthan's Premier Pre-Owned Auto Financing Desk</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-5xl md:text-6xl leading-[1.12] text-balance text-paper"
          >
            SMART CAR FINANCING WITH 9+ TOP BANKING PARTNERS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/70 text-xs sm:text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed"
          >
            Get up to 100% on-road funding on certified cars or instant liquidity with Loan Against Car. Single
            application, multi-bank rate bidding, and same-day in-principle sanction.
          </motion.p>

          {/* Quick Features Pill Bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 text-xs text-white/80"
          >
            <span className="flex items-center gap-1.5">
              <Percent className="h-4 w-4 text-emerald-400" /> Rates from 11% to 20% p.a.
            </span>
            <span className="text-white/20">&bull;</span>
            <span className="flex items-center gap-1.5">
              <Banknote className="h-4 w-4 text-amber-300" /> Up to 100% On-Road Funding
            </span>
            <span className="text-white/20">&bull;</span>
            <span className="flex items-center gap-1.5">
              <Building2 className="h-4 w-4 text-white" /> 9 Certified Lending Partners
            </span>
            <span className="text-white/20">&bull;</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" /> Zero Doorstep Fee
            </span>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <Button
              variant="primary-inverse"
              size="lg"
              onClick={() => onOpenApplyModal('used-car-loan')}
              className="w-full sm:w-auto font-bold uppercase tracking-wider text-xs px-8 py-4 shadow-lg text-ink"
            >
              <Car className="h-4 w-4 mr-2 text-ink" /> Apply for Used Car Loan
            </Button>

            <Button
              variant="secondary-inverse"
              size="lg"
              onClick={() => onOpenApplyModal('loan-against-car')}
              className="w-full sm:w-auto font-bold uppercase tracking-wider text-xs px-8 py-4"
            >
              <Landmark className="h-4 w-4 mr-2" /> Loan Against Car (Refinance)
            </Button>

            <Button
              variant="ghost-inverse"
              size="lg"
              onClick={onOpenCibilModal}
              className="text-amber-300 hover:text-amber-200 hover:bg-white/5 w-full sm:w-auto text-xs font-bold uppercase tracking-wider"
            >
              <TrendingUp className="h-4 w-4 mr-1.5" /> Check Free CIBIL Score &rarr;
            </Button>
          </motion.div>
        </div>

        {/* Embedded Interactive EMI Calculator Box */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-4xl mx-auto bg-paper text-ink border border-line p-6 sm:p-10 shadow-elevated"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-line mb-8">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate/60 block">
                Instant EMI Estimator
              </span>
              <h3 className="font-[family-name:var(--font-display)] font-extrabold text-xl sm:text-2xl text-ink">
                Calculate Your Monthly Installment
              </h3>
            </div>
            <span className="text-xs text-slate/70 bg-mist px-3 py-1.5 border border-line">
              Interest rates benchmarked with top 9 banks
            </span>
          </div>

          <EmiCalculator />

          <div className="mt-8 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate max-w-md text-center sm:text-left">
              Ready to lock in these terms? Apply online now to get formal in-principle sanction from our banking
              partners within 30 minutes.
            </p>
            <Button
              size="lg"
              onClick={() => onOpenApplyModal('used-car-loan')}
              className="w-full sm:w-auto uppercase text-xs font-bold tracking-wider"
            >
              Apply With This EMI <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
