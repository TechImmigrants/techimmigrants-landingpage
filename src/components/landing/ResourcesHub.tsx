import { ArrowLeft, ExternalLink, Youtube, Info } from "lucide-react";
import { site } from "@/config/site";
import { SectionHeader } from "./SectionHeader";
import { VideoCard } from "./VideoCard";
import { useVideos } from "@/hooks/useVideos";
import { isExternal } from "@/lib/nav";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

function ResourceLinks() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
      {site.resources.links.map((link) => {
        const external = isExternal(link.href);
        const card = (
          <div className="h-full bg-card rounded-xl p-5 border border-border hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-foreground">{link.title}</h3>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{link.description}</p>
          </div>
        );
        return external ? (
          <a key={link.title} href={link.href} target="_blank" rel="noopener noreferrer">
            {card}
          </a>
        ) : (
          <a key={link.title} href={link.href}>
            {card}
          </a>
        );
      })}
    </div>
  );
}

function Sessions() {
  const { videos, loading, error, usingFallback } = useVideos();
  const displayed = videos.slice(0, 6);

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h3 className="text-xl font-bold text-foreground">جدیدترین سشن‌ها</h3>
        <Button asChild variant="ghost" size="sm" className="gap-1">
          <a href={site.social.youtube} target="_blank" rel="noopener noreferrer">
            <Youtube className="h-4 w-4" />
            همه ویدیوها در یوتیوب
          </a>
        </Button>
      </div>

      {usingFallback && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/40 border border-border rounded-lg px-4 py-2 mb-6">
          <Info className="h-4 w-4 shrink-0" />
          <span>
            نمونه‌ای از سشن‌ها نمایش داده می‌شود. برای دیدن همه‌ی ویدیوها به کانال یوتیوب سر بزنید.
          </span>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-card rounded-xl overflow-hidden border border-border">
              <Skeleton className="aspect-video w-full" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : displayed.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-card rounded-xl border border-border">
          <p className="text-muted-foreground mb-4">
            {error ? "نمایش سشن‌ها موقتاً در دسترس نیست." : "هنوز سشنی برای نمایش نیست."}
          </p>
          <Button asChild variant="outline">
            <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" className="gap-1">
              <Youtube className="h-4 w-4" />
              تماشا در یوتیوب
            </a>
          </Button>
        </div>
      )}

      {!loading && displayed.length > 0 && (
        <div className="text-center mt-8">
          <Button asChild variant="outline" size="lg">
            <Link to="/interviews" className="gap-2">
              مشاهده همه مصاحبه‌ها
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export function ResourcesHub() {
  return (
    <section id="resources" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader title={site.resources.title} subtitle={site.resources.subtitle} />
        <ResourceLinks />
        <Sessions />
      </div>
    </section>
  );
}
