import { MessageCircle, Youtube, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

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

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Telegram Card */}
          <div className="bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              گروه تلگرام
            </h3>
            <p className="text-muted-foreground mb-6">
              جایی برای پرسش و پاسخ، به اشتراک گذاشتن تجربیات و آشنایی با افراد همفکر. هر هفته مطالب مفید و آپدیت درباره مصاحبه‌های جدید منتشر می‌شه.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Users className="h-4 w-4" />
              <span>+۲۰۰۰ عضو فعال</span>
            </div>
            <Button size="lg" className="w-full gap-2 transition-transform hover:scale-[1.02]" asChild>
              <a
                href="https://t.me/techimmigrants"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
                عضویت در گروه تلگرام
              </a>
            </Button>
          </div>

          {/* YouTube Card */}
          <div className="bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center mb-6">
              <Youtube className="h-8 w-8 text-destructive" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              کانال یوتیوب
            </h3>
            <p className="text-muted-foreground mb-6">
              تمام مصاحبه‌ها در کانال یوتیوب ما منتشر می‌شن. سابسکرایب کنید تا از مصاحبه‌های جدید و لایوها باخبر بشید.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Youtube className="h-4 w-4" />
              <span>+۵۰ ویدیو منتشر شده</span>
            </div>
            <Button size="lg" variant="outline" className="w-full gap-2 transition-transform hover:scale-[1.02]" asChild>
              <a
                href="https://youtube.com/@techimmigrants"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="h-5 w-5" />
                مشاهده کانال یوتیوب
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
