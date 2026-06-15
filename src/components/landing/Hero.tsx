import { Users, Play, Handshake } from "lucide-react";
import { CtaLink } from "@/components/CtaLink";
import { site } from "@/config/site";

export function Hero() {
  const { hero } = site;

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-16 md:py-24"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            کامیونیتی فارسی‌زبان تکنولوژی
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
            {hero.headline}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-4 leading-loose">
            {hero.subheadline}
          </p>
          <p className="text-sm text-muted-foreground/80 mb-8" dir="ltr">
            {hero.taglineEn}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <CtaLink href={hero.primaryCta.href} size="lg" className="gap-2">
              <Users className="h-5 w-5" />
              {hero.primaryCta.label}
            </CtaLink>
            <CtaLink href={hero.secondaryCta.href} size="lg" variant="outline" className="gap-2">
              <Play className="h-5 w-5" />
              {hero.secondaryCta.label}
            </CtaLink>
            <CtaLink href={hero.tertiaryCta.href} size="lg" variant="ghost" className="gap-2">
              <Handshake className="h-5 w-5" />
              {hero.tertiaryCta.label}
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
