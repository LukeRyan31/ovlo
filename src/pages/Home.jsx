import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'

function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 600,
          height: 500,
          top: '-10%',
          left: '-8%',
          background: 'radial-gradient(circle, #D4935A 0%, #F5F0E8 60%, transparent 80%)',
          opacity: 0.30,
        }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.08, 0.95, 1], rotate: [0, 8, -5, 0] }}
        transition={{ duration: 16, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 450,
          height: 400,
          top: '20%',
          right: '-5%',
          background: 'radial-gradient(circle, #EDE5D4 0%, #C4763A 40%, transparent 75%)',
          opacity: 0.20,
        }}
        animate={{ x: [0, -50, 30, 0], y: [0, 40, -25, 0], scale: [1, 0.92, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 300,
          height: 280,
          bottom: '-5%',
          left: '40%',
          background: 'radial-gradient(circle, #C4763A 0%, transparent 70%)',
          opacity: 0.15,
        }}
        animate={{ x: [0, 20, -30, 0], y: [0, -20, 10, 0], scale: [1, 1.15, 0.9, 1] }}
        transition={{ duration: 14, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
    </div>
  )
}

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

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Hero */}
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

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-ink leading-none mb-8 max-w-3xl"
          >
            Scale the brand<br />you built.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-body text-lg md:text-xl text-smoke max-w-xl leading-relaxed mb-12"
          >
            We help Irish wellness, supplement, and fitness brands grow through
            content that converts and retention that compounds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/contact"
              className="inline-block px-8 py-4 bg-copper text-chalk font-display font-bold text-sm uppercase tracking-wider rounded hover:bg-copper-dark transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Let's Talk
            </Link>
            <Link
              to="/services"
              className="inline-block px-8 py-4 border border-ink/20 text-ink font-display font-semibold text-sm uppercase tracking-wider rounded hover:border-copper hover:text-copper transition-all duration-200"
            >
              See What We Do
            </Link>
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

      {/* What We Do */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="mb-16">
            <p className="font-body text-xs uppercase tracking-widest text-copper mb-4">What We Do</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-ink">
              Two levers.<br />Compounding returns.
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection delay={0.1}>
              <div className="bg-parchment rounded-2xl p-10 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <TriangleIcon />
                <p className="font-body text-xs uppercase tracking-widest text-copper mt-8 mb-3">
                  Content & Social
                </p>
                <h3 className="font-display text-xl md:text-2xl font-semibold text-ink mb-4">
                  Attention is the asset.
                </h3>
                <p className="font-body text-sm text-smoke leading-relaxed">
                  We build short-form content engines — Reels, TikToks, Stories — that stop the
                  scroll and move product. Every piece is built for your brand voice, not a template.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-parchment rounded-2xl p-10 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Who We Work With */}
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
                  whileHover={{ backgroundColor: '#C4763A', color: '#FDFBF7', scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-24 px-6 bg-graphite">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-chalk mb-4">
              Ready to grow?
            </h2>
            <p className="font-body text-parchment/60 text-lg mb-10">
              Let's find out if we're the right fit.
            </p>
            <Link
              to="/contact"
              className="inline-block px-10 py-5 bg-copper text-chalk font-display font-bold text-sm uppercase tracking-wider rounded hover:bg-copper-light transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Start the Conversation
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </motion.div>
  )
}
