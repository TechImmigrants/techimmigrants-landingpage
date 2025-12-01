import { Button } from "@/components/ui/button";
import { Play, Users } from "lucide-react";

const stats = [
  { label: "کشور", value: "+۷" },
  { label: "نقش شغلی", value: "+۹" },
  { label: "ساعت مصاحبه", value: "+۵۰" },
];

export function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
            تجربه‌های مهاجرت در دنیای تکنولوژی، از زبان ایرانی‌های مهاجر
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            تک ایمیگرنتس یک جامعه داوطلبانه است که با مصاحبه از ایرانیان شاغل در صنعت تکنولوژی در کشورهای مختلف، تجربیات واقعی مهاجرت و کار رو با شما به اشتراک می‌ذاره.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={() => scrollToSection("#interviews")}
              className="gap-2"
            >
              <Play className="h-5 w-5" />
              تماشای مصاحبه‌ها
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("#community")}
              className="gap-2"
            >
              <Users className="h-5 w-5" />
              عضویت در گروه تلگرام
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card rounded-xl px-6 py-4 shadow-sm border border-border"
              >
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
