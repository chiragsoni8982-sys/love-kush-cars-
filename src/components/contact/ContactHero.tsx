import { motion } from 'framer-motion'
import { PhoneCall, Clock, Sparkles, ShieldCheck } from 'lucide-react'

export function ContactHero() {
  return (
    <section className="relative bg-ink text-paper pt-32 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
      {/* Ambient Dark Radial Gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-80"
        style={{
          background:
            'radial-gradient(circle at 50% 15%, #2d2d2d 0%, #111111 70%), linear-gradient(180deg, #181818 0%, #0d0d0d 100%)',
        }}
      />

      <div className="container-lk relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 border border-white/15 text-white/90 text-xs font-semibold uppercase tracking-[0.2em] mb-4"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Always Here To Help &bull; 15-Minute Response Time</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-5xl md:text-6xl leading-[1.12] text-balance text-paper"
          >
            GET IN TOUCH WITH LOVE KUSH CARS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/70 text-xs sm:text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed"
          >
            Looking for a certified luxury car, instant valuation to sell your vehicle, or personalized auto financing?
            Connect directly with our showroom team in Udaipur and Chittorgarh.
          </motion.p>

          {/* Quick Helpline Pill Bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-7 text-xs text-white/85"
          >
            <a
              href="tel:+919694266827"
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
            >
              <PhoneCall className="h-4 w-4 text-emerald-400" /> +91 96942 66827 (Udaipur)
            </a>
            <span className="text-white/20">&bull;</span>
            <a
              href="tel:+919694266827"
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
            >
              <PhoneCall className="h-4 w-4 text-amber-300" /> +91 96942 66827 (Chittorgarh)
            </a>
            <span className="text-white/20">&bull;</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-white" /> Open 7 Days: 9:30 AM &ndash; 8:30 PM
            </span>
            <span className="text-white/20">&bull;</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" /> Free Doorstep Service
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
