import { motion } from 'framer-motion'
import { Award, ShieldCheck, HeartHandshake, CheckCircle2, History, Quote } from 'lucide-react'

export function FoundingStory() {
  return (
    <section className="container-lk py-16 sm:py-24 border-t border-line">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Narrative Story & Heritage */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-mist border border-line text-slate text-xs font-semibold uppercase tracking-[0.2em]">
            <History className="h-3.5 w-3.5 text-ink" />
            <span>Our Genesis &bull; Since 2002</span>
          </div>

          <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink leading-tight">
            How a 5-Car Dream in Udaipur Became Rajasthan&apos;s Benchmark of Trust
          </h2>

          <div className="space-y-4 text-xs sm:text-sm md:text-base text-slate leading-relaxed">
            <p>
              In the early 2000s, buying a used car in Rajasthan was fraught with uncertainty. Odometer tampering,
              undisclosed accident damages, and missing RTO documents were unfortunately the industry norm. In 2002,
              <strong> Love Kush Cars</strong> was established with a singular, uncompromising resolve: to bring
              transparency, dignity, and certified quality to the pre-owned automobile industry.
            </p>
            <p>
              Starting with just five hand-inspected vehicles on a modest lot in Udaipur, we treated every customer like
              family. We instituted the region&apos;s first multi-point physical check, insisted on clean title
              transfers, and gave buyers complete peace of mind.
            </p>
            <p>
              Word of mouth spread rapidly across Mewar — from Udaipur to Chittorgarh, Bhilwara, Rajsamand, and beyond.
              Today, with over <strong>20,000+ happy cars delivered</strong>, two flagship showrooms, and relationships
              spanning multiple generations of car owners, our core promise remains unchanged: <em>No false claims, no
              hidden defects, only genuine cars and lasting relationships.</em>
            </p>
          </div>

          {/* 3 Value Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 bg-mist border border-line">
              <ShieldCheck className="h-5 w-5 text-emerald-600 mb-2" />
              <h4 className="font-bold text-sm text-ink">Zero Odometer Fraud</h4>
              <p className="text-[11px] text-slate/70 mt-1">100% genuine meter reading with authorized service logs.</p>
            </div>

            <div className="p-4 bg-mist border border-line">
              <Award className="h-5 w-5 text-amber-500 mb-2" />
              <h4 className="font-bold text-sm text-ink">200-Point Inspected</h4>
              <p className="text-[11px] text-slate/70 mt-1">Every mechanical, structural, and electrical system certified.</p>
            </div>

            <div className="p-4 bg-mist border border-line">
              <HeartHandshake className="h-5 w-5 text-ink mb-2" />
              <h4 className="font-bold text-sm text-ink">Mewar's Legacy</h4>
              <p className="text-[11px] text-slate/70 mt-1">24 years of relationships with 20,000+ satisfied families.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Photo Card with Founder Philosophy Card */}
        <div className="lg:col-span-5 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative border-2 border-line bg-paper p-3 shadow-elevated"
          >
            <div className="relative h-72 sm:h-80 w-full overflow-hidden border border-line">
              <img
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80"
                alt="Love Kush Cars Advisory & Trust"
                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent flex items-end p-5">
                <div className="text-white">
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">
                    Established 2002 &bull; Udaipur
                  </span>
                  <p className="text-xs font-semibold mt-0.5">
                    Building multi-generational relationships across Rajasthan.
                  </p>
                </div>
              </div>
            </div>

            {/* Founder Philosophy Quote Box */}
            <div className="p-5 bg-ink text-paper mt-3 rounded-[2px] relative overflow-hidden">
              <Quote className="absolute right-3 bottom-3 h-16 w-16 text-white/5 pointer-events-none" />
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
                <CheckCircle2 className="h-4 w-4" /> The Founding Philosophy
              </div>
              <blockquote className="text-xs sm:text-sm text-white/90 italic leading-relaxed">
                &ldquo;A used car is not just steel, engine, and wheels. For a family, it is a milestone of hard work and
                pride. When you buy from Love Kush Cars, you don&apos;t just buy a car — you earn our lifetime
                reputation and friendship.&rdquo;
              </blockquote>
              <div className="mt-3 pt-3 border-t border-white/15 flex items-center justify-between text-xs">
                <span className="font-bold text-paper">Love Kush Cars Leadership Team</span>
                <span className="text-white/50">Udaipur &bull; Chittorgarh</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
