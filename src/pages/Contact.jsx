import { useEffect } from 'react'
import { useForm as useRHForm } from 'react-hook-form'
import { useForm as useFormspree } from '@formspree/react'
import { motion } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'

function FieldError({ message }) {
  if (!message) return null
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-1.5 text-xs text-red-500 font-body"
    >
      {message}
    </motion.p>
  )
}

export default function Contact() {
  const [fsState, fsSubmit] = useFormspree('xeewqkjj')
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useRHForm()

  // Clear the form once Formspree confirms delivery
  useEffect(() => {
    if (fsState.succeeded) reset()
  }, [fsState.succeeded, reset])

  const onSubmit = (data) => fsSubmit(data)

  const inputClass =
    'w-full bg-transparent border-b-2 border-ink/15 focus:border-copper outline-none focus-visible:ring-0 py-3 font-body text-ink text-lg placeholder:text-smoke/35 transition-colors duration-200'

  const labelClass = 'font-body text-xs uppercase tracking-widest text-smoke mb-2 block'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <section className="min-h-screen py-32 px-6 bg-cream">
        <div className="max-w-2xl mx-auto">

          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-copper/10 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-copper" />
              <p className="font-body font-semibold text-xs uppercase tracking-widest text-copper">Book a Demo</p>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-extrabold tracking-tight text-ink mb-4">
              Tell us about your agency.
            </h1>
            <p className="font-body text-smoke mb-16">We respond within one business day.</p>
          </AnimatedSection>

          {fsState.succeeded ? (
            <AnimatedSection>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-parchment rounded-2xl p-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                  className="w-16 h-16 rounded-full bg-copper mx-auto mb-6 flex items-center justify-center"
                >
                  <span className="text-chalk text-2xl font-bold">✓</span>
                </motion.div>
                <h2 className="font-display text-2xl font-bold text-ink mb-3">Message sent.</h2>
                <p className="font-body text-smoke leading-relaxed">
                  Thanks — we'll be in touch within one business day.
                </p>
              </motion.div>
            </AnimatedSection>
          ) : (
            <AnimatedSection delay={0.1}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-10" noValidate>

                <div>
                  <label className={labelClass}>Your Name</label>
                  <input
                    {...register('name', {
                      required: 'Name is required',
                      minLength: { value: 2, message: 'At least 2 characters' },
                    })}
                    placeholder="Jane Murphy"
                    className={inputClass}
                  />
                  <FieldError message={errors.name?.message} />
                </div>

                <div>
                  <label className={labelClass}>Agency Name</label>
                  <input
                    {...register('brandName', {
                      required: 'Agency name is required',
                      minLength: { value: 2, message: 'At least 2 characters' },
                    })}
                    placeholder="Your agency"
                    className={inputClass}
                  />
                  <FieldError message={errors.brandName?.message} />
                </div>

                <div>
                  <label className={labelClass}>Email Address</label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Enter a valid email address',
                      },
                    })}
                    type="email"
                    placeholder="jane@yourbrand.ie"
                    className={inputClass}
                  />
                  <FieldError message={errors.email?.message} />
                </div>

                <div>
                  <label className={labelClass}>Tell us about your agency</label>
                  <textarea
                    {...register('message', {
                      required: 'A message is required',
                      minLength: { value: 20, message: 'Please tell us a bit more (20+ characters)' },
                    })}
                    rows={5}
                    placeholder="The roles you recruit for, how many CVs you handle per role, and how candidate submissions work today..."
                    className={`${inputClass} resize-none`}
                  />
                  <FieldError message={errors.message?.message} />
                </div>

                {fsState.errors?.length > 0 && (
                  <p className="text-sm text-red-500 font-body text-center">
                    Something went wrong. Please try again or email us at{' '}
                    <a href="mailto:hello@ovlo.ie" className="underline">hello@ovlo.ie</a>.
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={fsState.submitting}
                  whileHover={fsState.submitting ? {} : { scale: 1.02 }}
                  whileTap={fsState.submitting ? {} : { scale: 0.98 }}
                  className="w-full py-5 bg-copper text-chalk font-display font-bold text-sm uppercase tracking-wider rounded hover:bg-copper-dark transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {fsState.submitting ? 'Sending…' : 'Book a demo'}
                </motion.button>
              </form>
            </AnimatedSection>
          )}
        </div>
      </section>
    </motion.div>
  )
}
