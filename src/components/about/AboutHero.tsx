import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Award,
  Sparkles,
  Building2,
  Car,
  CheckCircle2,
  ArrowRight,
  Star,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function AboutHero() {
  return (
    <section className="relative bg-ink text-paper pt-32 sm:pt-36 pb-20 sm:pb-28 overflow-hidden">
      {/* Ambient Dark Gradient & Radial Backlighting */}
      <div
        className="absolute inset-0 pointer-events-none opacity-80"
        style={{
          background:
            'radial-gradient(circle at 50% 15%, #2d2d2d 0%, #111111 70%), linear-gradient(180deg, #181818 0%, #0d0d0d 100%)',
        }}
      />

      <div className="container-lk relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          {/* 2002 Legacy Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/15 text-white text-xs font-semibold uppercase tracking-[0.2em] mb-5"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Serving Rajasthan Since 2002 &bull; 24 Years of Uncompromised Trust</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-5xl md:text-6xl leading-[1.12] text-balance text-paper"
          >
            OVER 20,000 CARS SOLD WITH INTEGRITY &amp; TRUST
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/70 text-xs sm:text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed"
          >
            What began in 2002 as a humble 5-car lot in Udaipur has grown into Mewar&apos;s most respected pre-owned
            automobile institution. Over two decades, we have delivered 20,000+ certified vehicles to families and
            businesses across Rajasthan with zero-compromise quality and transparent dealings.
          </motion.p>

          {/* Key Value Highlights Pill Bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-7 text-xs text-white/85"
          >
            <span className="flex items-center gap-1.5">
              <Award className="h-4 w-4 text-amber-300" /> Founded in 2002 (24+ Years)
            </span>
            <span className="text-white/20">&bull;</span>
            <span className="flex items-center gap-1.5">
              <Car className="h-4 w-4 text-emerald-400" /> 20,000+ Verified Deliveries
            </span>
            <span className="text-white/20">&bull;</span>
            <span className="flex items-center gap-1.5">
              <Building2 className="h-4 w-4 text-white" /> 2 Showrooms (Udaipur &amp; Chittorgarh)
            </span>
            <span className="text-white/20">&bull;</span>
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" /> 4.9★ Customer Satisfaction
            </span>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-9"
          >
            <Link to="/inventory">
              <Button
                variant="primary-inverse"
                size="lg"
                className="w-full sm:w-auto font-bold uppercase tracking-wider text-xs px-8 py-4 shadow-lg text-ink"
              >
                <Car className="h-4 w-4 mr-2 text-ink" /> Explore Certified Inventory
              </Button>
            </Link>

            <a href="#showrooms">
              <Button
                variant="secondary-inverse"
                size="lg"
                className="w-full sm:w-auto font-bold uppercase tracking-wider text-xs px-8 py-4"
              >
                <Building2 className="h-4 w-4 mr-2" /> Visit Our 2 Showrooms <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </a>
          </motion.div>
        </div>

        {/* Hero Visual Image Showcase Card with Embedded Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-5xl mx-auto border border-white/15 shadow-elevated overflow-hidden bg-[#161616]"
        >
          {/* Main Visual Image Banner */}
          <div className="relative h-64 sm:h-96 w-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"
              alt="Love Kush Cars Flagship Showroom"
              className="w-full h-full object-cover object-center grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-black/30 flex items-end p-6 sm:p-8">
              <div className="bg-black/70 backdrop-blur-md border border-white/15 px-4 py-2.5 inline-flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-semibold text-white uppercase tracking-wider">
                  Udaipur Main Showroom &bull; Rajasthan's Premier Auto Display Bay
                </span>
              </div>
            </div>
          </div>

          {/* Fast Facts 4-Column Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10 bg-[#141414] border-t border-white/10 text-center">
            <div className="p-6">
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 block">Legacy</span>
              <span className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl text-paper mt-1 block">
                2002
              </span>
              <span className="text-[11px] text-amber-300 font-semibold mt-0.5 block">24 Years in Business</span>
            </div>

            <div className="p-6">
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 block">Happy Owners</span>
              <span className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl text-paper mt-1 block">
                20,000+
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold mt-0.5 block">Delivered Across Rajasthan</span>
            </div>

            <div className="p-6">
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 block">Inspection Depth</span>
              <span className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl text-paper mt-1 block">
                200+
              </span>
              <span className="text-[11px] text-white/70 font-semibold mt-0.5 block">Quality Checkpoints</span>
            </div>

            <div className="p-6">
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 block">Banking Network</span>
              <span className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl text-paper mt-1 block">
                9+
              </span>
              <span className="text-[11px] text-white/70 font-semibold mt-0.5 block">National Lending Partners</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
