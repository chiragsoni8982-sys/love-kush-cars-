import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type AdminCursorVariant = 'default' | 'button' | 'action' | 'input' | 'table'

export function AdminCursor() {
  const [variant, setVariant] = useState<AdminCursorVariant>('default')
  const [label, setLabel] = useState<string>('')
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Outer ring spring
  const ringSpringConfig = { damping: 28, stiffness: 350, mass: 0.3 }
  const ringX = useSpring(mouseX, ringSpringConfig)
  const ringY = useSpring(mouseY, ringSpringConfig)

  // Center pointer spring (faster response)
  const dotSpringConfig = { damping: 42, stiffness: 900 }
  const dotX = useSpring(mouseX, dotSpringConfig)
  const dotY = useSpring(mouseY, dotSpringConfig)

  useEffect(() => {
    const checkTouch = () => {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches
      const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      setIsTouch(isCoarse || isMobile)
    }
    checkTouch()

    if (window.matchMedia('(pointer: coarse)').matches) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const isButton = target.closest('button, [role="button"]')
      const isLink = target.closest('a')
      const isInput = target.closest('input, select, textarea')
      const isRow = target.closest('tr, .admin-card')

      if (isButton) {
        const text = target.closest('button')?.innerText?.trim()?.toLowerCase() || ''
        if (text.includes('save') || text.includes('publish')) {
          setLabel('SAVE')
        } else if (text.includes('delete')) {
          setLabel('DELETE')
        } else if (text.includes('add')) {
          setLabel('ADD')
        } else {
          setLabel('SELECT')
        }
        setVariant('button')
      } else if (isLink) {
        setLabel('OPEN')
        setVariant('action')
      } else if (isInput) {
        setLabel('')
        setVariant('input')
      } else if (isRow) {
        setLabel('')
        setVariant('table')
      } else {
        setLabel('')
        setVariant('default')
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseover', handleMouseOver, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY, isVisible])

  if (isTouch) return null

  const isInteractive = variant === 'button' || variant === 'action'
  const isInput = variant === 'input'

  const ringSize = isInteractive ? 54 : isInput ? 24 : 36

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden select-none"
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.15s ease' }}
      aria-hidden="true"
    >
      {/* Outer Black Luxury Lens Ring */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center pointer-events-none will-change-transform"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          scale: isClicking ? 0.85 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 350,
        }}
      >
        {/* Solid Black Ring with Precision Contrast Border */}
        <div
          className={`absolute inset-0 rounded-full border transition-colors duration-200 ${
            isInteractive
              ? 'bg-black/85 border-amber-400 ring-2 ring-black/60 shadow-[0_4px_16px_rgba(0,0,0,0.8)]'
              : isInput
                ? 'bg-black/50 border-amber-400/80 border-dashed'
                : 'bg-black/70 border-white/70 ring-1 ring-black/40 shadow-md'
          }`}
        />

        {/* Action Label Inside Black Disc */}
        {label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="relative z-10 text-[8px] font-black tracking-widest text-amber-400 uppercase select-none font-mono"
          >
            {label}
          </motion.span>
        )}
      </motion.div>

      {/* Center Black Precision Dot / Crosshair */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none will-change-transform flex items-center justify-center"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 1.6 : isInteractive ? 0 : 1,
            opacity: isInteractive ? 0 : 1,
          }}
          transition={{ duration: 0.12 }}
          className="h-2 w-2 rounded-full bg-black border-2 border-white ring-1 ring-black shadow-[0_0_8px_rgba(0,0,0,0.9)]"
        />
      </motion.div>

      {/* Click Ripple Indicator */}
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none rounded-full border-2 border-amber-400 will-change-transform"
          style={{
            x: dotX,
            y: dotY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ width: 14, height: 14, opacity: 1 }}
          animate={{ width: 60, height: 60, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      )}
    </div>
  )
}
