import { ArrowLeft } from "lucide-react";
import { site, type ProgramStatus } from "@/config/site";
import { SectionHeader } from "./SectionHeader";
import { CtaLink } from "@/components/CtaLink";
import { cn } from "@/lib/utils";

const STATUS_META: Record<ProgramStatus, { label: string; className: string }> = {
  active: { label: "فعال", className: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" },
  pilot: { label: "پایلوت", className: "bg-amber-500/15 text-amber-600 dark:text-amber-400" },
  "open-source": { label: "متن‌باز", className: "bg-primary/15 text-primary" },
  "coming-soon": { label: "به‌زودی", className: "bg-muted text-muted-foreground" },
};

export function Programs() {
  const { programs } = site;

  return (
    <section id="programs" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader title={programs.title} subtitle={programs.subtitle} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.items.map((program) => {
            const status = STATUS_META[program.status];
            return (
              <div
                key={program.id}
                className="flex flex-col bg-card rounded-xl p-6 border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-lg font-bold text-foreground">{program.title}</h3>
                  <span
                    className={cn(
                      "shrink-0 text-xs px-2 py-1 rounded-full font-medium",
                      status.className
                    )}
                  >
                    {status.label}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                  {program.description}
                </p>
                {program.ctaLabel && program.ctaHref && (
                  <CtaLink
                    href={program.ctaHref}
                    variant="outline"
                    size="sm"
                    className="gap-1 self-start"
                  >
                    {program.ctaLabel}
                    <ArrowLeft className="h-4 w-4" />
                  </CtaLink>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
