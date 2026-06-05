import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useSpring } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'

function TiltCard({ children, className = '' }) {
  const ref = useRef(null)
  const rotX = useSpring(0, { stiffness: 200, damping: 20 })
  const rotY = useSpring(0, { stiffness: 200, damping: 20 })
  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    rotX.set(-(((e.clientY - rect.top) / rect.height) - 0.5) * 8)
    rotY.set((((e.clientX - rect.left) / rect.width) - 0.5) * 8)
  }
  const onMouseLeave = () => { rotX.set(0); rotY.set(0) }
  return (
    <motion.div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
      className={className}>
      {children}
    </motion.div>
  )
}

function AnimatedTriangles() {
  return (
    <motion.svg
      width="200"
      height="180"
      viewBox="0 0 200 180"
      fill="none"
      aria-hidden="true"
      animate={{ rotate: [0, 3, -2, 0], scale: [1, 1.03, 0.98, 1] }}
      transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
    >
      <polygon points="100,10 190,170 10,170" fill="#C4763A" opacity="0.08" />
      <polygon points="116,28 188,155 44,155" fill="#C4763A" opacity="0.20" />
      <polygon points="100,52 160,148 40,148" fill="#C4763A" opacity="0.45" />
      <polygon points="100,82 138,142 62,142" fill="#C4763A" opacity="0.85" />
    </motion.svg>
  )
}

function AnimatedAudit() {
  const bars = [
    { label: 'UX',    width: '88%',  delay: 0 },
    { label: 'SEO',   width: '74%',  delay: 0.15 },
    { label: 'Speed', width: '92%',  delay: 0.3 },
    { label: 'CRO',   width: '65%',  delay: 0.45 },
  ]
  return (
    <div className="w-full max-w-[200px] space-y-4">
      {bars.map(({ label, width, delay }) => (
        <div key={label}>
          <div className="flex justify-between mb-1">
            <span className="font-body text-xs text-smoke/70">{label}</span>
            <span className="font-body text-xs text-copper font-semibold">{width}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-ink/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-copper"
              initial={{ width: 0 }}
              animate={{ width }}
              transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function AnimatedRings() {
  return (
    <div className="relative w-48 h-48 flex-shrink-0">
      <svg className="w-full h-full" viewBox="0 0 192 192" fill="none" aria-hidden="true">
        <circle cx="96" cy="96" r="88" stroke="#C4763A" strokeWidth="1" opacity="0.15" />
        <circle cx="96" cy="96" r="65" stroke="#C4763A" strokeWidth="1.5" opacity="0.30" />
        <circle cx="96" cy="96" r="42" stroke="#C4763A" strokeWidth="2" opacity="0.55" />
        <circle cx="96" cy="96" r="18" fill="#C4763A" opacity="0.80" />
      </svg>
      <div className="orbit-dot" />
    </div>
  )
}

const contentDeliverables = [
  'Reels & TikTok production',
  'Content calendar management',
  'Brand voice development',
  'Growth analytics & reporting',
]

const emailDeliverables = [
  'Welcome & onboarding flows',
  'Post-purchase sequences',
  'Win-back campaigns',
  'Segmentation & personalisation',
]

const auditDeliverables = [
  'UX & conversion path review',
  'SEO structure analysis',
  'Page speed & Core Web Vitals',
  'Clear written action plan',
]

export default function Services() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Page Header */}
      <section className="py-32 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <p className="font-body text-xs uppercase tracking-widest text-copper mb-4">Services</p>
            <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight text-ink mb-6">
              What we actually do.
            </h1>
            <p className="font-body text-lg text-smoke max-w-lg">
              Three services. Built to work together.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Service Cards */}
      <section className="pb-16 px-6 bg-cream">
        <div className="max-w-6xl mx-auto space-y-8">

          {/* Card 1 */}
          <AnimatedSection delay={0.1}>
            <TiltCard>
            <div className="bg-parchment rounded-3xl p-12 md:p-16 grid md:grid-cols-2 gap-12 items-center cursor-pointer">
              <div>
                <p className="font-body text-xs uppercase tracking-widest text-copper mb-4">
                  Service 01
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-ink tracking-tight mb-6">
                  Short-Form Content & Social Media
                </h2>
                <p className="font-body text-smoke text-base leading-relaxed mb-8">
                  We produce and publish content designed to build brand equity and drive direct
                  traffic. From concept to caption to posting cadence — we run the engine so you
                  can run the business.
                </p>
                <ul className="space-y-3">
                  {contentDeliverables.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-copper flex-shrink-0" />
                      <span className="font-body text-sm text-smoke">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <AnimatedTriangles />
              </div>
            </div>
            </TiltCard>
          </AnimatedSection>

          {/* Card 2 */}
          <AnimatedSection delay={0.15}>
            <TiltCard>
            <div className="bg-graphite rounded-3xl p-12 md:p-16 grid md:grid-cols-2 gap-12 items-center cursor-pointer">
              <div className="flex items-center justify-center order-2 md:order-1">
                <AnimatedRings />
              </div>
              <div className="order-1 md:order-2">
                <p className="font-body text-xs uppercase tracking-widest text-copper mb-4">
                  Service 02
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-chalk tracking-tight mb-6">
                  Email Marketing & Retention
                </h2>
                <p className="font-body text-parchment/70 text-base leading-relaxed mb-8">
                  We build and manage email sequences, campaign calendars, and automated flows
                  that maximise lifetime value. Welcome series, post-purchase, win-back — the
                  full retention stack.
                </p>
                <ul className="space-y-3">
                  {emailDeliverables.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-copper flex-shrink-0" />
                      <span className="font-body text-sm text-parchment/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            </TiltCard>
          </AnimatedSection>
          {/* Card 3 */}
          <AnimatedSection delay={0.2}>
            <TiltCard>
            <div className="bg-parchment rounded-3xl p-12 md:p-16 grid md:grid-cols-2 gap-12 items-center cursor-pointer">
              <div>
                <p className="font-body text-xs uppercase tracking-widest text-copper mb-4">
                  Service 03
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-ink tracking-tight mb-6">
                  Website Audit & Optimisation
                </h2>
                <p className="font-body text-smoke text-base leading-relaxed mb-8">
                  A clear, honest look at what's holding your website back. We review your content,
                  UX, conversion paths, SEO structure, and page speed — then give you a prioritised
                  action plan so you know exactly what to fix and why.
                </p>
                <ul className="space-y-3">
                  {auditDeliverables.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-copper flex-shrink-0" />
                      <span className="font-body text-sm text-smoke">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <AnimatedAudit />
              </div>
            </div>
            </TiltCard>
          </AnimatedSection>

        </div>
      </section>

      {/* Bottom note */}
      <section className="py-20 px-6 bg-cream text-center">
        <AnimatedSection>
          <p className="font-body text-smoke max-w-sm mx-auto leading-relaxed">
            Not sure which applies to you? We offer a free brand audit call to figure it out together.
          </p>
          <motion.div className="inline-block mt-6" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/contact"
              className="btn-shimmer inline-block px-7 py-3 text-chalk font-display font-bold text-sm uppercase tracking-wider rounded shadow-md"
            >
              Book a free audit call →
            </Link>
          </motion.div>
        </AnimatedSection>
      </section>
    </motion.div>
  )
}
