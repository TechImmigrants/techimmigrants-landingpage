import { Mail, Handshake, MessageCircle } from "lucide-react";
import { site } from "@/config/site";
import { SectionHeader } from "./SectionHeader";

export function Contact() {
  const c = site.contactSection;

  return (
    <section id="contact" className="py-16 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <SectionHeader title={c.title} subtitle={c.lead} />

        <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <a
            href={`mailto:${site.contact.email}`}
            className="flex flex-col items-center text-center gap-2 bg-background rounded-xl p-6 border border-border hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <Mail className="h-7 w-7 text-primary" />
            <span className="font-medium text-foreground">{c.generalLabel}</span>
            <span className="text-sm text-muted-foreground" dir="ltr">
              {site.contact.email}
            </span>
          </a>

          <a
            href={`mailto:${site.contact.partnersEmail}`}
            className="flex flex-col items-center text-center gap-2 bg-background rounded-xl p-6 border border-border hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <Handshake className="h-7 w-7 text-primary" />
            <span className="font-medium text-foreground">{c.partnersLabel}</span>
            <span className="text-sm text-muted-foreground" dir="ltr">
              {site.contact.partnersEmail}
            </span>
          </a>

          <a
            href={site.social.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-center gap-2 bg-background rounded-xl p-6 border border-border hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <MessageCircle className="h-7 w-7 text-primary" />
            <span className="font-medium text-foreground">کامیونیتی تلگرام</span>
            <span className="text-sm text-muted-foreground">پیوستن و گفتگو</span>
          </a>
        </div>
      </div>
    </section>
  );
}
