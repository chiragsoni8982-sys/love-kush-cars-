import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children?: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ink flex flex-col items-center justify-center gap-3 text-paper">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        <p className="text-xs uppercase tracking-widest text-paper/60 font-medium">
          Verifying security authorization...
        </p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return children ? <>{children}</> : <Outlet />
}
