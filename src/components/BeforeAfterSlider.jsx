import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

export default function BeforeAfterSlider({
  beforeSrc = '/before.jpg',
  afterSrc  = '/after.jpg',
  altBefore = 'Before',
  altAfter  = 'After',
  initialPosition = 50,
}) {
  const [position, setPosition]   = useState(initialPosition)
  const [dragging, setDragging]   = useState(false)
  const containerRef              = useRef(null)

  const move = useCallback((clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x    = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
    setPosition(x)
  }, [])

  const onMouseMove = useCallback((e) => { if (dragging) move(e.clientX) }, [dragging, move])
  const onTouchMove = useCallback((e) => { if (dragging) move(e.touches[0].clientX) }, [dragging, move])
  const stop = useCallback(() => setDragging(false), [])

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('touchmove', onTouchMove)
      document.addEventListener('mouseup', stop)
      document.addEventListener('touchend', stop)
      document.body.style.cursor = 'ew-resize'
    }
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('mouseup', stop)
      document.removeEventListener('touchend', stop)
      document.body.style.cursor = ''
    }
  }, [dragging, onMouseMove, onTouchMove, stop])

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-2xl select-none group cursor-ew-resize"
      style={{ aspectRatio: '16/9' }}
      onMouseDown={() => setDragging(true)}
      onTouchStart={() => setDragging(true)}
    >
      {/* After image — base layer */}
      <img
        src={afterSrc}
        alt={altAfter}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Before image — clipped top layer */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)` }}
      >
        <img
          src={beforeSrc}
          alt={altBefore}
          draggable={false}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <span className="font-display font-bold text-xs uppercase tracking-widest px-3 py-1.5 rounded-full bg-ink/70 text-chalk backdrop-blur-sm">
          Before
        </span>
      </div>
      <div className="absolute top-4 right-4 z-10 pointer-events-none">
        <span className="font-display font-bold text-xs uppercase tracking-widest px-3 py-1.5 rounded-full bg-copper/90 text-chalk backdrop-blur-sm">
          After Ovlo
        </span>
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 h-full w-px bg-chalk/60 z-20 pointer-events-none"
        style={{ left: `${position}%` }}
      />

      {/* Drag handle */}
      <div
        className="absolute top-1/2 z-30 -translate-y-1/2 -translate-x-1/2"
        style={{ left: `${position}%` }}
        onMouseDown={(e) => { e.stopPropagation(); setDragging(true) }}
        onTouchStart={(e) => { e.stopPropagation(); setDragging(true) }}
      >
        <motion.div
          animate={{ scale: dragging ? 1.15 : 1 }}
          transition={{ duration: 0.15 }}
          className="w-12 h-12 rounded-full bg-chalk shadow-xl flex items-center justify-center cursor-ew-resize"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M7 5L3 10L7 15" stroke="#1A1714" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13 5L17 10L13 15" stroke="#1A1714" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>

        {/* Hint text on first load */}
        <motion.p
          initial={{ opacity: 1 }}
          animate={{ opacity: dragging ? 0 : 1 }}
          className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap font-body text-xs text-chalk/80 pointer-events-none"
        >
          drag to compare
        </motion.p>
      </div>
    </div>
  )
}
