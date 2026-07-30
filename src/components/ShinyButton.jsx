import { Link } from 'react-router-dom'
import './ShinyButton.css'

/**
 * ShinyButton — animated rotating-border CTA in Ovlo's copper palette.
 *
 * Usage:
 *   <ShinyButton to="/contact">Let's Talk</ShinyButton>   ← router link
 *   <ShinyButton onClick={fn}>Submit</ShinyButton>         ← plain button
 */
export default function ShinyButton({ children, to, onClick, className = '' }) {
  const cls = `shiny-cta ${className}`

  if (to) {
    return (
      <Link to={to} className={cls}>
        <span>{children}</span>
      </Link>
    )
  }

  return (
    <button className={cls} onClick={onClick}>
      <span>{children}</span>
    </button>
  )
}
