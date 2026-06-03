import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'

const barHeights = [80, 120, 60, 100, 140, 45, 90]

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Hero Strip */}
      <section className="min-h-[65vh] flex items-center py-32 px-6 bg-cream">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <p className="font-body text-xs uppercase tracking-widest text-copper mb-6">Who we are</p>
            <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight text-ink leading-tight">
              We're not a<br />full-service agency.
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-24 px-6 bg-parchment">
        <div className="max-w-3xl mx-auto">

          <AnimatedSection delay={0}>
            <p className="font-display text-2xl md:text-3xl font-bold text-ink mb-12 leading-snug">
              That's intentional.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <p className="font-body text-lg md:text-xl text-smoke leading-relaxed mb-10 border-l-2 border-copper pl-8">
              Ovlo was built for a specific kind of brand — Irish wellness businesses that are past
              the start-up phase, have something real to sell, and are ready to grow without
              compromising what makes them good.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="font-body text-lg md:text-xl text-smoke leading-relaxed mb-10 border-l-2 border-copper pl-8">
              We don't do everything. We do content and retention — the two channels that, done
              properly, compound over time and build businesses that don't live or die by the
              ad spend.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <p className="font-body text-lg md:text-xl text-smoke leading-relaxed mb-16 border-l-2 border-copper pl-8">
              If that's the problem you're trying to solve, we should talk.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-copper font-display font-bold text-lg hover:text-copper-dark transition-colors duration-200"
            >
              Get in touch
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block"
              >
                →
              </motion.span>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Decorative bar strip */}
      <section className="py-20 px-6 bg-cream overflow-hidden">
        <div className="max-w-6xl mx-auto flex justify-center items-end gap-3">
          {barHeights.map((h, i) => (
            <motion.div
              key={i}
              className="w-3 rounded-full bg-copper"
              style={{ height: h, opacity: 0.12 + i * 0.08 }}
              animate={{ scaleY: [1, 0.65, 1] }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                repeatType: 'mirror',
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </section>
    </motion.div>
  )
}
