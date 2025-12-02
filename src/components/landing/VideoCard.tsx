import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Video, COUNTRY_LABELS, ROLE_LABELS } from "@/data/videos";

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;
  const youtubeUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;

  // Format date in Persian-friendly way
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-muted overflow-hidden group">
        <img
          src={thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
          }}
        />
        {video.featured && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
            ویژه
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-foreground mb-2 line-clamp-2">{video.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{video.guestName}</p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
            {ROLE_LABELS[video.guestRole]}
          </span>
          <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
            {COUNTRY_LABELS[video.country] || video.country}
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {video.shortDescription}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {formatDate(video.recordedAt)}
          </span>
          <Button size="sm" variant="outline" asChild>
            <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="gap-1">
              <ExternalLink className="h-4 w-4" />
              تماشا در یوتیوب
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
