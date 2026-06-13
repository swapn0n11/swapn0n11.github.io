import Link from 'next/link'
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Home() {
  return (
    <section className="hero">

      {/* Floating stats card */}
      <div className="float-card">
        <div className="fc-dot-grid">
          {Array.from({ length: 12 }).map((_, i) => <span key={i} />)}
        </div>
        <div className="fc-header">
          <span className="fc-label">// status</span>
          <div className="fc-badge">
            <div className="fc-badge-dot" />
            online
          </div>
        </div>
        <div className="fc-stat">
          <div className="fc-stat-label">React / Next.js</div>
          <div className="fc-bar"><div className="fc-bar-fill" style={{ width: '90%', animationDelay: '1.2s' }} /></div>
        </div>
        <div className="fc-stat">
          <div className="fc-stat-label">Tailwind CSS</div>
          <div className="fc-bar"><div className="fc-bar-fill" style={{ width: '85%', animationDelay: '1.4s' }} /></div>
        </div>
        <div className="fc-stat">
          <div className="fc-stat-label">Python / Security</div>
          <div className="fc-bar"><div className="fc-bar-fill" style={{ width: '75%', animationDelay: '1.6s' }} /></div>
        </div>
        <div className="fc-divider" />
        <div className="fc-tags">
          <span className="fc-tag">Remote Ready</span>
          <span className="fc-tag">2+ Years</span>
          <span className="fc-tag">Phantom Labss</span>
          <span className="fc-tag">Open Source</span>
        </div>
      </div>

      <div className="hero-inner">

        <div className="brand-row">
          <div className="ghost-dot" />
          <span className="brand-label">phantom_labss // founder</span>
        </div>

        <h1 className="hero-name">
          Swapnonil
          <span className="last accent-word">Nandi</span>
        </h1>

        <div className="hero-role">
          <span className="role-text">Software Developer / Frontend Engineer</span>
          <div className="role-divider" />
        </div>

        <p className="hero-bio">
          Crafting <strong>immersive digital experiences</strong> through clean code and futuristic design.
          Specializing in high-performance frontend architectures and{' '}
          <strong>privacy-first</strong> glassmorphic interfaces that push the boundaries of the modern web.
        </p>

        <div className="chips">
          <div className="chip"><div className="chip-dot green" />Available for Hire</div>
          <div className="chip"><div className="chip-dot blue" />Remote Ready</div>
          <div className="chip"><div className="chip-dot purple" />React / Next.js</div>
          <div className="chip"><div className="chip-dot purple" />Tailwind CSS</div>
          <div className="chip"><div className="chip-dot" />2+ Years Exp.</div>
        </div>

        <div className="cta-row">
          <Link href="/projects" className="btn-primary">
            <svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" /></svg>
            View Work
          </Link>
          <Link href="/mail" className="btn-ghost">
            <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
            Contact Me
          </Link>
        </div>

        <div className="social-row">
          <span className="social-label">Find me</span>
          <a href="https://github.com/swapn0n11" target="_blank" rel="noopener" className="social-btn" title="GitHub">
            <svg viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" /></svg>
          </a>
          <a href="https://linkedin.com/in/swapnon11" target="_blank" rel="noopener" className="social-btn" title="LinkedIn">
            <svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
          </a>
          <a href="https://x.com/swapn_n11" target="_blank" rel="noopener" className="social-btn" title="X / Twitter">
            <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.733-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
          </a>
          <a href="https://linktr.ee/swapn0n11" target="_blank" rel="noopener" className="social-btn" title="Linktree">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M13.511 5.853l4.005-4.117 2.317 2.395-4.12 4.002h5.711v3.294h-5.695l4.12 4.003-2.317 2.394-4.005-4.017-4.004 4.017-2.318-2.394 4.12-4.003H2.576V8.133h5.71L4.19 4.131l2.318-2.395 4.004 4.117V.001h2.999v5.852zm-2.999 9.908h2.999v8.238h-2.999v-8.238z" /></svg>
          </a>
          <div className="social-divider" />
          <a href="mailto:lightforce1207@protonmail.com" className="mailto-link" title="Direct Email">
            <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
            alt email
          </a>
        </div>
        <SpeedInsights/>

      </div>
    </section>
  )
}

