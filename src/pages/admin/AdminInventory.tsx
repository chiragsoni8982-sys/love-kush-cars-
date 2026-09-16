import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Car,
  Search,
  PlusCircle,
  Star,
  Eye,
  Edit,
  Trash2,
  Filter,
  CheckCircle2,
  Clock,
  TrendingUp,
  AlertCircle,
  Loader2,
  RefreshCw,
  ExternalLink,
  ChevronDown,
} from 'lucide-react'
import { apiFetch } from '@/lib/api'
import { mapApiVehicle, type ApiVehicle } from '@/lib/mapVehicle'
import type { Vehicle } from '@/types'
import { formatINR, formatKm, cn } from '@/lib/utils'

interface AdminInventoryProps {
  defaultFilter?: 'all' | 'available' | 'sold' | 'reserved' | 'featured'
}

export default function AdminInventory({ defaultFilter = 'all' }: AdminInventoryProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filters state
  const [statusTab, setStatusTab] = useState<'all' | 'available' | 'reserved' | 'sold' | 'featured'>(defaultFilter)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('All')
  const [selectedFuel, setSelectedFuel] = useState('All')
  const [selectedOutlet, setSelectedOutlet] = useState('All')

  // Action states
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null)
  const [deleteModalCar, setDeleteModalCar] = useState<Vehicle | null>(null)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    setStatusTab(defaultFilter)
  }, [defaultFilter])

  function showToast(message: string, type: 'success' | 'error' = 'success') {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 4000)
  }

  async function fetchVehicles() {
    setLoading(true)
    setError(null)
    try {
      // status=all asks the backend to return all records without filtering out sold/reserved
      const data = await apiFetch<ApiVehicle[]>('/vehicles?status=all')
      setVehicles(data.map((raw, i) => mapApiVehicle(raw, i)))
    } catch (err: any) {
      setError(err.message || 'Failed to load vehicle inventory.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVehicles()
  }, [])

  // Handle Quick Status Change
  async function handleStatusChange(vehicleId: string, newStatus: 'available' | 'reserved' | 'sold') {
    setActionLoadingId(vehicleId)
    try {
      const isSold = newStatus === 'sold'
      await apiFetch(`/vehicles/${vehicleId}`, {
        method: 'PUT',
        body: JSON.stringify({
          status: newStatus,
          sold: isSold,
        }),
      })

      setVehicles((prev) =>
        prev.map((v) =>
          v.id === vehicleId
            ? {
                ...v,
                status: newStatus,
                badges: { ...v.badges, sold: isSold },
              }
            : v,
        ),
      )
      showToast(`Vehicle #${vehicleId} status updated to "${newStatus.toUpperCase()}".`)
    } catch (err: any) {
      showToast(err.message || 'Failed to update vehicle status.', 'error')
    } finally {
      setActionLoadingId(null)
    }
  }

  // Handle Quick Featured Toggle
  async function handleToggleFeatured(vehicleId: string, currentFeatured?: boolean) {
    setActionLoadingId(vehicleId)
    const newFeatured = !currentFeatured
    try {
      await apiFetch(`/vehicles/${vehicleId}`, {
        method: 'PUT',
        body: JSON.stringify({
          featured: newFeatured,
        }),
      })

      setVehicles((prev) =>
        prev.map((v) =>
          v.id === vehicleId
            ? {
                ...v,
                badges: { ...v.badges, featured: newFeatured },
              }
            : v,
        ),
      )
      showToast(
        newFeatured
          ? `Vehicle marked as Featured (shown on customer homepage).`
          : `Vehicle removed from Featured.`,
      )
    } catch (err: any) {
      showToast(err.message || 'Failed to toggle featured status.', 'error')
    } finally {
      setActionLoadingId(null)
    }
  }

  // Handle Delete
  async function confirmDelete() {
    if (!deleteModalCar) return
    const id = deleteModalCar.id
    setActionLoadingId(id)
    try {
      await apiFetch(`/vehicles/${id}`, {
        method: 'DELETE',
      })
      setVehicles((prev) => prev.filter((v) => v.id !== id))
      showToast(`Vehicle "${deleteModalCar.year} ${deleteModalCar.brand} ${deleteModalCar.model}" deleted permanently.`)
      setDeleteModalCar(null)
    } catch (err: any) {
      showToast(err.message || 'Failed to delete vehicle.', 'error')
    } finally {
      setActionLoadingId(null)
    }
  }

  // Unique lists for filter dropdowns
  const brands = useMemo(() => {
    const list = Array.from(new Set(vehicles.map((v) => v.brand))).sort()
    return ['All', ...list]
  }, [vehicles])

  const outlets = useMemo(() => {
    const list = Array.from(new Set(vehicles.map((v) => v.outletCity))).filter(Boolean).sort()
    return ['All', ...list]
  }, [vehicles])

  // Filtered vehicles
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      // Status tab filter
      if (statusTab === 'available' && v.status !== 'available') return false
      if (statusTab === 'reserved' && v.status !== 'reserved') return false
      if (statusTab === 'sold' && v.status !== 'sold') return false
      if (statusTab === 'featured' && !v.badges?.featured) return false

      // Brand filter
      if (selectedBrand !== 'All' && v.brand !== selectedBrand) return false

      // Fuel filter
      if (selectedFuel !== 'All' && v.fuelType !== selectedFuel) return false

      // Outlet filter
      if (selectedOutlet !== 'All' && v.outletCity !== selectedOutlet) return false

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchName = `${v.year} ${v.brand} ${v.model} ${v.variant}`.toLowerCase()
        const matchReg = (v.registrationNumber || '').toLowerCase()
        const matchColor = v.color.toLowerCase()
        if (!matchName.includes(q) && !matchReg.includes(q) && !matchColor.includes(q)) {
          return false
        }
      }

      return true
    })
  }, [vehicles, statusTab, selectedBrand, selectedFuel, selectedOutlet, searchQuery])

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div
          className={cn(
            'fixed top-20 right-6 z-50 p-4 rounded-lg shadow-xl text-xs font-semibold flex items-center gap-2 border transition-all animate-in fade-in slide-in-from-top-4',
            notification.type === 'success'
              ? 'bg-emerald-950 border-emerald-700 text-emerald-200'
              : 'bg-red-950 border-red-700 text-red-200',
          )}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-400" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-[family-name:var(--font-display)]">
            Vehicle Inventory Management
          </h1>
          <p className="text-xs text-white/50 mt-1">
            Total {vehicles.length} vehicles registered in database. Showing {filteredVehicles.length} matching.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchVehicles}
            disabled={loading}
            title="Refresh inventory from API"
            className="h-9 px-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={cn('h-3.5 w-3.5', loading && 'animate-spin')} />
            <span>Refresh</span>
          </button>

          <Link
            to="/admin/cars/new"
            className="h-9 inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-ink px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add New Car</span>
          </Link>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
        {[
          { id: 'all', label: 'All Inventory', count: vehicles.length },
          { id: 'available', label: 'Available', count: vehicles.filter((v) => v.status === 'available').length },
          { id: 'reserved', label: 'Reserved', count: vehicles.filter((v) => v.status === 'reserved').length },
          { id: 'sold', label: 'Sold', count: vehicles.filter((v) => v.status === 'sold').length },
          { id: 'featured', label: 'Featured', count: vehicles.filter((v) => v.badges?.featured).length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStatusTab(tab.id as any)}
            className={cn(
              'px-3.5 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-colors flex items-center gap-2',
              statusTab === tab.id
                ? 'bg-amber-500 text-ink shadow-sm'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white',
            )}
          >
            <span>{tab.label}</span>
            <span
              className={cn(
                'text-[10px] px-1.5 py-0.2 rounded-full font-mono',
                statusTab === tab.id ? 'bg-ink/20 text-ink' : 'bg-white/10 text-white/60',
              )}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Filters & Search Control Bar */}
      <div className="bg-[#141418] border border-white/10 p-4 rounded-xl flex flex-col md:flex-row items-center gap-3">
        {/* Search */}
        <div className="relative w-full md:flex-1">
          <Search className="h-4 w-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by brand, model, variant, reg number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Brand filter */}
        <div className="w-full md:w-44">
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
          >
            <option value="All">All Brands</option>
            {brands.filter((b) => b !== 'All').map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Fuel filter */}
        <div className="w-full md:w-36">
          <select
            value={selectedFuel}
            onChange={(e) => setSelectedFuel(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
          >
            <option value="All">All Fuels</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="CNG">CNG</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* Outlet filter */}
        <div className="w-full md:w-40">
          <select
            value={selectedOutlet}
            onChange={(e) => setSelectedOutlet(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
          >
            <option value="All">All Showrooms</option>
            {outlets.filter((o) => o !== 'All').map((o) => (
              <option key={o} value={o}>{o} Outlet</option>
            ))}
          </select>
        </div>
      </div>

      {/* Inventory Table Container */}
      <div className="bg-[#141418] border border-white/10 rounded-xl overflow-hidden shadow-lg">
        {loading ? (
          <div className="py-24 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-amber-500 mb-3" />
            <p className="text-xs text-white/50 uppercase tracking-widest">Loading vehicle inventory...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-400 text-xs">
            <AlertCircle className="h-6 w-6 mx-auto mb-2 text-red-500" />
            <p>{error}</p>
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="p-16 text-center text-white/40 text-xs space-y-3">
            <Car className="h-10 w-10 mx-auto text-white/20" />
            <p>No vehicles found matching current tab and filter criteria.</p>
            <button
              onClick={() => {
                setStatusTab('all')
                setSelectedBrand('All')
                setSelectedFuel('All')
                setSelectedOutlet('All')
                setSearchQuery('')
              }}
              className="text-amber-400 hover:underline text-xs font-semibold"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-black/50 text-white/50 uppercase tracking-wider border-b border-white/10 font-semibold">
                <tr>
                  <th className="px-4 py-3.5">Vehicle Details</th>
                  <th className="px-4 py-3.5">Selling Price</th>
                  <th className="px-4 py-3.5">Specifications</th>
                  <th className="px-4 py-3.5">Showroom</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-center">Featured</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {filteredVehicles.map((v) => {
                  const isBusy = actionLoadingId === v.id

                  return (
                    <tr key={v.id} className="hover:bg-white/5 transition-colors">
                      {/* Photo & Vehicle Title */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-16 rounded overflow-hidden bg-black/60 border border-white/10 shrink-0 relative">
                            {v.photoUrl ? (
                              <img src={v.photoUrl} alt={v.model} className="h-full w-full object-cover" />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-[9px] text-white/30">
                                No photo
                              </div>
                            )}
                            {v.gallery && v.gallery.length > 1 && (
                              <span className="absolute bottom-0.5 right-0.5 bg-black/80 text-white/80 text-[8px] px-1 rounded font-mono">
                                +{v.gallery.length}
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm">
                              {v.year} {v.brand} {v.model}
                            </p>
                            <p className="text-[11px] text-white/50">{v.variant}</p>
                            {v.registrationNumber && (
                              <span className="text-[10px] font-mono text-amber-400/80 bg-amber-500/10 px-1 rounded border border-amber-500/20">
                                {v.registrationNumber}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Selling Price */}
                      <td className="px-4 py-3.5 font-mono">
                        <p className="font-bold text-white text-sm">{formatINR(v.price)}</p>
                        {v.originalPrice && v.originalPrice > v.price && (
                          <p className="text-[10px] text-white/40 line-through">
                            {formatINR(v.originalPrice)}
                          </p>
                        )}
                        <p className="text-[10px] text-white/50">
                          EMI {formatINR(v.emiFrom)}/mo
                        </p>
                      </td>

                      {/* Specs */}
                      <td className="px-4 py-3.5 text-white/60">
                        <div>
                          {formatKm(v.kmDriven)} &bull; {v.fuelType}
                        </div>
                        <div className="text-[11px] text-white/40">
                          {v.transmission} &bull; {v.ownership}
                        </div>
                      </td>

                      {/* Outlet */}
                      <td className="px-4 py-3.5 text-white/70">
                        <span className="font-medium">{v.outletCity}</span>
                        <div className="text-[10px] text-white/40">
                          {v.rtoCode} ({v.rtoDistrict})
                        </div>
                      </td>

                      {/* Status Selector */}
                      <td className="px-4 py-3.5">
                        <div className="relative inline-block">
                          <select
                            disabled={isBusy}
                            value={v.status}
                            onChange={(e) =>
                              handleStatusChange(v.id, e.target.value as 'available' | 'reserved' | 'sold')
                            }
                            className={cn(
                              'text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded border appearance-none pr-6 cursor-pointer focus:outline-none transition-all disabled:opacity-50',
                              v.status === 'available'
                                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40'
                                : v.status === 'reserved'
                                  ? 'bg-amber-500/15 text-amber-400 border-amber-500/40'
                                  : 'bg-purple-500/15 text-purple-400 border-purple-500/40',
                            )}
                          >
                            <option value="available" className="bg-[#141418] text-white">Available</option>
                            <option value="reserved" className="bg-[#141418] text-white">Reserved</option>
                            <option value="sold" className="bg-[#141418] text-white">Sold</option>
                          </select>
                          <ChevronDown className="h-3 w-3 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                        </div>
                      </td>

                      {/* Featured Star Toggle */}
                      <td className="px-4 py-3.5 text-center">
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => handleToggleFeatured(v.id, v.badges?.featured)}
                          title={v.badges?.featured ? 'Featured on Homepage (Click to disable)' : 'Click to feature on Homepage'}
                          className={cn(
                            'h-8 w-8 rounded-full inline-flex items-center justify-center transition-all disabled:opacity-50',
                            v.badges?.featured
                              ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'
                              : 'text-white/20 hover:text-white/60 hover:bg-white/5',
                          )}
                        >
                          <Star
                            className={cn('h-4 w-4', v.badges?.featured ? 'fill-amber-400' : '')}
                          />
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-right">
                        <div className="inline-flex items-center gap-1.5">
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
                            title="Edit Vehicle Details, Photos & Pricing"
                            className="h-7 w-7 rounded bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-ink flex items-center justify-center transition-colors font-bold"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </Link>

                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => setDeleteModalCar(v)}
                            title="Delete Vehicle"
                            className="h-7 w-7 rounded bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white flex items-center justify-center transition-colors disabled:opacity-50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalCar && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#18181d] border border-white/10 rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="h-10 w-10 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
              <Trash2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Delete Vehicle Listing?</h3>
              <p className="text-xs text-white/60 mt-1 leading-relaxed">
                Are you sure you want to permanently delete{' '}
                <span className="font-bold text-white">
                  {deleteModalCar.year} {deleteModalCar.brand} {deleteModalCar.model}
                </span>{' '}
                from your database? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModalCar(null)}
                className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
