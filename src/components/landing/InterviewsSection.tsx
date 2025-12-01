import { useState, useMemo } from "react";
import { videos, GuestRole } from "@/data/videos";
import { VideoFilters } from "./VideoFilters";
import { VideoCard } from "./VideoCard";

export function InterviewsSection() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<GuestRole | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState<"all" | "3months" | "6months">("all");

  const filteredVideos = useMemo(() => {
    const now = new Date();
    const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);

    return videos.filter((video) => {
      // Country filter
      if (selectedCountry && video.country !== selectedCountry) {
        return false;
      }

      // Role filter
      if (selectedRole && video.guestRole !== selectedRole) {
        return false;
      }

      // Time range filter
      const recordedDate = new Date(video.recordedAt);
      if (selectedTimeRange === "3months" && recordedDate < threeMonthsAgo) {
        return false;
      }
      if (selectedTimeRange === "6months" && recordedDate < sixMonthsAgo) {
        return false;
      }

      return true;
    });
  }, [selectedCountry, selectedRole, selectedTimeRange]);

  // Sort: featured first, then by date
  const sortedVideos = useMemo(() => {
    return [...filteredVideos].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime();
    });
  }, [filteredVideos]);

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
            onCountryChange={setSelectedCountry}
            onRoleChange={setSelectedRole}
            onTimeRangeChange={setSelectedTimeRange}
          />
        </div>

        {/* Results count */}
        <div className="text-sm text-muted-foreground mb-6">
          {sortedVideos.length} مصاحبه یافت شد
        </div>

        {/* Video Grid */}
        {sortedVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
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
