import { Link } from "react-router-dom";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mentors } from "@/data/mentors";
import { MentorCard } from "./MentorCard";

interface MentorsSectionProps {
  showAll?: boolean;
  showHeader?: boolean;
  showSocialLinks?: boolean;
}

export function MentorsSection({ 
  showAll = false, 
  showHeader = true,
  showSocialLinks = true 
}: MentorsSectionProps) {
  const MAX_MENTORS_DISPLAY = 3;
  const displayedMentors = showAll ? mentors : mentors.slice(0, MAX_MENTORS_DISPLAY);
  const hasMoreMentors = !showAll && mentors.length > MAX_MENTORS_DISPLAY;

  return (
    <section id="mentors" className="py-16 bg-card">
      <div className="container mx-auto px-4">
        {showHeader && (
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              ارتباط با منتورها
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              افرادی با تجربه در صنعت تک و مهاجرت آماده‌اند تا در مسیر شما کمکتون کنن.
            </p>
          </div>
        )}

        {/* Mentors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedMentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
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
        {showSocialLinks && (
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
        )}
      </div>
    </section>
  );
}
