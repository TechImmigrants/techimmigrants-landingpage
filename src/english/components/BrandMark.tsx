import { brand } from "../content/site";

export interface BrandMarkProps {
  href?: string;
  hint?: string;
  label?: string;
  name?: string;
}

export function BrandMark({
  href = "#top",
  hint = brand.tagline,
  label,
  name = brand.name,
}: BrandMarkProps) {
  return (
    <a className="ti-brand" href={href} aria-label={label ?? `${name}, back to the top`}>
      <img className="ti-brand__mark" src={brand.logo} alt="" width={40} height={40} />
      <span className="ti-brand__copy">
        <strong>{name}</strong>
        <small>{hint}</small>
      </span>
    </a>
  );
}
