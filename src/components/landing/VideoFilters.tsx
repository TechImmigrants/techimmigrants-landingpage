import { Badge } from "@/components/ui/badge";
import { ROLES, ROLE_LABELS, COUNTRY_LABELS, GuestRole } from "@/data/videos";
import type { Video } from "@/data/videos";
import { 
  Server, 
  Monitor, 
  Smartphone, 
  Database, 
  ClipboardList, 
  Cloud, 
  Palette, 
  Rocket, 
  GraduationCap 
} from "lucide-react";

// Country flags mapping
const COUNTRY_FLAGS: Record<string, string> = {
  "UK": "🇬🇧",
  "Germany": "🇩🇪",
  "Canada": "🇨🇦",
  "Netherlands": "🇳🇱",
  "Sweden": "🇸🇪",
  "USA": "🇺🇸",
  "Australia": "🇦🇺",
};

// Role icons mapping
const ROLE_ICONS: Record<GuestRole, React.ReactNode> = {
  "Backend": <Server className="h-3.5 w-3.5" />,
  "Frontend": <Monitor className="h-3.5 w-3.5" />,
  "Mobile": <Smartphone className="h-3.5 w-3.5" />,
  "Data": <Database className="h-3.5 w-3.5" />,
  "Product Manager": <ClipboardList className="h-3.5 w-3.5" />,
  "DevOps / SRE": <Cloud className="h-3.5 w-3.5" />,
  "Designer": <Palette className="h-3.5 w-3.5" />,
  "Founder": <Rocket className="h-3.5 w-3.5" />,
  "Student": <GraduationCap className="h-3.5 w-3.5" />,
};

interface VideoFiltersProps {
  videos?: Video[];
  selectedCountry: string | null;
  selectedRole: GuestRole | null;
  selectedTimeRange: "all" | "3months" | "6months";
  onCountryChange: (country: string | null) => void;
  onRoleChange: (role: GuestRole | null) => void;
  onTimeRangeChange: (range: "all" | "3months" | "6months") => void;
}

export function VideoFilters({
  videos = [],
  selectedCountry,
  selectedRole,
  selectedTimeRange,
  onCountryChange,
  onRoleChange,
  onTimeRangeChange,
}: VideoFiltersProps) {
  // Get unique countries from data
  const countries = [...new Set(videos.map((v) => v.country))];

  const timeRangeOptions: { value: "all" | "3months" | "6months"; label: string }[] = [
    { value: "all", label: "همه" },
    { value: "3months", label: "۳ ماه اخیر" },
    { value: "6months", label: "۶ ماه اخیر" },
  ];

  return (
    <div className="space-y-4">
      {/* Country Filter */}
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={selectedCountry === null ? "default" : "outline"}
          className="cursor-pointer hover:bg-primary/80 transition-colors px-3 py-1.5"
          onClick={() => onCountryChange(null)}
        >
          همه کشورها
        </Badge>
        {countries.map((country) => (
          <Badge
            key={country}
            variant={selectedCountry === country ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/80 transition-colors px-3 py-1.5"
            onClick={() => onCountryChange(country)}
          >
            {COUNTRY_FLAGS[country] || ""} {COUNTRY_LABELS[country] || country}
          </Badge>
        ))}
      </div>

      {/* Role Filter */}
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={selectedRole === null ? "default" : "outline"}
          className="cursor-pointer hover:bg-primary/80 transition-colors px-3 py-1.5"
          onClick={() => onRoleChange(null)}
        >
          همه نقش‌ها
        </Badge>
        {ROLES.map((role) => (
          <Badge
            key={role}
            variant={selectedRole === role ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/80 transition-colors px-3 py-1.5 flex items-center gap-1.5"
            onClick={() => onRoleChange(role)}
          >
            {ROLE_ICONS[role]}
            {ROLE_LABELS[role]}
          </Badge>
        ))}
      </div>

      {/* Time Range Filter */}
      <div className="flex flex-wrap gap-2">
        {timeRangeOptions.map((option) => (
          <Badge
            key={option.value}
            variant={selectedTimeRange === option.value ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/80 transition-colors px-3 py-1.5"
            onClick={() => onTimeRangeChange(option.value)}
          >
            {option.label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
