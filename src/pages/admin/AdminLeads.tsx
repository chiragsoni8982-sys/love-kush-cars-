import { useEffect, useState } from 'react'
import {
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Clock,
  Car,
  Filter,
  RefreshCw,
  Loader2,
  AlertCircle,
  ChevronDown,
} from 'lucide-react'
import { apiFetch } from '@/lib/api'
import type { Lead } from '@/types'
import { cn } from '@/lib/utils'

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [typeFilter, setTypeFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [updatingId, setUpdatingId] = useState<number | null>(null)

  async function fetchLeads() {
    setLoading(true)
    setError(null)
    try {
      const data = await apiFetch<any[]>('/leads')
      const normalizedLeads: Lead[] = (data || []).map((item: any) => ({
        ...item,
        leadType: item.lead_type || item.leadType || 'contact',
        createdAt: item.created_at || item.createdAt || new Date().toISOString(),
        vehicleId: item.vehicle_id ?? item.vehicleId,
      }))
      setLeads(normalizedLeads)
    } catch (err: any) {
      setError(err.message || 'Failed to load enquiries.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  async function handleStatusChange(id: number, newStatus: string) {
    setUpdatingId(id)
    try {
      await apiFetch(`/leads/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      })
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l)),
      )
    } catch (err: any) {
      alert(err.message || 'Failed to update lead status.')
    } finally {
      setUpdatingId(null)
    }
  }

  const filteredLeads = leads.filter((lead) => {
    if (typeFilter !== 'All' && lead.leadType !== typeFilter) return false
    if (statusFilter !== 'All' && lead.status !== statusFilter) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-[family-name:var(--font-display)]">
            Customer Inquiries &amp; Leads
          </h1>
          <p className="text-xs text-white/50 mt-1">
            Incoming valuation requests, test-drive appointments, and finance pre-approvals.
          </p>
        </div>

        <button
          onClick={fetchLeads}
          disabled={loading}
          className="h-9 px-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors self-start"
        >
          <RefreshCw className={cn('h-3.5 w-3.5', loading && 'animate-spin')} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#141418] border border-white/10 p-4 rounded-xl">
        <div className="flex flex-wrap gap-2">
          {['All', 'sell', 'exchange', 'test_drive', 'finance', 'contact'].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={cn(
                'px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors',
                typeFilter === t
                  ? 'bg-amber-500 text-ink'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white',
              )}
            >
              {t === 'All' ? 'All Inquiries' : t.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-white/50 font-medium">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-black/40 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
          >
            <option value="All">All Statuses</option>
            <option value="new">New / Unaddressed</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Closed / Finalized</option>
          </select>
        </div>
      </div>

      {/* Leads List */}
      <div className="bg-[#141418] border border-white/10 rounded-xl overflow-hidden shadow-md">
        {loading ? (
          <div className="py-24 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-amber-500 mb-3" />
            <p className="text-xs text-white/50 uppercase tracking-widest">Fetching customer inquiries...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-400 text-xs">
            <AlertCircle className="h-6 w-6 mx-auto mb-2 text-red-500" />
            <p>{error}</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="p-16 text-center text-white/40 text-xs space-y-2">
            <MessageSquare className="h-10 w-10 mx-auto text-white/20" />
            <p>No customer enquiries found in this category.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filteredLeads.map((lead) => {
              const isBusy = updatingId === lead.id

              return (
                <div key={lead.id} className="p-5 hover:bg-white/5 transition-colors space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          'text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded border',
                          lead.leadType === 'sell' && 'bg-amber-500/15 border-amber-500/30 text-amber-400',
                          lead.leadType === 'exchange' && 'bg-blue-500/15 border-blue-500/30 text-blue-400',
                          lead.leadType === 'test_drive' && 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
                          lead.leadType === 'finance' && 'bg-purple-500/15 border-purple-500/30 text-purple-400',
                          lead.leadType === 'contact' && 'bg-white/10 border-white/20 text-white/80',
                        )}
                      >
                        {(lead.leadType || 'lead').replace('_', ' ')}
                      </span>
                      <h3 className="font-bold text-sm text-white">{lead.name}</h3>
                      {lead.location && (
                        <span className="text-xs text-white/40">&bull; {lead.location}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-white/40 flex items-center gap-1 font-mono">
                        <Calendar className="h-3 w-3" />
                        {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>

                      {/* Status Selector */}
                      <select
                        disabled={isBusy}
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className={cn(
                          'text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded border bg-black/50 focus:outline-none disabled:opacity-50',
                          lead.status === 'new' && 'border-amber-500/50 text-amber-400',
                          lead.status === 'contacted' && 'border-blue-500/50 text-blue-400',
                          lead.status === 'closed' && 'border-emerald-500/50 text-emerald-400',
                        )}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-white/70">
                    <a
                      href={`tel:${lead.phone}`}
                      className="inline-flex items-center gap-1.5 text-amber-400 hover:underline font-mono"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      <span>{lead.phone}</span>
                    </a>
                    {lead.email && (
                      <a
                        href={`mailto:${lead.email}`}
                        className="inline-flex items-center gap-1.5 hover:text-white"
                      >
                        <Mail className="h-3.5 w-3.5 text-white/40" />
                        <span>{lead.email}</span>
                      </a>
                    )}
                  </div>

                  {/* Submission Specific Details */}
                  {lead.details && Object.keys(lead.details).length > 0 && (
                    <div className="bg-black/30 border border-white/5 rounded-lg p-3 text-xs text-white/80 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {Object.entries(lead.details).map(([key, val]) => (
                        <div key={key}>
                          <span className="text-[10px] text-white/40 uppercase tracking-wider block font-semibold">
                            {key.replace(/_/g, ' ')}:
                          </span>
                          <span className="font-medium text-white/90">{String(val)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
