import { Link } from "react-router-dom";
import { MessageCircle, ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mentors } from "@/data/mentors";
import { COUNTRY_LABELS, ROLE_LABELS } from "@/data/videos";

const MAX_MENTORS_DISPLAY = 3;

export function MentorsSection() {
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
            افرادی با تجربه در صنعت تک و مهاجرت آماده‌اند تا در مسیر شما کمکتون کنن.
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
          <div className="text-center">
            <Button asChild variant="outline" className="gap-2">
              <Link to="/mentors">
                مشاهده همه منتورها
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}

        {/* Social Links */}
        <div className="mt-8 flex justify-center gap-4">
          <Button variant="outline" asChild className="gap-2">
            <a
              href="https://t.me/techimmigrants"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4" />
              ارتباط در تلگرام
            </a>
          </Button>
          <Button variant="outline" asChild className="gap-2">
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
    </section>
  );
}
