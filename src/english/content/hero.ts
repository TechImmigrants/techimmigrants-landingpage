import { spellNumber } from "../lib/spellNumber";
import { channelCount, communityStats, communityYears } from "./communityData";
import { siteLinks } from "./site";

const years = communityYears();

export interface HeroContent {
  status: string;
  headingLead: string;
  headingRest: string;
  headingEmphasis: string;
  lead: string;
  actions: {
    telegram: { label: string; href: string };
    youtube: { label: string; href: string };
  };
  trust: readonly string[];
  board: {
    title: string;
    total: string;
    totalLabel: string;
    note: string;
  };
}

export const heroContent: HeroContent = {
  status: `${communityStats.crossPlatformReach} people across ${spellNumber(channelCount).toLowerCase()} channels`,
  headingLead: `${spellNumber(years)} years of Persian speakers in tech`,
  headingRest: "helping each other",
  headingEmphasis: "move forward.",
  lead:
    "Engineers, product managers, designers, and data teams share what actually worked. CVs and interviews, visas and relocation, and the part nobody warns you about: life after the move.",
  actions: {
    telegram: { label: "Join on Telegram", href: siteLinks.telegram },
    youtube: { label: "Watch on YouTube", href: siteLinks.youtube },
  },
  trust: ["Volunteer-run", "Persian-language", "Peer-led"],
  board: {
    title: "Community channels",
    total: communityStats.crossPlatformReach,
    totalLabel: "combined reach",
    note: "Grown through useful conversations.",
  },
};

export const tickerTopics = [
  "CVs that get read",
  "Interviews",
  "Visas and paperwork",
  "Relocation",
  "Salary and offers",
  "First 90 days",
  "Finding your people",
  "Open-source tools",
  "Workshops",
] as const;
