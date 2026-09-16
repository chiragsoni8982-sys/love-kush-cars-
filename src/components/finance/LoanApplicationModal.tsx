import { useState, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Landmark,
  Car,
  User,
  Mail,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  MessageCircle,
  Clock,
} from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { mockVehicles } from '@/data/mockVehicles'
import { financePartners } from '@/data/financePartners'
import { formatINR, cn } from '@/lib/utils'

export type LoanType = 'used-car-loan' | 'loan-against-car'

interface LoanApplicationModalProps {
  open: boolean
  onClose: () => void
  initialLoanType?: LoanType
  initialCarId?: string
  initialAmount?: number
}

const EMPLOYMENT_TYPES = [
  { id: 'salaried', label: 'Salaried Professional', desc: 'Working in Pvt / Govt / MNC' },
  { id: 'business', label: 'Business Owner / Trader', desc: 'Proprietorship / Partner / Pvt Ltd' },
  { id: 'self-employed', label: 'Self-Employed Professional', desc: 'Doctor / CA / Lawyer / Architect' },
  { id: 'agriculture', label: 'Farmer / Agriculture', desc: 'Agricultural land / Dairy / Rural' },
]

const TENURE_OPTIONS = [12, 24, 36, 48, 60, 72, 84]

export function LoanApplicationModal({
  open,
  onClose,
  initialLoanType = 'used-car-loan',
  initialCarId,
  initialAmount,
}: LoanApplicationModalProps) {
  const formId = useId()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [submitted, setSubmitted] = useState(false)
  const [applicationId, setApplicationId] = useState('')

  // Form State
  const [loanType, setLoanType] = useState<LoanType>(initialLoanType)
  const [selectedCarId, setSelectedCarId] = useState<string>(initialCarId || '')
  const [customCarName, setCustomCarName] = useState<string>('')
  const [customCarReg, setCustomCarReg] = useState<string>('')
  const [customCarYear, setCustomCarYear] = useState<string>('2021')

  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('Udaipur')
  const [pincode, setPincode] = useState('')

  const [employmentType, setEmploymentType] = useState('salaried')
  const [monthlyIncome, setMonthlyIncome] = useState<string>('85000')
  const [loanAmount, setLoanAmount] = useState<number>(initialAmount || 2500000)
  const [tenure, setTenure] = useState<number>(60)
  const [preferredBank, setPreferredBank] = useState<string>('all')
  const [agreeConsent, setAgreeConsent] = useState(true)

  // Reset or initialize on open or when initial props change
  useEffect(() => {
    if (open) {
      if (initialLoanType) setLoanType(initialLoanType)
      if (initialCarId) {
        setSelectedCarId(initialCarId)
        const matched = mockVehicles.find((v) => v.id === initialCarId)
        if (matched) {
          setLoanAmount(matched.price)
        }
      } else if (initialAmount) {
        setLoanAmount(initialAmount)
      }
    }
  }, [open, initialLoanType, initialCarId, initialAmount])

  // Update loan amount when selected car changes in dropdown
  const handleCarSelect = (carId: string) => {
    setSelectedCarId(carId)
    if (carId && carId !== 'custom') {
      const car = mockVehicles.find((v) => v.id === carId)
      if (car) {
        setLoanAmount(car.price)
      }
    }
  }

  const selectedVehicleObj = mockVehicles.find((v) => v.id === selectedCarId)
  const displayCarTitle =
    loanType === 'loan-against-car'
      ? customCarName || 'Existing Car / Refinance'
      : selectedCarId === 'custom'
        ? customCarName || 'Other Certified Car'
        : selectedVehicleObj
          ? `${selectedVehicleObj.year} ${selectedVehicleObj.brand} ${selectedVehicleObj.model} (${selectedVehicleObj.variant})`
          : 'Select a car'

  // Approximate Monthly EMI calculation (benchmarked at 12.5% within 11%-20% range)
  const monthlyRate = 12.5 / 12 / 100
  const estimatedEmi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1),
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName.trim() || phone.length < 10) {
      alert('Please provide your full name and a valid 10-digit phone number.')
      return
    }
    const randId = `LK-FIN-${Math.floor(10000 + Math.random() * 90000)}`
    setApplicationId(randId)
    setSubmitted(true)
  }

  const handleResetAndClose = () => {
    setSubmitted(false)
    setStep(1)
    onClose()
  }

  const getWhatsAppMessage = () => {
    const text = `*New Loan Application - Love Kush Cars Finance*
━━━━━━━━━━━━━━━━━━━━
*Application Ref:* ${applicationId}
*Applicant:* ${fullName}
*Phone:* +91 ${phone}
*Email:* ${email || 'N/A'}
*Address:* ${address}, ${city} - ${pincode}
*Loan Scheme:* ${loanType === 'used-car-loan' ? 'Used Car Loan (Purchase)' : 'Loan Against Car (Refinance / Equity)'}
*Vehicle:* ${displayCarTitle} ${customCarReg ? `[Reg: ${customCarReg}]` : ''}
*Requested Loan:* ${formatINR(loanAmount)}
*Tenure:* ${tenure} Months (~${formatINR(estimatedEmi)}/mo)
*Employment:* ${employmentType} (Net Income: ₹${Number(monthlyIncome).toLocaleString('en-IN')}/mo)
*Preferred Bank:* ${preferredBank === 'all' ? 'Best Quote from 9+ Partner Banks' : preferredBank}
━━━━━━━━━━━━━━━━━━━━
Please connect me with an auto finance specialist for instant sanction.`
    return encodeURIComponent(text)
  }

  return (
    <Modal open={open} onClose={handleResetAndClose} className="max-w-3xl p-0 overflow-hidden bg-paper">
      {submitted ? (
        /* SUCCESS CONFIRMATION SCREEN */
        <div className="p-8 sm:p-10 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle2 className="h-10 w-10" />
          </motion.div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-widest rounded-full mb-3">
            Application Received Successfully
          </span>

          <h2 className="font-[family-name:var(--font-display)] font-extrabold text-2xl sm:text-3xl text-ink">
            Your Finance Request Is In Review!
          </h2>

          <div className="mt-4 p-4 bg-mist border border-line rounded-[4px] max-w-md mx-auto text-left">
            <div className="flex justify-between items-center text-xs pb-2 border-b border-line">
              <span className="text-slate">Application Ref:</span>
              <span className="font-mono font-bold text-ink">{applicationId}</span>
            </div>
            <div className="flex justify-between items-center text-xs py-2 border-b border-line">
              <span className="text-slate">Applicant:</span>
              <span className="font-semibold text-ink">{fullName}</span>
            </div>
            <div className="flex justify-between items-center text-xs py-2 border-b border-line">
              <span className="text-slate">Loan Type:</span>
              <span className="font-semibold text-ink">
                {loanType === 'used-car-loan' ? 'Used Car Loan' : 'Loan Against Car'}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs py-2 border-b border-line">
              <span className="text-slate">Loan Amount:</span>
              <span className="font-bold text-ink font-[family-name:var(--font-display)]">{formatINR(loanAmount)}</span>
            </div>
            <div className="flex justify-between items-center text-xs pt-2">
              <span className="text-slate">Est. Monthly EMI:</span>
              <span className="font-bold text-emerald-700">{formatINR(estimatedEmi)}/mo</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate mt-5 max-w-md mx-auto leading-relaxed">
            Our Love Kush Cars finance relationship manager will call you at <strong>+91 {phone}</strong> within 30
            minutes to share the lowest interest rate quotes from our 9 banking partners.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/919694266827?text=${getWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 transition-colors"
            >
              <MessageCircle className="h-4 w-4" /> Send on WhatsApp for Fast Track
            </a>
            <Button variant="secondary" onClick={handleResetAndClose} className="w-full sm:w-auto">
              Done &amp; Close
            </Button>
          </div>
        </div>
      ) : (
        /* MULTI-STEP LOAN APPLICATION FORM */
        <div className="flex flex-col">
          {/* Header Banner */}
          <div className="bg-ink text-paper p-6 sm:p-7 relative overflow-hidden">
            <div className="relative z-10 flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-300 mb-1.5">
                  <Sparkles className="h-3 w-3" /> Love Kush Cars Auto Finance Desk
                </div>
                <h2 className="font-[family-name:var(--font-display)] font-extrabold text-2xl sm:text-3xl text-paper">
                  Apply for Car Financing
                </h2>
                <p className="text-xs text-white/70 mt-1 max-w-lg">
                  Instant eligibility across 9+ leading banks &amp; NBFCs with interest rates starting at 8.99%*
                </p>
              </div>

              <div className="hidden sm:flex flex-col items-end text-right shrink-0">
                <span className="text-[10px] uppercase text-white/50 tracking-wider">Approval Time</span>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                  <Clock className="h-3.5 w-3.5" /> 30-Min In-Principle
                </span>
              </div>
            </div>

            {/* Loan Type Tab Selector */}
            <div className="mt-5 grid grid-cols-2 gap-2 bg-white/10 p-1 rounded-[3px] border border-white/10">
              <button
                type="button"
                onClick={() => {
                  setLoanType('used-car-loan')
                  if (!selectedCarId && mockVehicles[0]) {
                    setSelectedCarId(mockVehicles[0].id)
                    setLoanAmount(mockVehicles[0].price)
                  }
                }}
                className={cn(
                  'py-2 px-3 text-xs font-bold uppercase tracking-wider rounded-[2px] transition-all flex items-center justify-center gap-1.5',
                  loanType === 'used-car-loan'
                    ? 'bg-paper text-ink shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/5',
                )}
              >
                <Car className="h-3.5 w-3.5" />
                <span>Used Car Loan (Buy Car)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setLoanType('loan-against-car')
                }}
                className={cn(
                  'py-2 px-3 text-xs font-bold uppercase tracking-wider rounded-[2px] transition-all flex items-center justify-center gap-1.5',
                  loanType === 'loan-against-car'
                    ? 'bg-paper text-ink shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/5',
                )}
              >
                <Landmark className="h-3.5 w-3.5" />
                <span>Loan Against Car (Cash Refinance)</span>
              </button>
            </div>
          </div>

          {/* Step Progress Indicators */}
          <div className="bg-mist border-b border-line px-6 py-3">
            <div className="flex items-center justify-between max-w-xl mx-auto text-xs font-semibold uppercase tracking-wider">
              <button
                type="button"
                onClick={() => setStep(1)}
                className={cn('flex items-center gap-2', step === 1 ? 'text-ink font-bold' : 'text-slate/60')}
              >
                <span
                  className={cn(
                    'h-5 w-5 rounded-full flex items-center justify-center text-[10px]',
                    step === 1 ? 'bg-ink text-paper' : step > 1 ? 'bg-emerald-600 text-white' : 'bg-paper border',
                  )}
                >
                  {step > 1 ? <Check className="h-3 w-3" /> : '1'}
                </span>
                <span>Vehicle &amp; Scheme</span>
              </button>

              <div className={cn('h-[1px] flex-1 mx-3', step > 1 ? 'bg-emerald-600' : 'bg-line')} />

              <button
                type="button"
                onClick={() => {
                  if (fullName || phone) setStep(2)
                }}
                className={cn('flex items-center gap-2', step === 2 ? 'text-ink font-bold' : 'text-slate/60')}
              >
                <span
                  className={cn(
                    'h-5 w-5 rounded-full flex items-center justify-center text-[10px]',
                    step === 2 ? 'bg-ink text-paper' : step > 2 ? 'bg-emerald-600 text-white' : 'bg-paper border',
                  )}
                >
                  {step > 2 ? <Check className="h-3 w-3" /> : '2'}
                </span>
                <span>Applicant Details</span>
              </button>

              <div className={cn('h-[1px] flex-1 mx-3', step > 2 ? 'bg-emerald-600' : 'bg-line')} />

              <button
                type="button"
                onClick={() => {
                  if (phone) setStep(3)
                }}
                className={cn('flex items-center gap-2', step === 3 ? 'text-ink font-bold' : 'text-slate/60')}
              >
                <span
                  className={cn(
                    'h-5 w-5 rounded-full flex items-center justify-center text-[10px]',
                    step === 3 ? 'bg-ink text-paper' : 'bg-paper border',
                  )}
                >
                  3
                </span>
                <span>Financials &amp; Submit</span>
              </button>
            </div>
          </div>

          {/* Form Content Body */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {/* STEP 1: Vehicle & Loan Scheme */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] font-bold text-lg text-ink">
                      {loanType === 'used-car-loan'
                        ? 'Select the Certified Car You Wish to Finance'
                        : 'Enter Details of Your Existing Car for Instant Cash Loan'}
                    </h3>
                    <p className="text-xs text-slate mt-0.5">
                      {loanType === 'used-car-loan'
                        ? 'Choose from our certified Rajasthan showroom inventory or specify another model.'
                        : 'Get up to 150% valuation of your existing car credited within 24-48 hours while you keep driving.'}
                    </p>
                  </div>

                  {loanType === 'used-car-loan' ? (
                    /* USED CAR LOAN SELECTOR */
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor={`${formId}-vehicle-select`}
                          className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5"
                        >
                          Select Car from Inventory <span className="text-rose-500">*</span>
                        </label>
                        <select
                          id={`${formId}-vehicle-select`}
                          value={selectedCarId}
                          onChange={(e) => handleCarSelect(e.target.value)}
                          className="w-full border border-line bg-paper px-3.5 py-3 text-sm text-ink focus:outline-none focus:border-ink font-medium"
                        >
                          <option value="">-- Choose from our certified stock --</option>
                          {mockVehicles.map((veh) => (
                            <option key={veh.id} value={veh.id}>
                              {veh.year} {veh.brand} {veh.model} ({veh.variant}) &mdash; {formatINR(veh.price)} [
                              {veh.outletCity || veh.rtoDistrict}]
                            </option>
                          ))}
                          <option value="custom">+ Other Car / Custom Vehicle Model</option>
                        </select>
                      </div>

                      {/* If custom car selected */}
                      {selectedCarId === 'custom' && (
                        <div className="p-4 bg-mist border border-line space-y-3">
                          <label className="block text-xs font-semibold text-slate uppercase tracking-wider">
                            Enter Car Make, Model &amp; Year
                          </label>
                          <input
                            type="text"
                            value={customCarName}
                            onChange={(e) => setCustomCarName(e.target.value)}
                            placeholder="e.g. 2022 Hyundai Creta SX (O) Diesel"
                            className="w-full border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:border-ink"
                          />
                        </div>
                      )}

                      {/* Selected Vehicle Preview Banner */}
                      {selectedVehicleObj && selectedCarId !== 'custom' && (
                        <div className="p-4 bg-mist border border-line flex items-center justify-between gap-4">
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-slate/70 block">
                              Selected Vehicle
                            </span>
                            <h4 className="font-bold text-sm text-ink">
                              {selectedVehicleObj.year} {selectedVehicleObj.brand} {selectedVehicleObj.model}
                            </h4>
                            <p className="text-xs text-slate/80 mt-0.5">
                              {selectedVehicleObj.variant} &bull; {selectedVehicleObj.outletCity || selectedVehicleObj.rtoDistrict} Showroom
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] uppercase text-slate/70 block">Vehicle Price</span>
                            <span className="font-bold text-base font-[family-name:var(--font-display)] text-ink">
                              {formatINR(selectedVehicleObj.price)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* LOAN AGAINST EXISTING CAR */
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5">
                            Car Make &amp; Model <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={customCarName}
                            onChange={(e) => setCustomCarName(e.target.value)}
                            placeholder="e.g. Toyota Fortuner / Honda City"
                            className="w-full border border-line bg-paper px-3.5 py-3 text-sm text-ink focus:outline-none focus:border-ink"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5">
                            Registration Year
                          </label>
                          <select
                            value={customCarYear}
                            onChange={(e) => setCustomCarYear(e.target.value)}
                            className="w-full border border-line bg-paper px-3.5 py-3 text-sm text-ink focus:outline-none focus:border-ink"
                          >
                            {Array.from({ length: 15 }, (_, i) => 2025 - i).map((y) => (
                              <option key={y} value={y}>
                                {y}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5">
                          Car Registration Number (RC Plate)
                        </label>
                        <input
                          type="text"
                          value={customCarReg}
                          onChange={(e) => setCustomCarReg(e.target.value.toUpperCase())}
                          placeholder="e.g. RJ27 CA 1234"
                          className="w-full border border-line bg-paper px-3.5 py-3 text-sm text-ink uppercase tracking-wider focus:outline-none focus:border-ink font-mono"
                        />
                      </div>
                    </div>
                  )}

                  {/* Loan Amount & Tenure Slider Preview */}
                  <div className="pt-4 border-t border-line space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate">
                        Desired Loan Amount: <strong className="text-ink font-bold">{formatINR(loanAmount)}</strong>
                      </label>
                      <span className="text-xs text-emerald-700 font-semibold">
                        Est. EMI: {formatINR(estimatedEmi)}/mo*
                      </span>
                    </div>

                    <input
                      type="range"
                      min={200000}
                      max={15000000}
                      step={50000}
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full accent-ink cursor-pointer"
                    />

                    <div className="flex justify-between text-[10px] text-slate/70">
                      <span>₹2 Lakh</span>
                      <span>₹75 Lakh</span>
                      <span>₹1.5 Crore</span>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      type="button"
                      size="lg"
                      onClick={() => setStep(2)}
                      className="w-full sm:w-auto"
                    >
                      Continue to Applicant Details <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Customer Personal & Contact Info */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] font-bold text-lg text-ink">
                      Applicant Personal &amp; Contact Details
                    </h3>
                    <p className="text-xs text-slate mt-0.5">
                      Required by partner banks to generate formal loan sanction letters.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`${formId}-name`} className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5">
                        Full Name (as on PAN/Aadhaar) <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate/40" />
                        <input
                          type="text"
                          id={`${formId}-name`}
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full border border-line bg-paper pl-10 pr-3.5 py-3 text-sm text-ink focus:outline-none focus:border-ink"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor={`${formId}-phone`} className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5">
                        Mobile Number (+91) <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative flex">
                        <span className="inline-flex items-center px-3 border border-r-0 border-line bg-mist text-xs font-bold text-slate">
                          +91
                        </span>
                        <input
                          type="tel"
                          id={`${formId}-phone`}
                          required
                          maxLength={10}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                          placeholder="10-digit mobile"
                          className="w-full border border-line bg-paper px-3.5 py-3 text-sm text-ink focus:outline-none focus:border-ink"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${formId}-email`} className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate/40" />
                      <input
                        type="email"
                        id={`${formId}-email`}
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full border border-line bg-paper pl-10 pr-3.5 py-3 text-sm text-ink focus:outline-none focus:border-ink"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label htmlFor={`${formId}-city`} className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5">
                        City / District <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate/40" />
                        <input
                          type="text"
                          id={`${formId}-city`}
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="e.g. Udaipur, Chittorgarh, Bhilwara"
                          className="w-full border border-line bg-paper pl-10 pr-3.5 py-3 text-sm text-ink focus:outline-none focus:border-ink"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor={`${formId}-pincode`} className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5">
                        Pincode
                      </label>
                      <input
                        type="text"
                        id={`${formId}-pincode`}
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                        placeholder="313001"
                        className="w-full border border-line bg-paper px-3.5 py-3 text-sm text-ink focus:outline-none focus:border-ink"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${formId}-address`} className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5">
                      Full Residential Address (House/Colony/Area) <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id={`${formId}-address`}
                      rows={2}
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House/Flat No, Street, Landmark, Area (e.g. 100 Ft Road, Meera Nagar, Udaipur)"
                      className="w-full border border-line bg-paper px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:border-ink resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-line">
                    <Button type="button" variant="ghost" onClick={() => setStep(1)}>
                      <ArrowLeft className="h-4 w-4 mr-1.5" /> Back
                    </Button>
                    <Button type="button" size="lg" onClick={() => setStep(3)}>
                      Next: Financial Profile <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Financials, Bank Preference & Submit */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] font-bold text-lg text-ink">
                      Employment &amp; Income Verification
                    </h3>
                    <p className="text-xs text-slate mt-0.5">
                      Used by our 9 partner banks to match you with the highest funding and lowest interest rate tier.
                    </p>
                  </div>

                  {/* Employment Type Selector */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate mb-2">
                      Employment Type <span className="text-rose-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {EMPLOYMENT_TYPES.map((emp) => (
                        <button
                          key={emp.id}
                          type="button"
                          onClick={() => setEmploymentType(emp.id)}
                          className={cn(
                            'p-3 text-left border rounded-[2px] transition-all flex items-start justify-between gap-2',
                            employmentType === emp.id
                              ? 'border-ink bg-ink text-paper shadow-sm'
                              : 'border-line bg-paper text-ink hover:border-slate/40',
                          )}
                        >
                          <div>
                            <span className="font-bold text-xs sm:text-sm block">{emp.label}</span>
                            <span
                              className={cn(
                                'text-[11px] block mt-0.5',
                                employmentType === emp.id ? 'text-white/70' : 'text-slate/60',
                              )}
                            >
                              {emp.desc}
                            </span>
                          </div>
                          {employmentType === emp.id && <Check className="h-4 w-4 shrink-0 text-amber-300 mt-0.5" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Monthly Net In-Hand Income */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`${formId}-income`} className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5">
                        Net Monthly In-Hand Income (₹) <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate">₹</span>
                        <input
                          type="number"
                          id={`${formId}-income`}
                          required
                          value={monthlyIncome}
                          onChange={(e) => setMonthlyIncome(e.target.value)}
                          placeholder="e.g. 75000"
                          className="w-full border border-line bg-paper pl-8 pr-3.5 py-3 text-sm text-ink focus:outline-none focus:border-ink font-semibold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5">
                        Preferred Loan Tenure
                      </label>
                      <select
                        value={tenure}
                        onChange={(e) => setTenure(Number(e.target.value))}
                        className="w-full border border-line bg-paper px-3.5 py-3 text-sm text-ink focus:outline-none focus:border-ink font-semibold"
                      >
                        {TENURE_OPTIONS.map((t) => (
                          <option key={t} value={t}>
                            {t} Months ({(t / 12).toFixed(t % 12 === 0 ? 0 : 1)} Years)
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Preferred Bank Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5">
                      Preferred Bank / NBFC (Optional)
                    </label>
                    <select
                      value={preferredBank}
                      onChange={(e) => setPreferredBank(e.target.value)}
                      className="w-full border border-line bg-paper px-3.5 py-3 text-sm text-ink focus:outline-none focus:border-ink font-medium"
                    >
                      <option value="all">⚡ Compare All 9+ Partner Banks (Recommended - Multi-Bank Bidding)</option>
                      {financePartners.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name} &mdash; {p.subText}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Final Calculation Summary Card */}
                  <div className="p-4 bg-mist border border-line flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate/70 tracking-wider block">
                        Estimated Loan Terms
                      </span>
                      <p className="text-xs text-slate mt-0.5">
                        Principal: <strong className="text-ink">{formatINR(loanAmount)}</strong> &bull; Tenure:{' '}
                        <strong className="text-ink">{tenure} mos</strong>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate/70 tracking-wider block">
                        Monthly EMI (Est. @ 12.5% p.a.)
                      </span>
                      <span className="text-lg font-extrabold text-ink font-[family-name:var(--font-display)]">
                        {formatINR(estimatedEmi)}/mo*
                      </span>
                    </div>
                  </div>

                  {/* Consent & Privacy */}
                  <div className="flex items-start gap-2 pt-2">
                    <input
                      type="checkbox"
                      id={`${formId}-consent`}
                      required
                      checked={agreeConsent}
                      onChange={(e) => setAgreeConsent(e.target.checked)}
                      className="h-4 w-4 mt-0.5 rounded border-line text-ink accent-ink"
                    />
                    <label htmlFor={`${formId}-consent`} className="text-[11px] text-slate/80 leading-snug select-none">
                      I authorize Love Kush Cars and its verified lending partners (HDFC, ICICI, Mahindra Finance, AU Bank, etc.)
                      to contact me and retrieve indicative credit bureau eligibility.
                    </label>
                  </div>

                  {/* Submit buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-line">
                    <Button type="button" variant="ghost" onClick={() => setStep(2)}>
                      <ArrowLeft className="h-4 w-4 mr-1.5" /> Back
                    </Button>
                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                      Submit Loan Application <CheckCircle2 className="h-4 w-4 ml-2 text-emerald-400" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      )}
    </Modal>
  )
}
