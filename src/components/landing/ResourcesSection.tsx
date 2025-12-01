import { useState, useMemo } from "react";
import { ExternalLink, Book, Globe, Wrench, FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { resources, ResourceType, RESOURCE_TYPE_LABELS } from "@/data/resources";
import { videos } from "@/data/videos";

const resourceTypeIcons: Record<ResourceType, typeof Book> = {
  book: Book,
  website: Globe,
  tool: Wrench,
  article: FileText,
};

export function ResourcesSection() {
  const [selectedType, setSelectedType] = useState<ResourceType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      // Type filter
      if (selectedType && resource.type !== selectedType) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          resource.title.toLowerCase().includes(query) ||
          resource.description.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [selectedType, searchQuery]);

  // Get guest name for related videos
  const getRelatedGuest = (resourceId: string): string | null => {
    const resource = resources.find((r) => r.id === resourceId);
    if (!resource?.relatedVideoIds?.length) return null;
    
    const video = videos.find((v) => resource.relatedVideoIds?.includes(v.id));
    return video?.guestName || null;
  };

  return (
    <section id="resources" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            منابع معرفی‌شده در مصاحبه‌ها
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            کتاب‌ها، وب‌سایت‌ها و ابزارهایی که مهمان‌های ما معرفی کردن و در مسیر شغلی و مهاجرت کمکشون کرده.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl p-4 mb-8 border border-border">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Type Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedType(null)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  selectedType === null
                    ? "bg-primary text-primary-foreground"
                    : "bg-background border border-border text-foreground hover:bg-accent"
                )}
              >
                همه
              </button>
              {(Object.keys(RESOURCE_TYPE_LABELS) as ResourceType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1",
                    selectedType === type
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border border-border text-foreground hover:bg-accent"
                  )}
                >
                  {RESOURCE_TYPE_LABELS[type]}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative flex-1 md:max-w-xs">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو در منابع..."
                className="pr-10"
              />
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-muted-foreground mb-6">
          {filteredResources.length} منبع یافت شد
        </div>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => {
              const Icon = resourceTypeIcons[resource.type];
              const relatedGuest = getRelatedGuest(resource.id);

              return (
                <div
                  key={resource.id}
                  className="bg-card rounded-xl p-6 border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
                      {RESOURCE_TYPE_LABELS[resource.type]}
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {resource.description}
                  </p>
                  {relatedGuest && (
                    <p className="text-xs text-muted-foreground mb-4">
                      معرفی شده در مصاحبه با {relatedGuest}
                    </p>
                  )}
                  <Button variant="outline" size="sm" asChild className="w-full gap-1 transition-transform hover:scale-[1.02]">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      مشاهده
                    </a>
                  </Button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">هیچ منبعی یافت نشد.</p>
          </div>
        )}
      </div>
    </section>
  );
}
