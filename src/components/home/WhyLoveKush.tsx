import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShieldCheck, FileCheck, Landmark, Trophy, Award } from 'lucide-react'

const items = [
  {
    icon: Trophy,
    stat: 20000,
    suffix: '+',
    label: 'Vehicles Delivered',
    copy: 'Families & entrepreneurs across Rajasthan powered since 2002.',
  },
  {
    icon: ShieldCheck,
    stat: 200,
    suffix: '-Point',
    label: 'Diagnostic Inspection',
    copy: 'Engine OBD scan, structural integrity & mechanical health certification.',
  },
  {
    icon: Landmark,
    stat: 9,
    suffix: '+ Banks',
    label: 'Instant Loan Network',
    copy: 'HDFC, ICICI, Mahindra & AU Bank bidding for your lowest interest rate.',
  },
  {
    icon: FileCheck,
    stat: 100,
    suffix: '%',
    label: 'RTO & Legal Guarantee',
    copy: 'Zero meter tampering, clean title verification & free RC name transfer.',
  },
]

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const start = performance.now()
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1)
      setValue(Math.round(to * (1 - Math.pow(1 - progress, 3))))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, to])

  return (
    <span ref={ref} className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl md:text-5xl text-paper">
      {value.toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}

export function WhyLoveKush() {
  return (
    <section className="bg-ink text-paper py-20 md:py-28 relative overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_50%_10%,#333333_0%,transparent_70%)]" />

      <div className="container-lk relative z-10">
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/15 text-amber-300 text-[10px] font-bold uppercase tracking-widest mb-3">
            <Award className="h-3 w-3" />
            <span>24+ Years of Automotive Integrity</span>
          </div>

          <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl md:text-5xl text-paper">
            WHY RAJASTHAN TRUSTS LOVE KUSH CARS
          </h2>

          <p className="text-xs sm:text-sm text-white/70 mt-3 max-w-xl mx-auto leading-relaxed">
            Since 2002, we have eliminated the uncertainty of buying and selling pre-owned cars through rigorous
            engineering standards, transparent pricing, and royal Rajasthani hospitality.
          </p>
        </div>

        {/* 4 Big Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 p-6 sm:p-7 flex flex-col justify-between hover:border-amber-400/50 transition-all duration-300 group text-center sm:text-left"
            >
              <div>
                <div className="h-12 w-12 rounded-[2px] bg-white/10 flex items-center justify-center text-amber-300 mx-auto sm:mx-0 mb-4 group-hover:bg-amber-400 group-hover:text-ink transition-colors">
                  <item.icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <Counter to={item.stat} suffix={item.suffix} />
                <p className="text-sm font-bold text-paper mt-3">{item.label}</p>
                <p className="text-xs text-white/60 mt-1.5 leading-relaxed">{item.copy}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
