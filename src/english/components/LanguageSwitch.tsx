import { ArrowUpRight } from "lucide-react";
import { brand, siteLinks } from "../content/site";

interface LanguageSwitchProps {
  direction?: "ltr" | "rtl";
  hint?: string | null;
  href?: string;
  label?: string;
  locale?: string;
}

export function LanguageSwitch({
  direction = "rtl",
  hint = brand.persianHint,
  href = siteLinks.persian,
  label = brand.persianLabel,
  locale = "fa",
}: LanguageSwitchProps) {
  return (
    <a className="ti-language" href={href}>
      <span lang={locale} dir={direction}>
        {label}
      </span>
      {hint ? <small>{hint}</small> : null}
      <ArrowUpRight aria-hidden="true" />
    </a>
  );
}
