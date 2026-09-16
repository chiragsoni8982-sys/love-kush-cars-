import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Car,
  PlusCircle,
  CheckCircle2,
  Clock,
  Star,
  MessageSquare,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  Building2,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { AdminCursor } from './AdminCursor'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/inventory', label: 'All Inventory', icon: Car },
  { to: '/admin/cars/new', label: 'Add New Car', icon: PlusCircle },
  { to: '/admin/sold', label: 'Sold Cars', icon: CheckCircle2 },
  { to: '/admin/reserved', label: 'Reserved Cars', icon: Clock },
  { to: '/admin/featured', label: 'Featured Cars', icon: Star },
  { to: '/admin/leads', label: 'Enquiries & Leads', icon: MessageSquare },
  { to: '/admin/settings', label: 'Settings & Profile', icon: Settings },
]

export function AdminLayout() {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  function handleLogout() {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-neutral-100 flex flex-col md:flex-row antialiased">
      <AdminCursor />
      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-[#141418] border-r border-white/10 flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen md:shrink-0',
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Brand Header */}
        <div>
          <div className="h-20 px-6 border-b border-white/10 flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-3">
              <img
                src="/logo/lk-logo.png"
                alt="Love Kush Cars"
                className="h-10 w-10 object-contain"
              />
              <div>
                <span className="font-extrabold text-sm tracking-wider uppercase text-paper block">
                  Love Kush <span className="text-amber-400">Cars</span>
                </span>
                <span className="text-[10px] text-white/40 tracking-widest uppercase font-semibold">
                  Admin CMS Panel
                </span>
              </div>
            </Link>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden text-white/60 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-white/40">
              Dealership Operations
            </div>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-semibold tracking-wide transition-all',
                      isActive
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        : 'text-white/70 hover:text-white hover:bg-white/5',
                    )
                  }
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              )
            })}
          </nav>
        </div>

        {/* Footer Area with Profile & Logout */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 text-xs font-medium text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="h-3.5 w-3.5" />
              Customer Website
            </span>
            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/50">Live</span>
          </Link>

          <div className="px-3 py-2.5 bg-black/30 rounded-md border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="h-8 w-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                {admin?.username?.[0] || 'A'}
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-white truncate">{admin?.username || 'Administrator'}</p>
                <p className="text-[10px] text-white/40 uppercase tracking-wider">Authorized Admin</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="h-7 w-7 rounded flex items-center justify-center text-white/40 hover:text-red-400 hover:bg-white/5 transition-colors shrink-0"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Body */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-[#141418]/80 backdrop-blur border-b border-white/10 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden text-white/70 hover:text-white p-1 rounded"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs text-white/60 font-medium">
              <Building2 className="h-3.5 w-3.5 text-amber-400" />
              <span>Rajasthan Showroom Hub &bull; Udaipur &amp; Chittorgarh</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/cars/new"
              className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-ink px-3.5 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Add Car</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 text-xs text-white/60 hover:text-red-400 font-medium px-2 py-1 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
