import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { videos, ROLES, ROLE_LABELS, COUNTRY_LABELS, GuestRole } from "@/data/videos";

interface VideoFiltersProps {
  selectedCountry: string | null;
  selectedRole: GuestRole | null;
  selectedTimeRange: "all" | "3months" | "6months";
  searchQuery: string;
  onCountryChange: (country: string | null) => void;
  onRoleChange: (role: GuestRole | null) => void;
  onTimeRangeChange: (range: "all" | "3months" | "6months") => void;
  onSearchChange: (query: string) => void;
}

export function VideoFilters({
  selectedCountry,
  selectedRole,
  selectedTimeRange,
  searchQuery,
  onCountryChange,
  onRoleChange,
  onTimeRangeChange,
  onSearchChange,
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
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Box */}
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="جستجو در عنوان مصاحبه..."
            className="pr-10"
          />
        </div>

        {/* Country Dropdown */}
        <Select
          value={selectedCountry || "all"}
          onValueChange={(value) => onCountryChange(value === "all" ? null : value)}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="کشور" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            <SelectItem value="all">همه کشورها</SelectItem>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                {COUNTRY_LABELS[country] || country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Role Dropdown */}
        <Select
          value={selectedRole || "all"}
          onValueChange={(value) => onRoleChange(value === "all" ? null : value as GuestRole)}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="نقش" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            <SelectItem value="all">همه نقش‌ها</SelectItem>
            {ROLES.map((role) => (
              <SelectItem key={role} value={role}>
                {ROLE_LABELS[role]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Time Range Dropdown */}
        <Select
          value={selectedTimeRange}
          onValueChange={(value) => onTimeRangeChange(value as "all" | "3months" | "6months")}
        >
          <SelectTrigger className="w-full md:w-[150px]">
            <SelectValue placeholder="زمان" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            {timeRangeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
