import { Link } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-graphite text-chalk">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          <div>
            <p className="font-display font-extrabold text-2xl text-chalk mb-3">Ovlo</p>
            <p className="font-body text-sm text-parchment/60 leading-relaxed mb-6">
              Brand scaling for Irish wellness.
            </p>
            <p className="font-body text-xs text-smoke">
              © 2025 Ovlo. All rights reserved.
            </p>
          </div>

          <div>
            <p className="font-body text-xs uppercase tracking-widest text-smoke mb-5">
              Navigate
            </p>
            <ul className="space-y-3">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="font-body text-sm text-parchment/70 hover:text-copper transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-xs uppercase tracking-widest text-smoke mb-5">
              Get in touch
            </p>
            <a
              href="mailto:hello@ovlo.ie"
              className="font-body text-sm text-copper hover:text-copper-light transition-colors duration-200"
            >
              hello@ovlo.ie
            </a>
            <p className="font-body text-xs text-parchment/40 mt-4">
              🇮🇪 Based in Ireland
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="font-body text-xs text-smoke">
            Built for brands that mean it.
          </p>
        </div>
      </div>
    </footer>
  )
}
