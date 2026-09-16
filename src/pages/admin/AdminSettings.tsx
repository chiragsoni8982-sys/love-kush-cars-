import { useAuth } from '@/context/AuthContext'
import { API_BASE_URL } from '@/lib/api'
import { ShieldCheck, Server, Database, MapPin, LogOut, Key, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function AdminSettings() {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-[family-name:var(--font-display)]">
          Settings &amp; Administrator Profile
        </h1>
        <p className="text-xs text-white/50 mt-1">
          System connectivity, active authentication tokens, and showroom network settings.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-[#141418] border border-white/10 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-amber-400 border-b border-white/10 pb-3">
          <User className="h-4 w-4" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-white">Active Administrator</h2>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xl flex items-center justify-center uppercase">
              {admin?.username?.[0] || 'A'}
            </div>
            <div>
              <p className="font-bold text-white text-base">{admin?.username || 'admin'}</p>
              <p className="text-xs text-amber-400 flex items-center gap-1 font-semibold mt-0.5">
                <ShieldCheck className="h-3.5 w-3.5" /> Full Super Administrator
              </p>
              <p className="text-[11px] text-white/40 mt-1 font-mono">
                Account ID: #{admin?.id || 1} &bull; Member since {admin?.createdAt ? new Date(admin.createdAt).toLocaleDateString() : 'August 2026'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-300 hover:text-white border border-red-500/30 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 self-start sm:self-center"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Backend & Database Connection */}
      <div className="bg-[#141418] border border-white/10 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-amber-400 border-b border-white/10 pb-3">
          <Server className="h-4 w-4" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-white">System Infrastructure</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-black/30 border border-white/5 p-3.5 rounded-lg space-y-1">
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <Server className="h-3 w-3 text-amber-400" /> FastAPI Endpoint URL
            </span>
            <p className="font-mono text-white/90 font-bold">{API_BASE_URL}</p>
          </div>

          <div className="bg-black/30 border border-white/5 p-3.5 rounded-lg space-y-1">
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <Database className="h-3 w-3 text-emerald-400" /> Database Engine
            </span>
            <p className="font-mono text-white/90 font-bold">SQLite (`lovekushcars.db`) with SQLModel</p>
          </div>

          <div className="bg-black/30 border border-white/5 p-3.5 rounded-lg space-y-1">
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <Key className="h-3 w-3 text-purple-400" /> Authorization Protocol
            </span>
            <p className="font-mono text-white/90 font-bold">OAuth2 Bearer JWT (HMAC-SHA256)</p>
          </div>

          <div className="bg-black/30 border border-white/5 p-3.5 rounded-lg space-y-1">
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-blue-400" /> Active Rajasthan Showrooms
            </span>
            <p className="font-mono text-white/90 font-bold">Udaipur (Meera Nagar) &amp; Chittorgarh (NH-27)</p>
          </div>
        </div>
      </div>
    </div>
  )
}
