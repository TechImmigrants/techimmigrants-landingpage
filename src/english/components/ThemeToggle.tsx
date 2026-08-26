import { useThemeCycle } from "@/hooks/useThemeCycle";
import type { ThemeMode } from "@/hooks/useThemeCycle";

const LABELS: Record<ThemeMode, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

export function ThemeToggle() {
  const { mode, next, cycle, mounted, Icon } = useThemeCycle();
  const description = `Theme: ${LABELS[mode]}. Switch to ${LABELS[next]}.`;

  return (
    <button
      type="button"
      className="ti-theme-toggle"
      onClick={cycle}
      aria-label={description}
      title={description}
    >
      <Icon aria-hidden="true" />
      <span className="ti-visually-hidden">{mounted ? LABELS[mode] : LABELS.system}</span>
    </button>
  );
}
