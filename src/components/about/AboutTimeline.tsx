import { motion } from 'framer-motion'
import { Calendar, Flag, Sparkles, Building2, Car, Trophy, CheckCircle2 } from 'lucide-react'

const MILESTONES = [
  {
    year: '2002',
    icon: Flag,
    title: 'The Inception in Udaipur',
    description:
      'Love Kush Cars opens its doors with 5 hand-selected cars in Udaipur with a mission to bring transparent pricing and zero-tampering guarantees to Rajasthan.',
    highlight: 'Humble 5-Car Beginning',
  },
  {
    year: '2007',
    icon: Car,
    title: '1,000 Cars & Formal 100-Point Check',
    description:
      'Surpassed 1,000 happy families across Mewar. Instituted the region’s first formalized 100-point mechanical and accidental checklist.',
    highlight: '1,000th Handover Milestone',
  },
  {
    year: '2012',
    icon: Building2,
    title: '100 Ft Road Flagship Showroom',
    description:
      'Expanded into our expansive flagship showroom on 100 Ft Road in Meera Nagar, Udaipur with dedicated multi-car display bays, in-house detailing, and customer lounge.',
    highlight: 'Flagship Showroom Opening',
  },
  {
    year: '2017',
    icon: Trophy,
    title: '10,000+ Deliveries & 9+ Bank Tie-ups',
    description:
      'Reached 10,000 verified cars sold. Established direct channel partnerships with HDFC, ICICI, Mahindra Finance, and AU Bank for instant on-spot loan approvals.',
    highlight: '10,000+ Deliveries Landmark',
  },
  {
    year: '2021',
    icon: Sparkles,
    title: '200-Point Certification Standard',
    description:
      'Upgraded our quality protocol to a rigorous 200-point digital certification. Introduced Rajasthan-wide doorstep test drives and home deliveries.',
    highlight: '200-Point Quality Standard',
  },
  {
    year: '2024',
    icon: Building2,
    title: 'Chittorgarh Outlet Inauguration',
    description:
      'Launched our state-of-the-art branch on NH-27 Bypass in Chittorgarh to bring certified luxury and pre-owned cars closer to Chittorgarh, Bhilwara, and Nimbahera.',
    highlight: 'Chittorgarh Outlet Launch',
  },
  {
    year: 'Today',
    icon: Trophy,
    title: '20,000+ Happy Owners Across Rajasthan',
    description:
      'Celebrating over 20,000+ satisfied car owners, 2 premier showrooms, 9+ finance partners, and an unmatched 4.9★ rating as Rajasthan’s top auto dealership.',
    highlight: '20,000+ Cars Sold Benchmark',
  },
]

export function AboutTimeline() {
  return (
    <section className="container-lk py-16 sm:py-24 border-t border-line">
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-mist border border-line text-slate text-xs font-semibold uppercase tracking-[0.2em] mb-4">
          <Calendar className="h-3.5 w-3.5 text-ink" />
          <span>24 Years of Growth (2002 &ndash; Present)</span>
        </div>

        <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink">
          The Milestones That Defined Our Legacy
        </h2>

        <p className="text-slate text-xs sm:text-sm md:text-base mt-3 leading-relaxed">
          From a humble lot in 2002 to delivering over 20,000 certified vehicles today, explore the defining moments
          of Rajasthan&apos;s most trusted automotive journey.
        </p>
      </div>

      {/* Vertical / Responsive Interactive Timeline */}
      <div className="max-w-4xl mx-auto relative">
        {/* Central Connecting Line */}
        <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-0.5 bg-line" />

        <div className="space-y-8 sm:space-y-12">
          {MILESTONES.map((item, idx) => {
            const Icon = item.icon
            const isEven = idx % 2 === 0

            return (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`relative flex flex-col sm:flex-row items-center gap-6 ${
                  isEven ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Content Card */}
                <div className="w-full sm:w-1/2">
                  <div
                    className={`bg-paper border border-line p-6 shadow-sm hover:border-ink hover:shadow-elevated transition-all duration-300 ${
                      isEven ? 'sm:text-right' : 'sm:text-left'
                    }`}
                  >
                    <div
                      className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 mb-2 ${
                        isEven ? 'sm:ml-auto' : ''
                      }`}
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      <span>{item.highlight}</span>
                    </div>

                    <h3 className="font-[family-name:var(--font-display)] font-bold text-lg sm:text-xl text-ink">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate/80 mt-2 leading-relaxed">{item.description}</p>
                  </div>
                </div>

                {/* Central Year Badge & Node */}
                <div className="shrink-0 z-10 flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-ink text-paper border-4 border-paper shadow-md flex items-center justify-center font-bold text-xs font-[family-name:var(--font-display)]">
                    <Icon className="h-5 w-5 text-amber-300" />
                  </div>
                  <span className="font-[family-name:var(--font-display)] font-extrabold text-xs text-ink mt-1.5 uppercase tracking-wider">
                    {item.year}
                  </span>
                </div>

                {/* Empty opposite placeholder for desktop balance */}
                <div className="hidden sm:block w-1/2" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
