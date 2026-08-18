import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { site } from "@/config/site";
import { SectionHeader } from "./SectionHeader";

export function Faq() {
  const { faq } = site;

  return (
    <section id="faq" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader title={faq.title} />

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faq.items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-right text-foreground">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-right">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
