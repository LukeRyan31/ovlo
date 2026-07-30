import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'
import ShinyButton from '../components/ShinyButton'

const ROTATING_WORDS = ['shortlists.', 'summaries.', 'submissions.']

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
  'CV Screening', '·', 'Match Scoring', '·', 'Screening Questions', '·',
  'Candidate Summaries', '·', 'Shortlist Export', '·', 'Recruiter Notes', '·',
  'Candidate Tracking', '·', 'Job Spec Parsing', '·',
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
   Problem section — 4 pain cards
───────────────────────────────────────── */
const PAIN_CARDS = [
  {
    title: 'CV overload',
    body: 'Too many applications to review properly. The good candidates are in there — somewhere under the pile.',
  },
  {
    title: 'Messy job specs',
    body: 'Important requirements get lost across emails, notes, and client calls. Every recruiter holds a slightly different version of the role.',
  },
  {
    title: 'Slow shortlists',
    body: 'Good candidates take too long to package and send to clients — and slow submissions lose placements.',
  },
  {
    title: 'Manual candidate notes',
    body: 'Recruiters repeat the same admin across every role: summarising CVs, rewriting notes, formatting submissions.',
  },
]

function ProblemSection() {
  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-copper/10 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-copper" />
            <p className="font-body font-semibold text-xs uppercase tracking-widest text-copper">The Problem</p>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-ink mb-6">
            Recruiters aren't short on candidates.<br />They're short on time.
          </h2>
          <p className="font-body text-base text-smoke max-w-2xl leading-relaxed">
            Recruitment teams waste hours every week reading CVs, rewriting candidate summaries,
            switching between inboxes and spreadsheets, chasing notes, and preparing client
            submissions manually.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PAIN_CARDS.map((card, i) => (
            <AnimatedSection key={card.title} delay={i * 0.1}>
              <motion.div
                className="bg-parchment rounded-2xl p-8 h-full cursor-default"
                whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(196,118,58,0.12)' }}
                transition={{ duration: 0.25 }}
              >
                <span className="inline-block w-2 h-2 rounded-full bg-copper mb-5" />
                <h3 className="font-display font-bold text-lg text-ink mb-3">{card.title}</h3>
                <p className="font-body text-sm text-smoke leading-relaxed">{card.body}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   Solution — the workflow, step by step
───────────────────────────────────────── */
const WORKFLOW_STEPS = [
  { label: 'Job spec in',          desc: 'Upload or forward a job spec — from email, a doc, or rough client notes.' },
  { label: 'CVs in',               desc: 'Upload CVs directly or connect an inbox or folder where applications land.' },
  { label: 'AI comparison',        desc: 'Each candidate is compared against the role requirements automatically.' },
  { label: 'Recruiter review',     desc: 'You get match scores, strengths, concerns, and tailored screening questions per candidate.' },
  { label: 'Client-ready summary', desc: 'AI drafts a polished candidate profile, ready to send to the client.' },
  { label: 'You decide',           desc: 'The recruiter reviews and edits everything before anything is sent.' },
]

function SolutionSection() {
  return (
    <section className="py-24 px-6 bg-parchment">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-copper/10 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-copper" />
            <p className="font-body font-semibold text-xs uppercase tracking-widest text-copper">The Workflow</p>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-ink mb-6">
            An AI workflow for the admin between<br className="hidden md:block" /> CV received and candidate submitted.
          </h2>
          <p className="font-body text-base text-smoke max-w-2xl leading-relaxed">
            The recruiter always makes the final decision. Ovlo simply helps them review,
            organise, and present candidates faster.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {WORKFLOW_STEPS.map((step, i) => (
            <AnimatedSection key={step.label} delay={i * 0.08}>
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full border-2 border-copper/30 bg-parchment flex items-center justify-center flex-shrink-0">
                  <span className="font-display font-extrabold text-sm text-copper">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink mb-2">{step.label}</h3>
                  <p className="font-body text-sm text-smoke leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   Example output — candidate report mockup
───────────────────────────────────────── */
function ScoreBar({ score }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-copper"
          initial={{ width: 0 }}
          whileInView={{ width: `${score}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
        />
      </div>
      <span className="font-display font-extrabold text-copper text-lg">{score}%</span>
    </div>
  )
}

function ExampleOutputSection() {
  return (
    <section className="py-24 px-6 bg-graphite overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-copper/20 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-copper" />
            <p className="font-body font-semibold text-xs uppercase tracking-widest text-copper">Example Output</p>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-chalk">
            What your recruiters see<br />for every candidate.
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="rounded-3xl bg-white/[0.05] border border-white/10 p-8 md:p-12">

            {/* Header row */}
            <div className="flex flex-wrap items-start justify-between gap-6 mb-8 pb-8 border-b border-white/10">
              <div>
                <p className="font-body text-xs uppercase tracking-widest text-parchment/40 mb-1">Candidate</p>
                <p className="font-display font-extrabold text-2xl text-chalk">Sarah M.</p>
                <p className="font-body text-sm text-parchment/50 mt-1">Sales Development · Dublin</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-copper/20 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-copper" />
                  <span className="font-display font-bold text-xs uppercase tracking-wider text-copper">Strong fit</span>
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Left column */}
              <div className="space-y-8">
                <div>
                  <p className="font-body text-xs uppercase tracking-widest text-parchment/40 mb-3">Match score</p>
                  <ScoreBar score={86} />
                </div>

                <div>
                  <p className="font-body text-xs uppercase tracking-widest text-copper mb-3">Strengths</p>
                  <ul className="space-y-2.5">
                    {['B2B sales experience', 'CRM experience', 'Strong outbound background'].map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-copper flex-shrink-0 mt-1.5" />
                        <span className="font-body text-sm text-parchment/70">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-body text-xs uppercase tracking-widest text-parchment/40 mb-3">Concerns</p>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-parchment/30 flex-shrink-0 mt-1.5" />
                      <span className="font-body text-sm text-parchment/70">No direct SaaS experience listed</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-8">
                <div>
                  <p className="font-body text-xs uppercase tracking-widest text-copper mb-3">Screening questions</p>
                  <ul className="space-y-2.5">
                    {[
                      'What outbound targets have you worked to?',
                      'Have you sold into SMEs or enterprise accounts?',
                      'What CRM systems have you used?',
                    ].map((q) => (
                      <li key={q} className="flex items-start gap-3">
                        <span className="font-display font-bold text-copper text-xs mt-0.5 flex-shrink-0">?</span>
                        <span className="font-body text-sm text-parchment/70">{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl bg-white/[0.05] border border-white/10 p-6">
                  <p className="font-body text-xs uppercase tracking-widest text-parchment/40 mb-3">Client-ready summary</p>
                  <p className="font-body text-sm text-parchment/70 leading-relaxed italic">
                    "Sarah is a strong sales candidate with 4 years of B2B experience, proven
                    outbound exposure, and strong CRM usage. She appears well suited for a sales
                    development or account executive role, subject to confirmation around SaaS
                    experience and target ownership."
                  </p>
                </div>
              </div>
            </div>

            {/* Footer note */}
            <div className="mt-10 pt-6 border-t border-white/10">
              <p className="font-body text-xs text-parchment/40">
                Every output is reviewed and edited by your recruiter before anything reaches a client.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   How It Works — numbered steps
───────────────────────────────────────── */
const HOW_STEPS = [
  {
    n: '01',
    tag: 'Discovery',
    title: 'Send us the workflow.',
    body: "We look at how your agency currently handles CVs, job specs, notes, and client submissions. No guesswork — the system is built around your specific process.",
  },
  {
    n: '02',
    tag: 'Build',
    title: 'We build your AI system.',
    body: 'We create a workflow around your current tools — Gmail, Outlook, Google Drive, Airtable, Sheets, Notion, or your ATS. Nothing to rip out or replace.',
  },
  {
    n: '03',
    tag: 'Review faster',
    title: 'Your recruiters move faster.',
    body: 'Your team gets ranked candidates, screening questions, and client-ready summaries — without starting from scratch on every role.',
  },
]

function HowItWorksSection() {
  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-copper/10 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-copper" />
            <p className="font-body font-semibold text-xs uppercase tracking-widest text-copper">How It Works</p>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-ink">
            From CV pile to shortlist<br />in minutes.
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
          <div className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] h-px bg-copper/15 z-0" />
          {HOW_STEPS.map((step, i) => (
            <AnimatedSection key={step.n} delay={i * 0.15}>
              <div className="flex items-center gap-4 mb-8">
                <div className="relative z-10 w-16 h-16 rounded-full border-2 border-copper/30 bg-cream flex items-center justify-center flex-shrink-0">
                  <span className="font-display font-extrabold text-lg text-copper">{step.n}</span>
                </div>
              </div>
              <p className="font-body text-xs uppercase tracking-widest text-copper mb-3">{step.tag}</p>
              <h3 className="font-display text-xl font-bold text-ink mb-3">{step.title}</h3>
              <p className="font-body text-sm text-smoke leading-relaxed">{step.body}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   Who It's For — recruiter types
───────────────────────────────────────── */
const FOCUS_ROLES = [
  {
    label: 'Boutique Agencies',
    pain: "Your consultants wear every hat — sourcing, screening, client calls, submissions. The admin between CV and shortlist eats the hours that should go on relationships.",
    points: [
      'CVs scored against the job spec before anyone reads them',
      'Client-ready summaries drafted automatically',
      'Consultants spend their time on candidates and clients',
    ],
  },
  {
    label: 'Solo Recruiters',
    pain: "You are the whole agency. Every hour spent formatting candidate profiles or rewriting notes is an hour you're not billing or placing.",
    points: [
      'One workflow handles screening, scoring, and summaries',
      'Works with the tools you already use — inbox, Drive, Sheets',
      'Compete with bigger agencies on speed of submission',
    ],
  },
  {
    label: 'High-Volume Teams',
    pain: "Hundreds of applications per role. Temp desks, high churn, constant intake. Proper review of every CV simply isn't possible manually.",
    points: [
      'Every CV reviewed and ranked — none slip through unread',
      'Candidates tracked by role, stage, score, and next action',
      'Consistent submission quality across the whole team',
    ],
  },
]

function FocusSection() {
  const [active, setActive] = useState('Boutique Agencies')
  const current = FOCUS_ROLES.find((r) => r.label === active)

  return (
    <section className="py-24 px-6 bg-parchment">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left — text + role buttons */}
          <div>
            <AnimatedSection className="mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-copper/10 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-copper" />
                <p className="font-body font-semibold text-xs uppercase tracking-widest text-copper">Who It's For</p>
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-ink mb-6">
                Built for recruitment agencies.
              </h2>
              <p className="font-body text-base text-smoke max-w-xl leading-relaxed">
                Boutique agencies, solo recruiters, sales and tech desks, healthcare recruiters,
                temp staffing, high-volume teams. If your recruiters spend more time preparing
                candidates than placing them, that's the problem we fix.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="flex flex-wrap gap-4">
                {FOCUS_ROLES.map(({ label }) => {
                  const isActive = active === label
                  return (
                    <motion.button
                      key={label}
                      onClick={() => setActive(label)}
                      className={`px-6 py-3 border-2 font-display font-semibold text-sm uppercase tracking-wide rounded-full transition-colors duration-200 ${
                        isActive
                          ? 'bg-copper border-copper text-chalk'
                          : 'border-copper text-copper hover:bg-copper hover:text-chalk'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                    >
                      {label}
                    </motion.button>
                  )
                })}
              </div>
            </AnimatedSection>
          </div>

          {/* Right — role detail card */}
          <AnimatedSection delay={0.2}>
            <div className="relative rounded-2xl overflow-hidden border border-ink/8 bg-parchment min-h-72">
              <AnimatePresence mode="wait">
                {current && (
                  <motion.div
                    key={current.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="p-8"
                  >
                    {/* Label badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-copper/10 rounded-full mb-6">
                      <span className="w-1.5 h-1.5 rounded-full bg-copper" />
                      <p className="font-display font-bold text-xs uppercase tracking-wider text-copper">
                        {current.label}
                      </p>
                    </div>

                    {/* Pain point */}
                    <p className="font-body text-xs uppercase tracking-widest text-smoke/50 mb-2">The problem</p>
                    <p className="font-body text-sm text-smoke leading-relaxed italic mb-6 border-l-2 border-copper/30 pl-4">
                      "{current.pain}"
                    </p>

                    {/* What we handle */}
                    <p className="font-body text-xs uppercase tracking-widest text-smoke/50 mb-3">What changes</p>
                    <ul className="space-y-2.5">
                      {current.points.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-copper flex-shrink-0 mt-1.5" />
                          <span className="font-body text-sm text-smoke">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   Trust & compliance section
───────────────────────────────────────── */
const TRUST_POINTS = [
  'Human review required on every output',
  'No automated hiring decisions',
  'Recruiter controls the scoring criteria',
  'Everything can be edited before sending',
  'Sensitive candidate data handled carefully',
]

function TrustSection() {
  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-copper/10 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-copper" />
              <p className="font-body font-semibold text-xs uppercase tracking-widest text-copper">Trust</p>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-ink mb-6">
              Built to support recruiters, not replace judgement.
            </h2>
            <p className="font-body text-base text-smoke leading-relaxed">
              Ovlo's AI workflows are designed for recruiter decision support only. They help
              organise CVs, summarise information, and prepare candidate submissions. Final
              screening, judgement, and hiring decisions remain with the recruiter and client.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <ul className="space-y-4">
              {TRUST_POINTS.map((point, i) => (
                <motion.li
                  key={point}
                  className="flex items-center gap-4 bg-parchment rounded-2xl px-6 py-5"
                  initial={{ opacity: 0, x: 14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <span className="w-7 h-7 rounded-full bg-copper/15 flex items-center justify-center flex-shrink-0">
                    <span className="text-copper text-sm font-bold">✓</span>
                  </span>
                  <span className="font-body text-sm text-smoke">{point}</span>
                </motion.li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
export default function Home() {
  const [titleNumber, setTitleNumber] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setTitleNumber((prev) => (prev + 1) % ROTATING_WORDS.length)
    }, 2400)
    return () => clearTimeout(timer)
  }, [titleNumber])

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
            AI Workflow Systems · Recruitment Agencies
          </motion.p>

          {/* Split headline — static words animate in, last word rotates */}
          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-ink leading-none mb-8 max-w-4xl"
            aria-label="Turn messy CVs into client-ready shortlists."
          >
            {/* Static words stagger in */}
            {['Turn', 'messy', 'CVs', 'into', 'client-ready'].map((word, i) => (
              <motion.span
                key={word + i}
                className="inline-block mr-[0.25em]"
                initial={{ opacity: 0, y: 32, skewX: -4 }}
                animate={{ opacity: 1, y: 0, skewX: 0 }}
                transition={{ duration: 0.5, delay: 0.05 + i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {word}
              </motion.span>
            ))}

            {/* Rotating word container */}
            <motion.span
              className="relative inline-block overflow-hidden align-bottom"
              initial={{ opacity: 0, y: 32, skewX: -4 }}
              animate={{ opacity: 1, y: 0, skewX: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Invisible spacer — holds width/height for the container */}
              <span className="invisible select-none" aria-hidden="true">submissions.</span>
              {/* Rotating words slide up/down through the container */}
              {ROTATING_WORDS.map((word, index) => (
                <motion.span
                  key={index}
                  className="absolute left-0 top-0 text-copper"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 50, damping: 14 }}
                  animate={
                    titleNumber === index
                      ? { y: 0, opacity: 1 }
                      : { y: titleNumber > index ? -120 : 120, opacity: 0 }
                  }
                >
                  {word}
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-body text-lg md:text-xl text-smoke max-w-xl leading-relaxed mb-12"
          >
            Ovlo builds AI workflow systems for recruitment agencies that screen CVs, compare
            candidates against job specs, generate screening questions, and create polished
            candidate summaries in minutes. Your recruiters stay in control — AI just removes
            the repetitive admin.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.50, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <ShinyButton to="/contact">Book a Demo</ShinyButton>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/services"
                className="inline-block px-8 py-4 border border-ink/20 text-ink font-display font-semibold text-sm uppercase tracking-wider rounded hover:border-copper hover:text-copper transition-all duration-200"
              >
                See How It Works
              </Link>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.62 }}
            className="font-body text-xs text-smoke/60 mt-8"
          >
            Built for boutique recruitment agencies, solo recruiters, and high-volume hiring teams.
          </motion.p>
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

      {/* ── Problem ── */}
      <ProblemSection />

      {/* ── Solution / workflow ── */}
      <SolutionSection />

      {/* ── Example output ── */}
      <ExampleOutputSection />

      {/* ── How It Works ── */}
      <HowItWorksSection />

      {/* ── Who It's For ── */}
      <FocusSection />

      {/* ── Trust & compliance ── */}
      <TrustSection />

      {/* ── Book a Demo ── */}
      <section className="py-24 px-6 bg-graphite">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-chalk mb-4">
              Ready to clear the CV pile?
            </h2>
            <p className="font-body text-parchment/60 text-lg mb-10">
              Let's look at your agency's workflow and show you what an AI candidate
              submission system would handle.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 h-14 px-8 bg-copper text-chalk font-display font-bold text-sm uppercase tracking-wider rounded-full hover:bg-copper-dark transition-colors duration-200"
            >
              Book a Demo
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
    </motion.div>
  )
}
