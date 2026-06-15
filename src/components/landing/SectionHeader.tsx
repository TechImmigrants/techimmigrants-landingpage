interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "center" | "start";
}

export function SectionHeader({ title, subtitle, align = "center" }: SectionHeaderProps) {
  return (
    <div className={align === "center" ? "text-center mb-12 max-w-3xl mx-auto" : "mb-12 max-w-3xl"}>
      <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">{title}</h2>
      {subtitle && <p className="text-muted-foreground leading-relaxed">{subtitle}</p>}
    </div>
  );
}
