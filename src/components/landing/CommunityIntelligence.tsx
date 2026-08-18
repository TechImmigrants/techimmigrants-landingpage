import { ShieldCheck, Lightbulb, BarChart3 } from "lucide-react";
import { site } from "@/config/site";
import { SectionHeader } from "./SectionHeader";
import { CtaLink } from "@/components/CtaLink";

export function CommunityIntelligence() {
  const ci = site.communityIntelligence;

  return (
    <section
      id="community-intelligence"
      className="py-16 bg-gradient-to-b from-primary/5 to-background"
    >
      <div className="container mx-auto px-4">
        <SectionHeader title={ci.title} subtitle={ci.lead} />

        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
            <BarChart3 className="h-4 w-4 text-primary" />
            <span>بازه: {ci.range}</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {ci.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card rounded-xl p-5 border border-border text-center"
              >
                <div className="text-xl md:text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-start gap-3 bg-card rounded-xl p-5 border border-border">
              <Lightbulb className="h-6 w-6 text-primary shrink-0 mt-0.5" />
              <p className="text-foreground/90 leading-relaxed">{ci.insight}</p>
            </div>
            <div className="flex items-start gap-3 bg-primary/5 rounded-xl p-5 border border-primary/20">
              <ShieldCheck className="h-6 w-6 text-primary shrink-0 mt-0.5" />
              <p className="text-foreground/90 leading-relaxed">{ci.privacyNote}</p>
            </div>
          </div>

          <div className="text-center">
            {ci.reportReady ? (
              <CtaLink href={ci.ctaHref} size="lg">
                {ci.ctaLabel}
              </CtaLink>
            ) : (
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted/40 px-4 py-2 rounded-full border border-border">
                {ci.ctaReadyLabel}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
