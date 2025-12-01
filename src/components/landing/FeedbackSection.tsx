import { useState } from "react";
import { Send, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const referralOptions = [
  { value: "youtube", label: "یوتیوب" },
  { value: "telegram", label: "تلگرام" },
  { value: "twitter", label: "توئیتر / ایکس" },
  { value: "friend", label: "معرفی دوستان" },
  { value: "linkedin", label: "لینکدین" },
  { value: "other", label: "سایر" },
];

export function FeedbackSection() {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [feedback, setFeedback] = useState("");
  const [referral, setReferral] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("Feedback submitted:", {
      rating,
      feedback,
      referral,
    });

    setTimeout(() => {
      toast.success("ممنون از بازخوردت! نظرت برای ما خیلی ارزشمنده.");
      setRating(0);
      setFeedback("");
      setReferral("");
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <section id="feedback" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              کمک کن این وبسایت بهتر بشه
            </h2>
            <p className="text-muted-foreground">
              این وبسایت تازه راه‌اندازی شده و نظر شما می‌تونه کمک کنه بهترش کنیم. چه چیزی خوب بود؟ چه چیزی می‌تونه بهتر بشه؟
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-card rounded-xl p-6 border border-border space-y-6"
          >
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                امتیاز کلی (اختیاری)
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star
                      className={cn(
                        "h-8 w-8 transition-colors",
                        (hoverRating || rating) >= star
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-border"
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Text */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                نظرت چیه؟ چه چیزی رو پیشنهاد می‌کنی؟
              </label>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="هر نظر یا پیشنهادی داری اینجا بنویس..."
                rows={4}
                required
              />
            </div>

            {/* Referral Source */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                از کجا با تک ایمیگرنتس آشنا شدی؟ (اختیاری)
              </label>
              <Select value={referral} onValueChange={setReferral}>
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب کنید..." />
                </SelectTrigger>
                <SelectContent>
                  {referralOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
              <Send className="h-4 w-4" />
              {isSubmitting ? "در حال ارسال..." : "ارسال بازخورد"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
