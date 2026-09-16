import { Link } from 'react-router-dom'
import { PhoneCall, MessageCircle, MapPin, Coffee, Car } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function FinalCta() {
  return (
    <section className="bg-ink text-paper py-20 sm:py-28 relative overflow-hidden border-t border-white/10">
      {/* Ambient Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(circle at 50% 20%, #303030 0%, transparent 60%)',
        }}
      />

      <div className="container-lk relative z-10 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 border border-white/15 text-amber-300 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
          <Coffee className="h-3.5 w-3.5" />
          <span>Mewar Hospitality &bull; Udaipur &amp; Chittorgarh</span>
        </div>

        <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-5xl md:text-6xl leading-[1.12] text-balance text-paper">
          EXPERIENCE THE DIFFERENCE OVER TEA
        </h2>

        <p className="text-white/70 text-xs sm:text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
          Whether you are looking to purchase a certified luxury vehicle, sell your current car, or arrange instant
          financing, our showroom doors and expert guidance are always open for you.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8">
          <Link to="/inventory">
            <Button
              variant="primary-inverse"
              size="lg"
              className="font-bold uppercase tracking-wider text-xs px-8 py-4 text-ink shadow-lg"
            >
              <Car className="h-4 w-4 mr-1.5 text-ink" /> Explore 100+ Cars
            </Button>
          </Link>

          <a
            href="tel:+919694266827"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider px-7 py-4 transition-colors rounded-[2px]"
          >
            <PhoneCall className="h-4 w-4" /> Call Udaipur Showroom
          </a>

          <a
            href="https://wa.me/919694266827?text=Hi%20Love%20Kush%20Cars%2C%20I%20would%20like%20to%20inquire%20about%20your%20certified%20cars."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider px-7 py-4 transition-colors rounded-[2px]"
          >
            <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
          </a>
        </div>

        {/* Dual Location Pins */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-10 text-xs text-white/60">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-white" /> 100 Ft Road, Meera Nagar, Udaipur (RJ27)
          </span>
          <span className="text-white/30">&bull;</span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-amber-300" /> NH-27 Bypass, Chittorgarh (RJ09)
          </span>
          <span className="text-white/30">&bull;</span>
          <span>Open 7 Days (9:30 AM &ndash; 8:30 PM)</span>
        </div>
      </div>
    </section>
  )
}
