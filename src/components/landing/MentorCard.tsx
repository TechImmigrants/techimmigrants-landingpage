import { ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mentor } from "@/data/mentors";
import { COUNTRY_LABELS, ROLE_LABELS } from "@/data/videos";

interface MentorCardProps {
  mentor: Mentor;
}

export function MentorCard({ mentor }: MentorCardProps) {
  return (
    <div
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
          <div className="flex gap-2 flex-wrap">
            {mentor.youtubeVideoId && (
              <Button variant="default" size="sm" asChild className="gap-1">
                <a
                  href={`https://www.youtube.com/watch?v=${mentor.youtubeVideoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Play className="h-3 w-3" />
                  مصاحبه
                </a>
              </Button>
            )}
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
    </div>
  );
}
