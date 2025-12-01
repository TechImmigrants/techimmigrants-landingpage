import { cn } from "@/lib/utils";
import { videos, ROLES, ROLE_LABELS, COUNTRY_LABELS, GuestRole } from "@/data/videos";

interface VideoFiltersProps {
  selectedCountry: string | null;
  selectedRole: GuestRole | null;
  selectedTimeRange: "all" | "3months" | "6months";
  onCountryChange: (country: string | null) => void;
  onRoleChange: (role: GuestRole | null) => void;
  onTimeRangeChange: (range: "all" | "3months" | "6months") => void;
}

export function VideoFilters({
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
      <div>
        <div className="text-sm font-medium text-muted-foreground mb-2">کشور:</div>
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => onCountryChange(null)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
              selectedCountry === null
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-foreground hover:bg-accent"
            )}
          >
            همه کشورها
          </button>
          {countries.map((country) => (
            <button
              key={country}
              onClick={() => onCountryChange(country)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                selectedCountry === country
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground hover:bg-accent"
              )}
            >
              {COUNTRY_LABELS[country] || country}
            </button>
          ))}
        </div>
      </div>

      {/* Role Filter */}
      <div>
        <div className="text-sm font-medium text-muted-foreground mb-2">نقش:</div>
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => onRoleChange(null)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
              selectedRole === null
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-foreground hover:bg-accent"
            )}
          >
            همه نقش‌ها
          </button>
          {ROLES.map((role) => (
            <button
              key={role}
              onClick={() => onRoleChange(role)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                selectedRole === role
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground hover:bg-accent"
              )}
            >
              {ROLE_LABELS[role]}
            </button>
          ))}
        </div>
      </div>

      {/* Time Range Filter */}
      <div>
        <div className="text-sm font-medium text-muted-foreground mb-2">زمان:</div>
        <div className="flex flex-wrap gap-2">
          {timeRangeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onTimeRangeChange(option.value)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                selectedTimeRange === option.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground hover:bg-accent"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
