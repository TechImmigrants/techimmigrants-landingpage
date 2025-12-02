import { useState } from "react";
import { Link } from "react-router-dom";
import { Send, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mentors } from "@/data/mentors";
import { COUNTRY_LABELS, ROLE_LABELS } from "@/data/videos";
import { toast } from "sonner";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function Mentors() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    currentCountry: "",
    targetCountry: "",
    question: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log("Mentor request submitted:", formData);
    
    setTimeout(() => {
      toast.success("درخواست شما ثبت شد! به زودی با شما تماس می‌گیریم.");
      setFormData({
        name: "",
        contact: "",
        currentCountry: "",
        targetCountry: "",
        question: "",
      });
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <div className="mb-6">
            <Button variant="ghost" asChild>
              <Link to="/" className="gap-2">
                <ArrowRight className="h-4 w-4" />
                بازگشت به صفحه اصلی
              </Link>
            </Button>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              همه منتورها
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              افرادی با تجربه در صنعت تک و مهاجرت آماده‌اند تا در مسیر شما کمکتون کنن. سوالاتتون رو بپرسید و از تجربیات اونها استفاده کنید.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Mentors List */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                منتورهای فعال ({mentors.length} نفر)
              </h3>
              <div className="space-y-4">
                {mentors.map((mentor) => (
                  <div
                    key={mentor.id}
                    className={`bg-card rounded-xl p-4 border border-border hover:shadow-md transition-shadow duration-300 ${
                      !mentor.available ? "opacity-60" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12 shrink-0">
                        <AvatarImage src={mentor.avatar} alt={mentor.name} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {mentor.name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <h4 className="font-semibold text-foreground">
                              {mentor.name}
                            </h4>
                            {mentor.company && (
                              <p className="text-sm text-muted-foreground">
                                {mentor.company}
                              </p>
                            )}
                          </div>
                          <span
                            className={`text-xs px-2 py-1 rounded-full shrink-0 ${
                              mentor.available
                                ? "bg-primary/10 text-primary"
                                : "bg-muted/50 text-muted-foreground"
                            }`}
                          >
                            {mentor.available ? "در دسترس" : "مشغول"}
                          </span>
                        </div>
                        <div className="flex gap-2 mb-2">
                          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                            {ROLE_LABELS[mentor.role]}
                          </span>
                          <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                            {COUNTRY_LABELS[mentor.country] || mentor.country}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {mentor.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                درخواست راهنمایی
              </h3>
              <form
                onSubmit={handleSubmit}
                className="bg-card rounded-xl p-6 border border-border space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    نام
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="نام شما"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    ایمیل یا آیدی تلگرام
                  </label>
                  <Input
                    value={formData.contact}
                    onChange={(e) =>
                      setFormData({ ...formData, contact: e.target.value })
                    }
                    placeholder="example@email.com یا @username"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      کشور فعلی
                    </label>
                    <Input
                      value={formData.currentCountry}
                      onChange={(e) =>
                        setFormData({ ...formData, currentCountry: e.target.value })
                      }
                      placeholder="مثلا: ایران"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      کشور هدف
                    </label>
                    <Input
                      value={formData.targetCountry}
                      onChange={(e) =>
                        setFormData({ ...formData, targetCountry: e.target.value })
                      }
                      placeholder="مثلا: آلمان"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    در چه زمینه‌ای نیاز به راهنمایی داری؟
                  </label>
                  <Textarea
                    value={formData.question}
                    onChange={(e) =>
                      setFormData({ ...formData, question: e.target.value })
                    }
                    placeholder="سوالات یا موضوعاتی که می‌خواید درباره‌شون صحبت کنید..."
                    rows={4}
                    required
                  />
                </div>
                <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "در حال ارسال..." : "ارسال درخواست"}
                </Button>
              </form>

              {/* Social Links */}
              <div className="mt-6 flex gap-4">
                <Button variant="outline" asChild className="flex-1 gap-2">
                  <a
                    href="https://t.me/techimmigrants"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" />
                    ارتباط در تلگرام
                  </a>
                </Button>
                <Button variant="outline" asChild className="flex-1 gap-2">
                  <a
                    href="https://twitter.com/techimmigrants"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    توئیتر / ایکس
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
