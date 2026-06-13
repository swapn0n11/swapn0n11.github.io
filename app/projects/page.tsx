import ProjectsClient from '@/components/projects/ProjectsClient'
import Link from 'next/link'

async function getRepos() {
  const res = await fetch('https://api.github.com/users/swapn0n11/repos?sort=updated&per_page=20', {
    next: { revalidate: 21600 } // ISR — 6 hours
  })
  if (!res.ok) return []
  return res.json()
}

export default async function Projects() {
  const repos = await getRepos()

  return (
    <main className="projects-main">
      <div className="projects-container">

        <Link href="/" className="back-link">
          <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
          back_home
        </Link>

        <div className="page-header">
          <div className="brand-row">
            <div className="ghost-dot" />
            <span className="brand-label">phantom_labss // projects</span>
          </div>
          <h1 className="page-title">
            My <span>Projects</span>
          </h1>
          <p className="page-subtitle">
            // {repos.length} repositories fetched live from GitHub
          </p>
        </div>

        <ProjectsClient repos={repos} />

      </div>
    </main>
  )
}