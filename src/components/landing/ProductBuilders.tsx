import { Rocket, Play, Handshake } from "lucide-react";
import { site } from "@/config/site";
import { CtaLink } from "@/components/CtaLink";

export function ProductBuilders() {
  const pb = site.productBuilders;

  return (
    <section id="product-builders" className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Rocket className="h-8 w-8 text-primary" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground">{pb.title}</h2>
            <span className="text-xs bg-amber-500/15 text-amber-600 dark:text-amber-400 px-2 py-1 rounded-full font-medium">
              {pb.badge}
            </span>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">{pb.description}</p>
          <p className="text-sm text-muted-foreground/80 mb-8">{pb.note}</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <CtaLink href={pb.primaryCta.href} size="lg" className="gap-2">
              <Rocket className="h-5 w-5" />
              {pb.primaryCta.label}
            </CtaLink>
            <CtaLink href={pb.secondaryCta.href} size="lg" variant="outline" className="gap-2">
              <Play className="h-5 w-5" />
              {pb.secondaryCta.label}
            </CtaLink>
            <CtaLink href={pb.tertiaryCta.href} size="lg" variant="ghost" className="gap-2">
              <Handshake className="h-5 w-5" />
              {pb.tertiaryCta.label}
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
