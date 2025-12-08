import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Send, MessageCircle, ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Combobox } from "@/components/ui/combobox";
import { mentors } from "@/data/mentors";
import { COUNTRY_LABELS, ROLE_LABELS } from "@/data/videos";
import { toast } from "sonner";

const MAX_MENTORS_DISPLAY = 3;

// Country options for combobox
const countryOptions = [
  { value: "Iran", label: "ایران" },
  { value: "Germany", label: "آلمان" },
  { value: "UK", label: "انگلستان" },
  { value: "Canada", label: "کانادا" },
  { value: "Netherlands", label: "هلند" },
  { value: "USA", label: "آمریکا" },
  { value: "Australia", label: "استرالیا" },
  { value: "France", label: "فرانسه" },
  { value: "Sweden", label: "سوئد" },
  { value: "Turkey", label: "ترکیه" },
  { value: "UAE", label: "امارات" },
];

export function MentorsSection() {
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
    
    // Log to console (no real backend)
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

  const displayedMentors = mentors.slice(0, MAX_MENTORS_DISPLAY);
  const hasMoreMentors = mentors.length > MAX_MENTORS_DISPLAY;

  return (
    <section id="mentors" className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            ارتباط با منتورها
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            افرادی با تجربه در صنعت تک و مهاجرت آماده‌اند تا در مسیر شما کمکتون کنن. سوالاتتون رو بپرسید و از تجربیات اونها استفاده کنید.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Mentors List */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              منتورهای فعال
            </h3>
            <div className="space-y-4">
              {displayedMentors.map((mentor) => (
                <div
                  key={mentor.id}
                  className={`bg-background rounded-xl p-4 border border-border hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ${
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
                      <p className="text-sm text-muted-foreground mb-2">
                        {mentor.description}
                      </p>
                      {mentor.profileUrl && (
                        <Button variant="outline" size="sm" asChild className="gap-1">
                          <a
                            href={mentor.profileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-3 w-3" />
                            پروفایل
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Show all button */}
            {hasMoreMentors && (
              <div className="mt-4">
                <Button asChild variant="outline" className="w-full gap-2">
                  <Link to="/mentors">
                    مشاهده همه منتورها
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              درخواست راهنمایی
            </h3>
            <form
              onSubmit={handleSubmit}
              className="bg-background rounded-xl p-6 border border-border space-y-4"
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
                  <Combobox
                    options={countryOptions}
                    value={formData.currentCountry}
                    onValueChange={(value) =>
                      setFormData({ ...formData, currentCountry: value })
                    }
                    placeholder="انتخاب یا تایپ کنید"
                    searchPlaceholder="جستجو..."
                    className="w-full"
                    allowCustomValue
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    کشور هدف
                  </label>
                  <Combobox
                    options={countryOptions}
                    value={formData.targetCountry}
                    onValueChange={(value) =>
                      setFormData({ ...formData, targetCountry: value })
                    }
                    placeholder="انتخاب یا تایپ کنید"
                    searchPlaceholder="جستجو..."
                    className="w-full"
                    allowCustomValue
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
    </section>
  );
}
