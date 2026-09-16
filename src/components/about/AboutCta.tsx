import { Link } from 'react-router-dom'
import { PhoneCall, MessageCircle, MapPin, Car, Coffee } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function AboutCta() {
  return (
    <section className="bg-ink text-paper py-16 sm:py-24 border-t border-white/10 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at 70% 30%, #333333 0%, transparent 60%)',
        }}
      />

      <div className="container-lk relative z-10">
        <div className="bg-[#191919] border border-white/15 p-8 sm:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-elevated">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/15 text-amber-300 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              <Coffee className="h-3.5 w-3.5" />
              <span>Rajasthan&apos;s Warm Hospitality</span>
            </div>

            <h2 className="font-[family-name:var(--font-display)] font-extrabold text-2xl sm:text-4xl text-paper">
              Join Us for Tea at Our Udaipur or Chittorgarh Showroom
            </h2>

            <p className="text-xs sm:text-sm text-white/70 mt-3 leading-relaxed">
              Whether you are looking for your next certified luxury vehicle, wish to sell your existing car for the best
              market price, or simply want honest automotive guidance, our doors and tea are always open for you.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-6 text-xs text-white/70">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-white" /> 100 Ft Road, Meera Nagar, Udaipur (RJ27)
              </span>
              <span className="text-white/30">&bull;</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-amber-300" /> NH-27 Bypass, Chittorgarh (RJ09)
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <Link to="/inventory" className="w-full sm:w-auto">
              <Button
                variant="primary-inverse"
                size="lg"
                className="w-full sm:w-auto font-bold uppercase tracking-wider text-xs px-6 py-4 text-ink shadow-md"
              >
                <Car className="h-4 w-4 mr-1.5 text-ink" /> Explore 100+ Cars
              </Button>
            </Link>

            <a
              href="tel:+919694266827"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider px-6 py-4 transition-colors rounded-[2px]"
            >
              <PhoneCall className="h-4 w-4" /> Call Showroom
            </a>

            <a
              href="https://wa.me/919694266827?text=Hi%20Love%20Kush%20Cars%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20certified%20cars%20and%20visit%20the%20showroom."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider px-6 py-4 transition-colors rounded-[2px]"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
