import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useMotionValue, useSpring, animate } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'
import WorkGallery from '../components/WorkGallery'

/* ─────────────────────────────────────────
   Animated hero background blobs
───────────────────────────────────────── */
function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <motion.div
        className="absolute rounded-full"
        style={{ width: 600, height: 500, top: '-10%', left: '-8%',
          background: 'radial-gradient(circle, #D4935A 0%, #F5F0E8 60%, transparent 80%)', opacity: 0.30 }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.08, 0.95, 1], rotate: [0, 8, -5, 0] }}
        transition={{ duration: 16, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{ width: 450, height: 400, top: '20%', right: '-5%',
          background: 'radial-gradient(circle, #EDE5D4 0%, #C4763A 40%, transparent 75%)', opacity: 0.20 }}
        animate={{ x: [0, -50, 30, 0], y: [0, 40, -25, 0], scale: [1, 0.92, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{ width: 300, height: 280, bottom: '-5%', left: '40%',
          background: 'radial-gradient(circle, #C4763A 0%, transparent 70%)', opacity: 0.15 }}
        animate={{ x: [0, 20, -30, 0], y: [0, -20, 10, 0], scale: [1, 1.15, 0.9, 1] }}
        transition={{ duration: 14, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────
   Marquee keyword ticker
───────────────────────────────────────── */
const keywords = [
  'Short-Form Content', '·', 'Email Retention', '·', 'Irish Wellness', '·',
  'Supplement Brands', '·', 'Fitness Brands', '·', 'Social Media', '·',
  'Brand Scaling', '·', 'Content Strategy', '·',
]

function MarqueeTicker() {
  return (
    <div className="w-full overflow-hidden border-y border-ink/8 py-3 bg-cream/60">
      <div className="marquee-track">
        {[...keywords, ...keywords].map((kw, i) => (
          <span
            key={i}
            className={`mx-6 font-body text-xs uppercase tracking-widest whitespace-nowrap ${
              kw === '·' ? 'text-copper' : 'text-smoke/60'
            }`}
          >
            {kw}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   Animated stat counter
───────────────────────────────────────── */
function StatCounter({ value, suffix = '', prefix = '', label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const motionVal = useMotionValue(0)
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    const controls = animate(motionVal, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
    })
    const unsub = motionVal.on('change', (v) => {
      setDisplay(v % 1 === 0 ? Math.round(v).toString() : v.toFixed(1))
    })
    return () => { controls.stop(); unsub() }
  }, [inView, value, motionVal])

  return (
    <div ref={ref} className="text-center">
      <p className="font-display font-extrabold text-4xl md:text-5xl text-ink tracking-tight">
        {prefix}{display}{suffix}
      </p>
      <p className="font-body text-xs uppercase tracking-widest text-smoke mt-2">{label}</p>
    </div>
  )
}

/* ─────────────────────────────────────────
   3-D tilt card wrapper
───────────────────────────────────────── */
function TiltCard({ children, className = '' }) {
  const ref = useRef(null)
  const rotX = useSpring(0, { stiffness: 200, damping: 20 })
  const rotY = useSpring(0, { stiffness: 200, damping: 20 })

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  - 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    rotX.set(-y * 10)
    rotY.set(x * 10)
  }
  const onMouseLeave = () => { rotX.set(0); rotY.set(0) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   SVG card icons
───────────────────────────────────────── */
function TriangleIcon() {
  return (
    <svg width="80" height="72" viewBox="0 0 80 72" fill="none" aria-hidden="true">
      <polygon points="40,4 76,68 4,68" fill="#C4763A" opacity="0.12" />
      <polygon points="52,14 78,62 26,62" fill="#C4763A" opacity="0.28" />
      <polygon points="40,26 64,58 16,58" fill="#C4763A" opacity="0.60" />
    </svg>
  )
}

function RingsIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <circle cx="40" cy="40" r="36" stroke="#C4763A" strokeWidth="1.5" opacity="0.20" />
      <circle cx="40" cy="40" r="24" stroke="#C4763A" strokeWidth="2" opacity="0.45" />
      <circle cx="40" cy="40" r="12" fill="#C4763A" opacity="0.75" />
    </svg>
  )
}

function AuditIcon() {
  return (
    <svg width="80" height="72" viewBox="0 0 80 72" fill="none" aria-hidden="true">
      <rect x="4" y="8" width="72" height="8" rx="4" fill="#C4763A" opacity="0.15" />
      <rect x="4" y="8" width="52" height="8" rx="4" fill="#C4763A" opacity="0.50" />
      <rect x="4" y="24" width="72" height="8" rx="4" fill="#C4763A" opacity="0.15" />
      <rect x="4" y="24" width="38" height="8" rx="4" fill="#C4763A" opacity="0.50" />
      <rect x="4" y="40" width="72" height="8" rx="4" fill="#C4763A" opacity="0.15" />
      <rect x="4" y="40" width="62" height="8" rx="4" fill="#C4763A" opacity="0.50" />
      <rect x="4" y="56" width="72" height="8" rx="4" fill="#C4763A" opacity="0.15" />
      <rect x="4" y="56" width="28" height="8" rx="4" fill="#C4763A" opacity="0.85" />
    </svg>
  )
}

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-cream">
        <HeroBackground />

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full py-32">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            className="font-body text-xs uppercase tracking-widest text-copper mb-6"
          >
            Brand Growth Agency · Ireland
          </motion.p>

          {/* Split headline — each word animates in */}
          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-ink leading-none mb-8 max-w-3xl"
            aria-label="Scale the brand you built."
          >
            {['Scale', 'the', 'brand', 'you', 'built.'].map((word, i) => (
              <motion.span
                key={word}
                className="inline-block mr-[0.25em] last:mr-0"
                initial={{ opacity: 0, y: 32, skewX: -4 }}
                animate={{ opacity: 1, y: 0, skewX: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-body text-lg md:text-xl text-smoke max-w-xl leading-relaxed mb-12"
          >
            We help Irish wellness, supplement, and fitness brands grow through
            content that converts and retention that compounds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contact"
                className="btn-shimmer inline-block px-8 py-4 text-chalk font-display font-bold text-sm uppercase tracking-wider rounded shadow-md hover:shadow-copper/30 hover:shadow-lg transition-shadow duration-300"
              >
                Let's Talk
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/services"
                className="inline-block px-8 py-4 border border-ink/20 text-ink font-display font-semibold text-sm uppercase tracking-wider rounded hover:border-copper hover:text-copper transition-all duration-200"
              >
                See What We Do
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-smoke/40 text-xl select-none"
        >
          ↓
        </motion.div>
      </section>

      {/* ── Marquee ticker ── */}
      <MarqueeTicker />

      {/* ── Stats ── */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border border-ink/8 rounded-2xl px-8 py-10 bg-parchment/50">
              <StatCounter value={50}  suffix="+"  label="Brands Scaled" />
              <StatCounter value={2.4} suffix="×"  label="Avg Revenue Growth" />
              <StatCounter value={91}  suffix="%"  label="Client Retention" />
              <StatCounter value={18}  suffix="M+" label="Content Impressions" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── What We Do ── */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="mb-16">
            <p className="font-body text-xs uppercase tracking-widest text-copper mb-4">What We Do</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-ink">
              Three levers.<br />Compounding returns.
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1}>
              <TiltCard className="h-full">
                <div className="bg-parchment rounded-2xl p-10 h-full cursor-pointer"
                  style={{ transform: 'translateZ(0)', boxShadow: '0 4px 24px rgba(196,118,58,0)' }}>
                  <TriangleIcon />
                  <p className="font-body text-xs uppercase tracking-widest text-copper mt-8 mb-3">
                    Content & Social
                  </p>
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-ink mb-4">
                    Attention is the asset.
                  </h3>
                  <p className="font-body text-sm text-smoke leading-relaxed">
                    We help boost your presence across social media platforms — growing your audience,
                    building brand equity, and driving traffic that converts.
                  </p>
                </div>
              </TiltCard>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <TiltCard className="h-full">
                <div className="bg-parchment rounded-2xl p-10 h-full cursor-pointer">
                  <RingsIcon />
                  <p className="font-body text-xs uppercase tracking-widest text-copper mt-8 mb-3">
                    Email & Retention
                  </p>
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-ink mb-4">
                    Your list is your margin.
                  </h3>
                  <p className="font-body text-sm text-smoke leading-relaxed">
                    Most brands leave 40% of revenue on the table after the first purchase. We build
                    email flows and retention systems that bring customers back, and keep them coming.
                  </p>
                </div>
              </TiltCard>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <TiltCard className="h-full">
                <div className="bg-parchment rounded-2xl p-10 h-full cursor-pointer">
                  <AuditIcon />
                  <p className="font-body text-xs uppercase tracking-widest text-copper mt-8 mb-3">
                    Website Audit
                  </p>
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-ink mb-4">
                    Know what's holding you back.
                  </h3>
                  <p className="font-body text-sm text-smoke leading-relaxed">
                    We audit your website for UX, SEO, conversion paths, and page speed — then give
                    you a clear action plan to fix what matters most.
                  </p>
                </div>
              </TiltCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Who We Work With ── */}
      <section className="py-24 px-6 bg-parchment">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="mb-12">
            <p className="font-body text-xs uppercase tracking-widest text-copper mb-4">Our Focus</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-ink mb-6">
              Built for Irish wellness brands.
            </h2>
            <p className="font-body text-base text-smoke max-w-2xl leading-relaxed">
              We work exclusively with wellness, supplement, and fitness brands based in Ireland.
              That focus means we understand your customer, your regulations, and your opportunity.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="flex flex-wrap gap-4">
              {['Wellness', 'Supplements', 'Fitness'].map((tag) => (
                <motion.span
                  key={tag}
                  className="px-6 py-3 border-2 border-copper text-copper font-display font-semibold text-sm uppercase tracking-wide rounded-full cursor-default"
                  whileHover={{ backgroundColor: '#C4763A', color: '#FDFBF7', scale: 1.05, borderColor: '#C4763A' }}
                  transition={{ duration: 0.2 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="mb-16">
            <p className="font-body text-xs uppercase tracking-widest text-copper mb-4">Results</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-ink">
              What our clients say.
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "Ovlo doubled our email revenue within 60 days. The retention flows they built are still compounding six months later.",
                name: "Aoife M.", brand: "Irish Wellness Brand",
              },
              {
                quote: "We'd been posting inconsistently for two years. Within a month of working with Ovlo our Reels were hitting 50k+ views.",
                name: "Ciarán D.", brand: "Supplement Brand",
              },
              {
                quote: "They actually understand the Irish wellness market. Not a generic agency — they know our customer as well as we do.",
                name: "Siobhán K.", brand: "Fitness Brand",
              },
            ].map(({ quote, name, brand }, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <TiltCard>
                  <div className="bg-parchment rounded-2xl p-8 h-full flex flex-col cursor-pointer">
                    <p className="font-body text-2xl text-copper leading-none mb-4 select-none">"</p>
                    <p className="font-body text-sm text-smoke leading-relaxed flex-1 mb-8">{quote}</p>
                    <div>
                      <p className="font-display font-semibold text-sm text-ink">{name}</p>
                      <p className="font-body text-xs text-smoke/60 uppercase tracking-widest mt-0.5">{brand}</p>
                    </div>
                  </div>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>


      {/* ── Work Gallery ── */}
      <section className="py-24 px-6 bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <WorkGallery animationDelay={0.3} />
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <section className="py-24 px-6 bg-graphite">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-chalk mb-4">
              Ready to grow?
            </h2>
            <p className="font-body text-parchment/60 text-lg mb-10">
              Let's find out if we're the right fit.
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contact"
                className="btn-shimmer inline-block px-10 py-5 text-chalk font-display font-bold text-sm uppercase tracking-wider rounded shadow-lg hover:shadow-copper/20 hover:shadow-xl transition-shadow duration-300"
              >
                Start the Conversation
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </motion.div>
  )
}
