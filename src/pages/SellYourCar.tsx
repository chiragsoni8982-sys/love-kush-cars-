import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ShieldCheck,
  Zap,
  Banknote,
  FileCheck2,
  PhoneCall,
  MessageCircle,
  MapPin,
  Sparkles,
} from 'lucide-react'
import { SellCarForm } from '@/components/sell/SellCarForm'
import { WhySellLoveKush } from '@/components/sell/WhySellLoveKush'
import { HowItWorksSteps } from '@/components/sell/HowItWorksSteps'
import { SellComparisonTable } from '@/components/sell/SellComparisonTable'
import { DocumentsRequired } from '@/components/sell/DocumentsRequired'
import { SellTestimonials } from '@/components/sell/SellTestimonials'
import { SellFaqSection } from '@/components/sell/SellFaqSection'

export default function SellYourCar() {
  useEffect(() => {
    document.title = 'Sell Your Car Online at Best Price | Free Doorstep Inspection | Love Kush Cars'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-paper">
      {/* 1. HERO SECTION & EMBEDDED SELLING FORM */}
      <section className="relative bg-ink text-paper pt-32 sm:pt-36 pb-20 sm:pb-28 overflow-hidden">
        {/* Ambient Dark Gradient */}
        <div
          className="absolute inset-0 pointer-events-none opacity-80"
          style={{
            background:
              'radial-gradient(circle at 50% 15%, #2a2a2a 0%, #111111 70%), linear-gradient(180deg, #181818 0%, #0d0d0d 100%)',
          }}
        />

        <div className="container-lk relative z-10">
          {/* Header Typography */}
          <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 border border-white/15 text-white/90 text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>Rajasthan's Premier Car Buying Network</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-5xl md:text-6xl leading-[1.12] text-balance text-paper"
            >
              SELL YOUR CAR AT THE BEST MARKET PRICE
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white/70 text-sm sm:text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed"
            >
              Instant online valuation, 100% free doorstep evaluation in Udaipur &amp; Chittorgarh, same-day bank payment, and zero-liability RC transfer.
            </motion.p>

            {/* Value Highlights Pill Bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 text-xs text-white/80"
            >
              <span className="flex items-center gap-1.5">
                <Banknote className="h-4 w-4 text-emerald-400" /> Instant Bank Transfer
              </span>
              <span className="text-white/20">&bull;</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-white" /> Free Doorstep Inspection
              </span>
              <span className="text-white/20">&bull;</span>
              <span className="flex items-center gap-1.5">
                <FileCheck2 className="h-4 w-4 text-white" /> Free &amp; Safe RC Transfer
              </span>
              <span className="text-white/20">&bull;</span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-amber-300" /> 0% Middleman Brokerage
              </span>
            </motion.div>
          </div>

          {/* 2. Interactive Selling Form (Cars24 inspired, tailored for Love Kush Cars) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <SellCarForm />
          </motion.div>
        </div>
      </section>

      {/* 3. WHY SELL TO LOVE KUSH CARS (BENEFITS & VALUE PROPS) */}
      <WhySellLoveKush />

      {/* 4. HOW IT WORKS (3 SIMPLE STEPS) */}
      <HowItWorksSteps />

      {/* 5. COMPARISON MATRIX (LOVE KUSH VS DEALERS VS CLASSIFIEDS) */}
      <SellComparisonTable />

      {/* 6. REQUIRED DOCUMENTS CHECKLIST */}
      <DocumentsRequired />

      {/* 7. VERIFIED SELLER REVIEWS & EXPERIENCES */}
      <SellTestimonials />

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <SellFaqSection />

      {/* 9. FINAL SHOWROOM & EVALUATION CTA BANNER */}
      <section className="bg-ink text-paper py-16 sm:py-24 border-t border-white/10">
        <div className="container-lk">
          <div className="bg-[#191919] border border-white/15 p-8 sm:p-14 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-white/50 block mb-2">
                Prefer In-Person Evaluation?
              </span>
              <h2 className="font-[family-name:var(--font-display)] font-extrabold text-2xl sm:text-4xl text-paper">
                Visit Our Udaipur Main Showroom or Chittorgarh Outlet
              </h2>
              <p className="text-xs sm:text-sm text-white/60 mt-3 leading-relaxed">
                Drive into any of our certified centers for an on-spot 30-minute vehicle evaluation with instant offer generation over coffee.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-5 text-xs text-white/70">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-white" /> 100 Ft Road, Meera Nagar, Udaipur (RJ27)
                </span>
                <span className="text-white/30">&bull;</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-amber-300" /> NH-27 Bypass, Chittorgarh (RJ09)
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="tel:+919694266827"
                className="inline-flex items-center justify-center gap-2 bg-paper text-ink hover:bg-mist text-xs font-bold uppercase tracking-wider px-6 py-4 transition-colors"
              >
                <PhoneCall className="h-4 w-4" /> Call Appraisal Team
              </a>
              <a
                href="https://wa.me/919694266827?text=Hi%20Love%20Kush%20Cars%2C%20I%20want%20to%20sell%20my%20car.%20Please%20guide%20me."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider px-6 py-4 transition-colors"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Valuation
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
