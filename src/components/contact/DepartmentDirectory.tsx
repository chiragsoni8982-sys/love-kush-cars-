import { motion } from 'framer-motion'
import { Phone, MessageCircle, Mail, Car, CircleDollarSign, Landmark, FileText, Sparkles } from 'lucide-react'

const DEPARTMENTS = [
  {
    name: 'Certified Sales & Showroom Floor',
    icon: Car,
    phone: '+91 96942 66827',
    email: 'sales@lovekushcars.in',
    desc: 'Vehicle walkarounds, test drive bookings, certified inventory inquiries in Udaipur & Chittorgarh.',
    whatsappPrompt: 'Hi Love Kush Cars Sales Team, I would like to inquire about certified luxury cars in stock.',
  },
  {
    name: 'Car Buying & Spot Valuation Desk',
    icon: CircleDollarSign,
    phone: '+91 96942 66827',
    email: 'valuation@lovekushcars.in',
    desc: 'Free doorstep vehicle evaluation, instant fair market pricing, and same-day bank payment.',
    whatsappPrompt: 'Hi Love Kush Cars Valuation Team, I want to sell my car and need an instant valuation.',
  },
  {
    name: 'Auto Loan & Banking Desk',
    icon: Landmark,
    phone: '+91 96942 66827',
    email: 'finance@lovekushcars.in',
    desc: 'Multi-bank loan bidding across 9+ partner banks, CIBIL eligibility, and customized EMI tenures.',
    whatsappPrompt: 'Hi Love Kush Cars Finance Desk, I would like to check auto loan interest rates and eligibility.',
  },
  {
    name: 'RTO & Legal Documentation Team',
    icon: FileText,
    phone: '+91 96942 66827',
    email: 'rto@lovekushcars.in',
    desc: 'Hypothecation (HP) removal, bank NOC issuance, ownership transfer across RJ27, RJ09 and Rajasthan.',
    whatsappPrompt: 'Hi Love Kush Cars RTO Team, I have a query regarding vehicle RC transfer and documentation.',
  },
]

export function DepartmentDirectory() {
  return (
    <section className="container-lk py-12 sm:py-16 border-t border-line">
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-mist border border-line text-slate text-xs font-semibold uppercase tracking-[0.2em] mb-3">
          <Sparkles className="h-3.5 w-3.5 text-ink" />
          <span>Direct Access</span>
        </div>

        <h2 className="font-[family-name:var(--font-display)] font-extrabold text-2xl sm:text-3xl md:text-4xl text-ink">
          Department Fast-Dial Directory
        </h2>

        <p className="text-slate text-xs sm:text-sm mt-2 max-w-xl mx-auto leading-relaxed">
          Need to speak directly with a specific department? Connect with our dedicated relationship managers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {DEPARTMENTS.map((dept, idx) => {
          const Icon = dept.icon
          return (
            <motion.div
              key={dept.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-paper border border-line p-6 flex flex-col justify-between hover:border-ink hover:shadow-elevated transition-all duration-300 group"
            >
              <div>
                <div className="h-12 w-12 rounded-[2px] bg-mist flex items-center justify-center text-ink group-hover:bg-ink group-hover:text-paper transition-colors mb-4">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="font-[family-name:var(--font-display)] font-bold text-base text-ink mb-2">
                  {dept.name}
                </h3>

                <p className="text-xs text-slate/80 leading-relaxed mb-4">{dept.desc}</p>
              </div>

              <div className="pt-4 border-t border-line space-y-2 text-xs">
                <a
                  href={`tel:${dept.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2 font-bold text-ink hover:text-slate transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-emerald-600" /> {dept.phone}
                </a>

                <a
                  href={`https://wa.me/919694266827?text=${encodeURIComponent(dept.whatsappPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate/80 hover:text-emerald-700 transition-colors"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-emerald-600" /> WhatsApp Chat
                </a>

                <a
                  href={`mailto:${dept.email}`}
                  className="flex items-center gap-2 text-slate/80 hover:text-ink transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-slate/50" /> {dept.email}
                </a>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
