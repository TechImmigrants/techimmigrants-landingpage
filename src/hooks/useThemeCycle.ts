import { Monitor, Moon, Sun } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

export const THEME_MODES = ["system", "light", "dark"] as const;

export type ThemeMode = (typeof THEME_MODES)[number];

const ICONS: Record<ThemeMode, LucideIcon> = {
  system: Monitor,
  light: Sun,
  dark: Moon,
};

const isThemeMode = (value: string | undefined): value is ThemeMode =>
  THEME_MODES.includes(value as ThemeMode);

/**
 * Drives a system → light → dark → system toggle.
 *
 * `next-themes` only knows the stored choice after the first effect runs, so `mounted`
 * stays false for the initial render. Skins should render the control either way — the
 * markup has to be stable to avoid a layout shift — but should not announce a state
 * they cannot know yet.
 */
export function useThemeCycle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const mode: ThemeMode = mounted && isThemeMode(theme) ? theme : "system";
  const next = THEME_MODES[(THEME_MODES.indexOf(mode) + 1) % THEME_MODES.length];

  const cycle = useCallback(() => setTheme(next), [next, setTheme]);

  return { mode, next, cycle, mounted, Icon: ICONS[mode] };
}
