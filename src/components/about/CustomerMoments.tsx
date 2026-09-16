import { motion } from 'framer-motion'
import { Heart, Star, Sparkles, Quote, CheckCircle2 } from 'lucide-react'

const MOMENTS = [
  {
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    car: 'Toyota Fortuner 4x4 AT',
    customer: 'Dr. Mahendra Singh Rathore',
    location: 'Udaipur (RJ27)',
    year: '2023 Delivery',
    quote:
      'I bought my first Honda City from Love Kush Cars back in 2009. Fourteen years later, I upgraded to a certified Fortuner. The honesty and genuine inspection have remained constant across 2 decades.',
  },
  {
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
    car: 'Mercedes-Benz C-Class C220d',
    customer: 'Virendra & Sunita Kothari',
    location: 'Chittorgarh (RJ09)',
    year: '2024 Delivery',
    quote:
      'Buying a pre-owned luxury car is all about trusting the dealer. Love Kush Cars provided the complete digital OBD report, authorized service history, and transferred the RC to my name in 4 days.',
  },
  {
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    car: 'Hyundai Creta SX (O) Diesel',
    customer: 'Harshwardhan Vyas',
    location: 'Bhilwara (RJ06)',
    year: '2024 Delivery',
    quote:
      'Zero down payment and a 12% p.a. bank sanction done on the spot. The car smelled like new and looked impeccable. Love Kush Cars is truly the gold standard for used cars in Rajasthan.',
  },
]

export function CustomerMoments() {
  return (
    <section className="container-lk py-16 sm:py-24 border-t border-line">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-mist border border-line text-slate text-xs font-semibold uppercase tracking-[0.2em] mb-4">
          <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
          <span>20,000+ Happy Families</span>
        </div>

        <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink">
          Moments of Joy &amp; Multi-Generational Trust
        </h2>

        <p className="text-slate text-xs sm:text-sm md:text-base mt-3 leading-relaxed">
          Behind every one of the 20,000+ cars we have sold is a family celebrating an achievement. Here are real
          handover stories from owners across Rajasthan.
        </p>
      </div>

      {/* 3 Story Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {MOMENTS.map((item, idx) => (
          <motion.div
            key={item.customer}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="bg-paper border border-line flex flex-col justify-between hover:border-ink hover:shadow-elevated transition-all duration-300 group"
          >
            <div>
              {/* Photo */}
              <div className="h-52 w-full overflow-hidden border-b border-line relative">
                <img
                  src={item.image}
                  alt={item.car}
                  className="w-full h-full object-cover grayscale contrast-115 group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-ink/80 backdrop-blur-sm text-paper text-[10px] font-bold uppercase tracking-wider">
                    {item.year}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs bg-ink/70 backdrop-blur-sm px-3 py-1.5 border border-white/10">
                  <span className="font-semibold">{item.car}</span>
                  <span className="text-amber-300 font-bold text-[11px]">{item.location}</span>
                </div>
              </div>

              {/* Quote & Story */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate/85 italic leading-relaxed relative">
                  <Quote className="h-4 w-4 text-slate/30 inline-block mr-1 -mt-1" />
                  {item.quote}
                </p>
              </div>
            </div>

            {/* Customer Footer */}
            <div className="p-6 pt-0 border-t border-line/60 mt-4 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-ink block">{item.customer}</span>
                <span className="text-[11px] text-slate/70">Verified Owner &bull; {item.location}</span>
              </div>
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust Rating Banner */}
      <div className="mt-12 max-w-4xl mx-auto p-6 bg-mist border border-line flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-amber-400 text-ink flex items-center justify-center font-extrabold text-lg font-[family-name:var(--font-display)] shrink-0">
            4.9★
          </div>
          <div>
            <h4 className="font-bold text-sm text-ink">Highest Customer Satisfaction in Mewar</h4>
            <p className="text-xs text-slate/80 mt-0.5">
              Based on 2,500+ verified customer reviews across Google, Justdial &amp; direct delivery feedback.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3.5 py-2 border border-emerald-200">
          <Sparkles className="h-4 w-4" /> 98.4% Repeat &amp; Referral Rate
        </div>
      </div>
    </section>
  )
}
