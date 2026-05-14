import {
  Github,
  Linkedin,
  MessageCircle,
  Radio,
  Twitter,
  Users,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const platforms = [
  {
    name: "کانال تلگرام",
    description:
      "آخرین خبرها، منابع مفید و اطلاع‌رسانی مصاحبه‌های جدید را مستقیم در کانال دنبال کنید.",
    stat: "+۷۱۰۰ مشترک",
    cta: "دنبال کردن کانال",
    href: "https://t.me/techimmigrantschannel",
    icon: Radio,
    tone: "bg-sky-500/10 text-sky-600",
    buttonVariant: "default" as const,
  },
  {
    name: "گروه تلگرام",
    description:
      "جایی برای پرسش و پاسخ، به اشتراک گذاشتن تجربیات و آشنایی با افراد همفکر.",
    stat: "+۱۷۰۰۰ عضو",
    cta: "عضویت در گروه",
    href: "https://t.me/techimmigrants",
    icon: MessageCircle,
    tone: "bg-primary/10 text-primary",
    buttonVariant: "outline" as const,
  },
  {
    name: "یوتیوب",
    description:
      "مصاحبه‌ها، لایوها و گفتگوهای عمیق درباره مهاجرت کاری و مسیر رشد در صنعت تک.",
    stat: "+۱۹۰ اپیزود",
    cta: "سابسکرایب",
    href: "https://youtube.com/@techimmigrants",
    icon: Youtube,
    tone: "bg-destructive/10 text-destructive",
    buttonVariant: "outline" as const,
  },
  {
    name: "لینکدین",
    description:
      "برای ارتباط حرفه‌ای، خبرهای جامعه و نوشته‌های مرتبط با مسیر شغلی در تک همراه باشید.",
    stat: "Follow",
    cta: "دنبال کردن",
    href: "https://linkedin.com/in/saharpak",
    icon: Linkedin,
    tone: "bg-blue-600/10 text-blue-600",
    buttonVariant: "outline" as const,
  },
  {
    name: "X / Twitter",
    description:
      "نکته‌های کوتاه، به‌روزرسانی‌ها و گفتگوهای روزمره جامعه Tech Immigrants را دنبال کنید.",
    stat: "Follow",
    cta: "دنبال کردن",
    href: "https://x.com/saharlead",
    icon: Twitter,
    tone: "bg-foreground/10 text-foreground",
    buttonVariant: "outline" as const,
  },
  {
    name: "GitHub",
    description:
      "پروژه‌های متن‌باز جامعه را ببینید، مشارکت کنید و ایده‌های جدید را با ما بسازید.",
    stat: "۱۰ مخزن، مشارکت کنید",
    cta: "مشاهده GitHub",
    href: "https://github.com/TechImmigrants",
    icon: Github,
    tone: "bg-muted text-foreground",
    buttonVariant: "outline" as const,
  },
];

export function CommunitySection() {
  return (
    <section id="community" className="py-16 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            عضو جامعه ما شوید
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            در کنار هزاران ایرانی دیگه که در مسیر مهاجرت و کار در صنعت تک هستن قرار بگیرید. سوال بپرسید، تجربه به اشتراک بذارید و از آپدیت‌ها باخبر بشید.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {platforms.map((platform) => {
            const Icon = platform.icon;

            return (
              <div
                key={platform.name}
                className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${platform.tone}`}>
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {platform.name}
                </h3>
                <p className="text-muted-foreground mb-5 flex-1">
                  {platform.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
                  <Users className="h-4 w-4" />
                  <span>{platform.stat}</span>
                </div>
                <Button
                  size="lg"
                  variant={platform.buttonVariant}
                  className="w-full gap-2 transition-transform hover:scale-[1.02]"
                  asChild
                >
                  <a
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-5 w-5" />
                    {platform.cta}
                  </a>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
