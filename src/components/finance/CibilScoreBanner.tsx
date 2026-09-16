import { ShieldCheck, TrendingUp, Sparkles, Award, Lock } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface CibilScoreBannerProps {
  onOpenCheckScore: () => void
}

export function CibilScoreBanner({ onOpenCheckScore }: CibilScoreBannerProps) {
  return (
    <section className="container-lk my-12 sm:my-16">
      <div className="relative overflow-hidden bg-gradient-to-r from-[#111111] via-[#1a1a1a] to-[#262626] border border-white/15 text-paper p-8 sm:p-12 shadow-elevated">
        {/* Background glow & subtle patterns */}
        <div
          className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"
        />
        <div
          className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Column: Typography and Value Props */}
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold uppercase tracking-widest mb-4">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>100% Free &bull; Zero Impact On CIBIL Score</span>
            </div>

            <h2 className="font-[family-name:var(--font-display)] font-extrabold text-2xl sm:text-4xl leading-tight text-paper">
              Check Your Credit Score &amp; Unlock Pre-Approved Auto Loans
            </h2>

            <p className="text-white/70 text-xs sm:text-sm mt-3 leading-relaxed">
              Find out your credit rating in under 60 seconds. High credit scores qualify for special discounted interest
              rates (11% to 20% p.a.) with zero down payment options across our 9 banking partners.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-6 text-xs text-white/80">
              <span className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-emerald-400" /> Bank-Grade 256-bit Encryption
              </span>
              <span className="text-white/20">&bull;</span>
              <span className="flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-amber-300" /> Instant Bureau Insights
              </span>
              <span className="text-white/20">&bull;</span>
              <span className="flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5 text-white" /> Pre-Approved Loan Voucher
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Score Meter Preview Card & CTA Button */}
          <div className="flex flex-col items-center shrink-0 w-full sm:w-auto">
            <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 text-center w-full sm:w-72 mb-4">
              <div className="text-[10px] uppercase font-bold tracking-widest text-white/60 mb-1">
                Rajasthan Auto Buyers Score
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="font-[family-name:var(--font-display)] font-extrabold text-4xl text-paper">780+</span>
                <span className="text-xs px-2 py-0.5 bg-emerald-500 text-ink font-bold uppercase rounded-xs">
                  EXCELLENT
                </span>
              </div>
              <p className="text-[11px] text-white/60 mt-2">
                Pre-Approved funding available up to ₹50 Lakhs
              </p>
            </div>

            <Button
              variant="primary-inverse"
              size="lg"
              onClick={onOpenCheckScore}
              className="w-full font-bold uppercase tracking-wider text-xs py-4 shadow-md text-ink"
            >
              <Sparkles className="h-4 w-4 mr-1.5 text-amber-500" /> Check Free CIBIL Score Now
            </Button>
            <span className="text-[10px] text-white/50 mt-2">No Credit Card required &bull; Takes 1 minute</span>
          </div>
        </div>
      </div>
    </section>
  )
}
