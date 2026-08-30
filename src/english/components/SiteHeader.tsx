import { BrandMark } from "./BrandMark";
import type { BrandMarkProps } from "./BrandMark";
import { LanguageSwitch } from "./LanguageSwitch";
import { MobileNav } from "./MobileNav";
import { SiteNav } from "./SiteNav";
import type { NavItem } from "../content/navigation";
import { cx } from "../lib/cx";

interface SiteHeaderProps {
  ariaLabel?: string;
  brand?: BrandMarkProps;
  className?: string;
  direction?: "ltr" | "rtl";
  language?: {
    direction: "ltr" | "rtl";
    hint?: string | null;
    href: string;
    label: string;
    locale: string;
  };
  locale?: string;
  mobileMenuLabel?: string;
  navigation?: readonly NavItem[];
  navigationLabel?: string;
}

export function SiteHeader({
  ariaLabel = "Site navigation",
  brand,
  className,
  direction,
  language,
  locale,
  mobileMenuLabel,
  navigation,
  navigationLabel,
}: SiteHeaderProps = {}) {
  return (
    <header
      className={cx("ti-header ti-liquid-glass", className)}
      aria-label={ariaLabel}
      dir={direction}
      lang={locale}
    >
      <BrandMark {...brand} />
      <SiteNav ariaLabel={navigationLabel} items={navigation} />
      <div className="ti-header__actions">
        <LanguageSwitch {...language} />
        <MobileNav
          ariaLabel={navigationLabel}
          items={navigation}
          menuLabel={mobileMenuLabel}
        />
      </div>
    </header>
  );
}
