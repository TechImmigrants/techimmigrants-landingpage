import { useState, useEffect } from 'react'
import { Star, GitFork, Handshake, BookOpen, RefreshCw } from 'lucide-react'

type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}
const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 1,
    name: "cv-builder",
    html_url: "https://github.com/TechImmigrants/cv-builder",
    description: "AI-powered CV builder for tech professionals. Paste a job description, get a tailored resume.",
    language: "TypeScript",
    stargazers_count: 44,
    forks_count: 11
  },
  {
    id: 2,
    name: "awesome-tech-immigration",
    html_url: "https://github.com/TechImmigrants/awesome-tech-immigration",
    description: "Curated resources for tech immigration — resumes, interview prep, visa guides, and job boards.",
    language: null,
    stargazers_count: 44,
    forks_count: 0
  },
  {
    id: 3,
    name: "techimmigrants-landingpage",
    html_url: "https://github.com/TechImmigrants/techimmigrants-landingpage",
    description: "Tech Immigrants website — where tech careers cross borders.",
    language: "TypeScript",
    stargazers_count: 33,
    forks_count: 11
  }
];

const CACHE_KEY = 'github_repos_cache';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const GithubSection = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const fetchData = async (retriesLeft = MAX_RETRIES) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch("https://api.github.com/orgs/TechImmigrants/repos?per_page=100&sort=stars&direction=desc");
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      const data: GitHubRepo[] = await response.json();
      const top4Repos = data.slice(0, 4);
      setRepos(top4Repos);
      
      // Cache the data
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data: top4Repos,
        timestamp: Date.now()
      }));
      
      setLoading(false);
      setRetryCount(0);
      
    } catch (err) {
      if (retriesLeft > 0) {
        // Retry with exponential backoff
        const delay = RETRY_DELAY * (MAX_RETRIES - retriesLeft + 1);
        setRetryCount(prev => prev + 1);
        await sleep(delay);
        return fetchData(retriesLeft - 1);
      }
      
      // Try to use cached data even if expired
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data } = JSON.parse(cached);
        if (data && data.length > 0) {
          setRepos(data);
          setError(null);
          setLoading(false);
          return;
        }
      }
      
      // Use static fallback as last resort
      setRepos(FALLBACK_REPOS);
      setError(err instanceof Error ? err.message : 'Failed to fetch repos');
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check cache first
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL && data.length > 0) {
        setRepos(data);
        setLoading(false);
        return;
      }
    }
    
    fetchData();
  }, []);

  const getLanguageColor = (language: string | null) => {
    const colors: Record<string, string> = {
      TypeScript: '#3178C6',
      JavaScript: '#F7DF1E',
      Python: '#3776AB',
      HTML: '#E34F26',
      CSS: '#1572B6',
      default: 'hsl(var(--muted))'
    };
    return colors[language || ''] || colors.default;
  };

  if (loading) {
    return (
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">Build with us on GitHub</h2>
            <p className="text-muted-foreground">
              {retryCount > 0 ? `Retrying... (${retryCount}/${MAX_RETRIES})` : 'Loading repositories...'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">

        <div className="text-center mb-12">
          <h2 className="max-w-2xl mx-auto text-3xl md:text-5xl font-bold mb-4 text-foreground">
            Build with us on GitHub
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join our community of developers building transparent, collaborative, and freely accessible technology. 
            Every contribution from code to documentation helps make open source stronger for everyone.
          </p>
        </div>

        <div className="bg-primary/5 border-l-4 border-primary rounded-r-lg p-6 mb-12">
          <p className="text-foreground/80 font-medium">
            <strong className="text-primary">New to open source?</strong> Check the "good first issue" or "help wanted" labels in each repository 
            for beginner-friendly tasks. Every contribution matters!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {repos.map((repo) => (
            <div 
              key={repo.id} 
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="text-xl font-bold mb-2">
                <a 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  {repo.name}
                </a>
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
                {repo.description || 'No description provided'}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                {repo.language && (
                  <div className="flex items-center gap-2">
                    <span 
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: getLanguageColor(repo.language) }}
                    />
                    <span className="text-sm font-medium text-foreground/70">
                      {repo.language}
                    </span>
                  </div>
                )}
                
                <div className="flex gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star size={14} /> {repo.stargazers_count.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork size={14} /> {repo.forks_count.toLocaleString()}
                  </span>
                </div>
              </div>
              
              <a 
                href={`${repo.html_url}/issues`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full text-center bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                <Handshake size={16} /> Contribute Now
              </a>
            </div>
          ))}
        </div>

        <div className="text-center pt-8 border-t border-border">
          <a 
            href="https://github.com/TechImmigrants" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-8 py-3 rounded-lg text-lg font-semibold hover:bg-secondary/90 transition-colors shadow-md"
          >
            <Star size={18} /> Follow us on GitHub
          </a>
          <p className="text-sm text-muted-foreground mt-4">
            <BookOpen size={14} className="inline mr-1" /> Check each repo's <code className="bg-muted/20 px-1 py-0.5 rounded text-md">CONTRIBUTING.md</code> for detailed contribution guidelines
          </p>
        </div>
      </div>
    </section>
  )
}

export default GithubSection