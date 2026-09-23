import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, AlertCircle, Info, X, ArrowRight } from 'lucide-react'
import { useCompare } from '@/hooks/useCompare'
import { cn } from '@/lib/utils'

export function ToastNotification() {
  const { toast, hideToast } = useCompare()

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => {
      hideToast()
    }, 4500)
    return () => clearTimeout(timer)
  }, [toast, hideToast])

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed top-20 sm:top-24 right-4 sm:right-8 z-50 max-w-md w-[calc(100vw-2rem)] sm:w-auto shadow-elevated"
        >
          <div
            className={cn(
              'flex items-center gap-3.5 px-4 py-3.5 border bg-paper/95 backdrop-blur-md text-ink text-xs sm:text-sm font-medium',
              toast.type === 'success' && 'border-emerald-600/40 bg-emerald-50/95 text-emerald-950',
              toast.type === 'warning' && 'border-amber-500/40 bg-amber-50/95 text-amber-950',
              toast.type === 'info' && 'border-ink/20 text-ink',
            )}
          >
            <div className="shrink-0">
              {toast.type === 'success' && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
              {toast.type === 'warning' && <AlertCircle className="h-4 w-4 text-amber-600" />}
              {toast.type === 'info' && <Info className="h-4 w-4 text-ink/70" />}
            </div>

            <div className="flex-1 leading-snug">
              <span>{toast.message}</span>
              {toast.actionUrl && (
                <Link
                  to={toast.actionUrl}
                  onClick={hideToast}
                  className="ml-2 inline-flex items-center gap-1 font-bold underline underline-offset-2 hover:opacity-80 transition-opacity"
                >
                  {toast.actionLabel || 'View'}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              )}
            </div>

            <button
              onClick={hideToast}
              aria-label="Dismiss notification"
              className="shrink-0 p-1 text-ink/50 hover:text-ink transition-colors ml-1"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
