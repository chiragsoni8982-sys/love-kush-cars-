import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import { InstagramIcon, FacebookIcon } from '@/components/ui/SocialIcons'
import { DEALERSHIP_PHONE_DISPLAY, getCallUrl } from '@/lib/contact'

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="container-lk py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-3">
            <img src="/logo/lk-logo.png" alt="Love Kush Cars" className="h-16 w-16 object-contain shrink-0" />
            <p className="font-[family-name:var(--font-display)] font-extrabold text-lg">
              LOVE KUSH <span className="font-normal">CARS</span>
            </p>
          </div>
          <p className="text-sm text-white/60 mt-4 leading-relaxed">
            Certified pre-owned luxury cars, inspected and handed over with complete transparency — Udaipur (Main Showroom) &amp; Chittorgarh (New Outlet), Rajasthan.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" aria-label="Instagram" className="text-white/60 hover:text-paper transition-colors">
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Facebook" className="text-white/60 hover:text-paper transition-colors">
              <FacebookIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-white/40 mb-4">Explore</p>
          <ul className="space-y-3 text-sm text-white/70">
            <li><Link to="/inventory" className="hover:text-paper transition-colors">Inventory</Link></li>
            <li><Link to="/inventory?location=Udaipur" className="hover:text-paper transition-colors">Udaipur Stock</Link></li>
            <li><Link to="/inventory?location=Chittorgarh" className="hover:text-paper transition-colors">Chittorgarh Stock 🌟</Link></li>
            <li><Link to="/sell-your-car" className="hover:text-paper transition-colors">Sell Your Car</Link></li>
            <li><Link to="/finance" className="hover:text-paper transition-colors">Finance</Link></li>
            <li><Link to="/compare" className="hover:text-paper transition-colors">Compare</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-white/40 mb-4">Company</p>
          <ul className="space-y-3 text-sm text-white/70">
            <li><Link to="/about" className="hover:text-paper transition-colors">About Us</Link></li>
            <li><Link to="/testimonials" className="hover:text-paper transition-colors">Testimonials</Link></li>
            <li><Link to="/blog" className="hover:text-paper transition-colors">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-paper transition-colors">Contact</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-paper transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions" className="hover:text-paper transition-colors">Terms &amp; Conditions</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-white/40 mb-4">Our Showrooms</p>
          <ul className="space-y-4 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-white" />
              <div>
                <span className="font-semibold text-paper block text-xs uppercase tracking-wider">Main Showroom (Udaipur)</span>
                <span className="text-xs text-white/60">100 Ft Road, Near Bharat Petroleum, A-Block, Meera Nagar, Udaipur, Rajasthan 313001</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-amber-400" />
              <div>
                <span className="font-semibold text-amber-300 block text-xs uppercase tracking-wider">New Outlet (Chittorgarh 🌟)</span>
                <span className="text-xs text-white/60">Near Collectorate Circle, NH-27 Bypass, Chittorgarh, Rajasthan 312001</span>
              </div>
            </li>
            <li className="flex items-center gap-2 pt-1">
              <Phone className="h-4 w-4 shrink-0 text-white/60" />
              <a href={getCallUrl()} className="hover:text-paper transition-colors">{DEALERSHIP_PHONE_DISPLAY}</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-white/60" /> hello@lovekushcars.in
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-lk py-6 text-xs text-white/40 flex flex-col sm:flex-row justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} Love Kush Cars. All rights reserved.</span>
          <span>RJ27 &middot; Udaipur (Main) &nbsp;|&nbsp; RJ09 &middot; Chittorgarh (Outlet)</span>
        </div>
      </div>
    </footer>
  )
}
