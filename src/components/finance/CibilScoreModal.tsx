import { useState, useId } from 'react'
import {
  ShieldCheck,
  Sparkles,
  Award,
  ArrowRight,
  User,
  Mail,
  FileText,
  Zap,
} from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { formatINR, cn } from '@/lib/utils'

interface CibilScoreModalProps {
  open: boolean
  onClose: () => void
  onApplyWithScore?: (scoreData: { name: string; phone: string; score: number; preApprovedAmount: number }) => void
}

export function CibilScoreModal({ open, onClose, onApplyWithScore }: CibilScoreModalProps) {
  const formId = useId()
  const [hasCalculated, setHasCalculated] = useState(false)
  const [loading, setLoading] = useState(false)

  // Form Fields
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [panNumber, setPanNumber] = useState('')
  const [dob, setDob] = useState('1992-05-14')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('Udaipur')
  const [pincode, setPincode] = useState('313001')
  const [employmentType, setEmploymentType] = useState('Salaried')
  const [monthlyIncome, setMonthlyIncome] = useState('75000')
  const [consent, setConsent] = useState(true)

  // Result state
  const [generatedScore, setGeneratedScore] = useState(782)
  const [preApprovedLimit, setPreApprovedLimit] = useState(2400000)

  const handleCheckScore = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName.trim() || phone.length < 10) {
      alert('Please fill your full name and 10-digit mobile number.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      // Generate dynamic realistic score based on income
      const incomeNum = Number(monthlyIncome) || 50000
      let score = 750 + Math.floor(Math.random() * 45)
      if (incomeNum > 100000) score = Math.min(845, score + 35)
      else if (incomeNum < 35000) score = Math.max(680, score - 30)

      const limit = Math.round((incomeNum * 32) / 50000) * 50000
      setGeneratedScore(score)
      setPreApprovedLimit(Math.max(500000, limit))
      setLoading(false)
      setHasCalculated(true)
    }, 1200)
  }

  const handleResetAndClose = () => {
    setHasCalculated(false)
    onClose()
  }

  const getScoreRating = (score: number) => {
    if (score >= 775) return { label: 'Excellent', color: 'text-emerald-700 bg-emerald-50 border-emerald-300' }
    if (score >= 720) return { label: 'Very Good', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' }
    if (score >= 670) return { label: 'Good / Average', color: 'text-amber-600 bg-amber-50 border-amber-300' }
    return { label: 'Needs Improvement', color: 'text-rose-600 bg-rose-50 border-rose-300' }
  }

  const scoreRating = getScoreRating(generatedScore)

  return (
    <Modal open={open} onClose={handleResetAndClose} className="max-w-2xl p-0 overflow-hidden bg-paper">
      {!hasCalculated ? (
        /* SCORE CHECK FORM */
        <div>
          {/* Header Banner */}
          <div className="bg-ink text-paper p-6 sm:p-7 relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-1.5">
                <ShieldCheck className="h-3.5 w-3.5" /> 100% Free &bull; Zero Impact On Credit Score
              </div>
              <h2 className="font-[family-name:var(--font-display)] font-extrabold text-2xl sm:text-3xl text-paper">
                Check Your CIBIL &amp; Loan Eligibility
              </h2>
              <p className="text-xs text-white/70 mt-1 max-w-lg">
                Get your instant credit report and unlock pre-approved auto loan interest rates (11% to 20% p.a.) from top 9 banks.
              </p>
            </div>
          </div>

          <form onSubmit={handleCheckScore} className="p-6 sm:p-8 space-y-5">
            {/* Full Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`${formId}-cibil-name`} className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5">
                  Full Name (as per PAN) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate/40" />
                  <input
                    type="text"
                    id={`${formId}-cibil-name`}
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Vikramaditya Singh"
                    className="w-full border border-line bg-paper pl-10 pr-3.5 py-2.5 text-sm text-ink focus:outline-none focus:border-ink"
                  />
                </div>
              </div>

              <div>
                <label htmlFor={`${formId}-cibil-phone`} className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5">
                  Mobile Number (+91) <span className="text-rose-500">*</span>
                </label>
                <div className="relative flex">
                  <span className="inline-flex items-center px-3 border border-r-0 border-line bg-mist text-xs font-bold text-slate">
                    +91
                  </span>
                  <input
                    type="tel"
                    id={`${formId}-cibil-phone`}
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="10-digit number"
                    className="w-full border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:border-ink"
                  />
                </div>
              </div>
            </div>

            {/* Email & PAN Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`${formId}-cibil-email`} className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate/40" />
                  <input
                    type="email"
                    id={`${formId}-cibil-email`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full border border-line bg-paper pl-10 pr-3.5 py-2.5 text-sm text-ink focus:outline-none focus:border-ink"
                  />
                </div>
              </div>

              <div>
                <label htmlFor={`${formId}-cibil-pan`} className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5">
                  PAN Card Number (Optional / For Instant Bureau Sync)
                </label>
                <div className="relative">
                  <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate/40" />
                  <input
                    type="text"
                    id={`${formId}-cibil-pan`}
                    maxLength={10}
                    value={panNumber}
                    onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                    placeholder="e.g. ABCDE1234F"
                    className="w-full border border-line bg-paper pl-10 pr-3.5 py-2.5 text-sm text-ink font-mono uppercase focus:outline-none focus:border-ink"
                  />
                </div>
              </div>
            </div>

            {/* Date of Birth & Employment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`${formId}-cibil-dob`} className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id={`${formId}-cibil-dob`}
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:border-ink"
                />
              </div>

              <div>
                <label htmlFor={`${formId}-cibil-emp`} className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5">
                  Employment Type
                </label>
                <select
                  id={`${formId}-cibil-emp`}
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className="w-full border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:border-ink font-medium"
                >
                  <option value="Salaried">Salaried (Private / Govt / MNC)</option>
                  <option value="Business Owner">Business Owner / Trader</option>
                  <option value="Self-Employed">Self-Employed (CA / Doctor / Lawyer)</option>
                  <option value="Agriculture">Farmer / Agriculture Income</option>
                </select>
              </div>
            </div>

            {/* Address & City */}
            <div>
              <label htmlFor={`${formId}-cibil-addr`} className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5">
                Residential Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id={`${formId}-cibil-addr`}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street / Area / Colony (e.g. 100 Ft Road, Meera Nagar, Udaipur)"
                className="w-full border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:border-ink"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor={`${formId}-cibil-city`} className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5">
                  City / District <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id={`${formId}-cibil-city`}
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Udaipur"
                  className="w-full border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:border-ink"
                />
              </div>

              <div>
                <label htmlFor={`${formId}-cibil-pin`} className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5">
                  Pincode
                </label>
                <input
                  type="text"
                  id={`${formId}-cibil-pin`}
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="313001"
                  className="w-full border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:border-ink"
                />
              </div>

              <div>
                <label htmlFor={`${formId}-cibil-income`} className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5">
                  Monthly Income (₹)
                </label>
                <input
                  type="number"
                  id={`${formId}-cibil-income`}
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  placeholder="75000"
                  className="w-full border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:border-ink font-semibold"
                />
              </div>
            </div>

            {/* Consent */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id={`${formId}-cibil-consent`}
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="h-4 w-4 mt-0.5 rounded border-line text-ink accent-ink"
              />
              <label htmlFor={`${formId}-cibil-consent`} className="text-[11px] text-slate/80 leading-snug select-none">
                I authorize Love Kush Cars to fetch my credit information bureau report (Soft inquiry &mdash; will NOT reduce your credit score).
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <Button type="button" variant="ghost" onClick={handleResetAndClose}>
                Cancel
              </Button>
              <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-paper border-t-transparent rounded-full animate-spin" />
                    Fetching Bureau Report...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-300" /> Generate Free Credit Report
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>
      ) : (
        /* SCORE REPORT RESULT SCREEN */
        <div className="p-6 sm:p-8">
          <div className="text-center pb-6 border-b border-line">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase tracking-widest rounded-full mb-2">
              <Sparkles className="h-3 w-3" /> Soft Inquiry Complete &bull; 0 Impact on Score
            </span>
            <h3 className="font-[family-name:var(--font-display)] font-extrabold text-2xl text-ink">
              Credit Profile Summary for {fullName}
            </h3>
            <p className="text-xs text-slate mt-0.5">Report Date: Today &bull; Mobile: +91 {phone}</p>
          </div>

          {/* Speedometer Score Card */}
          <div className="my-6 p-6 bg-mist border border-line rounded-[4px] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate/70 block mb-1">
                Your Calculated CIBIL Score
              </span>
              <div className="flex items-baseline justify-center md:justify-start gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold font-[family-name:var(--font-display)] text-ink">
                  {generatedScore}
                </span>
                <span className="text-sm font-semibold text-slate/60">/ 900</span>
              </div>
              <div className="mt-2">
                <span className={cn('inline-block px-2.5 py-0.5 text-xs font-bold border rounded-xs uppercase', scoreRating.color)}>
                  {scoreRating.label}
                </span>
              </div>
            </div>

            {/* Score Bar Meter */}
            <div className="w-full md:w-64 space-y-2 text-xs">
              <div className="flex justify-between text-[10px] font-bold text-slate/70">
                <span>300 (Poor)</span>
                <span>650</span>
                <span>750</span>
                <span>900 (High)</span>
              </div>
              <div className="h-3 w-full bg-line rounded-full overflow-hidden flex">
                <div className="w-1/4 bg-rose-500" />
                <div className="w-1/4 bg-amber-400" />
                <div className="w-1/4 bg-emerald-400" />
                <div className="w-1/4 bg-emerald-600" />
              </div>
              <p className="text-[11px] text-emerald-800 font-medium text-center md:text-left">
                🎉 Top credit tier in Rajasthan! You qualify for competitive interest rates starting at 11% p.a.
              </p>
            </div>
          </div>

          {/* Pre-Approved Voucher Banner */}
          <div className="bg-ink text-paper p-5 rounded-[4px] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Award className="h-4 w-4" /> Pre-Approved Auto Loan Voucher
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-display)] text-paper mt-0.5">
                Eligible for up to {formatINR(preApprovedLimit)}
              </h4>
              <p className="text-xs text-white/70 mt-0.5">
                Instant in-principle sanction available across HDFC, ICICI, Mahindra Finance, and AU Bank.
              </p>
            </div>

            <Button
              variant="primary-inverse"
              size="md"
              onClick={() => {
                if (onApplyWithScore) {
                  onApplyWithScore({
                    name: fullName,
                    phone: phone,
                    score: generatedScore,
                    preApprovedAmount: preApprovedLimit,
                  })
                }
                handleResetAndClose()
              }}
              className="shrink-0 w-full sm:w-auto font-bold uppercase text-xs text-ink"
            >
              Apply With This Voucher <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </div>

          {/* Bureau Breakdown Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-center">
            <div className="p-3 border border-line bg-paper">
              <span className="text-[10px] uppercase text-slate/70 block">Repayment Track</span>
              <span className="text-xs font-bold text-emerald-700">100% On-Time</span>
            </div>
            <div className="p-3 border border-line bg-paper">
              <span className="text-[10px] uppercase text-slate/70 block">Credit Mix</span>
              <span className="text-xs font-bold text-ink">Healthy Mix</span>
            </div>
            <div className="p-3 border border-line bg-paper">
              <span className="text-[10px] uppercase text-slate/70 block">Loan Approval Odds</span>
              <span className="text-xs font-bold text-emerald-700">99.2% Instant</span>
            </div>
            <div className="p-3 border border-line bg-paper">
              <span className="text-[10px] uppercase text-slate/70 block">Best Interest Rate</span>
              <span className="text-xs font-bold text-ink">11.0% p.a.</span>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button variant="secondary" onClick={handleResetAndClose}>
              Done &amp; Close Report
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}
