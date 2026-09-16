import { Link } from 'react-router-dom'
import { Landmark, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { EmiCalculator } from '@/components/finance/EmiCalculator'

const PARTNER_BANKS = ['HDFC Bank', 'ICICI Bank', 'Mahindra Finance', 'AU Small Finance Bank', 'Kotak Mahindra', 'Axis Bank', 'Tata Capital', 'IndusInd Bank']

export function FinancePreview() {
  return (
    <section className="container-lk py-16 sm:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Side Info */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-mist border border-line text-[10px] font-bold uppercase tracking-widest text-slate mb-2">
              <Landmark className="h-3 w-3 text-ink" />
              <span>Multi-Bank Loan Desk</span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl text-ink leading-tight">
              Instant Auto Finance With Rajasthan&apos;s Top 9+ Banks
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate leading-relaxed">
            Don&apos;t settle for high single-lender rates. Our in-house finance officers submit your profile to 9+
            leading banks simultaneously, securing the lowest interest rate and optimal EMI structure for your budget.
          </p>

          <div className="space-y-2.5 pt-2 text-xs text-ink font-semibold">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Interest rates starting from 11.0% p.a.</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Flexible repayment tenures up to 84 months (7 years)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Same-day in-principle sanction &amp; immediate car handover</span>
            </div>
          </div>

          {/* Partner Bank Chips */}
          <div className="pt-3 border-t border-line">
            <span className="text-[10px] uppercase font-bold text-slate/70 tracking-widest block mb-2">
              Our Banking Partners:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PARTNER_BANKS.map((b) => (
                <span
                  key={b}
                  className="px-2.5 py-1 bg-mist border border-line text-[10px] font-bold text-slate/80 rounded-[2px]"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link to="/finance">
              <Button size="lg" className="w-full sm:w-auto font-bold uppercase tracking-wider text-xs px-6">
                Check Loan Eligibility <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Side Live Interactive Calculator */}
        <div className="lg:col-span-7 bg-mist p-6 sm:p-10 border border-line shadow-sm">
          <div className="mb-5 flex items-center justify-between pb-3 border-b border-line">
            <h3 className="font-[family-name:var(--font-display)] font-bold text-lg text-ink">
              Interactive EMI Calculator
            </h3>
            <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              Live Bank Estimate
            </span>
          </div>
          <EmiCalculator />
        </div>
      </div>
    </section>
  )
}
