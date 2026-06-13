'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav>
      <div className="nav-inner">
        <Link href="/" className="nav-brand">
          <div className="nav-logo">
            <svg viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
          </div>
          <span className="nav-name">Swapnonil Nandi</span>
        </Link>
        <div className="nav-links">
          <Link href="/projects" className={`nav-link ${pathname === '/projects' ? 'active' : ''}`}>Projects</Link>
          <Link href="/mail" className={`nav-link ${pathname === '/mail' ? 'active' : ''}`}>Contact</Link>
          <Link href="/card" className={`nav-link ${pathname === '/card' ? 'active' : ''}`}>Card</Link>
        </div>
      </div>
    </nav>
  )
}