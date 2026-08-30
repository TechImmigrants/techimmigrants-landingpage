import { pageNavigation, type NavItem } from "../content/navigation";

interface SiteNavProps {
  ariaLabel?: string;
  items?: readonly NavItem[];
}

export function SiteNav({ ariaLabel = "Page sections", items = pageNavigation }: SiteNavProps) {
  return (
    <nav className="ti-nav" aria-label={ariaLabel}>
      {items.map((item) => (
        <a key={item.href} href={item.href}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}
