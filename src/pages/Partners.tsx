import { useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Partnership } from "@/components/landing/Partnership";
import { Contact } from "@/components/landing/Contact";
import { CtaLink } from "@/components/CtaLink";
import { site } from "@/config/site";
import { Handshake } from "lucide-react";

const Partners = () => {
  useEffect(() => {
    document.title = `همکاری با ${site.meta.name}`;
    return () => {
      document.title = site.meta.title;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-20">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              برای شرکت‌ها، اسپانسرها و همکاران
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              با یک کامیونیتی قابل اعتماد همکاری کنید
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Tech Immigrants به متخصصان فارسی‌زبان تکنولوژی کمک می‌کند مسیر مهاجرت و رشد شغلی را طی
              کنند. ما فقط با سازمان‌هایی همکاری می‌کنیم که ارزش واقعی برای جامعه می‌سازند.
            </p>
            <p className="text-sm text-muted-foreground/80 mb-8" dir="ltr">
              {site.meta.descriptionEn}
            </p>
            <CtaLink href={`mailto:${site.contact.partnersEmail}`} size="lg" className="gap-2">
              <Handshake className="h-5 w-5" />
              شروع گفتگو
            </CtaLink>
          </div>
        </section>

        <Partnership detailed />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Partners;
