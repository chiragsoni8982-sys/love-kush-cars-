import { Link } from 'react-router-dom'
import { CircleDollarSign, CheckCircle2, ShieldCheck, Clock, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function SellCarTeaser() {
  return (
    <section className="container-lk my-12 sm:my-16">
      <div className="relative overflow-hidden bg-ink text-paper p-8 sm:p-12 border border-white/15 shadow-elevated">
        {/* Subtle Luxury Glow Effects */}
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-24 -bottom-24 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/15 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Sell Or Upgrade Your Car in Rajasthan</span>
            </div>

            <h2 className="font-[family-name:var(--font-display)] font-extrabold text-2xl sm:text-3xl md:text-4xl text-paper leading-tight">
              Sell Your Car at the Best Market Price in 30 Minutes
            </h2>

            <p className="text-xs sm:text-sm text-white/70 mt-3 leading-relaxed">
              No endless broker calls, no tedious price bargaining, and zero documentation stress. Get a transparent
              AI-assisted valuation and same-day direct bank payout.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 text-xs text-white/80">
              <span className="flex items-center justify-center lg:justify-start gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" /> Free Doorstep Inspection
              </span>
              <span className="flex items-center justify-center lg:justify-start gap-1.5">
                <Clock className="h-4 w-4 text-amber-300 shrink-0" /> Instant Bank Payment
              </span>
              <span className="flex items-center justify-center lg:justify-start gap-1.5">
                <ShieldCheck className="h-4 w-4 text-white shrink-0" /> 100% Free RC Transfer
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <Link to="/sell-your-car" className="w-full sm:w-auto">
              <Button
                variant="primary-inverse"
                size="lg"
                className="w-full sm:w-auto font-bold uppercase tracking-wider text-xs px-8 py-4 text-ink shadow-md"
              >
                <CircleDollarSign className="h-4 w-4 mr-1.5 text-ink" /> Get Instant Valuation
              </Button>
            </Link>

            <a
              href="https://wa.me/919694266827?text=Hi%20Love%20Kush%20Cars%2C%20I%20want%20to%20sell%20my%20car%20and%20need%20a%20doorstep%20evaluation."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider px-6 py-4 transition-colors"
            >
              Book Doorstep Check <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
