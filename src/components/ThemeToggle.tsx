import { Button } from "@/components/ui/button";
import { useThemeCycle } from "@/hooks/useThemeCycle";
import type { ThemeMode } from "@/hooks/useThemeCycle";
import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

const LABELS: Record<ThemeMode, string> = {
  system: "سیستم",
  light: "روشن",
  dark: "تاریک",
};

interface ThemeToggleProps {
  /** Renders the label next to the icon, for the mobile drawer where there is room. */
  showLabel?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function ThemeToggle({ showLabel = false, className, style }: ThemeToggleProps) {
  const { mode, next, cycle, mounted, Icon } = useThemeCycle();
  const description = `پوسته: ${LABELS[mode]}. تغییر به ${LABELS[next]}.`;

  return (
    <Button
      type="button"
      variant="ghost"
      size={showLabel ? "sm" : "icon"}
      onClick={cycle}
      style={style}
      aria-label={description}
      title={description}
      className={cn(showLabel && "justify-start gap-2 px-0", className)}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
      <span className={cn(!showLabel && "sr-only")}>{mounted ? LABELS[mode] : LABELS.system}</span>
    </Button>
  );
}
