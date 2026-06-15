import { Check } from "lucide-react";
import { site } from "@/config/site";
import { SectionHeader } from "./SectionHeader";

export function Mission() {
  const { mission } = site;

  return (
    <section id="mission" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader title={mission.title} subtitle={mission.lead} />

        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {mission.points.map((point) => (
            <div
              key={point}
              className="flex items-start gap-3 bg-card rounded-xl p-4 border border-border"
            >
              <span className="mt-0.5 w-6 h-6 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Check className="h-4 w-4" />
              </span>
              <p className="text-foreground/90 leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
