import { Heart, Check } from "lucide-react";
import { site } from "@/config/site";
import { CtaLink } from "@/components/CtaLink";

export function SupportMission() {
  const { support } = site;

  return (
    <section id="support" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <Heart className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{support.title}</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">{support.lead}</p>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {support.funds.map((fund) => (
              <span
                key={fund}
                className="inline-flex items-center gap-1.5 text-sm bg-card border border-border rounded-full px-3 py-1.5 text-foreground/80"
              >
                <Check className="h-3.5 w-3.5 text-primary" />
                {fund}
              </span>
            ))}
          </div>

          <CtaLink href={support.cta.href} size="lg" className="gap-2">
            <Heart className="h-5 w-5" />
            {support.cta.label}
          </CtaLink>

          <p className="text-sm text-muted-foreground mt-5">{support.note}</p>
        </div>
      </div>
    </section>
  );
}
