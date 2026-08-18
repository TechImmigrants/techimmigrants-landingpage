import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { isAnchor, isExternal, scrollToAnchor } from "@/lib/nav";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const onHome = location.pathname === "/";

  const handleAnchorClick = (href: string, e: React.MouseEvent) => {
    if (onHome) {
      e.preventDefault();
      scrollToAnchor(href);
    }
    setIsOpen(false);
  };

  const renderItem = (item: { label: string; href: string }, className: string) => {
    if (isExternal(item.href)) {
      return (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsOpen(false)}
          className={className}
        >
          {item.label}
        </a>
      );
    }
    if (isAnchor(item.href)) {
      // On the homepage, smooth-scroll. Elsewhere, route home with a hash so the
      // /fa basename is respected (a bare <a href="/#..."> would escape the app).
      if (onHome) {
        return (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleAnchorClick(item.href, e)}
            className={className}
          >
            {item.label}
          </a>
        );
      }
      return (
        <Link
          key={item.label}
          to={{ pathname: "/", hash: item.href }}
          onClick={() => setIsOpen(false)}
          className={className}
        >
          {item.label}
        </Link>
      );
    }
    return (
      <Link key={item.label} to={item.href} onClick={() => setIsOpen(false)} className={className}>
        {item.label}
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 flex-row-reverse">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            {site.meta.name}
          </Link>

          <div className="hidden lg:flex items-center gap-5 flex-row-reverse">
            {site.nav.map((item) =>
              renderItem(
                item,
                "text-foreground/80 hover:text-primary transition-colors text-sm font-medium"
              )
            )}
            <Button size="sm" asChild className="transition-transform hover:scale-105">
              <a href={site.social.telegram} target="_blank" rel="noopener noreferrer">
                عضویت
              </a>
            </Button>
          </div>

          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="باز و بسته کردن منو"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-1">
              {site.nav.map((item) =>
                renderItem(
                  item,
                  "text-foreground/80 hover:text-primary hover:bg-accent rounded-md transition-colors text-sm font-medium py-2.5 px-3 text-right"
                )
              )}
              <Button size="sm" asChild className="mt-2">
                <a href={site.social.telegram} target="_blank" rel="noopener noreferrer">
                  عضویت در کامیونیتی
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
