import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { Link } from 'react-router-dom'
import { cn } from '../lib/utils'

/* ─── helpers ─── */
function randomInRange(min, max) {
  return Math.random() * (max - min) + min
}

/* ─── Photo card ─── */
function Photo({ src, alt, direction, width = 200, height = 200 }) {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const r = randomInRange(1, 4) * (direction === 'left' ? -1 : 1)
    setRotation(r)
  }, [direction])

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.2, zIndex: 9999 }}
      whileHover={{ scale: 1.1, rotateZ: 2 * (direction === 'left' ? -1 : 1), zIndex: 9999 }}
      whileDrag={{ scale: 1.1, zIndex: 9999 }}
      initial={{ rotate: 0 }}
      animate={{ rotate: rotation }}
      style={{
        width,
        height,
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none',
        touchAction: 'none',
      }}
      className="relative mx-auto shrink-0 cursor-grab active:cursor-grabbing"
      draggable={false}
      tabIndex={0}
    >
      <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-lg ring-2 ring-white/60">
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="h-full w-full rounded-2xl object-cover"
        />
      </div>
    </motion.div>
  )
}

/* ─── Gallery ─── */
export default function WorkGallery({ animationDelay = 0.3 }) {
  const [isVisible, setIsVisible]   = useState(false)
  const [isLoaded,  setIsLoaded]    = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setIsVisible(true), animationDelay * 1000)
    const t2 = setTimeout(() => setIsLoaded(true),  (animationDelay + 0.4) * 1000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [animationDelay])

  const photos = [
    { id: 1, order: 0, x: '-350px', y: '20px',  zIndex: 80, direction: 'left',  src: '/Testimonial/work-1.png' },
    { id: 2, order: 1, x: '-250px', y: '38px',  zIndex: 70, direction: 'left',  src: '/Testimonial/work-2.png' },
    { id: 3, order: 2, x: '-130px', y: '10px',  zIndex: 60, direction: 'left',  src: '/Testimonial/work-3.png' },
    { id: 4, order: 3, x: '-15px',  y: '45px',  zIndex: 50, direction: 'right', src: '/Testimonial/work-4.png' },
    { id: 5, order: 4, x: '100px',  y: '15px',  zIndex: 40, direction: 'right', src: '/Testimonial/work-5.png' },
    { id: 6, order: 5, x: '215px',  y: '40px',  zIndex: 30, direction: 'right', src: '/Testimonial/work-6.png' },
    { id: 7, order: 6, x: '330px',  y: '8px',   zIndex: 20, direction: 'left',  src: '/Testimonial/work-7.png' },
    { id: 8, order: 7, x: '445px',  y: '50px',  zIndex: 10, direction: 'right', src: '/Testimonial/work-8.png' },
  ]

  const containerVariants = {
    hidden:  { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  }

  const photoVariants = {
    hidden: () => ({ x: 0, y: 0, scale: 1 }),
    visible: (custom) => ({
      x: custom.x,
      y: custom.y,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 65,
        damping: 12,
        mass: 1,
        delay: custom.order * 0.12,
      },
    }),
  }

  return (
    <div className="relative">
      {/* Subtle grid background */}
      <div className="absolute inset-0 top-[180px] -z-10 h-[280px] w-full opacity-20
        bg-[linear-gradient(to_right,#C4763A_1px,transparent_1px),linear-gradient(to_bottom,#C4763A_1px,transparent_1px)]
        bg-[size:3rem_3rem]
        [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <p className="my-2 text-center font-body text-xs uppercase tracking-widest text-smoke">
        Content Created for Our Clients
      </p>
      <h3 className="mx-auto max-w-2xl text-center font-display text-4xl md:text-6xl font-extrabold tracking-tight text-ink py-3">
        Our <span className="text-copper">Work</span>
      </h3>

      <p className="text-center font-body text-sm text-smoke/60 mb-8">
        Drag the photos to explore
      </p>

      {/* Fan */}
      <div className="relative mb-10 h-[320px] w-full overflow-hidden">
        <motion.div
          className="relative mx-auto flex w-full max-w-7xl justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <motion.div
            className="relative flex w-full justify-center"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? 'visible' : 'hidden'}
          >
            <div className="relative h-[200px] w-[200px]">
              {[...photos].reverse().map((photo) => (
                <motion.div
                  key={photo.id}
                  className="absolute left-0 top-0"
                  style={{ zIndex: photo.zIndex }}
                  variants={photoVariants}
                  custom={{ x: photo.x, y: photo.y, order: photo.order }}
                >
                  <Photo
                    width={200}
                    height={200}
                    src={photo.src}
                    alt={`Ovlo client work ${photo.id}`}
                    direction={photo.direction}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* CTA */}
      <div className="flex w-full justify-center mt-4">
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
          <Link
            to="/contact"
            className="btn-shimmer inline-block px-8 py-4 text-chalk font-display font-bold text-sm uppercase tracking-wider rounded shadow-md"
          >
            Get results like these →
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
