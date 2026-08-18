import { site } from "@/config/site";
import { SectionHeader } from "./SectionHeader";

export function Journey() {
  const { journey } = site;

  return (
    <section id="journey" className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <SectionHeader title={journey.title} subtitle={journey.subtitle} />

        <ol className="relative max-w-3xl mx-auto border-r-2 border-primary/20 pr-6 space-y-8">
          {journey.stages.map((stage, index) => (
            <li key={stage.id} className="relative">
              <span
                className="absolute -right-[2.1rem] top-1 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <div className="bg-background rounded-xl p-5 border border-border">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-foreground">{stage.name}</h3>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {stage.emotion}
                  </span>
                </div>
                <p className="text-foreground/90 mb-2">
                  <span className="text-muted-foreground">سوال اصلی: </span>
                  «{stage.question}»
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="font-medium text-foreground/80">چطور کمک می‌کنیم: </span>
                  {stage.help}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
