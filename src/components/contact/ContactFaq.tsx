import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, Plus, Minus } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
}

const FAQS: FAQ[] = [
  {
    question: 'Do I need a prior appointment to visit the Udaipur or Chittorgarh showroom?',
    answer:
      'Walk-ins are always warmly welcome 7 days a week! However, if you are traveling from outside Udaipur or Chittorgarh (e.g. from Bhilwara, Rajsamand, or Jaipur) or have a specific luxury vehicle in mind, booking an advance appointment ensures the car is detailed, prepped, and reserved exclusively for your dedicated test drive session.',
  },
  {
    question: 'Can Love Kush Cars arrange doorstep car evaluation and inspection in nearby districts?',
    answer:
      'Yes, absolutely. Our mobile evaluation engineers travel daily across Mewar — including Udaipur, Chittorgarh, Bhilwara, Rajsamand, Nimbahera, Dungarpur, and Banswara — to conduct comprehensive 150+ point vehicle evaluations right at your home or office with zero inspection fees.',
  },
  {
    question: 'What are the operating hours and days for both showrooms?',
    answer:
      'Our Udaipur Main Showroom (100 Ft Road, Meera Nagar) is open Monday through Sunday from 9:30 AM to 8:30 PM. Our Chittorgarh Branch (NH-27 Bypass) operates Monday through Sunday from 10:00 AM to 8:00 PM. Both locations remain operational on public holidays for your convenience.',
  },
  {
    question: 'What documents should I carry if I wish to finalize a car purchase or apply for bank finance on spot?',
    answer:
      'To enable instant loan in-principle sanction and same-day delivery, please carry: \n• PAN Card & Aadhaar Card \n• Last 6 months bank statement (or NetBanking access for instant bank sync) \n• Last 3 months salary slips or last 2 years ITR copies (for business owners) \n• Driving License copy for test drives.',
  },
  {
    question: 'Is dedicated customer parking available at the showrooms?',
    answer:
      'Yes, both our Udaipur Flagship Showroom and Chittorgarh Branch feature spacious, secure on-premise customer parking with valet assistance and dedicated EV charging stations.',
  },
]

export function ContactFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  return (
    <section className="container-lk py-12 sm:py-16 border-t border-line">
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-mist border border-line text-slate text-xs font-semibold uppercase tracking-[0.2em] mb-3">
          <HelpCircle className="h-3.5 w-3.5 text-ink" />
          <span>Visiting &amp; Inquiries</span>
        </div>

        <h2 className="font-[family-name:var(--font-display)] font-extrabold text-2xl sm:text-3xl md:text-4xl text-ink">
          Frequently Asked Questions About Visiting Us
        </h2>

        <p className="text-slate text-xs sm:text-sm mt-2 max-w-xl mx-auto leading-relaxed">
          Quick answers to common questions about showroom appointments, test drives, and doorstep evaluation.
        </p>
      </div>

      <div className="max-w-3xl mx-auto divide-y divide-line border-y border-line">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index
          return (
            <div key={faq.question} className="py-4 sm:py-5">
              <button
                type="button"
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between text-left gap-4 group focus:outline-none"
              >
                <h3 className="font-[family-name:var(--font-display)] font-bold text-sm sm:text-base text-ink group-hover:text-slate transition-colors">
                  {faq.question}
                </h3>

                <div className="h-6 w-6 shrink-0 rounded-full border border-line flex items-center justify-center text-slate group-hover:border-ink transition-colors">
                  {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs sm:text-sm text-slate/80 leading-relaxed mt-3 whitespace-pre-line pl-1 sm:pl-2">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
