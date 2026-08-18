import { Check, X, ShieldCheck, Handshake, Mail, FileDown } from "lucide-react";
import { site } from "@/config/site";
import { SectionHeader } from "./SectionHeader";
import { CtaLink } from "@/components/CtaLink";

interface PartnershipProps {
  /** When true, also renders the audience/stats/trust intro (used on /partners). */
  detailed?: boolean;
}

export function Partnership({ detailed = false }: PartnershipProps) {
  const p = site.partners;

  return (
    <section id="partners" className="py-16 bg-gradient-to-b from-card to-background">
      <div className="container mx-auto px-4">
        <SectionHeader title={p.title} subtitle={p.lead} />

        {detailed && (
          <div className="max-w-5xl mx-auto mb-12 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {site.trust.stats.slice(0, 4).map((stat) => (
              <div key={stat.label} className="bg-card rounded-xl p-5 border border-border text-center">
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Accepted vs not accepted */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="flex items-center gap-2 text-lg font-bold text-foreground mb-4">
              <span className="w-7 h-7 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Check className="h-4 w-4" />
              </span>
              {p.accepted.title}
            </h3>
            <ul className="space-y-2">
              {p.accepted.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground/90">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="flex items-center gap-2 text-lg font-bold text-foreground mb-4">
              <span className="w-7 h-7 rounded-full bg-destructive/15 text-destructive flex items-center justify-center">
                <X className="h-4 w-4" />
              </span>
              {p.rejected.title}
            </h3>
            <ul className="space-y-2">
              {p.rejected.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <X className="h-4 w-4 text-destructive/70 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Packages */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
          {p.packages.map((pkg) => (
            <div
              key={pkg.id}
              className="flex flex-col bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <h4 className="text-lg font-bold text-foreground mb-1">{pkg.name}</h4>
              <p className="text-sm text-muted-foreground mb-4">{pkg.goodFor}</p>
              <ul className="space-y-2 mb-4 flex-1">
                {pkg.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-2 text-sm text-foreground/90">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {inc}
                  </li>
                ))}
              </ul>
              <div className="text-primary font-bold">
                {p.showPrices ? pkg.price : "تماس بگیرید"}
              </div>
            </div>
          ))}
        </div>

        {/* Disclosure + CTAs */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-primary/5 border border-primary/20 rounded-lg px-4 py-3 mb-6">
            <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
            <span>{p.disclosure}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <CtaLink href={p.primaryCta.href} size="lg" className="gap-2">
              <Handshake className="h-5 w-5" />
              {p.primaryCta.label}
            </CtaLink>
            <CtaLink href={`mailto:${site.contact.partnersEmail}`} size="lg" variant="outline" className="gap-2">
              <Mail className="h-5 w-5" />
              {p.contactCta.label}
            </CtaLink>
          </div>

          <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mt-4">
            <FileDown className="h-3.5 w-3.5" />
            {p.mediaKitNote}
          </p>
        </div>
      </div>
    </section>
  );
}
