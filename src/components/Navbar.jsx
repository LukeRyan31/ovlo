import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-chalk/95 backdrop-blur-sm shadow-sm border-b border-parchment'
          : 'bg-chalk/95 backdrop-blur-sm border-b border-parchment'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="font-display font-extrabold text-xl text-ink tracking-tight hover:text-copper transition-colors duration-200"
        >
          Ovlo
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`font-body text-sm font-medium transition-colors duration-200 pb-0.5 ${
                isActive(to)
                  ? 'text-copper border-b-2 border-copper'
                  : 'text-smoke hover:text-ink'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/contact"
            className={`ml-2 px-5 py-2.5 font-display font-bold text-xs uppercase tracking-wider rounded transition-all duration-200 ${
              isActive('/contact')
                ? 'bg-copper-dark text-chalk'
                : 'bg-copper text-chalk hover:bg-copper-dark hover:shadow-md'
            }`}
          >
            Let's Talk
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            className="block w-6 h-0.5 bg-ink rounded-full origin-center"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="block w-6 h-0.5 bg-ink rounded-full"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            className="block w-6 h-0.5 bg-ink rounded-full origin-center"
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-chalk border-b border-parchment"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`font-display font-bold text-2xl transition-colors ${
                    isActive(to) ? 'text-copper' : 'text-ink hover:text-copper'
                  }`}
                >
                  {label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="inline-block mt-2 px-6 py-3 bg-copper text-chalk font-display font-bold text-sm uppercase tracking-wider rounded w-fit hover:bg-copper-dark transition-colors"
              >
                Let's Talk
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
