import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'

const navItems = [
  { to: '/',         label: 'Home' },
  { to: '/services', label: 'How It Works' },
  { to: '/about',    label: 'About' },
]

const allItems = [...navItems, { to: '/contact', label: 'Book Demo' }]

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const getActive = (pathname) => {
    const match = navItems.find(({ to }) =>
      to === '/' ? pathname === '/' : pathname.startsWith(to)
    )
    return match ? match.label : navItems[0].label
  }
  const [activeTab, setActiveTab] = useState(() => getActive(location.pathname))

  useEffect(() => { setActiveTab(getActive(location.pathname)) }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-copper origin-left z-[9999] pointer-events-none"
      />

      <header className={`sticky top-0 z-50 transition-all duration-300 bg-chalk/95 backdrop-blur-sm border-b border-parchment ${
        scrolled ? 'shadow-sm' : ''
      }`}>
        <nav className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-2 relative">

          {/* Logo */}
          <Link
            to="/"
            className="font-display font-extrabold text-xl text-ink tracking-tight hover:text-copper transition-colors duration-200 flex-shrink-0"
          >
            Ovlo
          </Link>

          {/* ── Desktop pill ── */}
          <div className="hidden md:flex items-center gap-1 bg-ink/5 border border-ink/8 backdrop-blur-sm py-1 px-1 rounded-full">
            {navItems.map((item) => {
              const isActive = activeTab === item.label
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setActiveTab(item.label)}
                  className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 select-none ${
                    isActive ? 'text-copper' : 'text-smoke hover:text-ink'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="tubelight"
                      className="absolute inset-0 bg-copper/8 rounded-full -z-10"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-copper rounded-t-full">
                        <div className="absolute w-12 h-6 bg-copper/20 rounded-full blur-md -top-2 -left-2" />
                        <div className="absolute w-8  h-6 bg-copper/20 rounded-full blur-md -top-1" />
                        <div className="absolute w-4  h-4 bg-copper/20 rounded-full blur-sm top-0 left-2" />
                      </div>
                    </motion.div>
                  )}
                </Link>
              )
            })}
          </div>

          {/* ── Mobile pill (centred in header) ── */}
          <div className="flex md:hidden items-center gap-0.5 bg-ink/5 border border-ink/8 py-0.5 px-0.5 rounded-full absolute left-1/2 -translate-x-1/2">
            {allItems.map((item) => {
              const isActive = item.to === '/contact'
                ? location.pathname === '/contact'
                : activeTab === item.label
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => item.to !== '/contact' && setActiveTab(item.label)}
                  className={`relative px-2.5 py-1.5 rounded-full transition-colors duration-200 ${
                    isActive ? 'text-copper' : 'text-smoke hover:text-ink'
                  }`}
                >
                  <span className="font-display font-semibold text-[10px] uppercase tracking-wide whitespace-nowrap">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="tubelight-mobile"
                      className="absolute inset-0 bg-copper/8 rounded-full -z-10"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-copper rounded-t-full">
                        <div className="absolute w-8 h-4 bg-copper/20 rounded-full blur-md -top-2 -left-1.5" />
                        <div className="absolute w-5 h-4 bg-copper/20 rounded-full blur-md -top-1" />
                      </div>
                    </motion.div>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <Link
            to="/contact"
            className={`hidden md:inline-block px-5 py-2.5 font-display font-bold text-xs uppercase tracking-wider rounded transition-all duration-200 ${
              location.pathname === '/contact'
                ? 'bg-copper-dark text-chalk'
                : 'bg-copper text-chalk hover:bg-copper-dark hover:shadow-md'
            }`}
          >
            Book a Demo
          </Link>

        </nav>
      </header>
    </>
  )
}
