import React, { useState, useEffect } from 'react'

const GithubSection = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.github.com/orgs/TechImmigrants/repos?per_page=100&sort=stars&direction=desc");
        if (!response.ok) throw new Error('Failed to fetch repos');
        const data = await response.json();
        const top4Repos = data.slice(0, 4);
        setRepos(top4Repos);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Language colors matching the design system
  const getLanguageColor = (language) => {
    const colors = {
      TypeScript: '#3178C6',
      JavaScript: '#F7DF1E',
      Python: '#3776AB',
      HTML: '#E34F26',
      CSS: '#1572B6',
      default: 'hsl(var(--muted))'
    };
    return colors[language] || colors.default;
  };

  if (loading) {
    return (
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Build with us on GitHub</h2>
            <p className="text-muted-foreground">Loading repositories...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Build with us on GitHub</h2>
            <p className="text-destructive">Unable to load repositories. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="max-w-2xl mx-auto text-3xl md:text-5xl font-bold mb-4 text-foreground ">
            در ساخت پروژه‌های متن‌باز ما مشارکت کنید
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join our community of developers building transparent, collaborative, and freely accessible technology. 
            Every contribution from code to documentation helps make open source stronger for everyone.
          </p>
        </div>

        {/* Contribution Guide Callout */}
        <div className="bg-primary/5 border-l-4 border-primary rounded-r-lg p-6 mb-12">
          <p className="text-foreground/80 font-medium">
            💡 <strong className="text-primary">New to open source?</strong> Check the "good first issue" or "help wanted" labels in each repository 
            for beginner-friendly tasks. Every contribution matters!
          </p>
        </div>

        {/* Repository Cards Grid - 4 repos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {repos.map((repo) => (
            <div 
              key={repo.id} 
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Repo Name */}
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
              
              {/* Short Description */}
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
                {repo.description || 'No description provided'}
              </p>
              
              {/* Language Badge & Stats */}
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
                    ⭐ {repo.stargazers_count.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    🍴 {repo.forks_count.toLocaleString()}
                  </span>
                </div>
              </div>
              
              {/* Contribute Button */}
              <a 
                href={`${repo.html_url}/issues`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block w-full text-center bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                🤝 Contribute Now
              </a>
            </div>
          ))}
        </div>

        {/* Call to Action Footer */}
        <div className="text-center pt-8 border-t border-border">
          <a 
            href="https://github.com/TechImmigrants" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-3 rounded-lg text-lg font-semibold hover:bg-secondary/90 transition-colors shadow-md"
          >
            <span>⭐</span> Follow us on GitHub
          </a>
          <p className="text-sm text-muted-foreground mt-4">
            📖 Check each repo's <code className="bg-muted/20 px-1 py-0.5 rounded text-md">CONTRIBUTING.md</code> for detailed contribution guidelines
          </p>
        </div>
      </div>
    </section>
  )
}

export default GithubSection