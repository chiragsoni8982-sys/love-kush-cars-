import { Check, X, Minus } from 'lucide-react'

const comparisonData = [
  {
    feature: 'Payment Speed',
    loveKush: 'Instant Bank Transfer (Before Handover)',
    dealers: 'Delayed cheques / 3-7 days waiting',
    classifieds: 'Uncertain / Risk of bad cheques or disputes',
  },
  {
    feature: 'Doorstep Car Inspection',
    loveKush: '100% Free at Home / Office (150+ Points)',
    dealers: 'Must visit multiple dealer yards',
    classifieds: 'Strangers visiting home multiple times',
  },
  {
    feature: 'RC Transfer & Legal Liability',
    loveKush: '100% Handled with Legal Indemnity Receipt',
    dealers: 'Often delayed indefinitely (high risk)',
    classifieds: 'Buyer may delay or misuse vehicle under your name',
  },
  {
    feature: 'Brokerage / Middleman Commission',
    loveKush: 'Zero Commission (₹0 Deductions)',
    dealers: '2% - 5% commission / margin cut',
    classifieds: 'Ad listing charges & negotiation fatigue',
  },
  {
    feature: 'Time to Complete Sale',
    loveKush: 'Under 24 Hours',
    dealers: '1 to 3 Weeks',
    classifieds: '3 to 8 Weeks of endless calls',
  },
  {
    feature: 'Loan Hypothecation Clearance',
    loveKush: 'Assisted loan settlement & direct NOC',
    dealers: 'Owner must clear upfront before deal',
    classifieds: 'Extremely difficult to execute safely',
  },
]

export function SellComparisonTable() {
  return (
    <section className="bg-mist/50 py-20 sm:py-28 border-b border-line">
      <div className="container-lk">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-slate mb-3">Honest Comparison</p>
          <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl text-ink">
            Love Kush Cars vs. Traditional Selling
          </h2>
          <p className="text-sm text-slate/70 mt-3">
            See how selling directly to Love Kush Cars saves you time, maximizes your money, and protects your legal peace of mind.
          </p>
        </div>

        <div className="overflow-x-auto border border-line bg-paper shadow-soft">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-line bg-mist">
                <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-slate w-1/4">
                  Feature / Parameter
                </th>
                <th className="p-4 sm:p-5 text-xs font-extrabold uppercase tracking-wider bg-ink text-paper w-1/3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span>Love Kush Cars</span>
                  </div>
                </th>
                <th className="p-4 sm:p-5 text-xs font-semibold uppercase tracking-wider text-slate/70 w-1/5">
                  Local Used Car Dealers
                </th>
                <th className="p-4 sm:p-5 text-xs font-semibold uppercase tracking-wider text-slate/70 w-1/5">
                  Direct Online Classifieds
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line text-xs sm:text-sm">
              {comparisonData.map((row) => (
                <tr key={row.feature} className="hover:bg-mist/30 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-ink">
                    {row.feature}
                  </td>
                  <td className="p-4 sm:p-5 bg-ink/[0.03] font-medium text-ink flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{row.loveKush}</span>
                  </td>
                  <td className="p-4 sm:p-5 text-slate/80">
                    <div className="flex items-center gap-2">
                      <Minus className="h-3.5 w-3.5 shrink-0 text-slate/40" />
                      <span>{row.dealers}</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-slate/80">
                    <div className="flex items-center gap-2">
                      <X className="h-3.5 w-3.5 shrink-0 text-rose-500" />
                      <span>{row.classifieds}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
