import { useMemo, useState } from 'react'
import { Slider } from '@/components/ui/Slider'
import { formatINR, calculateEmi } from '@/lib/utils'

interface EmiCalculatorProps {
  defaultPrincipal?: number
  className?: string
}

export function EmiCalculator({ defaultPrincipal = 3500000, className }: EmiCalculatorProps) {
  const [principal, setPrincipal] = useState(defaultPrincipal)
  const [tenure, setTenure] = useState(60)
  const [rate, setRate] = useState(12.5)

  const emi = useMemo(() => calculateEmi(principal, rate, tenure), [principal, rate, tenure])
  const totalPayable = emi * tenure
  const totalInterest = totalPayable - principal

  return (
    <div className={className}>
      <div className="flex flex-col gap-7">
        <Slider
          label="Loan Amount"
          value={principal}
          min={200000}
          max={15000000}
          step={50000}
          onChange={setPrincipal}
          formatValue={formatINR}
        />
        <Slider
          label="Tenure"
          value={tenure}
          min={12}
          max={84}
          step={6}
          onChange={setTenure}
          formatValue={(v) => `${v} months`}
        />
        <Slider
          label="Interest Rate (p.a.)"
          value={rate}
          min={11}
          max={20}
          step={0.1}
          onChange={setRate}
          formatValue={(v) => `${v.toFixed(1)}%`}
        />
      </div>

      <div className="mt-8 pt-6 border-t border-line grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate">Monthly EMI</p>
          <p className="text-lg font-bold mt-1">{formatINR(emi)}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate">Total Interest</p>
          <p className="text-lg font-bold mt-1">{formatINR(totalInterest)}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate">Total Payable</p>
          <p className="text-lg font-bold mt-1">{formatINR(totalPayable)}</p>
        </div>
      </div>
      <p className="text-[11px] text-slate mt-4 text-center">
        Indicative estimate only. Actual EMI depends on the lender&apos;s terms at the time of application.
      </p>
    </div>
  )
}
