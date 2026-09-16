import { useState, useId } from 'react'
import { motion } from 'framer-motion'
import {
  Send,
  User,
  Mail,
  MessageSquare,
  Building2,
  CheckCircle2,
  MessageCircle,
  Clock,
  Car,
  CircleDollarSign,
  Landmark,
  Wrench,
  HelpCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const INQUIRY_TYPES = [
  { id: 'buy-car', label: 'Buy Certified Car', icon: Car },
  { id: 'sell-car', label: 'Sell / Valuate Car', icon: CircleDollarSign },
  { id: 'finance', label: 'Car Loan / Refinance', icon: Landmark },
  { id: 'inspection', label: 'Inspection / Service', icon: Wrench },
  { id: 'general', label: 'General / Visit Booking', icon: HelpCircle },
]

export function ContactForm() {
  const formId = useId()
  const [inquiryType, setInquiryType] = useState('buy-car')
  const [preferredShowroom, setPreferredShowroom] = useState('Udaipur (100 Ft Road, Meera Nagar)')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [referenceId, setReferenceId] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName.trim() || phone.length < 10) {
      alert('Please fill your full name and a valid 10-digit mobile number.')
      return
    }

    const randRef = `LK-INQ-${Math.floor(10000 + Math.random() * 90000)}`
    setReferenceId(randRef)
    setSubmitted(true)
  }

  const getWhatsAppMessage = () => {
    const text = `*New Customer Inquiry - Love Kush Cars*
━━━━━━━━━━━━━━━━━━━━
*Ref ID:* ${referenceId}
*Inquiry Type:* ${INQUIRY_TYPES.find((t) => t.id === inquiryType)?.label || inquiryType}
*Preferred Showroom:* ${preferredShowroom}
*Customer Name:* ${fullName}
*Phone:* +91 ${phone}
*Email:* ${email || 'N/A'}
*Message/Query:* ${message || 'I would like more details.'}
━━━━━━━━━━━━━━━━━━━━
Please connect me with an automotive specialist.`
    return encodeURIComponent(text)
  }

  return (
    <section className="container-lk py-12 sm:py-16 border-t border-line">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-mist border border-line text-slate text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            <MessageSquare className="h-3.5 w-3.5 text-ink" />
            <span>Send Direct Message</span>
          </div>

          <h2 className="font-[family-name:var(--font-display)] font-extrabold text-2xl sm:text-3xl md:text-4xl text-ink">
            How Can We Assist You Today?
          </h2>

          <p className="text-slate text-xs sm:text-sm mt-2 max-w-xl mx-auto leading-relaxed">
            Fill out the inquiry form below and our relationship manager from the selected showroom will call you
            within 15 minutes.
          </p>
        </div>

        {submitted ? (
          /* SUCCESS CONFIRMATION SCREEN */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 sm:p-12 bg-paper border-2 border-line text-center shadow-elevated rounded-[2px]"
          >
            <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-widest rounded-full mb-3">
              Message Received &bull; Ref: {referenceId}
            </span>

            <h3 className="font-[family-name:var(--font-display)] font-extrabold text-2xl sm:text-3xl text-ink">
              Thank You, {fullName}!
            </h3>

            <p className="text-xs sm:text-sm text-slate mt-2 max-w-md mx-auto leading-relaxed">
              Your inquiry regarding <strong>{INQUIRY_TYPES.find((t) => t.id === inquiryType)?.label}</strong> has
              been routed to our <strong>{preferredShowroom}</strong> team. We will contact you at{' '}
              <strong>+91 {phone}</strong> shortly.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/919694266827?text=${getWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider px-6 py-4 transition-colors rounded-[2px]"
              >
                <MessageCircle className="h-4 w-4" /> Fast Track on WhatsApp
              </a>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  setSubmitted(false)
                  setFullName('')
                  setPhone('')
                  setEmail('')
                  setMessage('')
                }}
                className="w-full sm:w-auto text-xs font-bold uppercase tracking-wider"
              >
                Send Another Message
              </Button>
            </div>
          </motion.div>
        ) : (
          /* INTERACTIVE INQUIRY FORM */
          <div className="bg-paper border border-line shadow-elevated overflow-hidden">
            {/* Header Ribbon */}
            <div className="bg-ink text-paper p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-300 tracking-widest block">
                  Priority Response Desk
                </span>
                <h3 className="font-[family-name:var(--font-display)] font-bold text-xl sm:text-2xl text-paper mt-0.5">
                  Direct Showroom Inquiry Form
                </h3>
              </div>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 bg-white/10 px-3 py-1 border border-white/15">
                <Clock className="h-3.5 w-3.5" /> Average response: 15 mins
              </span>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
              {/* 1. Inquiry Category Pills */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate mb-2.5">
                  Select Topic of Inquiry <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                  {INQUIRY_TYPES.map((type) => {
                    const Icon = type.icon
                    const isSelected = inquiryType === type.id
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setInquiryType(type.id)}
                        className={cn(
                          'p-3 text-center border rounded-[2px] transition-all flex flex-col items-center justify-center gap-1.5',
                          isSelected
                            ? 'bg-ink text-paper border-ink shadow-sm'
                            : 'bg-paper text-slate border-line hover:border-slate/40',
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-[11px] font-bold tracking-tight">{type.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* 2. Showroom Location Preference */}
              <div>
                <label
                  htmlFor={`${formId}-showroom`}
                  className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5"
                >
                  Preferred Showroom Branch <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate/40" />
                  <select
                    id={`${formId}-showroom`}
                    value={preferredShowroom}
                    onChange={(e) => setPreferredShowroom(e.target.value)}
                    className="w-full border border-line bg-paper pl-10 pr-3.5 py-3 text-sm text-ink focus:outline-none focus:border-ink font-medium"
                  >
                    <option value="Udaipur (100 Ft Road, Meera Nagar)">
                      Udaipur Showroom &mdash; 100 Ft Road, Meera Nagar (Flagship)
                    </option>
                    <option value="Chittorgarh (NH-27 Bypass)">
                      Chittorgarh Branch &mdash; NH-27 Bypass, Near Collectorate Circle
                    </option>
                    <option value="Doorstep Service (Udaipur / Chittorgarh / Bhilwara / Rajsamand)">
                      Doorstep Service &mdash; Home/Office Visit (Mewar Region)
                    </option>
                  </select>
                </div>
              </div>

              {/* 3. Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`${formId}-name`}
                    className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5"
                  >
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate/40" />
                    <input
                      type="text"
                      id={`${formId}-name`}
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Yashwant Singh"
                      className="w-full border border-line bg-paper pl-10 pr-3.5 py-3 text-sm text-ink focus:outline-none focus:border-ink"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor={`${formId}-phone`}
                    className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5"
                  >
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
                      placeholder="10-digit number"
                      className="w-full border border-line bg-paper px-3.5 py-3 text-sm text-ink focus:outline-none focus:border-ink"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Email Address */}
              <div>
                <label
                  htmlFor={`${formId}-email`}
                  className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5"
                >
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate/40" />
                  <input
                    type="email"
                    id={`${formId}-email`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full border border-line bg-paper pl-10 pr-3.5 py-3 text-sm text-ink focus:outline-none focus:border-ink"
                  />
                </div>
              </div>

              {/* 5. Message / Specifics */}
              <div>
                <label
                  htmlFor={`${formId}-message`}
                  className="block text-xs font-semibold uppercase tracking-wider text-slate mb-1.5"
                >
                  Your Message or Car Specifics (e.g. Budget, Model, Valuation Details)
                </label>
                <textarea
                  id={`${formId}-message`}
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what vehicle you are looking for, car you want to sell, or any specific questions..."
                  className="w-full border border-line bg-paper p-3.5 text-sm text-ink focus:outline-none focus:border-ink resize-none"
                />
              </div>

              {/* 6. Submit Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[11px] text-slate/70">
                  🔒 We protect your privacy. Zero spam and zero sharing of your contact number.
                </p>
                <Button type="submit" size="lg" className="w-full sm:w-auto font-bold uppercase tracking-wider text-xs px-8 py-4">
                  <Send className="h-4 w-4 mr-2" /> Send Inquiry
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}
