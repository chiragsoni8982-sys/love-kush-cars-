import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, MessageCircle, ExternalLink, Sparkles, Navigation } from 'lucide-react'

const SHOWROOMS = [
  {
    id: 'udaipur',
    tag: 'Main Flagship Showroom',
    city: 'Udaipur (RJ27)',
    name: 'Love Kush Cars — Udaipur Flagship Hub',
    address: '100 Ft Road, Near Bharat Petroleum, A-Block, Meera Nagar, Udaipur, Rajasthan 313001',
    phone: '+91 96942 66827',
    email: 'udaipur@lovekushcars.in',
    hours: 'Mon &ndash; Sun: 9:30 AM &ndash; 8:30 PM',
    landmarks: 'Near Bharat Petroleum, A-Block, Meera Nagar (100 Ft Road)',
    features: [
      '100+ Multi-Brand Certified Car Display',
      'In-House 200-Point Diagnostic Bay',
      'Instant Auto Finance Consultation Desk',
      'VIP Handover Ceremony Lounge',
    ],
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=80',
    mapQuery: 'Love Kush Cars 100 Ft Road Bharat Petroleum Meera Nagar Udaipur Rajasthan',
  },
  {
    id: 'chittorgarh',
    tag: 'Grand New Outlet (2024)',
    city: 'Chittorgarh (RJ09)',
    name: 'Love Kush Cars — Chittorgarh Branch',
    address: 'Near Collectorate Circle, NH-27 Bypass, Chittorgarh, Rajasthan 312001',
    phone: '+91 96942 66827',
    email: 'chittor@lovekushcars.in',
    hours: 'Mon &ndash; Sun: 10:00 AM &ndash; 8:00 PM',
    landmarks: 'Collectorate Circle & NH-27 Bypass Intersection',
    features: [
      'Serving Chittorgarh, Bhilwara & Nimbahera',
      'Certified Pre-Owned SUVs & Sedans',
      'On-Spot Car Valuation & Spot Buying',
      'Doorstep Test Drive Dispatch',
    ],
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
    mapQuery: 'NH 27 Bypass Chittorgarh Rajasthan',
  },
]

export function ShowroomCards() {
  return (
    <section className="container-lk py-12 sm:py-16">
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-mist border border-line text-slate text-xs font-semibold uppercase tracking-[0.2em] mb-3">
          <MapPin className="h-3.5 w-3.5 text-ink" />
          <span>Our Physical Locations</span>
        </div>

        <h2 className="font-[family-name:var(--font-display)] font-extrabold text-2xl sm:text-3xl md:text-4xl text-ink">
          Visit Our Showrooms in Rajasthan
        </h2>

        <p className="text-slate text-xs sm:text-sm mt-2 max-w-2xl mx-auto leading-relaxed">
          Walk into any of our premier facilities for vehicle inspections, transparent valuation, test drives, and
          same-day loan sanctions over tea.
        </p>
      </div>

      {/* 2 Showroom Big Display Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {SHOWROOMS.map((showroom, idx) => (
          <motion.div
            key={showroom.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: idx * 0.1 }}
            className="bg-paper border-2 border-line hover:border-ink transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-elevated overflow-hidden group"
          >
            <div>
              {/* Photo Banner with Badges */}
              <div className="relative h-60 sm:h-64 w-full overflow-hidden border-b border-line">
                <img
                  src={showroom.image}
                  alt={showroom.name}
                  className="w-full h-full object-cover grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-ink/90 backdrop-blur-md text-paper text-[10px] font-extrabold uppercase tracking-widest border border-white/20">
                    <Sparkles className="h-3 w-3 text-amber-300" />
                    {showroom.tag}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="px-2.5 py-1 bg-white/95 backdrop-blur-md text-ink text-xs font-bold uppercase tracking-wider">
                    {showroom.city}
                  </span>
                </div>
              </div>

              {/* Showroom Information */}
              <div className="p-6 sm:p-8 space-y-5">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-xl sm:text-2xl text-ink">
                    {showroom.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate flex items-start gap-2 mt-2 leading-relaxed">
                    <MapPin className="h-4 w-4 shrink-0 text-ink mt-0.5" />
                    <span>{showroom.address}</span>
                  </p>
                  <p className="text-[11px] text-slate/70 flex items-center gap-1.5 mt-1.5 pl-6 font-medium">
                    <Navigation className="h-3 w-3 text-amber-500 shrink-0" />
                    <span>Landmark: {showroom.landmarks}</span>
                  </p>
                </div>

                {/* Timing & Contact Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs text-slate border-t border-line">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-slate/70 shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: showroom.hours }} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-slate/70 shrink-0" />
                    <a href={`tel:${showroom.phone.replace(/\s+/g, '')}`} className="font-bold text-ink hover:underline">
                      {showroom.phone}
                    </a>
                  </div>
                </div>

                {/* Facility Features */}
                <div className="p-4 bg-mist border border-line space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate/70 tracking-widest block">
                    Showroom Facilities:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ink font-medium">
                    {showroom.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-ink shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="p-6 sm:p-8 pt-0 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <a
                href={`tel:${showroom.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center justify-center gap-1.5 bg-ink text-paper hover:bg-slate text-xs font-bold uppercase tracking-wider py-3.5 px-3 transition-colors text-center"
              >
                <Phone className="h-3.5 w-3.5" /> Call Showroom
              </a>

              <a
                href={`https://wa.me/${showroom.phone.replace(/[^0-9]/g, '')}?text=Hi%20Love%20Kush%20Cars%20(${showroom.city})%2C%20I%20would%20like%20to%20visit%20your%20showroom.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider py-3.5 px-3 transition-colors text-center"
              >
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </a>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(showroom.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-paper border border-line hover:border-ink text-ink text-xs font-bold uppercase tracking-wider py-3.5 px-3 transition-colors text-center"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Directions
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
