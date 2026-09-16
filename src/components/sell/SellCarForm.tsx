import { useState, useId } from 'react'
import { motion } from 'framer-motion'
import {
  Car,
  User,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Clock,
  Send,
  CircleDollarSign,
  PhoneCall,
  Check,
  Mail,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { cn } from '@/lib/utils'
import { apiFetch } from '@/lib/api'

// RTO code mapping for Rajasthan & key states
const RTO_MAP: Record<string, string> = {
  'RJ27': 'Udaipur, Rajasthan',
  'RJ09': 'Chittorgarh, Rajasthan',
  'RJ14': 'Jaipur South, Rajasthan',
  'RJ45': 'Jaipur North, Rajasthan',
  'RJ06': 'Bhilwara, Rajasthan',
  'RJ30': 'Rajsamand, Rajasthan',
  'RJ19': 'Jodhpur, Rajasthan',
  'RJ07': 'Bikaner, Rajasthan',
  'RJ05': 'Bharatpur, Rajasthan',
  'RJ02': 'Alwar, Rajasthan',
  'DL': 'Delhi NCR',
  'HR': 'Haryana',
  'UP': 'Uttar Pradesh',
  'GJ': 'Gujarat',
  'MH': 'Maharashtra',
  'MP': 'Madhya Pradesh',
}

const POPULAR_BRANDS = [
  'Mercedes-Benz',
  'BMW',
  'Audi',
  'Toyota',
  'Hyundai',
  'Kia',
  'Mahindra',
  'Tata',
  'Honda',
  'Maruti Suzuki',
  'Volkswagen',
  'Skoda',
  'MG',
  'Jeep',
  'Land Rover',
  'Volvo',
  'Porsche',
  'Other Brand',
]

const OWNERSHIP_OPTIONS = [
  { id: '1st Owner', label: '1st Owner', sub: 'Single User' },
  { id: '2nd Owner', label: '2nd Owner', sub: 'Pre-owned' },
  { id: '3rd Owner', label: '3rd Owner', sub: 'Multi-owner' },
  { id: '4th+ Owner', label: '4th+ Owner', sub: 'Commercial/Multiple' },
]

const FUEL_OPTIONS = ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid']

const TRANSMISSION_OPTIONS = ['Automatic', 'Manual']

const KM_OPTIONS = [
  { label: 'Under 20,000 km', value: 15000 },
  { label: '20,000 - 40,000 km', value: 30000 },
  { label: '40,000 - 70,000 km', value: 55000 },
  { label: '70,000 - 1,00,000 km', value: 85000 },
  { label: '1,00,000+ km', value: 120000 },
]

const LOCATION_OPTIONS = [
  { id: 'Udaipur Showroom', name: 'Udaipur (Main Showroom / Doorstep)', code: 'RJ27' },
  { id: 'Chittorgarh Outlet', name: 'Chittorgarh (New Outlet / Doorstep)', code: 'RJ09' },
  { id: 'Rajsamand / Nathdwara', name: 'Rajsamand / Nathdwara (Doorstep)', code: 'RJ30' },
  { id: 'Bhilwara', name: 'Bhilwara (Doorstep Inspection)', code: 'RJ06' },
  { id: 'Jaipur', name: 'Jaipur & Rest of Rajasthan', code: 'RJ14' },
  { id: 'Other Location', name: 'Other City / Out of State', code: 'ALL' },
]

const YEARS = Array.from({ length: 15 }, (_, i) => 2025 - i)

// Base price calculation helper for dynamic estimate
function calculateEstimatedRange(
  brand: string,
  year: number,
  fuel: string,
  km: number,
  ownership: string,
): { min: number; max: number } {
  let base = 800000

  // Brand multiplier
  if (['Mercedes-Benz', 'BMW', 'Audi', 'Porsche', 'Land Rover', 'Volvo'].includes(brand)) {
    base = 3200000
  } else if (['Toyota', 'Jeep', 'Volkswagen', 'Skoda', 'MG'].includes(brand)) {
    base = 1600000
  } else if (['Mahindra', 'Tata', 'Kia', 'Hyundai', 'Honda'].includes(brand)) {
    base = 1100000
  } else if (['Maruti Suzuki'].includes(brand)) {
    base = 700000
  }

  // Year depreciation
  const age = Math.max(0, 2025 - year)
  const ageFactor = Math.max(0.35, Math.pow(0.88, age))
  base *= ageFactor

  // KM depreciation
  if (km > 100000) base *= 0.8
  else if (km > 60000) base *= 0.9
  else if (km < 25000) base *= 1.08

  // Ownership factor
  if (ownership === '1st Owner') base *= 1.05
  else if (ownership === '2nd Owner') base *= 0.96
  else if (ownership === '3rd Owner') base *= 0.88
  else if (ownership === '4th+ Owner') base *= 0.8

  // Fuel type factor
  if (fuel === 'Diesel') base *= 1.03
  else if (fuel === 'Electric') base *= 1.05

  const min = Math.round((base * 0.94) / 10000) * 10000
  const max = Math.round((base * 1.06) / 10000) * 10000
  return { min: Math.max(150000, min), max: Math.max(200000, max) }
}

function formatLakhs(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`
  }
  return `₹${(amount / 100000).toFixed(2)} Lakh`
}

export function SellCarForm() {
  const formId = useId()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const [referenceId, setReferenceId] = useState('')

  // Form State
  const [carNumber, setCarNumber] = useState('')
  const [detectedRto, setDetectedRto] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [ownership, setOwnership] = useState('1st Owner')
  const [location, setLocation] = useState('Udaipur Showroom')
  const [doorstepAddress, setDoorstepAddress] = useState('')
  const [brand, setBrand] = useState('Toyota')
  const [model, setModel] = useState('Fortuner')
  const [year, setYear] = useState<number>(2021)
  const [fuel, setFuel] = useState('Diesel')
  const [transmission, setTransmission] = useState('Automatic')
  const [kmDriven, setKmDriven] = useState<number>(30000)
  const [whatsappConsent, setWhatsappConsent] = useState(true)
  const [preferredSlot, setPreferredSlot] = useState('Tomorrow Morning (10 AM - 1 PM)')
  const [activeLoan, setActiveLoan] = useState<'no' | 'yes'>('no')

  // Submission & Email states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [emailStatus, setEmailStatus] = useState<'idle' | 'success' | 'warning'>('idle')

  // Detect RTO city when car number is typed
  const handleCarNumberChange = (val: string) => {
    const clean = val.toUpperCase().replace(/[^A-Z0-9]/g, '')
    setCarNumber(clean)

    // Check first 4 or 2 chars
    const code4 = clean.substring(0, 4)
    const code2 = clean.substring(0, 2)

    if (RTO_MAP[code4]) {
      setDetectedRto(RTO_MAP[code4])
      if (code4 === 'RJ27') setLocation('Udaipur Showroom')
      else if (code4 === 'RJ09') setLocation('Chittorgarh Outlet')
      else if (code4 === 'RJ06') setLocation('Bhilwara')
      else if (code4 === 'RJ30') setLocation('Rajsamand / Nathdwara')
    } else if (RTO_MAP[code2]) {
      setDetectedRto(RTO_MAP[code2])
    } else {
      setDetectedRto('')
    }
  }

  // Format plate string for display: RJ 27 AB 1234
  const formattedPlate = () => {
    if (!carNumber) return 'RJ 27 AB 1234'
    const part1 = carNumber.substring(0, 2)
    const part2 = carNumber.substring(2, 4)
    const part3 = carNumber.substring(4, carNumber.length > 6 ? carNumber.length - 4 : 6)
    const part4 = carNumber.length > 6 ? carNumber.substring(carNumber.length - 4) : ''
    return [part1, part2, part3, part4].filter(Boolean).join(' ')
  }

  const estimate = calculateEstimatedRange(brand, year, fuel, kmDriven, ownership)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName.trim() || !phone || phone.length < 10) {
      alert('Please provide your full name and a valid 10-digit mobile number.')
      setStep(1)
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    const randId = `LK-SELL-${Math.floor(10000 + Math.random() * 90000)}`
    setReferenceId(randId)

    const formattedValuation = 'Soon team will connect with you'
    const submissionTime = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    })

    // 1. Dispatch full form details directly to dealer email via FormSubmit AJAX
    let emailSent = false
    try {
      const emailPayload = {
        _subject: `🚗 New Car Sell Request: ${year} ${brand} ${model} [${carNumber || 'No Plate'}] - ${fullName}`,
        _template: 'table',
        _captcha: 'false',
        'Reference ID': randId,
        'Seller Name': fullName,
        'Mobile Phone': `+91 ${phone}`,
        'Seller Email': customerEmail.trim() || 'Not Provided',
        'Car Registration': carNumber ? formattedPlate() : 'Not Specified',
        'RTO / District': detectedRto || 'Rajasthan',
        'Make & Model': `${brand} ${model}`,
        'Registration Year': year,
        'Fuel Type': fuel,
        'Transmission': transmission,
        'Kilometers Driven': `~${kmDriven.toLocaleString('en-IN')} km`,
        'Ownership History': ownership,
        'Estimated Market Value': formattedValuation,
        'Inspection Location': location,
        'Doorstep Address': doorstepAddress || 'Not specified (Showroom evaluation)',
        'Preferred Slot': preferredSlot,
        'Existing Bank Loan': activeLoan === 'yes' ? 'Yes (Bank NOC needed)' : 'No (Clear Title)',
        'WhatsApp Consent': whatsappConsent ? 'Yes (Agreed)' : 'No',
        'Submission Timestamp': submissionTime,
      }

      const response = await fetch('https://formsubmit.co/ajax/lovekushcarbazzar@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(emailPayload),
      })

      if (response.ok) {
        emailSent = true
      } else {
        console.warn('FormSubmit returned HTTP status:', response.status)
      }
    } catch (err) {
      console.error('Error dispatching to FormSubmit:', err)
    }

    // 2. Also record lead in local backend database if available
    try {
      await apiFetch('/leads/sell', {
        method: 'POST',
        body: JSON.stringify({
          name: fullName,
          phone,
          email: customerEmail.trim() || undefined,
          location,
          details: {
            reference_id: randId,
            car_number: carNumber,
            plate_display: formattedPlate(),
            detected_rto: detectedRto,
            brand,
            model,
            year,
            fuel,
            transmission,
            km_driven: kmDriven,
            ownership,
            active_loan: activeLoan,
            doorstep_address: doorstepAddress,
            preferred_slot: preferredSlot,
            estimated_range: formattedValuation,
            whatsapp_consent: whatsappConsent,
            submitted_at: submissionTime,
            recipient_email: 'lovekushcarbazzar@gmail.com',
          },
        }),
      })
    } catch {
      // Local backend might be offline during standalone dev/static deployment; safely ignore
    }

    setIsSubmitting(false)
    setEmailStatus(emailSent ? 'success' : 'warning')
    setIsSuccessOpen(true)
  }

  const getWhatsAppMessage = () => {
    const text = `*New Car Sell Request - Love Kush Cars*
━━━━━━━━━━━━━━━━━━━━
*Reference:* ${referenceId}
*Customer:* ${fullName}
*Phone:* +91 ${phone}
${customerEmail ? `*Email:* ${customerEmail}\n` : ''}*Car Number:* ${carNumber || 'Not specified'} (${detectedRto || 'Rajasthan'})
*Vehicle:* ${year} ${brand} ${model}
*Ownership:* ${ownership}
*Fuel & Trans:* ${fuel} | ${transmission}
*KM Driven:* ~${kmDriven.toLocaleString('en-IN')} km
*Estimated Value:* Soon team will connect with you
*Inspection Location:* ${location}
${doorstepAddress ? `*Address:* ${doorstepAddress}\n` : ''}*Preferred Slot:* ${preferredSlot}
*Existing Loan:* ${activeLoan === 'yes' ? 'Yes (Bank NOC needed)' : 'No (Clear Title)'}
━━━━━━━━━━━━━━━━━━━━
Please confirm my free doorstep inspection slot.`
    return encodeURIComponent(text)
  }

  return (
    <div className="w-full">
      {/* Form Container Card */}
      <div className="bg-paper border border-line shadow-elevated overflow-hidden">
        {/* Step Progress Header */}
        <div className="bg-mist/80 border-b border-line px-6 py-4">
          <div className="flex items-center justify-between gap-2 max-w-2xl mx-auto">
            {/* Step 1 */}
            <button
              type="button"
              onClick={() => setStep(1)}
              className={cn(
                'flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider transition-all',
                step === 1 ? 'text-ink font-bold' : 'text-slate/60 hover:text-ink',
              )}
            >
              <span
                className={cn(
                  'h-6 w-6 rounded-full flex items-center justify-center text-xs transition-colors',
                  step === 1
                    ? 'bg-ink text-paper'
                    : step > 1
                      ? 'bg-emerald-600 text-white'
                      : 'bg-paper border border-line text-slate',
                )}
              >
                {step > 1 ? <Check className="h-3.5 w-3.5" /> : '1'}
              </span>
              <span className="hidden sm:inline">Car &amp; Location</span>
            </button>

            <div className={cn('h-[1px] flex-1 transition-colors', step > 1 ? 'bg-emerald-600' : 'bg-line')} />

            {/* Step 2 */}
            <button
              type="button"
              onClick={() => {
                if (carNumber || fullName) setStep(2)
              }}
              className={cn(
                'flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider transition-all',
                step === 2 ? 'text-ink font-bold' : 'text-slate/60 hover:text-ink',
              )}
            >
              <span
                className={cn(
                  'h-6 w-6 rounded-full flex items-center justify-center text-xs transition-colors',
                  step === 2
                    ? 'bg-ink text-paper'
                    : step > 2
                      ? 'bg-emerald-600 text-white'
                      : 'bg-paper border border-line text-slate',
                )}
              >
                {step > 2 ? <Check className="h-3.5 w-3.5" /> : '2'}
              </span>
              <span className="hidden sm:inline">Specs &amp; Ownership</span>
            </button>

            <div className={cn('h-[1px] flex-1 transition-colors', step > 2 ? 'bg-emerald-600' : 'bg-line')} />

            {/* Step 3 */}
            <button
              type="button"
              onClick={() => {
                if (phone) setStep(3)
              }}
              className={cn(
                'flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider transition-all',
                step === 3 ? 'text-ink font-bold' : 'text-slate/60 hover:text-ink',
              )}
            >
              <span
                className={cn(
                  'h-6 w-6 rounded-full flex items-center justify-center text-xs transition-colors',
                  step === 3
                    ? 'bg-ink text-paper'
                    : 'bg-paper border border-line text-slate',
                )}
              >
                3
              </span>
              <span className="hidden sm:inline">Inspection &amp; Booking</span>
            </button>
          </div>
        </div>

        {/* Live Estimate Quick Ticker */}
        <div className="bg-ink text-paper px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/70">Vehicle Valuation:</span>
            <span className="font-bold text-sm text-emerald-400 font-[family-name:var(--font-display)]">
              Soon team will connect with you
            </span>
          </div>
          <div className="flex items-center gap-4 text-white/60">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-white" /> 100% Free Doorstep Evaluation
            </span>
            <span className="hidden md:inline text-white/30">&bull;</span>
            <span className="hidden md:flex items-center gap-1">
              <CircleDollarSign className="h-3.5 w-3.5 text-white" /> Instant Bank Transfer
            </span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          {/* STEP 1: Registration Number, Location & Contact */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <div>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-xl sm:text-2xl text-ink">
                  Enter Your Car Registration &amp; Location
                </h3>
                <p className="text-xs sm:text-sm text-slate/70 mt-1">
                  We use your registration number to auto-fetch RTO history and calculate accurate Rajasthan market rates.
                </p>
              </div>

              {/* Indian Number Plate Styled Box */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate mb-2">
                  Car Registration Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative max-w-md">
                  <div className="flex items-stretch border-2 border-ink rounded-[4px] bg-amber-300 shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-ink">
                    {/* Left blue IND stripe */}
                    <div className="bg-[#003399] text-white px-2.5 py-3 flex flex-col items-center justify-center shrink-0 border-r border-white/20">
                      <span className="text-[10px] leading-none font-bold tracking-tighter">IND</span>
                      <span className="text-[7px] leading-none opacity-80 mt-1">🇮🇳</span>
                    </div>

                    {/* Registration input */}
                    <input
                      type="text"
                      id={`${formId}-plate`}
                      value={carNumber}
                      onChange={(e) => handleCarNumberChange(e.target.value)}
                      placeholder="e.g. RJ27 AB 1234"
                      maxLength={11}
                      className="w-full bg-paper px-4 py-3.5 font-[family-name:var(--font-display)] font-extrabold text-lg sm:text-xl uppercase tracking-widest text-ink placeholder:text-slate/30 focus:outline-none"
                    />
                  </div>

                  {detectedRto && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium mt-2"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>RTO Detected: <strong>{detectedRto}</strong></span>
                    </motion.div>
                  )}
                  {!detectedRto && carNumber.length > 2 && (
                    <p className="text-[11px] text-slate/60 mt-1.5">
                      Tip: Enter your state &amp; RTO code (e.g. RJ27 for Udaipur, RJ09 for Chittorgarh)
                    </p>
                  )}
                </div>
              </div>

              {/* Location of Car Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate mb-2">
                  Where is the car located right now? <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {LOCATION_OPTIONS.map((loc) => {
                    const isSelected = location === loc.id
                    return (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => setLocation(loc.id)}
                        className={cn(
                          'p-3.5 text-left border rounded-[2px] transition-all flex items-start justify-between gap-2',
                          isSelected
                            ? 'border-ink bg-ink text-paper shadow-sm'
                            : 'border-line bg-paper text-ink hover:border-slate/40 hover:bg-mist/50',
                        )}
                      >
                        <div>
                          <div className="flex items-center gap-1.5 font-semibold text-xs sm:text-sm">
                            <MapPin className={cn('h-3.5 w-3.5', isSelected ? 'text-amber-300' : 'text-slate')} />
                            <span>{loc.name}</span>
                          </div>
                          <span className={cn('text-[11px] block mt-0.5', isSelected ? 'text-white/70' : 'text-slate/60')}>
                            Free doorstep pickup available
                          </span>
                        </div>
                        {isSelected && <Check className="h-4 w-4 shrink-0 text-amber-300 mt-0.5" />}
                      </button>
                    )
                  })}
                </div>

                {/* Specific address input if doorstep preferred */}
                <div className="mt-3">
                  <input
                    type="text"
                    value={doorstepAddress}
                    onChange={(e) => setDoorstepAddress(e.target.value)}
                    placeholder="Specific area or street address (e.g. 100 Ft Road, Meera Nagar, Udaipur)"
                    className="w-full border border-line bg-paper px-4 py-2.5 text-xs sm:text-sm text-ink placeholder:text-slate/40 focus:outline-none focus:border-ink transition-colors"
                  />
                </div>
              </div>

              {/* Owner Personal Details */}
              <div className="pt-4 border-t border-line">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate mb-4">
                  Owner Contact Information (For Valuation Report &amp; Doorstep Booking)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor={`${formId}-name`} className="block text-xs font-medium text-slate mb-1">
                      Your Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate/50" />
                      <input
                        type="text"
                        id={`${formId}-name`}
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Vikram Singh"
                        className="w-full border border-line bg-paper pl-10 pr-4 py-3 text-sm text-ink placeholder:text-slate/40 focus:outline-none focus:border-ink"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${formId}-phone`} className="block text-xs font-medium text-slate mb-1">
                      Mobile Number (+91) <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative flex">
                      <span className="inline-flex items-center px-3 border border-r-0 border-line bg-mist text-xs font-semibold text-slate">
                        +91
                      </span>
                      <input
                        type="tel"
                        id={`${formId}-phone`}
                        required
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="10-digit number"
                        className="w-full border border-line bg-paper px-3.5 py-3 text-sm text-ink placeholder:text-slate/40 focus:outline-none focus:border-ink"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${formId}-email`} className="block text-xs font-medium text-slate mb-1">
                      Email Address <span className="text-slate/40 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate/50" />
                      <input
                        type="email"
                        id={`${formId}-email`}
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="e.g. vikram@gmail.com"
                        className="w-full border border-line bg-paper pl-10 pr-4 py-3 text-sm text-ink placeholder:text-slate/40 focus:outline-none focus:border-ink"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <input
                    type="checkbox"
                    id={`${formId}-whatsapp`}
                    checked={whatsappConsent}
                    onChange={(e) => setWhatsappConsent(e.target.checked)}
                    className="h-4 w-4 rounded border-line text-ink accent-ink"
                  />
                  <label htmlFor={`${formId}-whatsapp`} className="text-xs text-slate/80 select-none">
                    Send free valuation summary &amp; inspection updates directly on WhatsApp
                  </label>
                </div>
              </div>

              {/* Navigation button */}
              <div className="flex items-center justify-end pt-4">
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    if (!fullName.trim() || !phone || phone.length < 10) {
                      alert('Please provide your full name and a valid 10-digit mobile number before proceeding.')
                      return
                    }
                    setStep(2)
                  }}
                  className="w-full sm:w-auto"
                >
                  Continue to Vehicle Specs <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Make, Model, Year, Fuel, KM, Ownership */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-xl sm:text-2xl text-ink">
                    Car Details &amp; Ownership History
                  </h3>
                  <p className="text-xs sm:text-sm text-slate/70 mt-1">
                    Select your car's specifications so we can calculate its fair Rajasthan market valuation.
                  </p>
                </div>
                <div className="hidden sm:block text-right">
                  <span className="text-[11px] uppercase tracking-wider text-slate/60 block">Plate</span>
                  <span className="font-mono font-bold text-xs bg-mist px-2.5 py-1 border border-line">
                    {formattedPlate()}
                  </span>
                </div>
              </div>

              {/* Brand & Model */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5">
                    Make / Brand <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full border border-line bg-paper px-4 py-3 text-sm text-ink focus:outline-none focus:border-ink"
                  >
                    {POPULAR_BRANDS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5">
                    Model &amp; Variant <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="e.g. Fortuner 4x4 / Creta SX(O) / 320d"
                    className="w-full border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-slate/40 focus:outline-none focus:border-ink"
                  />
                </div>
              </div>

              {/* Year & Fuel Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5">
                    Manufacturing / Registration Year <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full border border-line bg-paper px-4 py-3 text-sm text-ink focus:outline-none focus:border-ink"
                  >
                    {YEARS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5">
                    Transmission
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {TRANSMISSION_OPTIONS.map((trans) => (
                      <button
                        key={trans}
                        type="button"
                        onClick={() => setTransmission(trans)}
                        className={cn(
                          'py-3 px-3 text-xs font-semibold uppercase tracking-wider border text-center transition-all',
                          transmission === trans
                            ? 'border-ink bg-ink text-paper'
                            : 'border-line bg-paper text-slate hover:border-slate/50',
                        )}
                      >
                        {trans}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Fuel Type Chips */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate mb-2">
                  Fuel Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {FUEL_OPTIONS.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFuel(f)}
                      className={cn(
                        'px-4 py-2.5 text-xs font-semibold rounded-[2px] border transition-all',
                        fuel === f
                          ? 'border-ink bg-ink text-paper shadow-sm'
                          : 'border-line bg-paper text-slate hover:border-slate/40',
                      )}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Kilometers Driven */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate mb-2">
                  Kilometers Driven (Odometer Reading)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                  {KM_OPTIONS.map((km) => (
                    <button
                      key={km.label}
                      type="button"
                      onClick={() => setKmDriven(km.value)}
                      className={cn(
                        'p-2.5 text-xs font-medium border text-center transition-all',
                        kmDriven === km.value
                          ? 'border-ink bg-ink text-paper font-semibold'
                          : 'border-line bg-paper text-slate hover:border-slate/40',
                      )}
                    >
                      {km.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ownership Details - Cars24 Highlight */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate">
                    Ownership Details <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[11px] text-slate/60">As per vehicle RC</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {OWNERSHIP_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setOwnership(opt.id)}
                      className={cn(
                        'p-3.5 border text-center transition-all',
                        ownership === opt.id
                          ? 'border-ink bg-ink text-paper shadow-sm'
                          : 'border-line bg-paper text-ink hover:border-slate/40',
                      )}
                    >
                      <span className="block font-bold text-sm">{opt.label}</span>
                      <span className={cn('block text-[10px] mt-0.5', ownership === opt.id ? 'text-white/70' : 'text-slate/50')}>
                        {opt.sub}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Loan Status */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate mb-2">
                  Does the vehicle have an active bank loan?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-xs text-slate cursor-pointer">
                    <input
                      type="radio"
                      name="loan"
                      value="no"
                      checked={activeLoan === 'no'}
                      onChange={() => setActiveLoan('no')}
                      className="accent-ink"
                    />
                    <span>No Loan (Clear RC)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate cursor-pointer">
                    <input
                      type="radio"
                      name="loan"
                      value="yes"
                      checked={activeLoan === 'yes'}
                      onChange={() => setActiveLoan('yes')}
                      className="accent-ink"
                    />
                    <span>Yes, on Bank Loan (Love Kush Cars assists in clearing loan)</span>
                  </label>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-line">
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1.5"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  onClick={() => setStep(3)}
                >
                  Continue to Schedule Inspection <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Instant Valuation Summary, Appointment Scheduling & Submit */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <div>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-xl sm:text-2xl text-ink">
                  Schedule Free Doorstep Inspection
                </h3>
                <p className="text-xs sm:text-sm text-slate/70 mt-1">
                  Choose when you'd like our certified technician to inspect your car. Soon our team will connect with you with the best valuation offer.
                </p>
              </div>

              {/* Valuation Breakdown Hero Card */}
              <div className="bg-mist border border-line p-6 sm:p-8 rounded-[4px] relative overflow-hidden">
                <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 opacity-5 pointer-events-none">
                  <Car className="h-48 w-48 text-ink" />
                </div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                  <div className="lg:col-span-2">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-ink text-paper px-2.5 py-1 mb-3">
                      <Sparkles className="h-3 w-3 text-amber-300" /> Rajasthan Fair Market Valuation
                    </span>
                    <h4 className="font-[family-name:var(--font-display)] font-bold text-2xl sm:text-3xl text-ink">
                      {year} {brand} {model}
                    </h4>
                    <p className="text-xs text-slate/70 mt-1">
                      {ownership} &bull; {fuel} &bull; {transmission} &bull; ~{kmDriven.toLocaleString('en-IN')} km &bull; {detectedRto || 'Rajasthan'}
                    </p>

                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="font-[family-name:var(--font-display)] font-extrabold text-2xl sm:text-4xl text-ink">
                        Soon team will connect with you
                      </span>
                    </div>
                    <p className="text-xs text-slate/70 mt-1.5 leading-relaxed">
                      Our senior automobile evaluation team will review your car's details and contact you directly with our best fair market price offer.
                    </p>
                  </div>

                  {/* Summary Badges */}
                  <div className="bg-paper border border-line p-4 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-line">
                      <span className="text-slate/70">Registration:</span>
                      <span className="font-mono font-bold text-ink">{formattedPlate()}</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-line">
                      <span className="text-slate/70">Inspection Fee:</span>
                      <span className="font-bold text-emerald-600">₹0 (100% Free)</span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-line">
                      <span className="text-slate/70">RC Transfer:</span>
                      <span className="font-bold text-emerald-600">Free &amp; Guaranteed</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate/70">Payment Time:</span>
                      <span className="font-bold text-ink">Instant (Same Day)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preferred Doorstep / Showroom Inspection Slot */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate mb-2">
                  Choose Preferred Free Inspection Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    'Today (Immediate Express Evaluation)',
                    'Tomorrow Morning (10 AM - 1 PM)',
                    'Tomorrow Afternoon (2 PM - 6 PM)',
                  ].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setPreferredSlot(slot)}
                      className={cn(
                        'p-3.5 text-xs font-medium border text-left flex items-start gap-2.5 transition-all',
                        preferredSlot === slot
                          ? 'border-ink bg-ink text-paper font-semibold'
                          : 'border-line bg-paper text-slate hover:border-slate/40',
                      )}
                    >
                      <Clock className={cn('h-4 w-4 shrink-0 mt-0.5', preferredSlot === slot ? 'text-amber-300' : 'text-slate/60')} />
                      <span>{slot}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Verification & Consent confirmation */}
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-[2px] flex items-start gap-3 text-xs text-emerald-900">
                <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
                <div>
                  <p className="font-semibold">Love Kush Cars Zero-Hassle Assurance:</p>
                  <p className="text-emerald-800/80 mt-0.5 leading-relaxed">
                    No obligation to sell if you don't like our final quote. Full legal indemnity upon car handover with instant bank credit.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-line">
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  disabled={isSubmitting}
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1.5 order-2 sm:order-1"
                >
                  <ArrowLeft className="h-4 w-4" /> Edit Specs
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto order-1 sm:order-2 bg-ink hover:bg-slate text-paper py-4 px-8 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-amber-300" />
                      <span>Submitting Inspection Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Book Free Inspection Now</span>
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </form>
      </div>

      {/* Confirmation & Dispatch Modal */}
      <Modal open={isSuccessOpen} onClose={() => setIsSuccessOpen(false)}>
        <div className="text-center py-4">
          <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <span className="text-[10px] uppercase tracking-widest font-bold bg-mist px-3 py-1 border border-line text-slate">
            Reference ID: {referenceId}
          </span>

          <h3 className="font-[family-name:var(--font-display)] font-extrabold text-2xl text-ink mt-3">
            Inspection Slot Booked!
          </h3>

          <p className="text-xs sm:text-sm text-slate/70 mt-2 max-w-md mx-auto leading-relaxed">
            Thank you <strong>{fullName}</strong>. Your vehicle evaluation request for <strong>{year} {brand} {model}</strong> has been received.
          </p>

          {/* Dispatch Confirmation Banner */}
          <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-[2px] text-xs text-emerald-900 my-4 text-left flex items-start gap-2.5 max-w-md mx-auto">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-emerald-950">Request Dispatched Successfully</p>
              <p className="text-[11px] text-emerald-800 mt-0.5">
                All vehicle specifications and inspection details have been forwarded to our certified evaluation team.
              </p>
            </div>
          </div>

          <div className="bg-mist border border-line p-4 my-4 text-left text-xs space-y-1.5 max-w-md mx-auto">
            <div className="flex justify-between">
              <span className="text-slate/60">Valuation:</span>
              <span className="font-bold text-emerald-600">Soon team will connect with you</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate/60">Car Registration:</span>
              <span className="font-mono font-bold text-ink">{formattedPlate()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate/60">Selected Slot:</span>
              <span className="font-medium text-ink">{preferredSlot}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate/60">Inspection Venue:</span>
              <span className="font-medium text-ink">{location}</span>
            </div>
            {customerEmail && (
              <div className="flex justify-between">
                <span className="text-slate/60">Customer Email:</span>
                <span className="font-medium text-ink">{customerEmail}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <a
              href={`https://wa.me/919694266827?text=${getWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase font-bold tracking-wider px-6 py-3.5 transition-colors"
            >
              <Send className="h-4 w-4" /> Send on WhatsApp
            </a>

            <a
              href="tel:+919694266827"
              className="inline-flex items-center justify-center gap-2 bg-ink hover:bg-slate text-paper text-xs uppercase font-bold tracking-wider px-6 py-3.5 transition-colors"
            >
              <PhoneCall className="h-4 w-4" /> Call Evaluator Now
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsSuccessOpen(false)}
            className="mt-5 text-xs text-slate/60 hover:text-ink underline block mx-auto"
          >
            Close &amp; Return to Page
          </button>
        </div>
      </Modal>
    </div>
  )
}
