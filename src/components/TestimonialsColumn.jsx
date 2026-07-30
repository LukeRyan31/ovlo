import { motion } from 'framer-motion'

/* ─────────────────────────────────────────
   Single scrolling column
───────────────────────────────────────── */
export function TestimonialsColumn({ testimonials, duration = 10, className = '' }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        animate={{ translateY: '-50%' }}
        transition={{ duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
        className="flex flex-col gap-5 pb-5"
      >
        {/* Duplicate list creates the seamless infinite loop */}
        {[0, 1].map((copy) => (
          <div key={copy} className="flex flex-col gap-5">
            {testimonials.map(({ text, name, role, initials }, i) => (
              <div
                key={i}
                className="p-7 rounded-2xl border border-ink/8 bg-parchment shadow-sm max-w-xs w-full"
              >
                {/* Quote mark */}
                <p className="font-body text-2xl text-copper leading-none mb-3 select-none">"</p>
                <p className="font-body text-sm text-smoke leading-relaxed">{text}</p>

                {/* Author row */}
                <div className="flex items-center gap-3 mt-5">
                  {/* Initial avatar */}
                  <div className="w-10 h-10 rounded-full bg-copper flex items-center justify-center flex-shrink-0">
                    <span className="font-display font-bold text-xs text-chalk tracking-wide">
                      {initials}
                    </span>
                  </div>
                  <div>
                    <p className="font-display font-semibold text-sm text-ink leading-5">{name}</p>
                    <p className="font-body text-xs text-smoke/60 uppercase tracking-widest leading-5">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
