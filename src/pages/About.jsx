import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'

const beliefs = [
  { label: 'Clear messaging', body: 'If people don\'t immediately understand what you do and why it matters, they won\'t buy.' },
  { label: 'Content that converts', body: 'Not content for content\'s sake — every piece should do a job.' },
  { label: 'Retention over acquisition', body: 'Your best customer is the one you already have. Most brands ignore this.' },
  { label: 'Sustainable growth', body: 'No hacks, no shortcuts. Systems that compound and brands that last.' },
]

const barHeights = [80, 120, 60, 100, 140, 45, 90]

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* ── Hero ── */}
      <section className="min-h-[65vh] flex items-center py-32 px-6 bg-cream">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <p className="font-body text-xs uppercase tracking-widest text-copper mb-6">About</p>
            <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight text-ink leading-tight">
              Hi, I'm Luke.
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="font-body text-xl md:text-2xl text-smoke leading-relaxed mt-6 max-w-2xl">
              Founder of Ovlo. I help Irish wellness, fitness, and health brands grow through content,
              retention, and digital marketing that actually moves the needle.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="py-24 px-6 bg-parchment">
        <div className="max-w-3xl mx-auto">

          <AnimatedSection delay={0}>
            <p className="font-display text-2xl md:text-3xl font-bold text-ink mb-12 leading-snug">
              I started Ovlo because I saw a gap.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <p className="font-body text-lg md:text-xl text-smoke leading-relaxed mb-10 border-l-2 border-copper pl-8">
              The Irish wellness, fitness, and health space is full of great brands — incredible products,
              passionate founders, loyal customers. But most of them struggle to consistently attract
              new customers and scale their growth online.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="font-body text-lg md:text-xl text-smoke leading-relaxed mb-10 border-l-2 border-copper pl-8">
              Rather than chasing trends or vanity metrics, I build sustainable growth through clear
              messaging, engaging content, strong customer experiences, and retention strategies that
              keep customers coming back.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <p className="font-body text-lg md:text-xl text-smoke leading-relaxed mb-10 border-l-2 border-copper pl-8">
              I work closely with ambitious founders who want to build brands that last. Whether it's
              creating content that converts, improving customer journeys, or helping increase repeat
              purchases — my goal is simple: help great Irish brands reach more people and grow with
              confidence.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <p className="font-body text-lg md:text-xl text-smoke leading-relaxed mb-16 border-l-2 border-copper pl-8">
              When I'm not working on client projects, I'm constantly learning about marketing,
              consumer psychology, and what makes modern brands stand out in competitive markets.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── What I believe ── */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="mb-14">
            <p className="font-body text-xs uppercase tracking-widest text-copper mb-4">What I believe</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-ink">
              Growth built to last.
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {beliefs.map(({ label, body }, i) => (
              <AnimatedSection key={label} delay={i * 0.1}>
                <motion.div
                  className="bg-parchment rounded-2xl p-8 h-full cursor-default"
                  whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(196,118,58,0.12)' }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-2 h-2 rounded-full bg-copper flex-shrink-0" />
                    <h3 className="font-display font-bold text-lg text-ink">{label}</h3>
                  </div>
                  <p className="font-body text-sm text-smoke leading-relaxed pl-5">{body}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-parchment">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <p className="font-body text-lg md:text-xl text-smoke leading-relaxed mb-10">
              If you're building a wellness, fitness, or health brand and looking for a growth
              partner, I'd love to chat.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-copper font-display font-bold text-lg hover:text-copper-dark transition-colors duration-200"
            >
              Let's talk
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

      {/* ── Decorative bars ── */}
      <section className="py-20 px-6 bg-cream overflow-hidden">
        <div className="max-w-6xl mx-auto flex justify-center items-end gap-3">
          {barHeights.map((h, i) => (
            <motion.div
              key={i}
              className="w-3 rounded-full bg-copper"
              style={{ height: h, opacity: 0.12 + i * 0.08 }}
              animate={{ scaleY: [1, 0.65, 1] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, repeatType: 'mirror', delay: i * 0.15, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </section>
    </motion.div>
  )
}
