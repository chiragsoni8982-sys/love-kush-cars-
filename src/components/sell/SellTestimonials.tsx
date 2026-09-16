import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

const sellerReviews = [
  {
    name: 'Rajendra Singh Sisodia',
    location: 'Udaipur, Rajasthan',
    carSold: 'Sold 2021 Toyota Fortuner 4x4',
    rating: 5,
    payout: '₹31,50,000 Instant Transfer',
    quote:
      'Selling my Fortuner to Love Kush Cars was remarkably simple. Their evaluator came to my residence in Sukher, inspected the vehicle in 30 minutes, and the money was in my HDFC account before they drove off. RC transfer copy was sent within 20 days.',
  },
  {
    name: 'Dr. Manish Mehta',
    location: 'Chittorgarh, Rajasthan',
    carSold: 'Sold 2022 Mercedes-Benz C-Class',
    rating: 5,
    payout: '₹46,20,000 Instant Transfer',
    quote:
      'I was worried about legal liabilities and endless lowball calls from online classifieds. Love Kush Cars gave me a genuine corporate-level experience at their new Chittorgarh outlet. Zero haggling and complete legal handover documentation.',
  },
  {
    name: 'Kunal Bhandari',
    location: 'Bhilwara / Rajsamand',
    carSold: 'Sold 2020 Hyundai Creta SX(O)',
    rating: 5,
    payout: '₹12,80,000 Instant Transfer',
    quote:
      'My car had an ongoing ICICI bank loan. Love Kush Cars calculated the foreclosure amount, directly settled the bank balance, paid me the surplus difference on spot, and cleared the hypothecation hassle-free.',
  },
]

export function SellTestimonials() {
  return (
    <section className="bg-mist py-20 sm:py-28 border-b border-line">
      <div className="container-lk">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-slate mb-3">Real Sellers &bull; Real Experiences</p>
          <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl text-ink">
            Trusted by Hundreds of Car Owners Across Rajasthan
          </h2>
          <p className="text-sm text-slate/70 mt-3">
            Read how owners in Udaipur, Chittorgarh, and nearby districts experienced a seamless, secure sale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sellerReviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-paper border border-line p-7 flex flex-col justify-between shadow-soft hover:shadow-elevated transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 gap-0.5">
                    {Array.from({ length: r.rating }).map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-mist border border-line px-2 py-0.5 text-slate">
                    Verified Seller
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate/80 leading-relaxed italic mb-6">
                  "{r.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-line">
                <p className="font-bold text-sm text-ink">{r.name}</p>
                <p className="text-xs text-slate/60">{r.location}</p>
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-line/50 text-xs">
                  <span className="font-semibold text-ink">{r.carSold}</span>
                  <span className="text-emerald-700 font-bold">{r.payout}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
