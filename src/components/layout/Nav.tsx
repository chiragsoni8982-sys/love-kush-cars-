import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Heart, GitCompareArrows, Phone, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getCallUrl } from '@/lib/contact'
import { useCollections } from '@/context/CollectionsContext'

const links = [
  { to: '/inventory', label: 'Inventory' },
  { to: '/sell-your-car', label: 'Sell' },
  { to: '/finance', label: 'Finance' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { wishlist, compare } = useCollections()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-40 transition-all duration-300',
        scrolled ? 'bg-paper/90 backdrop-blur-md shadow-soft border-b border-line' : 'bg-transparent',
      )}
    >
      <div className="container-lk flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo/lk-logo.png" alt="Love Kush Cars" className="h-14 w-14 sm:h-16 sm:w-16 object-contain shrink-0" />
          <span
            className={cn(
              'font-[family-name:var(--font-display)] font-extrabold text-lg tracking-tight transition-colors',
              scrolled ? 'text-ink' : 'text-paper',
            )}
          >
            LOVE KUSH <span className="font-normal">CARS</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium tracking-wide transition-colors',
                  scrolled
                    ? isActive ? 'text-ink' : 'text-slate hover:text-ink'
                    : isActive ? 'text-paper' : 'text-paper/70 hover:text-paper',
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          <Link to="/wishlist" className={cn('relative transition-colors', scrolled ? 'text-ink' : 'text-paper')} aria-label="Wishlist">
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-ink text-paper text-[9px] flex items-center justify-center ring-2 ring-paper">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/compare" className={cn('relative transition-colors', scrolled ? 'text-ink' : 'text-paper')} aria-label="Compare">
            <GitCompareArrows className="h-5 w-5" />
            {compare.length > 0 && (
              <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-ink text-paper text-[9px] flex items-center justify-center ring-2 ring-paper">
                {compare.length}
              </span>
            )}
          </Link>
          <a
            href={getCallUrl()}
            className="flex items-center gap-2 bg-ink text-paper text-xs font-semibold uppercase tracking-wide px-5 py-2.5 hover:bg-slate transition-colors"
          >
            <Phone className="h-3.5 w-3.5" /> Call Us
          </a>
        </div>

        <button
          className={cn('lg:hidden transition-colors', scrolled ? 'text-ink' : 'text-paper')}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-paper border-t border-line px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium tracking-wide text-ink"
            >
              {l.label}
            </NavLink>
          ))}
          <div className="flex items-center gap-6 pt-4 border-t border-line">
            <Link to="/wishlist" className="flex items-center gap-2 text-sm">
              <Heart className="h-4 w-4" /> Wishlist ({wishlist.length})
            </Link>
            <Link to="/compare" className="flex items-center gap-2 text-sm">
              <GitCompareArrows className="h-4 w-4" /> Compare ({compare.length})
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
