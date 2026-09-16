import { Car, Landmark, Check, ArrowRight, CircleDollarSign } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface LoanComparisonSectionProps {
  onApplyLoanType: (type: 'used-car-loan' | 'loan-against-car') => void
}

export function LoanComparisonSection({ onApplyLoanType }: LoanComparisonSectionProps) {
  return (
    <section className="container-lk py-16 sm:py-24 border-t border-line">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-mist border border-line text-slate text-xs font-semibold uppercase tracking-[0.2em] mb-4">
          <CircleDollarSign className="h-3.5 w-3.5 text-ink" />
          <span>Tailored Financing Schemes</span>
        </div>

        <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink">
          Choose The Right Financing Solution
        </h2>

        <p className="text-slate text-xs sm:text-sm md:text-base mt-3 leading-relaxed">
          Whether you are purchasing a certified pre-owned car or need urgent funds against your existing vehicle, we
          have the best tailored product for your financial needs.
        </p>
      </div>

      {/* Side-by-side 2 column cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Card 1: Used Car Loan (Buy Car) */}
        <div className="bg-paper border-2 border-line hover:border-ink transition-all p-8 flex flex-col justify-between relative group shadow-sm hover:shadow-elevated">
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="h-12 w-12 rounded-[2px] bg-mist flex items-center justify-center text-ink group-hover:bg-ink group-hover:text-paper transition-colors">
                <Car className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-ink text-paper">
                Most Popular
              </span>
            </div>

            <h3 className="font-[family-name:var(--font-display)] font-bold text-2xl text-ink">
              Used Car Purchase Loan
            </h3>
            <p className="text-xs sm:text-sm text-slate mt-2 leading-relaxed">
              Finance your next certified pre-owned car from our Udaipur &amp; Chittorgarh inventory or any certified seller in Rajasthan.
            </p>

            {/* Visual Photo Banner */}
            <div className="mt-4 h-40 w-full overflow-hidden border border-line relative">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
                alt="Luxury Car Finance Handover"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                  🔑 100% On-Road Funding &bull; Same-Day Handover
                </span>
              </div>
            </div>

            {/* Key Specs Matrix */}
            <div className="grid grid-cols-2 gap-3 my-6 p-4 bg-mist border border-line text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate/60 block">Interest Rate</span>
                <span className="font-extrabold text-sm text-ink">11% &ndash; 20% p.a.</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate/60 block">Max Funding</span>
                <span className="font-extrabold text-sm text-emerald-700">Up to 100% On-Road</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate/60 block">Repayment Tenure</span>
                <span className="font-extrabold text-sm text-ink">Up to 84 Months (7 Yrs)</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate/60 block">Approval Speed</span>
                <span className="font-extrabold text-sm text-ink">30-Min In-Principle</span>
              </div>
            </div>

            {/* Bullet Points */}
            <ul className="space-y-2.5 text-xs text-slate">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Zero down payment options for top credit scores</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Single application bids across 9+ premier partner banks</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Free doorstep document collection &amp; RTO RC transfer</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Minimal documentation for salaried &amp; business owners</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-line">
            <Button
              size="lg"
              onClick={() => onApplyLoanType('used-car-loan')}
              className="w-full justify-center text-xs font-bold uppercase tracking-wider"
            >
              Apply for Used Car Loan <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Card 2: Loan Against Car (Refinance) */}
        <div className="bg-paper border-2 border-line hover:border-ink transition-all p-8 flex flex-col justify-between relative group shadow-sm hover:shadow-elevated">
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="h-12 w-12 rounded-[2px] bg-mist flex items-center justify-center text-ink group-hover:bg-ink group-hover:text-paper transition-colors">
                <Landmark className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-amber-400 text-ink">
                Instant Cash Equity
              </span>
            </div>

            <h3 className="font-[family-name:var(--font-display)] font-bold text-2xl text-ink">
              Loan Against Existing Car
            </h3>
            <p className="text-xs sm:text-sm text-slate mt-2 leading-relaxed">
              Unlock the equity in your existing car for emergency liquidity, business expansion, or personal use while you continue to drive it.
            </p>

            {/* Visual Photo Banner */}
            <div className="mt-4 h-40 w-full overflow-hidden border border-line relative">
              <img
                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80"
                alt="Loan Against Car Equity"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                  ⚡ Up to 150% Cash &bull; Keep Driving Your Car
                </span>
              </div>
            </div>

            {/* Key Specs Matrix */}
            <div className="grid grid-cols-2 gap-3 my-6 p-4 bg-mist border border-line text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate/60 block">Interest Rate</span>
                <span className="font-extrabold text-sm text-ink">11% &ndash; 20% p.a.</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate/60 block">Max Cash Limit</span>
                <span className="font-extrabold text-sm text-emerald-700">Up to 150% Car Value</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate/60 block">Repayment Tenure</span>
                <span className="font-extrabold text-sm text-ink">Up to 60 Months (5 Yrs)</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate/60 block">Bank Disbursal</span>
                <span className="font-extrabold text-sm text-ink">Within 24 to 48 Hours</span>
              </div>
            </div>

            {/* Bullet Points */}
            <ul className="space-y-2.5 text-xs text-slate">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Keep using your car without disruption &mdash; no impounding</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Get up to 150% of the current market valuation in cash</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Top-up on existing car loans also available (Balance transfer)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>No end-use restriction &mdash; use for business, medical, or travel</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-line">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onApplyLoanType('loan-against-car')}
              className="w-full justify-center text-xs font-bold uppercase tracking-wider"
            >
              Apply for Loan Against Car <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
