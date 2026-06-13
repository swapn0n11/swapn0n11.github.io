'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

type Phase = 'idle' | 'flying' | 'envelope' | 'wobble' | 'sending' | 'tick' | 'done'

export default function Mail() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (phase !== 'idle') return

    const form = formRef.current!
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    // Phase 1 — plane flies out
    setPhase('flying')
    await delay(420)

    // Phase 2 — envelope slides in
    setPhase('envelope')
    await delay(450)

    // Phase 3 — wobble
    setPhase('wobble')
    await delay(1050)

    // Phase 4 — envelope flies out, send request
    setPhase('sending')
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    await delay(340)

    // Phase 5 — tick
    setPhase('tick')
    setStatus(res.ok ? 'success' : 'error')
    await delay(2500)

    // Reset
    setPhase('done')
    await delay(350)
    setPhase('idle')
    if (res.ok) form.reset()
  }

  return (
    <main className="mail-main">
      <div className="mail-container">

        <Link href="/" className="back-link">
          <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg>
          back_home
        </Link>

        <div className="page-header">
          <div className="brand-row">
            <div className="ghost-dot" />
            <span className="brand-label">phantom_labss // contact</span>
          </div>
          <h1 className="page-title">
            Mail <span>Me</span>
          </h1>
          <p className="page-subtitle">// drop a message. i read everything.</p>
        </div>

        <div className="mail-grid">

          {/* Left — form */}
          <div className="panel">
            <div className="panel-title">Send Message</div>
            <div className="panel-sub">// direct_mail → contact@swapnonil.me</div>

            <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="your@email.com" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input id="subject" name="subject" type="text" placeholder="What's this about?" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" placeholder="What's on your mind?" rows={5} required />
              </div>

              {/* Honeypot */}
              <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />

              <button type="submit" className={`submit-btn ${phase !== 'idle' && phase !== 'done' ? 'animating' : ''}`} disabled={phase !== 'idle' && phase !== 'done'}>
                <div className="btn-icon-wrap">
                  {/* Plane — visible by default */}
                  <span className={`btn-icon btn-plane ${phase === 'flying' ? 'fly-out' : ''}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                  </span>

                  {/* Envelope */}
                  <span className={`btn-icon btn-envelope
    ${phase === 'envelope' ? 'env-in' : ''}
    ${phase === 'wobble' ? 'env-wobble' : ''}
    ${phase === 'sending' ? 'env-out' : ''}
  `}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                  </span>

                  {/* Tick */}
                  <span className={`btn-icon btn-tick ${phase === 'tick' ? 'tick-in' : ''}`}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <circle cx="11" cy="11" r="10" fill="rgba(74,222,128,0.18)" stroke="#4ade80" strokeWidth="1.5" />
                      <polyline
                        className={`tick-path ${phase === 'tick' ? 'draw' : ''}`}
                        points="6,11 9.5,14.5 16,8"
                        fill="none" stroke="#4ade80" strokeWidth="2.2"
                        strokeLinecap="round" strokeLinejoin="round"
                        strokeDasharray="40" strokeDashoffset="40"
                      />
                    </svg>
                  </span>
                </div>

                <span className={`btn-label
  ${phase === 'flying' ? 'fade-out' : ''}
  ${phase === 'tick' || phase === 'done' ? (status === 'success' ? 'label-success' : 'label-error') : ''}
`}>
                  {phase === 'tick' || phase === 'done'
                    ? status === 'success' ? 'Message Sent!' : 'Failed. Retry?'
                    : 'Send Message'}
                </span>
              </button>
            </form>
          </div>

          {/* Right — find me */}
          <div className="panel">
            <div className="panel-title">Find Me</div>
            <div className="panel-sub">// social_profiles + card</div>

            <div className="socials">
              {[
                { href: 'https://github.com/swapn0n11', name: 'GitHub', handle: 'github.com/swapn0n11', icon: <svg viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" /></svg> },
                { href: 'https://linkedin.com/in/swapnon11', name: 'LinkedIn', handle: 'linkedin.com/in/swapnon11', icon: <svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg> },
                { href: 'https://x.com/swapn_n11', name: 'Twitter / X', handle: 'x.com/swapn_n11', icon: <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.733-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
                { href: 'https://linktr.ee/swapn0n11', name: 'Linktree', handle: 'linktr.ee/swapn0n11', icon: <svg viewBox="0 0 24 24"><path d="M13.511 5.853l4.005-4.117 2.317 2.395-4.12 4.002h5.711v3.294h-5.695l4.12 4.003-2.317 2.394-4.005-4.017-4.004 4.017-2.318-2.394 4.12-4.003H2.576V8.133h5.71L4.19 4.131l2.318-2.395 4.004 4.117V.001h2.999v5.852zm-2.999 9.908h2.999v8.238h-2.999v-8.238z" /></svg> },
                { href: '/card', name: 'Share my Card', handle: 'swapnonil.me/card', icon: <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" /></svg> },
              ].map(({ href, name, handle, icon }) => (
                <a key={name} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener" className="social-link">
                  <div className="social-icon">{icon}</div>
                  <div className="social-text">
                    <span className="social-name">{name}</span>
                    <span className="social-handle">{handle}</span>
                  </div>
                  <svg className="social-arrow" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" /></svg>
                </a>
              ))}
            </div>

            <div className="mail-divider" />

            <div className="avail-badge">
              <div className="avail-label">// availability</div>
              <div className="avail-row">
                <div className="avail-dot-wrap">
                  <div className="avail-dot-ping" />
                  <div className="avail-dot" />
                </div>
                <span className="avail-text">Open for freelance & collaborations</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}