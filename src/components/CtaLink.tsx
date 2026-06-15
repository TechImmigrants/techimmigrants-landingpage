import { Button, type ButtonProps } from "@/components/ui/button";
import { isAnchor, isExternal, scrollToAnchor } from "@/lib/nav";
import { Link } from "react-router-dom";

interface CtaLinkProps extends Omit<ButtonProps, "asChild"> {
  href: string;
  children: React.ReactNode;
  onNavigate?: () => void;
}

/**
 * A Button that resolves its target intelligently:
 * - "#anchor"      -> smooth scroll on the current page
 * - "http(s)://..."-> external link (new tab)
 * - "/route"       -> client-side route
 */
export function CtaLink({ href, children, onNavigate, ...props }: CtaLinkProps) {
  if (isAnchor(href)) {
    return (
      <Button
        {...props}
        asChild
      >
        <a
          href={href}
          onClick={(e) => {
            e.preventDefault();
            scrollToAnchor(href);
            onNavigate?.();
          }}
        >
          {children}
        </a>
      </Button>
    );
  }

  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <Button {...props} asChild>
        <a href={href} onClick={onNavigate}>
          {children}
        </a>
      </Button>
    );
  }

  if (isExternal(href)) {
    return (
      <Button {...props} asChild>
        <a href={href} target="_blank" rel="noopener noreferrer" onClick={onNavigate}>
          {children}
        </a>
      </Button>
    );
  }

  return (
    <Button {...props} asChild>
      <Link to={href} onClick={onNavigate}>
        {children}
      </Link>
    </Button>
  );
}
