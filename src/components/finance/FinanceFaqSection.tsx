import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, Plus, Minus } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
  category: 'General' | 'Eligibility' | 'Documents' | 'Loan Against Car'
}

const FAQS: FAQ[] = [
  {
    category: 'General',
    question: 'Why should I finance through Love Kush Cars rather than approaching a bank directly?',
    answer:
      'When you apply directly to one bank, you get only one quote with no bargaining power. Love Kush Cars runs an authorized multi-lender desk partnering with 9 top institutions (HDFC, ICICI, Mahindra Finance, AU Bank, Chola, Kotak, etc.). We submit your single application to all eligible lenders simultaneously, forcing them to bid with their lowest interest rates and highest loan amounts. Furthermore, our dedicated in-house desk handles all physical inspections, doorstep document collection, and RTO hypothecation endorsement for you completely free of charge.',
  },
  {
    category: 'General',
    question: 'How fast is the loan approval and disbursal process?',
    answer:
      'In-principle approvals are generated online within 15 to 30 minutes. Once basic KYC and income documents are submitted, final sanction and loan disbursal typically happen within 24 to 48 hours, enabling same-day or next-day car delivery from our Udaipur or Chittorgarh showroom.',
  },
  {
    category: 'Loan Against Car',
    question: 'How does Loan Against Car (Refinance / Equity) work and how much can I borrow?',
    answer:
      'Loan Against Car allows you to borrow liquidity against the equity of your currently owned car without selling it or surrendering possession. You can borrow up to 150% of the certified market value of your vehicle (depending on car make, age, and your profile). The funds are transferred directly into your bank account within 24-48 hours, and you continue to drive your car as usual.',
  },
  {
    category: 'Documents',
    question: 'What documents are required to apply for a Used Car Loan?',
    answer:
      'The required documents depend on your profile: \n\n• For Salaried Applicants: PAN Card, Aadhaar Card / Voter ID, Last 3-6 months bank statement, Last 3 months salary slips or Form 16. \n• For Self-Employed / Business Owners: PAN Card, Aadhaar Card, Last 6-12 months bank statement, Last 2 years ITR with computation of income, GST Registration / Business Proof. \n• For Farmers / Agriculturists: Land ownership proof (Khasra/Khatauni/Jamabandi), Agriculture income certificate, and 6 months bank statement.\n• For Loan Against Car: Original RC copy, current vehicle insurance, and bank NOC (if existing loan is being settled).',
  },
  {
    category: 'Eligibility',
    question: 'What is the minimum CIBIL / Credit Score required to get approved?',
    answer:
      'While a CIBIL score of 720+ unlocks the most competitive interest rates (11% to 20% p.a. range) and up to 100% on-road funding, we also have specialized partner programs with NBFCs like Mahindra Finance, Hero FinCorp, and Chola that cater to buyers with lower credit scores (600+) or first-time loan applicants with zero credit history (NTC).',
  },
  {
    category: 'Eligibility',
    question: 'Who are your 9 finance partners and what are their rates?',
    answer:
      'Our verified lending partners are Mahindra Finance, Hero FinCorp (Hero MotoCorp group), Cholamandalam (Chola), AU Small Finance Bank, HDFC Bank, ICICI Bank, Kotak Mahindra Bank, IDBI Bank, and Piramal Capital & Housing Finance. Rates range between 11% to 20% p.a. depending on loan tenure, applicant profile, and vehicle valuation.',
  },
  {
    category: 'General',
    question: 'Can I prepay or foreclose my used car loan before the tenure ends?',
    answer:
      'Yes. Most of our partner banks and NBFCs allow loan foreclosure and part-prepayment after 6 to 12 months. Several leading partner banks (such as HDFC and ICICI) offer zero foreclosure penalties after 24 monthly installments. Full terms are explained transparently before you sign your agreement.',
  },
  {
    category: 'General',
    question: 'Does Love Kush Cars assist in RTO Hypothecation (HP) and RC Endorsement?',
    answer:
      'Yes, 100%. Our experienced RTO liaison team manages the entire process of adding bank hypothecation (HP endorsement) on the RC with the regional transport offices across Rajasthan (RJ27 Udaipur, RJ09 Chittorgarh, RJ06 Bhilwara, RJ14 Jaipur, etc.) and delivers the updated RC smart card to your doorstep.',
  },
]

export function FinanceFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  return (
    <section className="container-lk py-16 sm:py-24 border-t border-line">
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-mist border border-line text-slate text-xs font-semibold uppercase tracking-[0.2em] mb-4">
          <HelpCircle className="h-3.5 w-3.5 text-ink" />
          <span>Frequently Asked Questions</span>
        </div>

        <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink">
          Everything You Need To Know About Car Financing
        </h2>

        <p className="text-slate text-xs sm:text-sm md:text-base mt-3 leading-relaxed">
          Clear answers to common questions regarding used car loans, interest rates, eligibility, loan against car,
          and documents in Rajasthan.
        </p>
      </div>

      <div className="max-w-4xl mx-auto divide-y divide-line border-y border-line">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index
          return (
            <div key={faq.question} className="py-5">
              <button
                type="button"
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between text-left gap-4 group focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate/50 bg-mist px-2 py-0.5 border border-line">
                    {faq.category}
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-base sm:text-lg text-ink group-hover:text-slate transition-colors">
                    {faq.question}
                  </h3>
                </div>

                <div className="h-7 w-7 shrink-0 rounded-full border border-line flex items-center justify-center text-slate group-hover:border-ink transition-colors">
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
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
                    <p className="text-xs sm:text-sm text-slate/80 leading-relaxed mt-4 whitespace-pre-line pl-1 sm:pl-3">
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
