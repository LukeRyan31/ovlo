import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useSpring } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'

/* ─────────────────────────────────────────
   3-D tilt card wrapper
───────────────────────────────────────── */
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

/* ─────────────────────────────────────────
   Animated icons
───────────────────────────────────────── */

/* Ranked CV stack — AI Shortlist Builder */
function AnimatedShortlist() {
  return (
    <motion.svg
      width="200" height="180" viewBox="0 0 200 180" fill="none" aria-hidden="true"
      animate={{ scale: [1, 1.02, 0.99, 1] }}
      transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
    >
      {/* CV 1 — top ranked, strongest */}
      <rect x="30" y="16" width="140" height="42" rx="6" fill="#C4763A" opacity="0.82"/>
      <circle cx="52" cy="37" r="10" fill="#FDFBF7" opacity="0.85"/>
      <line x1="70" y1="31" x2="130" y2="31" stroke="#FDFBF7" strokeWidth="2"   opacity="0.9" strokeLinecap="round"/>
      <line x1="70" y1="43" x2="150" y2="43" stroke="#FDFBF7" strokeWidth="1.5" opacity="0.6" strokeLinecap="round"/>
      {/* Score badge */}
      <motion.circle cx="160" cy="20" r="11" fill="#C4763A"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <path d="M155 20 L158.5 23.5 L165 16.5" stroke="#FDFBF7" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {/* CV 2 — mid */}
      <rect x="30" y="70" width="140" height="42" rx="6" fill="#C4763A" opacity="0.36"/>
      <circle cx="52" cy="91" r="10" stroke="#C4763A" strokeWidth="1.5" opacity="0.55" fill="none"/>
      <line x1="70" y1="85" x2="130" y2="85" stroke="#C4763A" strokeWidth="2"   opacity="0.55" strokeLinecap="round"/>
      <line x1="70" y1="97" x2="150" y2="97" stroke="#C4763A" strokeWidth="1.5" opacity="0.38" strokeLinecap="round"/>
      {/* CV 3 — faintest */}
      <rect x="30" y="124" width="140" height="42" rx="6" fill="#C4763A" opacity="0.14"/>
      <circle cx="52" cy="145" r="10" stroke="#C4763A" strokeWidth="1.5" opacity="0.30" fill="none"/>
      <line x1="70" y1="139" x2="130" y2="139" stroke="#C4763A" strokeWidth="2"   opacity="0.30" strokeLinecap="round"/>
      <line x1="70" y1="151" x2="150" y2="151" stroke="#C4763A" strokeWidth="1.5" opacity="0.20" strokeLinecap="round"/>
    </motion.svg>
  )
}

/* Polished profile document — Candidate Submission Assistant */
function AnimatedProfile() {
  return (
    <div className="relative w-48 h-48 flex-shrink-0 flex items-center justify-center">
      <motion.svg
        width="200" height="192" viewBox="0 0 200 192" fill="none" aria-hidden="true"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      >
        {/* Rough notes behind */}
        <rect x="14" y="26" width="92" height="120" rx="6" stroke="#C4763A" strokeWidth="1.5" opacity="0.22" fill="none" transform="rotate(-6 60 86)"/>
        <line x1="30" y1="56" x2="84" y2="50" stroke="#C4763A" strokeWidth="1.5" opacity="0.18" strokeLinecap="round"/>
        <line x1="32" y1="72" x2="90" y2="66" stroke="#C4763A" strokeWidth="1.5" opacity="0.14" strokeLinecap="round"/>
        <line x1="34" y1="88" x2="80" y2="83" stroke="#C4763A" strokeWidth="1.5" opacity="0.12" strokeLinecap="round"/>
        {/* Arrow */}
        <motion.path d="M96 96 L120 96 M113 89 L121 96 L113 103"
          stroke="#C4763A" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"
          animate={{ opacity: [0.35, 0.8, 0.35], x: [0, 3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Polished profile */}
        <rect x="118" y="28" width="72" height="136" rx="8" fill="#C4763A" opacity="0.10"/>
        <rect x="118" y="28" width="72" height="136" rx="8" stroke="#C4763A" strokeWidth="1.5" opacity="0.45" fill="none"/>
        <circle cx="154" cy="56" r="12" fill="#C4763A" opacity="0.75"/>
        <line x1="132" y1="82"  x2="176" y2="82"  stroke="#C4763A" strokeWidth="2"   opacity="0.70" strokeLinecap="round"/>
        <line x1="132" y1="96"  x2="176" y2="96"  stroke="#C4763A" strokeWidth="1.5" opacity="0.45" strokeLinecap="round"/>
        <line x1="132" y1="108" x2="168" y2="108" stroke="#C4763A" strokeWidth="1.5" opacity="0.45" strokeLinecap="round"/>
        <line x1="132" y1="120" x2="176" y2="120" stroke="#C4763A" strokeWidth="1.5" opacity="0.30" strokeLinecap="round"/>
        {/* Check */}
        <path d="M140 142 L150 152 L170 132" stroke="#C4763A" strokeWidth="3" fill="none" opacity="0.9" strokeLinecap="round" strokeLinejoin="round"/>
      </motion.svg>
    </div>
  )
}

/* Connected workflow nodes — Custom Recruitment Workflow */
function AnimatedWorkflow() {
  return (
    <motion.svg
      width="200" height="180" viewBox="0 0 200 180" fill="none" aria-hidden="true"
    >
      {/* Connectors */}
      <path d="M52 44 L100 88" stroke="#C4763A" strokeWidth="1.5" opacity="0.30"/>
      <path d="M148 44 L100 88" stroke="#C4763A" strokeWidth="1.5" opacity="0.30"/>
      <motion.path d="M100 102 L100 134"
        stroke="#C4763A" strokeWidth="2" opacity="0.5" strokeLinecap="round"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Input nodes */}
      <rect x="22" y="20" width="60" height="28" rx="6" fill="#C4763A" opacity="0.16"/>
      <rect x="22" y="20" width="60" height="28" rx="6" stroke="#C4763A" strokeWidth="1.5" opacity="0.35" fill="none"/>
      <line x1="32" y1="34" x2="72" y2="34" stroke="#C4763A" strokeWidth="1.5" opacity="0.45" strokeLinecap="round"/>
      <rect x="118" y="20" width="60" height="28" rx="6" fill="#C4763A" opacity="0.16"/>
      <rect x="118" y="20" width="60" height="28" rx="6" stroke="#C4763A" strokeWidth="1.5" opacity="0.35" fill="none"/>
      <line x1="128" y1="34" x2="168" y2="34" stroke="#C4763A" strokeWidth="1.5" opacity="0.45" strokeLinecap="round"/>
      {/* Centre processing node — pulsing */}
      <motion.circle cx="100" cy="95" r="16" fill="#C4763A"
        animate={{ scale: [1, 1.1, 1], opacity: [0.75, 0.95, 0.75] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.circle cx="100" cy="95" r="26" stroke="#C4763A" strokeWidth="1.5" fill="none"
        animate={{ scale: [1, 1.18, 1], opacity: [0.30, 0, 0.30] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Output node */}
      <rect x="56" y="134" width="88" height="32" rx="6" fill="#C4763A" opacity="0.82"/>
      <line x1="68" y1="147" x2="120" y2="147" stroke="#FDFBF7" strokeWidth="2"   opacity="0.9" strokeLinecap="round"/>
      <line x1="68" y1="157" x2="132" y2="157" stroke="#FDFBF7" strokeWidth="1.5" opacity="0.55" strokeLinecap="round"/>
    </motion.svg>
  )
}

/* ─────────────────────────────────────────
   Feature grid — the exact systems
───────────────────────────────────────── */
const FEATURES = [
  {
    title: 'AI CV Screening',
    body: 'Compares CVs against the job spec and highlights relevant experience, missing requirements, and possible concerns.',
  },
  {
    title: 'Candidate Match Scoring',
    body: 'Ranks candidates based on role fit, experience, skills, location, salary notes, and recruiter-defined criteria.',
  },
  {
    title: 'Screening Question Generator',
    body: "Creates tailored questions based on each candidate's CV gaps and strengths.",
  },
  {
    title: 'Client-Ready Candidate Summaries',
    body: 'Turns messy CVs and notes into polished candidate profiles that can be sent to clients.',
  },
  {
    title: 'Candidate Tracker',
    body: 'Keeps candidates organised by role, stage, score, and next action.',
  },
  {
    title: 'Recruiter Notes Assistant',
    body: 'Turns rough call notes into clean CRM notes, candidate summaries, and follow-up drafts.',
  },
]

function FeatureGrid() {
  return (
    <section className="pb-24 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <AnimatedSection key={f.title} delay={i * 0.07}>
              <motion.div
                className="bg-parchment rounded-2xl p-8 h-full cursor-default"
                whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(196,118,58,0.12)' }}
                transition={{ duration: 0.25 }}
              >
                <span className="inline-block w-2 h-2 rounded-full bg-copper mb-5" />
                <h3 className="font-display font-bold text-lg text-ink mb-3">{f.title}</h3>
                <p className="font-body text-sm text-smoke leading-relaxed">{f.body}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   Example outcome card
───────────────────────────────────────── */
function ExampleCard({ example, dark }) {
  return (
    <div className={`rounded-2xl p-6 ${dark ? 'bg-white/[0.06]' : 'bg-ink/[0.04]'} h-full`}>
      {/* Header */}
      <div className="mb-5">
        <span className={`inline-block font-body text-[10px] uppercase tracking-widest px-3 py-1 rounded-full mb-3 ${dark ? 'bg-copper/20 text-copper' : 'bg-copper/10 text-copper'}`}>
          Example Scenario
        </span>
        <p className={`font-display font-bold text-lg ${dark ? 'text-chalk' : 'text-ink'}`}>
          {example.brand}
        </p>
        <p className={`font-body text-xs uppercase tracking-wider mt-0.5 ${dark ? 'text-parchment/50' : 'text-smoke/60'}`}>
          {example.tag}
        </p>
      </div>

      {/* Before */}
      <p className="font-body text-[10px] uppercase tracking-widest text-copper mb-1.5">Before</p>
      <p className={`font-body text-sm leading-relaxed mb-6 ${dark ? 'text-parchment/70' : 'text-smoke'}`}>
        {example.before}
      </p>

      {/* After metrics */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {example.results.map(({ label, value, period }) => (
          <div key={label} className={`rounded-xl p-3 text-center ${dark ? 'bg-white/[0.06]' : 'bg-copper/[0.07]'}`}>
            <p className="font-display font-bold text-base text-copper">{value}</p>
            <p className={`font-body text-[9px] uppercase tracking-wider mt-0.5 leading-tight ${dark ? 'text-parchment/60' : 'text-smoke/70'}`}>{label}</p>
            <p className={`font-body text-[9px] leading-tight ${dark ? 'text-parchment/40' : 'text-smoke/50'}`}>{period}</p>
          </div>
        ))}
      </div>

      {/* After */}
      <div className={`border-t ${dark ? 'border-white/10' : 'border-ink/8'} pt-4`}>
        <p className="font-body text-[10px] uppercase tracking-widest text-copper mb-1.5">After</p>
        <p className={`font-body text-sm leading-relaxed ${dark ? 'text-parchment/70' : 'text-smoke'}`}>
          {example.after}
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   Offer data
───────────────────────────────────────── */
const OFFERS = [
  {
    id: 'shortlist-builder',
    number: '01',
    title: 'AI Shortlist Builder',
    shortDesc:
      'Best for small agencies that want to speed up CV review. Upload a job spec and a pile of CVs — get back ranked candidates with match scores, strengths, concerns, and tailored screening questions.',
    deliverables: [
      'CV and job spec upload',
      'AI candidate scoring',
      'Strengths and concerns per candidate',
      'Screening questions',
      'Candidate summaries',
      'Shortlist export',
    ],
    icon: 'shortlist',
    iconSide: 'right',
    dark: false,
    fullDesc:
      "The starting point for most agencies. You upload a job spec and the CVs for a role, and the system reads every one of them against the requirements — experience, skills, location, salary notes, and any criteria you define yourself. Each candidate comes back with a match score, a plain-English breakdown of strengths and concerns, and screening questions built around the gaps in their specific CV. The output is a ranked shortlist you can review in one sitting and export wherever you need it. Nothing is sent anywhere without your review.",
    process: [
      'Job spec and CVs in — upload or forward',
      'Every CV compared against the role requirements',
      'Match scores with strengths and concerns',
      'Tailored screening questions per candidate',
      'Ranked shortlist, exported in your format',
    ],
    example: {
      brand: 'A 4-person sales recruitment desk',
      tag: 'Typical scenario · CV review',
      before:
        'A new role lands with 120 applications. Two consultants spend the best part of two days skim-reading CVs, and the strongest candidates are contacted days after they applied — often after a faster agency already has.',
      results: [
        { label: 'CVs reviewed', value: 'All 120', period: 'every role' },
        { label: 'First review', value: 'Minutes', period: 'not days' },
        { label: 'Output', value: 'Ranked', period: 'shortlist' },
      ],
      after:
        'Every CV is scored against the spec before a consultant opens it. The team starts at the top of a ranked list with screening questions ready, and the best candidates get a call the same day.',
    },
  },
  {
    id: 'submission-assistant',
    number: '02',
    title: 'Candidate Submission Assistant',
    shortDesc:
      'Best for agencies sending candidates to clients regularly. Everything in the Shortlist Builder, plus client-ready candidate profiles, cleaned-up recruiter notes, email drafts, and a role-by-role tracker.',
    deliverables: [
      'Everything in AI Shortlist Builder',
      'Client-ready candidate profiles',
      'Recruiter notes assistant',
      'Email draft generation',
      'Role-by-role candidate tracker',
    ],
    icon: 'profile',
    iconSide: 'left',
    dark: true,
    fullDesc:
      "Shortlisting is half the job — the other half is packaging candidates so clients say yes. This system takes the messy middle off your plate: it turns CVs and rough call notes into polished, consistently formatted candidate profiles, drafts the submission email, and keeps every candidate tracked by role, stage, score, and next action. Your consultants review and edit each profile before it goes out, so the quality bar stays yours — it just takes minutes instead of an hour per candidate.",
    process: [
      'Shortlist Builder workflow as the foundation',
      'Call notes turned into clean CRM notes',
      'Client-ready profiles drafted per candidate',
      'Submission emails drafted for review',
      'Candidate tracker kept current per role',
    ],
    example: {
      brand: 'A boutique agency submitting weekly',
      tag: 'Typical scenario · Client submissions',
      before:
        'Each submission means rewriting the CV into the agency template, decoding call notes, and drafting an email — close to an hour per candidate, with formatting and quality varying by consultant.',
      results: [
        { label: 'Per candidate', value: 'Minutes', period: 'to package' },
        { label: 'Profile format', value: 'One', period: 'consistent standard' },
        { label: 'Final say', value: 'Recruiter', period: 'every time' },
      ],
      after:
        'Profiles, notes, and email drafts arrive ready for review. Consultants edit rather than write from scratch, and every submission leaving the agency looks the same — polished.',
    },
  },
  {
    id: 'custom-workflow',
    number: '03',
    title: 'Custom Recruitment Workflow',
    shortDesc:
      "Best for agencies with a specific process. We map how your agency actually works — inboxes, folders, ATS, CRM — and build a candidate processing system around it, then keep optimising it.",
    deliverables: [
      'Custom workflow mapping',
      'Inbox or folder automation',
      'ATS or CRM support where possible',
      'Candidate processing system',
      'Ongoing optimisation',
    ],
    icon: 'workflow',
    iconSide: 'right',
    dark: false,
    fullDesc:
      "No two agencies run the same desk. Maybe applications land in a shared inbox, maybe specs arrive as voice notes from clients, maybe everything lives in an ATS that nobody loves. We start by mapping your actual process — where CVs come in, where notes live, what a submission looks like — and build the AI workflow around your current tools: Gmail, Outlook, Google Drive, Airtable, Sheets, Notion, or your ATS where integration is possible. Then we stay involved, refining the scoring criteria and outputs as your team uses the system on real roles.",
    process: [
      'Workflow mapping session with your team',
      'System designed around your existing tools',
      'Inbox or folder automation where it fits',
      'ATS or CRM connection where possible',
      'Ongoing refinement on real roles',
    ],
    example: {
      brand: 'A temp staffing agency',
      tag: 'Typical scenario · High volume',
      before:
        'Applications arrive into three inboxes and a job board portal. Candidates are copied between spreadsheets by hand, statuses go stale, and nobody is certain which candidates have been reviewed for which role.',
      results: [
        { label: 'Intake', value: 'One flow', period: 'all sources' },
        { label: 'Tracking', value: 'Live', period: 'role by role' },
        { label: 'Built around', value: 'Your tools', period: 'no rip-out' },
      ],
      after:
        'Every incoming CV is picked up, scored, and filed against the right role automatically. The team works from one live tracker, and the workflow keeps improving as the agency uses it.',
    },
  },
]

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
export default function Services() {
  const [expanded, setExpanded] = useState(null)

  const toggle = (id) => setExpanded((prev) => (prev === id ? null : id))

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* ── Page Header ── */}
      <section className="py-32 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-copper/10 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-copper" />
              <p className="font-body font-semibold text-xs uppercase tracking-widest text-copper">How It Works</p>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight text-ink mb-6">
              One system.<br />Built around your desk.
            </h1>
            <p className="font-body text-lg text-smoke max-w-xl">
              The AI Candidate Submission System — go from job spec and CVs to ranked shortlist,
              screening questions, and client-ready candidate summaries in minutes.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Feature grid ── */}
      <FeatureGrid />

      {/* ── Offer Cards ── */}
      <section className="pb-16 px-6 bg-cream">
        <div className="max-w-6xl mx-auto mb-12">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-copper/10 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-copper" />
              <p className="font-body font-semibold text-xs uppercase tracking-widest text-copper">Where To Start</p>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-ink">
              Three ways in.
            </h2>
          </AnimatedSection>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {OFFERS.map((offer, index) => {
            const isOpen = expanded === offer.id
            const dark   = offer.dark

            return (
              <AnimatedSection key={offer.id} delay={0.1 + index * 0.05}>
                <TiltCard>
                  <div className={`${dark ? 'bg-graphite' : 'bg-parchment'} rounded-3xl p-12 md:p-16 transition-all duration-300`}>

                    {/* ── Main 2-column row ── */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">

                      {/* Text block */}
                      <div className={offer.iconSide === 'left' ? 'order-1 md:order-2' : ''}>
                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 ${dark ? 'bg-copper/20' : 'bg-copper/10'}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-copper" />
                          <p className="font-body font-semibold text-xs uppercase tracking-widest text-copper">Option {offer.number}</p>
                        </div>
                        <h2 className={`font-display text-3xl md:text-5xl font-extrabold tracking-tight mb-6 ${dark ? 'text-chalk' : 'text-ink'}`}>
                          {offer.title}
                        </h2>
                        <p className={`font-body text-base leading-relaxed mb-8 ${dark ? 'text-parchment/70' : 'text-smoke'}`}>
                          {offer.shortDesc}
                        </p>

                        {/* Deliverables */}
                        <ul className="space-y-3 mb-10">
                          {offer.deliverables.map((item) => (
                            <li key={item} className="flex items-center gap-3">
                              <span className="w-1.5 h-1.5 rounded-full bg-copper flex-shrink-0" />
                              <span className={`font-body text-sm ${dark ? 'text-parchment/70' : 'text-smoke'}`}>{item}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Learn more toggle */}
                        <motion.button
                          onClick={() => toggle(offer.id)}
                          className={`flex items-center gap-2 px-5 py-2.5 rounded-full border font-display font-semibold text-xs uppercase tracking-wider transition-colors duration-200 ${
                            isOpen
                              ? 'bg-copper border-copper text-chalk'
                              : dark
                                ? 'border-copper/50 text-copper hover:bg-copper hover:border-copper hover:text-chalk'
                                : 'border-copper text-copper hover:bg-copper hover:text-chalk'
                          }`}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ duration: 0.15 }}
                        >
                          {isOpen ? 'Close' : 'Learn more'}
                          <motion.span
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="inline-block"
                          >
                            ↓
                          </motion.span>
                        </motion.button>
                      </div>

                      {/* Icon block */}
                      <div className={`flex items-center justify-center ${offer.iconSide === 'left' ? 'order-2 md:order-1' : ''}`}>
                        {offer.icon === 'shortlist' && <AnimatedShortlist />}
                        {offer.icon === 'profile'   && <AnimatedProfile />}
                        {offer.icon === 'workflow'  && <AnimatedWorkflow />}
                      </div>
                    </div>

                    {/* ── Expandable panel ── */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="panel"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="overflow-hidden"
                        >
                          <div className={`border-t ${dark ? 'border-white/10' : 'border-ink/10'} mt-10 pt-10 grid md:grid-cols-2 gap-12`}>

                            {/* Left — detailed description + process */}
                            <div>
                              <p className="font-body text-xs uppercase tracking-widest text-copper mb-3">
                                How it works
                              </p>
                              <p className={`font-body text-sm leading-relaxed mb-8 ${dark ? 'text-parchment/70' : 'text-smoke'}`}>
                                {offer.fullDesc}
                              </p>

                              <p className="font-body text-xs uppercase tracking-widest text-copper mb-4">
                                What's included
                              </p>
                              <ol className="space-y-3">
                                {offer.process.map((step, i) => (
                                  <li key={step} className="flex items-start gap-4">
                                    <span className="w-6 h-6 rounded-full bg-copper/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                                      <span className="font-display font-bold text-[10px] text-copper">{i + 1}</span>
                                    </span>
                                    <span className={`font-body text-sm ${dark ? 'text-parchment/70' : 'text-smoke'}`}>{step}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>

                            {/* Right — example scenario */}
                            <ExampleCard example={offer.example} dark={dark} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </TiltCard>
              </AnimatedSection>
            )
          })}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 px-6 bg-cream text-center">
        <AnimatedSection>
          <p className="font-body text-smoke max-w-sm mx-auto leading-relaxed">
            Not sure which fits? Walk us through how your agency handles a role today and
            we'll tell you exactly where the hours are going.
          </p>
          <motion.div className="inline-block mt-6" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/contact"
              className="btn-shimmer inline-block px-7 py-3 text-chalk font-display font-bold text-sm uppercase tracking-wider rounded shadow-md"
            >
              Book a demo →
            </Link>
          </motion.div>
        </AnimatedSection>
      </section>
    </motion.div>
  )
}
