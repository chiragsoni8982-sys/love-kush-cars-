import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Car,
  CheckCircle2,
  Clock,
  Star,
  MessageSquare,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Loader2,
  Eye,
  Edit,
  ShieldCheck,
} from 'lucide-react'
import { apiFetch, resolveImageUrl } from '@/lib/api'
import { mapApiVehicle, type ApiVehicle } from '@/lib/mapVehicle'
import type { Vehicle } from '@/types'
import { formatINR, formatKm } from '@/lib/utils'

interface DashboardStats {
  total_cars: number
  available_cars: number
  reserved_cars: number
  sold_cars: number
  featured_cars: number
  total_enquiries: number
  recent_cars: ApiVehicle[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentVehicles, setRecentVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    setError(null)

    apiFetch<DashboardStats>('/admin/stats')
      .then((data) => {
        if (isMounted) {
          setStats(data)
          if (data.recent_cars) {
            setRecentVehicles(data.recent_cars.map((c, i) => mapApiVehicle(c, i)))
          }
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to load dashboard metrics from backend.')
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        <p className="text-xs uppercase tracking-widest text-white/50">Fetching dealership metrics...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 bg-red-950/60 border border-red-800/80 rounded-xl text-red-200">
        <div className="flex items-center gap-3 mb-2">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <h2 className="text-sm font-bold">Failed to load statistics</h2>
        </div>
        <p className="text-xs text-red-300/80">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Top Banner / Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-[family-name:var(--font-display)]">
            Dealership Overview
          </h1>
          <p className="text-xs text-white/50 mt-1">
            Real-time vehicle inventory, pricing control, and customer leads across Rajasthan showrooms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/cars/new"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-ink text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-lg shadow-md transition-all"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add New Car</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total Inventory */}
        <div className="bg-[#141418] border border-white/10 p-4 rounded-xl">
          <div className="flex items-center justify-between text-white/50 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total Stock</span>
            <Car className="h-4 w-4 text-white/40" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white font-mono">{stats?.total_cars ?? 0}</p>
          <p className="text-[10px] text-white/40 mt-1">Managed in database</p>
        </div>

        {/* Available Cars */}
        <div className="bg-[#141418] border border-emerald-500/20 p-4 rounded-xl">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Available</span>
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">{stats?.available_cars ?? 0}</p>
          <p className="text-[10px] text-emerald-400/60 mt-1">Live on website</p>
        </div>

        {/* Reserved Cars */}
        <div className="bg-[#141418] border border-amber-500/20 p-4 rounded-xl">
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Reserved</span>
            <Clock className="h-4 w-4" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">{stats?.reserved_cars ?? 0}</p>
          <p className="text-[10px] text-amber-400/60 mt-1">Customer token held</p>
        </div>

        {/* Sold Cars */}
        <div className="bg-[#141418] border border-purple-500/20 p-4 rounded-xl">
          <div className="flex items-center justify-between text-purple-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Sold</span>
            <TrendingUp className="h-4 w-4" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-purple-400 font-mono">{stats?.sold_cars ?? 0}</p>
          <p className="text-[10px] text-purple-400/60 mt-1">Delivered to client</p>
        </div>

        {/* Featured Cars */}
        <div className="bg-[#141418] border border-amber-500/30 p-4 rounded-xl">
          <div className="flex items-center justify-between text-amber-300 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Featured</span>
            <Star className="h-4 w-4 fill-amber-300" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">{stats?.featured_cars ?? 0}</p>
          <p className="text-[10px] text-amber-300/60 mt-1">Homepage hero items</p>
        </div>

        {/* Total Enquiries */}
        <div className="bg-[#141418] border border-blue-500/20 p-4 rounded-xl">
          <div className="flex items-center justify-between text-blue-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Enquiries</span>
            <MessageSquare className="h-4 w-4" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-blue-400 font-mono">{stats?.total_enquiries ?? 0}</p>
          <p className="text-[10px] text-blue-400/60 mt-1">Test drive / Sell / Finance</p>
        </div>
      </div>

      {/* Quick Action Navigation Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/admin/cars/new"
          className="bg-linear-to-r from-amber-500/15 to-transparent border border-amber-500/30 hover:border-amber-500/60 p-5 rounded-xl transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="h-10 w-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
              <PlusCircle className="h-5 w-5" />
            </div>
            <ArrowRight className="h-4 w-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <h3 className="font-bold text-sm text-white">Add New Car</h3>
          <p className="text-xs text-white/50 mt-1">
            Upload multi-angle photography, enter specifications, set price, and publish.
          </p>
        </Link>

        <Link
          to="/admin/inventory"
          className="bg-linear-to-r from-blue-500/15 to-transparent border border-blue-500/30 hover:border-blue-500/60 p-5 rounded-xl transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="h-10 w-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
              <Car className="h-5 w-5" />
            </div>
            <ArrowRight className="h-4 w-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <h3 className="font-bold text-sm text-white">Inventory Management</h3>
          <p className="text-xs text-white/50 mt-1">
            Adjust selling prices, update status to Sold / Reserved, or toggle featured.
          </p>
        </Link>

        <Link
          to="/admin/leads"
          className="bg-linear-to-r from-emerald-500/15 to-transparent border border-emerald-500/30 hover:border-emerald-500/60 p-5 rounded-xl transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="h-10 w-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
              <MessageSquare className="h-5 w-5" />
            </div>
            <ArrowRight className="h-4 w-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <h3 className="font-bold text-sm text-white">Customer Leads &amp; Queries</h3>
          <p className="text-xs text-white/50 mt-1">
            Review sell car requests, test drive bookings, and loan pre-approvals.
          </p>
        </Link>
      </div>

      {/* Recently Added Vehicles Table */}
      <div className="bg-[#141418] border border-white/10 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Recently Added Vehicles</h2>
            <p className="text-xs text-white/50 mt-0.5">Most recent cars added to your inventory</p>
          </div>
          <Link
            to="/admin/inventory"
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            <span>View All ({stats?.total_cars ?? 0})</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {recentVehicles.length === 0 ? (
          <div className="p-12 text-center text-white/40 text-xs">
            No vehicles currently in database. Click &ldquo;Add New Car&rdquo; above to publish your first vehicle.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-black/40 text-white/50 uppercase tracking-wider border-b border-white/10 font-semibold">
                <tr>
                  <th className="px-5 py-3">Vehicle</th>
                  <th className="px-5 py-3">Price</th>
                  <th className="px-5 py-3">Specs</th>
                  <th className="px-5 py-3">Outlet</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {recentVehicles.map((v) => (
                  <tr key={v.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-14 rounded overflow-hidden bg-black/60 border border-white/10 shrink-0">
                          {v.photoUrl ? (
                            <img src={v.photoUrl} alt={v.model} className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-[9px] text-white/30">
                              No photo
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-white">
                            {v.year} {v.brand} {v.model}
                          </p>
                          <p className="text-[11px] text-white/50">{v.variant}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-3.5 font-bold font-mono text-white">
                      {formatINR(v.price)}
                    </td>

                    <td className="px-5 py-3.5 text-white/60">
                      <div>
                        {formatKm(v.kmDriven)} &bull; {v.fuelType}
                      </div>
                      <div className="text-[11px] text-white/40">{v.transmission}</div>
                    </td>

                    <td className="px-5 py-3.5 text-white/70">
                      {v.outletCity}
                    </td>

                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          v.status === 'available'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : v.status === 'reserved'
                              ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                              : 'bg-purple-500/15 text-purple-400 border border-purple-500/30'
                        }`}
                      >
                        {v.status}
                      </span>
                    </td>

                    <td className="px-5 py-3.5 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          to={`/inventory/${v.id}`}
                          target="_blank"
                          title="View on Customer Website"
                          className="h-7 w-7 rounded bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-colors"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Link>
                        <Link
                          to={`/admin/cars/${v.id}/edit`}
                          title="Edit Vehicle Details & Pricing"
                          className="h-7 w-7 rounded bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-ink flex items-center justify-center transition-colors font-bold"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
