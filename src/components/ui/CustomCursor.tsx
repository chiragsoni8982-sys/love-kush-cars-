import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type CursorVariant = 'default' | 'button' | 'card' | 'link' | 'input'

export function CustomCursor() {
  const [variant, setVariant] = useState<CursorVariant>('default')
  const [label, setLabel] = useState<string>('')
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const [speedRotation, setSpeedRotation] = useState(0)

  // Motion values for smooth hardware-accelerated tracking
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Outer tachometer ring with smooth momentum spring
  const springConfig = { damping: 26, stiffness: 320, mass: 0.4 }
  const ringX = useSpring(mouseX, springConfig)
  const ringY = useSpring(mouseY, springConfig)

  // Inner precision diamond with rapid response
  const dotSpringConfig = { damping: 40, stiffness: 850 }
  const dotX = useSpring(mouseX, dotSpringConfig)
  const dotY = useSpring(mouseY, dotSpringConfig)

  const lastPos = useRef({ x: 0, y: 0, time: performance.now() })

  useEffect(() => {
    // Detect touch / coarse pointer
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

      // Calculate speed & angle for automotive tachometer needle & dial rotation
      const now = performance.now()
      const dt = Math.max(now - lastPos.current.time, 1)
      const dx = e.clientX - lastPos.current.x
      const dy = e.clientY - lastPos.current.y
      const distance = Math.hypot(dx, dy)
      const speed = Math.min(distance / dt, 4)

      const angle = (Math.atan2(dy, dx) * 180) / Math.PI
      setSpeedRotation(angle + speed * 20)

      lastPos.current = { x: e.clientX, y: e.clientY, time: now }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Element hover detection across the page
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const customCursor = target.closest('[data-cursor]') as HTMLElement | null
      if (customCursor) {
        const customType = customCursor.getAttribute('data-cursor') || 'button'
        const customLabel = customCursor.getAttribute('data-cursor-text') || ''
        setVariant(customType as CursorVariant)
        setLabel(customLabel)
        return
      }

      const isButton = target.closest('button, [role="button"]')
      const isLink = target.closest('a')
      const isCard = target.closest('article, .vehicle-card')
      const isInput = target.closest('input, select, textarea')

      if (isButton) {
        const text = target.closest('button')?.innerText?.trim()
        if (text && text.toLowerCase().includes('search')) {
          setLabel('SEARCH')
        } else if (text && text.toLowerCase().includes('inventory')) {
          setLabel('EXPLORE')
        } else if (text && text.toLowerCase().includes('sell')) {
          setLabel('SELL')
        } else if (text && text.toLowerCase().includes('call')) {
          setLabel('CALL')
        } else {
          setLabel('DRIVE')
        }
        setVariant('button')
      } else if (isCard) {
        setLabel('VIEW')
        setVariant('card')
      } else if (isLink) {
        setLabel('')
        setVariant('link')
      } else if (isInput) {
        setLabel('')
        setVariant('input')
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

  const isHovered = variant !== 'default' && variant !== 'input'
  const isButtonState = variant === 'button'
  const isCardState = variant === 'card'

  const ringSize = isCardState ? 72 : isButtonState ? 64 : isHovered ? 48 : 34

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden mix-blend-difference"
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    >
      {/* Outer Speedometer / Tachometer HUD Ring */}
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
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 350,
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full text-white"
          viewBox="0 0 100 100"
          style={{
            transform: `rotate(${speedRotation}deg)`,
            transition: 'transform 0.1s linear',
          }}
        >
          {/* Dial Track */}
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="currentColor"
            strokeWidth={isHovered ? '2' : '1.2'}
            strokeDasharray={isHovered ? '6 4' : '2 5'}
            className="opacity-60"
          />

          {/* Steering / Cardinal Notches */}
          <line x1="50" y1="2" x2="50" y2="10" stroke="currentColor" strokeWidth="2.5" className="opacity-90" />
          <line x1="98" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="2" className="opacity-70" />
          <line x1="50" y1="98" x2="50" y2="90" stroke="currentColor" strokeWidth="2" className="opacity-70" />
          <line x1="2" y1="50" x2="10" y2="50" stroke="currentColor" strokeWidth="2" className="opacity-70" />

          {/* High RPM Rev Arc when over interactive elements */}
          {isHovered && (
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3.5"
              strokeDasharray="95 190"
              strokeLinecap="round"
              className="animate-spin"
              style={{ animationDuration: '2.5s' }}
            />
          )}
        </svg>

        {/* Ambient Backing Disc */}
        {isHovered && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute inset-0.5 rounded-full bg-white backdrop-blur-[2px]"
          />
        )}

        {/* Reactive automotive status label */}
        {label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="relative z-10 text-[9px] font-black tracking-widest text-white uppercase select-none font-[family-name:var(--font-display)]"
          >
            {label}
          </motion.span>
        )}
      </motion.div>

      {/* Center Precision Diamond Core */}
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
            scale: isClicking ? 1.5 : isHovered ? 0 : 1,
            opacity: isHovered ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
          className="h-1.5 w-1.5 rotate-45 bg-white shadow-[0_0_6px_rgba(255,255,255,1)]"
        />
      </motion.div>

      {/* Throttle Launch Pulse on Click */}
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none rounded-full border-2 border-white will-change-transform"
          style={{
            x: dotX,
            y: dotY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ width: ringSize * 0.7, height: ringSize * 0.7, opacity: 1 }}
          animate={{ width: ringSize * 2.2, height: ringSize * 2.2, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      )}
    </div>
  )
}
