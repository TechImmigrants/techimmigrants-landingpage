import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ExternalLink, Book, Globe, Wrench, FileText, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { resources, ResourceType, ResourceSubject, RESOURCE_TYPE_LABELS, RESOURCE_SUBJECT_LABELS } from "@/data/resources";
import { videos } from "@/data/videos";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

const resourceTypeIcons: Record<ResourceType, typeof Book> = {
  book: Book,
  website: Globe,
  tool: Wrench,
  article: FileText,
};

const Resources = () => {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get("type") as ResourceType | null;
  const initialSubject = searchParams.get("subject") as ResourceSubject | null;

  const [selectedType, setSelectedType] = useState<ResourceType | null>(initialType);
  const [selectedSubject, setSelectedSubject] = useState<ResourceSubject | null>(initialSubject);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      if (selectedType && !resource.type.includes(selectedType)) {
        return false;
      }
      if (selectedSubject && !resource.subjects.includes(selectedSubject)) {
        return false;
      }
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          resource.title.toLowerCase().includes(query) ||
          resource.description.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [selectedType, selectedSubject, searchQuery]);

  const getRelatedGuest = (resourceId: string): string | null => {
    const resource = resources.find((r) => r.id === resourceId);
    if (!resource?.relatedVideoIds?.length) return null;
    const video = videos.find((v) => resource.relatedVideoIds?.includes(v.id));
    return video?.guestName || null;
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />
      <main className="pt-20">
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <Button variant="ghost" asChild className="mb-6 gap-1">
              <a href="/#resources">
                <ArrowRight className="h-4 w-4" />
                بازگشت به صفحه اصلی
              </a>
            </Button>

            <div className="text-center mb-12">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                منابع معرفی‌شده در مصاحبه‌ها
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                کتاب‌ها، وب‌سایت‌ها و ابزارهایی که مهمان‌های ما معرفی کردن.
              </p>
            </div>

            <div className="bg-card rounded-xl p-4 mb-8 border border-border">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="جستجو در منابع..."
                    className="pr-10"
                  />
                </div>

                <Select
                  value={selectedType || "all"}
                  onValueChange={(value) => setSelectedType(value === "all" ? null : value as ResourceType)}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="نوع منبع" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="all">همه انواع</SelectItem>
                    {(Object.keys(RESOURCE_TYPE_LABELS) as ResourceType[]).map((type) => (
                      <SelectItem key={type} value={type}>
                        {RESOURCE_TYPE_LABELS[type]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedSubject || "all"}
                  onValueChange={(value) => setSelectedSubject(value === "all" ? null : value as ResourceSubject)}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="موضوع" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="all">همه موضوعات</SelectItem>
                    {(Object.keys(RESOURCE_SUBJECT_LABELS) as ResourceSubject[]).map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {RESOURCE_SUBJECT_LABELS[subject]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="text-sm text-muted-foreground mb-6">
              {filteredResources.length} منبع یافت شد
            </div>

            {filteredResources.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => {
                  const Icon = resourceTypeIcons[resource.type[0]];
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
                        <div className="flex flex-wrap gap-1 justify-end">
                          {resource.type.map((t) => (
                            <span key={t} className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
                              {RESOURCE_TYPE_LABELS[t]}
                            </span>
                          ))}
                        </div>
                      </div>
                      <h3 className="font-bold text-foreground mb-2">{resource.title}</h3>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {resource.subjects.map((subject) => (
                          <span key={subject} className="bg-secondary/50 text-secondary-foreground text-xs px-2 py-0.5 rounded">
                            {RESOURCE_SUBJECT_LABELS[subject]}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {resource.description}
                      </p>
                      {relatedGuest && (
                        <p className="text-xs text-muted-foreground mb-4">
                          معرفی شده در مصاحبه با {relatedGuest}
                        </p>
                      )}
                      <Button variant="outline" size="sm" asChild className="w-full gap-1">
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
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
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
