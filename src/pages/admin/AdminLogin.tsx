import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { ShieldCheck, Eye, EyeOff, Loader2, AlertCircle, Lock, User, ArrowLeft } from 'lucide-react'
import { AdminCursor } from '@/components/admin/AdminCursor'

export default function AdminLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const from = (location.state as any)?.from?.pathname || '/admin'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMessage(null)

    if (!username.trim()) {
      setErrorMessage('Please enter your Administrator ID or username.')
      return
    }

    if (!password) {
      setErrorMessage('Please enter your password.')
      return
    }

    setIsLoading(true)
    try {
      await login(username, password)
      navigate(from, { replace: true })
    } catch (err: any) {
      if (err.message === 'Failed to fetch' || err.message?.toLowerCase().includes('failed to fetch') || err.name === 'TypeError') {
        setErrorMessage('Unable to connect to the backend server (FastAPI at http://localhost:8000). Please ensure the backend server is running.')
      } else {
        setErrorMessage(err.message || 'Invalid administrator credentials. Access denied.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-neutral-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden selection:bg-amber-500 selection:text-ink">
      <AdminCursor />
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-neutral-800/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Return link */}
      <div className="w-full max-w-md mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Return to Customer Website</span>
        </Link>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#131317] border border-white/10 rounded-xl p-8 sm:p-10 shadow-2xl relative z-10 backdrop-blur-md">
        {/* Dealership Logo & Header */}
        <div className="text-center mb-8">
          <img
            src="/logo/lk-logo.png"
            alt="Love Kush Cars"
            className="h-16 w-16 mx-auto object-contain mb-3"
          />
          <h1 className="font-[family-name:var(--font-display)] font-extrabold text-2xl tracking-tight text-white">
            Love Kush <span className="text-amber-400">Cars</span>
          </h1>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-amber-400/90 mt-2">
            <ShieldCheck className="h-3 w-3" />
            <span>Authorized Personnel Only</span>
          </div>
          <p className="text-xs text-white/50 mt-2">
            Sign in to access vehicle management, inventory pricing, and customer inquiries.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-3.5 bg-red-950/60 border border-red-800/80 rounded-lg text-red-200 text-xs flex items-start gap-2.5">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Admin ID / Username */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
              Admin ID / Username
            </label>
            <div className="relative">
              <input
                type="text"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                className="w-full bg-black/40 border border-white/15 rounded-lg px-3.5 py-2.5 pl-10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
              />
              <User className="h-4 w-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                Security Password
              </label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-black/40 border border-white/15 rounded-lg px-3.5 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-mono"
              />
              <Lock className="h-4 w-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-amber-500 hover:bg-amber-400 text-ink font-bold text-xs uppercase tracking-widest py-3 px-4 rounded-lg transition-all duration-200 shadow-md flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In to Admin CMS</span>
            )}
          </button>
        </form>

        {/* Security Notice */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-[11px] text-white/40 leading-relaxed">
            Protected by end-to-end FastAPI authentication &amp; encrypted token authorization. Unauthorized access attempts are monitored and logged.
          </p>
        </div>
      </div>
    </div>
  )
}
