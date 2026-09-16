import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function LoadingScreen() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const seen = sessionStorage.getItem('lk_loaded')
    if (seen) return
    setVisible(true)
    const timer = setTimeout(() => {
      setVisible(false)
      sessionStorage.setItem('lk_loaded', '1')
    }, 1700)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-ink flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.p
            className="font-[family-name:var(--font-display)] font-extrabold text-2xl text-paper tracking-tight"
            initial={{ opacity: 0, letterSpacing: '0.3em' }}
            animate={{ opacity: 1, letterSpacing: '0em' }}
            transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
          >
            LOVE KUSH <span className="font-normal">CARS</span>
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
