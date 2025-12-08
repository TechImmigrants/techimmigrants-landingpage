import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { videos, GuestRole } from "@/data/videos";
import { VideoFilters } from "./VideoFilters";
import { VideoCard } from "./VideoCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function InterviewsSection() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<GuestRole | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState<"all" | "3months" | "6months">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVideos = useMemo(() => {
    const now = new Date();
    const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);

    return videos.filter((video) => {
      if (selectedCountry && video.country !== selectedCountry) {
        return false;
      }
      if (selectedRole && video.guestRole !== selectedRole) {
        return false;
      }
      const recordedDate = new Date(video.recordedAt);
      if (selectedTimeRange === "3months" && recordedDate < threeMonthsAgo) {
        return false;
      }
      if (selectedTimeRange === "6months" && recordedDate < sixMonthsAgo) {
        return false;
      }
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          video.title.toLowerCase().includes(query) ||
          video.guestName.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [selectedCountry, selectedRole, selectedTimeRange, searchQuery]);

  // Sort: featured first, then by date
  const sortedVideos = useMemo(() => {
    return [...filteredVideos].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime();
    });
  }, [filteredVideos]);

  // Show only first 6 videos
  const displayedVideos = sortedVideos.slice(0, 6);
  const hasMoreVideos = sortedVideos.length > 6;

  // Build query params for "show all" link
  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (selectedCountry) params.set("country", selectedCountry);
    if (selectedRole) params.set("role", selectedRole);
    if (selectedTimeRange !== "all") params.set("time", selectedTimeRange);
    if (searchQuery) params.set("q", searchQuery);
    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
  };

  return (
    <section id="interviews" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            مصاحبه‌ها
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            گفتگو با ایرانیان موفق در صنعت تکنولوژی در کشورهای مختلف. از تجربیات واقعی مهاجرت، کار و زندگی بشنوید.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl p-4 mb-8 border border-border">
          <VideoFilters
            selectedCountry={selectedCountry}
            selectedRole={selectedRole}
            selectedTimeRange={selectedTimeRange}
            searchQuery={searchQuery}
            onCountryChange={setSelectedCountry}
            onRoleChange={setSelectedRole}
            onTimeRangeChange={setSelectedTimeRange}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Results count */}
        <div className="text-sm text-muted-foreground mb-6">
          {sortedVideos.length} مصاحبه یافت شد
        </div>

        {/* Video Grid */}
        {displayedVideos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
            
            {/* Show all button */}
            {hasMoreVideos && (
              <div className="text-center mt-8">
                <Button asChild variant="outline" size="lg">
                  <Link to={`/interviews${buildQueryParams()}`} className="gap-2">
                    مشاهده همه مصاحبه‌ها در این دسته
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              هیچ مصاحبه‌ای با این فیلترها یافت نشد.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
