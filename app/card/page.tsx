'use client'

import { useState } from 'react'

type SavePhase = 'idle' | 'flip' | 'compress' | 'fly' | 'done'

export default function Card() {
  const [phase, setPhase] = useState<SavePhase>('idle')

  async function saveContact() {
    if (phase !== 'idle') return

    // Phase 1 — 3D flip + glow
    setPhase('flip')
    await delay(600)

    // Phase 2 — compress into vCard icon
    setPhase('compress')
    await delay(400)

    // Phase 3 — fly down
    setPhase('fly')

    // Trigger actual download mid-animation
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Swapnonil Nandi
N:Nandi;Swapnonil;;;
ORG:Phantom Labss
TITLE:Founder
EMAIL;TYPE=INTERNET:contact@swapnonil.me
URL:https://swapnonil.me
X-SOCIALPROFILE;type=github:https://github.com/swapn0n11
X-SOCIALPROFILE;type=linkedin:https://linkedin.com/in/swapnon11
NOTE:Because people need <Privacy>
END:VCARD`

    const blob = new Blob([vcard], { type: 'text/vcard' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'swapnonil-nandi.vcf'
    a.click()
    URL.revokeObjectURL(url)

    await delay(600)

    // Phase 4 — done, reset
    setPhase('done')
    await delay(800)
    setPhase('idle')
  }

  return (
    <main className="card-main">
      <div className="card-page-container">

        <div className="brand-mark">
          <div className="ghost-dot" />
          <span>phantom_labss</span>
        </div>

        {/* Card wrapper — animates on save */}
        <div className={`biz-card-wrap
          ${phase === 'flip' ? 'card-flip' : ''}
          ${phase === 'compress' ? 'card-compress' : ''}
          ${phase === 'fly' ? 'card-fly' : ''}
          ${phase === 'done' ? 'card-done' : ''}
        `}>
          <div className="biz-card">
            <div className="dot-grid">
              {Array.from({length: 16}).map((_, i) => <span key={i} />)}
            </div>

            <div className="card-header-block">
              <div className="org">phantom_labss // founder</div>
              <div className="biz-name">Swapnonil<br/>Nandi</div>
              <div className="role-line">
                <span className="role">Software Developer</span>
                <div className="role-divider" />
              </div>
              <div className="status-badge">
                <div className="status-dot" />
                Available for Hire
              </div>
            </div>

            <div className="card-divider" />

            <div className="contacts">
              <a href="mailto:contact@swapnonil.me" className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </div>
                <div className="contact-text">
                  <span className="contact-label">Email</span>
                  <span className="contact-value">contact@swapnonil.me</span>
                </div>
              </a>

              <a href="https://swapnonil.me" target="_blank" rel="noopener" className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                </div>
                <div className="contact-text">
                  <span className="contact-label">Website</span>
                  <span className="contact-value">swapnonil.me</span>
                </div>
              </a>

              <a href="https://github.com/swapn0n11" target="_blank" rel="noopener" className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
                </div>
                <div className="contact-text">
                  <span className="contact-label">GitHub</span>
                  <span className="contact-value">swapn0n11</span>
                </div>
              </a>
            </div>

            {/* vCard icon overlay — visible during compress/fly */}
            <div className={`vcard-overlay ${phase === 'compress' || phase === 'fly' ? 'visible' : ''}`}>
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="16" rx="3" stroke="var(--accent2)" strokeWidth="1.5"/>
                <circle cx="9" cy="10" r="2" stroke="var(--accent2)" strokeWidth="1.2"/>
                <path d="M5 17c0-2 1.8-3 4-3s4 1 4 3" stroke="var(--accent2)" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M15 9h3M15 12h2" stroke="var(--accent3)" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span>.vcf</span>
            </div>
          </div>
        </div>

        <button
          className={`save-btn ${phase === 'done' ? 'saved' : ''}`}
          onClick={saveContact}
          disabled={phase !== 'idle'}
        >
          {phase === 'done' ? '✓  Contact Saved' : '↓  Save Contact'}
        </button>

        <div className="card-social-row">
          <a href="https://github.com/swapn0n11" target="_blank" rel="noopener" className="card-social-btn">GitHub</a>
          <a href="https://linkedin.com/in/swapnon11" target="_blank" rel="noopener" className="card-social-btn">LinkedIn</a>
          <a href="https://x.com/swapn_n11" target="_blank" rel="noopener" className="card-social-btn">X / Twitter</a>
          <a href="https://linktr.ee/swapn0n11" target="_blank" rel="noopener" className="card-social-btn">Linktree</a>
        </div>

      </div>
    </main>
  )
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}