'use client'

import { useState } from 'react'
import RepoCard from '@/components/projects/RepoCard'

interface Repo {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  topics: string[]
}

export default function ProjectsClient({ repos }: { repos: Repo[] }) {
  const languages = ['All', ...Array.from(new Set(repos.map(r => r.language).filter(Boolean)))] as string[]
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? repos : repos.filter(r => r.language === active)

  return (
    <>
      <div className="filter-row">
        {languages.map(lang => (
          <button
            key={lang}
            className={`filter-btn ${active === lang ? 'active' : ''}`}
            onClick={() => setActive(lang)}
          >
            {lang}
          </button>
        ))}
      </div>
      <div className="repos-grid">
        {filtered.map(repo => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </>
  )
}