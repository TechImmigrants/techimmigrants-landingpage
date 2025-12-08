import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { videos, GuestRole, ROLES } from "@/data/videos";
import { VideoFilters } from "@/components/landing/VideoFilters";
import { VideoCard } from "@/components/landing/VideoCard";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Interviews() {
  const [searchParams] = useSearchParams();
  
  const initialCountry = searchParams.get("country");
  const initialRole = searchParams.get("role") as GuestRole | null;
  const initialTime = searchParams.get("time") as "all" | "3months" | "6months" | null;

  const [selectedCountry, setSelectedCountry] = useState<string | null>(initialCountry);
  const [selectedRole, setSelectedRole] = useState<GuestRole | null>(
    initialRole && ROLES.includes(initialRole) ? initialRole : null
  );
  const [selectedTimeRange, setSelectedTimeRange] = useState<"all" | "3months" | "6months">(
    initialTime === "3months" || initialTime === "6months" ? initialTime : "all"
  );

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
      return true;
    });
  }, [selectedCountry, selectedRole, selectedTimeRange]);

  const sortedVideos = useMemo(() => {
    return [...filteredVideos].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime();
    });
  }, [filteredVideos]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button variant="ghost" asChild>
              <Link to="/" className="gap-2">
                <ArrowRight className="h-4 w-4" />
                بازگشت به صفحه اصلی
              </Link>
            </Button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              همه مصاحبه‌ها
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              گفتگو با ایرانیان موفق در صنعت تکنولوژی در کشورهای مختلف.
            </p>
          </div>

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

          <div className="text-sm text-muted-foreground mb-6">
            {sortedVideos.length} مصاحبه یافت شد
          </div>

          {sortedVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">هیچ مصاحبه‌ای یافت نشد.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
