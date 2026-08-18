import { site } from "@/config/site";
import { SectionHeader } from "./SectionHeader";

export function TrustStats() {
  const { trust } = site;

  return (
    <section id="trust" className="py-16 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <SectionHeader title={trust.title} subtitle={trust.subtitle} />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {trust.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-background rounded-xl p-6 border border-border text-center hover:shadow-md transition-shadow"
            >
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              {stat.hint && (
                <div className="text-xs text-muted-foreground/70 mt-1">{stat.hint}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
