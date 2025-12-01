import { Heart, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DonationSection() {
  const scrollToFeedback = () => {
    const element = document.querySelector("#feedback");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="donation" className="py-16 bg-gradient-to-b from-card to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="h-10 w-10 text-primary" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            حمایت از تک ایمیگرنتس
          </h2>

          <p className="text-muted-foreground mb-8 leading-relaxed">
            تک ایمیگرنتس یک پروژه کاملاً داوطلبانه است. اگه از محتوای ما استفاده کردید و خوشتون اومد، می‌تونید با حمایت مالی کمک کنید هزینه‌های نگهداری (سرور، ابزارها، تجهیزات ضبط) پوشش داده بشه و بتونیم مصاحبه‌های بیشتری تولید کنیم.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* TODO: Connect to real payment solution that works for Iranian users */}
            <Button size="lg" className="gap-2" asChild>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('این بخش به زودی فعال می‌شود'); }}>
                <Heart className="h-5 w-5" />
                حمایت مالی از تک ایمیگرنتس
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="gap-2"
              onClick={scrollToFeedback}
            >
              <Gift className="h-5 w-5" />
              فرصت‌های اسپانسری
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            هر مبلغی کمک می‌کنه. ممنون از حمایتتون! 💙
          </p>
        </div>
      </div>
    </section>
  );
}
