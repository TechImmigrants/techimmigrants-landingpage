import { MapPin, Quote } from "lucide-react";
import { site } from "@/config/site";

export function Founder() {
  const { founder } = site;

  return (
    <section id="about" className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-5">{founder.title}</h2>
          <p className="text-foreground/90 leading-relaxed mb-5">{founder.body}</p>

          <blockquote className="flex items-center justify-center gap-2 text-muted-foreground italic mb-4">
            <Quote className="h-5 w-5 text-primary/40 shrink-0" />
            {founder.origin}
          </blockquote>

          <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            {founder.location}
          </div>
        </div>
      </div>
    </section>
  );
}
