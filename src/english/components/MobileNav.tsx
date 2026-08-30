import { Menu } from "lucide-react";
import type { MouseEvent } from "react";
import { pageNavigation, type NavItem } from "../content/navigation";

function close(event: MouseEvent<HTMLAnchorElement>) {
  event.currentTarget.closest("details")?.removeAttribute("open");
}

interface MobileNavProps {
  ariaLabel?: string;
  items?: readonly NavItem[];
  menuLabel?: string;
}

export function MobileNav({
  ariaLabel = "Mobile navigation",
  items = pageNavigation,
  menuLabel = "Navigation menu",
}: MobileNavProps) {
  return (
    <details className="ti-mobile-nav">
      <summary aria-label={menuLabel}>
        <Menu aria-hidden="true" />
      </summary>
      <nav className="ti-mobile-nav__panel ti-liquid-glass" aria-label={ariaLabel}>
        {items.map((item) => (
          <a key={item.href} href={item.href} onClick={close}>
            {item.label}
          </a>
        ))}
      </nav>
    </details>
  );
}
