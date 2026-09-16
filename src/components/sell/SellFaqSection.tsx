import { useState } from 'react'
import { ChevronDown, HelpCircle, PhoneCall, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const faqs = [
  {
    q: 'How does Love Kush Cars calculate the valuation of my car?',
    a: 'Our valuation algorithm uses live Rajasthan and Pan-India transaction data, taking into account your car make, model, registration year, ownership count (1st/2nd), fuel type, odometer reading, and regional demand in Udaipur and Chittorgarh. The final price is confirmed after our free 150-point physical inspection.',
  },
  {
    q: 'Is the doorstep inspection really 100% free?',
    a: 'Yes, absolutely. Our certified evaluation specialist visits your residence or workplace anywhere across Udaipur, Chittorgarh, Bhilwara, Rajsamand, and nearby regions with zero inspection charges. Even if you decide not to sell your car to us, you owe us nothing.',
  },
  {
    q: 'When will I receive payment for my car?',
    a: 'Payment is made 100% upfront on the spot. Once we agree on the final valuation quote and sign the purchase agreement, the full amount is credited to your bank account via instant RTGS / IMPS before you hand over your keys or vehicle documents.',
  },
  {
    q: 'How is the RC transfer handled and who is liable after the sale?',
    a: 'Upon handing over your car, Love Kush Cars issues an official Legal Handover Certificate and indemnity receipt. This document legally transfers all road liabilities, traffic challans, and third-party obligations from you to Love Kush Cars immediately. We manage the complete RTO transfer process and send you the updated RC copy once finished.',
  },
  {
    q: 'Can I sell a car that is currently under an active bank loan or EMI?',
    a: 'Yes, you can. We help you obtain the loan foreclosure statement from your bank. On the day of sale, Love Kush Cars directly settles your outstanding loan with the bank and transfers the remaining positive equity amount directly to your bank account.',
  },
  {
    q: 'What if my car has some minor scratches or needs maintenance?',
    a: 'We purchase cars in all fair conditions. Minor cosmetic wear, tire life, or pending service are simply factored into the fair valuation calculation. You do not need to spend money fixing dents or repainting before getting an inspection.',
  },
  {
    q: 'How long does the entire selling process take?',
    a: 'Online valuation takes 60 seconds. The doorstep physical evaluation takes about 30 to 45 minutes. If you accept our offer, paperwork and bank transfer are completed immediately, allowing you to sell your car in under 24 hours.',
  },
]

export function SellFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  return (
    <section className="bg-paper py-20 sm:py-28 border-b border-line">
      <div className="container-lk">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Heading & Support CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate mb-3 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-ink" /> Got Questions?
              </p>
              <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl text-ink leading-tight">
                Frequently Asked Questions About Selling Your Car
              </h2>
              <p className="text-sm text-slate/70 mt-4 leading-relaxed">
                Everything you need to know about doorstep evaluations, payment security, RTO transfer timelines, and active loan clearance.
              </p>
            </div>

            {/* Quick Contact Card */}
            <div className="bg-mist border border-line p-6 mt-8 lg:mt-0">
              <h3 className="font-bold text-sm text-ink uppercase tracking-wide">
                Need Personal Assistance?
              </h3>
              <p className="text-xs text-slate/70 mt-1.5 leading-relaxed">
                Speak directly with our senior automotive evaluator in Udaipur &amp; Chittorgarh for custom luxury appraisals.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <a
                  href="tel:+919694266827"
                  className="inline-flex items-center justify-center gap-2 bg-ink text-paper text-xs font-semibold uppercase tracking-wider px-4 py-2.5 hover:bg-slate transition-colors"
                >
                  <PhoneCall className="h-3.5 w-3.5" /> Call +91 96942 66827
                </a>
                <a
                  href="https://wa.me/919694266827?text=Hi%20Love%20Kush%20Cars%2C%20I%20have%20a%20question%20about%20selling%20my%20car."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white text-xs font-semibold uppercase tracking-wider px-4 py-2.5 hover:bg-emerald-700 transition-colors"
                >
                  <Send className="h-3.5 w-3.5" /> WhatsApp Us
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx
              return (
                <div
                  key={faq.q}
                  className="border border-line bg-paper overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-ink hover:bg-mist/30 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={cn(
                        'h-5 w-5 shrink-0 text-slate transition-transform duration-200',
                        isOpen && 'rotate-180 text-ink',
                      )}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate/80 leading-relaxed border-t border-line/50">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
