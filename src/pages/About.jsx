import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'

const TIMELINE = [
  {
    label: 'The Pattern',
    title: 'The same problem, every desk.',
    body: 'Talking to recruiters, I kept hearing the same thing: consultants buried in CV piles, rewriting the same candidate summaries, copying notes between inboxes and spreadsheets. Great recruiters doing admin work.',
  },
  {
    label: 'The Root Cause',
    title: "The admin lives between the tools.",
    body: "The CVs are in the inbox, the job spec is in an email thread, the notes are in the CRM, and the submission template is in a doc. Every placement means stitching it all together by hand — for every single candidate.",
  },
  {
    label: 'The Build',
    title: 'AI workflows, not AI replacements.',
    body: 'I started building workflows that handle that middle layer: CVs compared against job specs, candidates scored and ranked, screening questions generated, client-ready summaries drafted. The recruiter reviews everything — the system just does the assembly.',
  },
  {
    label: 'Today — Ovlo',
    title: 'Your recruiters review, not rewrite.',
    body: "Ovlo builds AI candidate processing systems for recruitment agencies. Your team goes from job spec and CV pile to ranked shortlist, screening questions, and polished submissions in minutes — and stays in control the whole way.",
  },
]

function TimelineSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 px-6 bg-parchment">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection>
          <p className="font-display text-2xl md:text-3xl font-bold text-ink mb-14 leading-snug">
            I started Ovlo because I kept seeing the same problem.
          </p>
        </AnimatedSection>

        <div ref={ref} className="relative">
          {/* Animated vertical line */}
          <motion.div
            className="absolute left-[3px] top-2 w-0.5 bg-copper/25 origin-top"
            style={{ height: 'calc(100% - 0.5rem)' }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {TIMELINE.map((item, i) => (
            <motion.div
              key={i}
              className="relative pl-10 pb-16 last:pb-0"
              initial={{ opacity: 0, x: -14 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.3 + i * 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Dot on the line */}
              <motion.span
                className="absolute left-0 top-[0.4rem] w-[7px] h-[7px] rounded-full bg-copper ring-[3px] ring-parchment"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.25, delay: 0.45 + i * 0.18, type: 'spring', stiffness: 400 }}
              />
              <p className="font-body text-xs uppercase tracking-widest text-copper mb-2">{item.label}</p>
              <h3 className="font-display text-xl md:text-2xl font-bold text-ink mb-3">{item.title}</h3>
              <p className="font-body text-base text-smoke leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const beliefs = [
  {
    label: 'The recruiter stays in control',
    body: "AI should never make hiring decisions. Ovlo's workflows prepare, organise, and summarise — final judgement on every candidate stays with the recruiter and the client.",
  },
  {
    label: 'Speed of submission wins roles',
    body: 'The agency that gets a strong, well-packaged shortlist to the client first usually wins. Most of that race is admin — and admin is a system problem.',
  },
  {
    label: 'Work with the tools you have',
    body: "Agencies don't need another platform to log into. We build workflows around the inbox, drive, sheets, and ATS your team already uses every day.",
  },
  {
    label: 'Outputs you can send, not drafts you fix',
    body: 'A candidate summary is only useful if it reaches the client standard. We tune every workflow until editing takes minutes, not rewrites.',
  },
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-copper/10 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-copper" />
              <p className="font-body font-semibold text-xs uppercase tracking-widest text-copper">About</p>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight text-ink leading-tight">
              Hi, I'm Luke.
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="font-body text-xl md:text-2xl text-smoke leading-relaxed mt-6 max-w-2xl">
              Founder of Ovlo. I build AI workflow systems for recruitment agencies — so
              recruiters spend their time placing candidates, not processing them.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Story timeline ── */}
      <TimelineSection />

      {/* ── What I believe ── */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-copper/10 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-copper" />
              <p className="font-body font-semibold text-xs uppercase tracking-widest text-copper">What I believe</p>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-ink">
              How AI belongs in recruitment.
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
              If you run a recruitment desk and the admin between CV received and candidate
              submitted is eating your week, I'd be glad to take a look.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-copper font-display font-bold text-lg hover:text-copper-dark transition-colors duration-200"
            >
              Book a demo
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
