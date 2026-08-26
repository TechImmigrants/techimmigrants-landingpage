import { BrandMark } from "./BrandMark";
import { LanguageSwitch } from "./LanguageSwitch";
import { MobileNav } from "./MobileNav";
import { SiteNav } from "./SiteNav";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="ti-header" aria-label="Site navigation">
      <BrandMark />
      <SiteNav />
      <div className="ti-header__actions">
        <ThemeToggle />
        <LanguageSwitch />
        <MobileNav />
      </div>
    </header>
  );
}
