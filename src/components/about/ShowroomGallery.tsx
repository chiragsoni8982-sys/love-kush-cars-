import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Sparkles, Building2, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const SHOWROOMS = [
  {
    id: 'udaipur',
    tag: 'Main Flagship Showroom',
    city: 'Udaipur (RJ27)',
    name: 'Love Kush Cars Flagship Showroom & Delivery Hub',
    address: '100 Ft Road, Near Bharat Petroleum, A-Block, Meera Nagar, Udaipur, Rajasthan 313001',
    phone: '+91 96942 66827',
    hours: 'Mon &ndash; Sun: 9:30 AM &ndash; 8:30 PM',
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
    name: 'Love Kush Cars Chittorgarh Branch',
    address: 'Near Collectorate Circle, NH-27 Bypass, Chittorgarh, Rajasthan 312001',
    phone: '+91 96942 66827',
    hours: 'Mon &ndash; Sun: 10:00 AM &ndash; 8:00 PM',
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

export function ShowroomGallery() {
  return (
    <section id="showrooms" className="container-lk py-16 sm:py-24 border-t border-line scroll-mt-24">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-mist border border-line text-slate text-xs font-semibold uppercase tracking-[0.2em] mb-4">
          <Building2 className="h-3.5 w-3.5 text-ink" />
          <span>Our Physical Presence</span>
        </div>

        <h2 className="font-[family-name:var(--font-display)] font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink">
          Visit Our 2 Premier Rajasthan Showrooms
        </h2>

        <p className="text-slate text-xs sm:text-sm md:text-base mt-3 leading-relaxed">
          Experience our transparent hospitality in person. Step into our world-class facilities in Udaipur and
          Chittorgarh for vehicle walkthroughs, mechanical inspections, and on-spot financing over traditional tea.
        </p>
      </div>

      {/* 2 Showroom Mega Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {SHOWROOMS.map((showroom, idx) => (
          <motion.div
            key={showroom.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-paper border-2 border-line hover:border-ink transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-elevated overflow-hidden group"
          >
            <div>
              {/* Photo Banner */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden border-b border-line">
                <img
                  src={showroom.image}
                  alt={showroom.name}
                  className="w-full h-full object-cover grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-ink/90 backdrop-blur-sm text-paper text-[10px] font-extrabold uppercase tracking-widest border border-white/20">
                    <Sparkles className="h-3 w-3 text-amber-300" />
                    {showroom.tag}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-ink text-xs font-bold uppercase tracking-wider">
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
                  <p className="text-xs sm:text-sm text-slate flex items-start gap-2 mt-2">
                    <MapPin className="h-4 w-4 shrink-0 text-ink mt-0.5" />
                    <span>{showroom.address}</span>
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate border-t border-line">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-slate/70 shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: showroom.hours }} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-slate/70 shrink-0" />
                    <a href={`tel:${showroom.phone.replace(/\s+/g, '')}`} className="font-semibold text-ink hover:underline">
                      {showroom.phone}
                    </a>
                  </div>
                </div>

                {/* Showroom Key Highlights */}
                <div className="p-4 bg-mist border border-line space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate/70 tracking-widest block">
                    Facility Highlights:
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

            {/* Bottom Actions */}
            <div className="p-6 sm:p-8 pt-0 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(showroom.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-ink text-paper hover:bg-slate text-xs font-bold uppercase tracking-wider py-3.5 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Get Directions
              </a>
              <a href={`tel:${showroom.phone.replace(/\s+/g, '')}`} className="flex-1">
                <Button variant="secondary" size="md" className="w-full">
                  <Phone className="h-3.5 w-3.5 mr-1" /> Call Showroom
                </Button>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
