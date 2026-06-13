interface Repo {
    name: string
    description: string | null
    html_url: string
    language: string | null
    stargazers_count: number
    forks_count: number
    updated_at: string
    topics: string[]
  }
  
  const langColors: Record<string, string> = {
    JavaScript: '#f7df1e',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Rust: '#dea584',
    Go: '#00ADD8',
  }
  
  export default function RepoCard({ repo }: { repo: Repo }) {
    const updated = new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  
    return (
      <a href={repo.html_url} target="_blank" rel="noopener" className="repo-card">
        <div className="repo-card-header">
          <div className="repo-icon">
            <svg viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
          </div>
          <span className="repo-updated">{updated}</span>
        </div>
  
        <div className="repo-name">{repo.name}</div>
        <p className="repo-desc">{repo.description || 'No description provided.'}</p>
  
        {repo.topics?.length > 0 && (
          <div className="repo-topics">
            {repo.topics.slice(0, 3).map(t => (
              <span key={t} className="repo-topic">{t}</span>
            ))}
          </div>
        )}
  
        <div className="repo-footer">
          {repo.language && (
            <div className="repo-lang">
              <span className="lang-dot" style={{ background: langColors[repo.language] ?? '#64748b' }} />
              {repo.language}
            </div>
          )}
          <div className="repo-stats">
            <span>★ {repo.stargazers_count}</span>
            <span>⑂ {repo.forks_count}</span>
          </div>
        </div>
      </a>
    )
  }