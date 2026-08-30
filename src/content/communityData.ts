export const COMMUNITY_FOUNDED_YEAR = 2020;

export const persianCommunityTagline = "جامعه‌ای فراتر از مرزها";

export const socialProfiles = {
  telegram: { url: "https://t.me/techimmigrants", handle: "@techimmigrants" },
  youtube: { url: "https://youtube.com/@techimmigrants", handle: "@techimmigrants" },
  x: { url: "https://x.com/tech_immigrants", handle: "@tech_immigrants" },
  linkedin: {
    url: "https://www.linkedin.com/company/techimmigrants",
    handle: "techimmigrants",
  },
  instagram: { url: "https://www.instagram.com/techimmigrant", handle: "@techimmigrant" },
  github: { url: "https://github.com/TechImmigrants", handle: "TechImmigrants" },
} as const;

export const telegramChannelProfile = {
  url: "https://t.me/Tech_Immigrants",
  handle: "@Tech_Immigrants",
} as const;

export const communityStats = {
  crossPlatformReach: "54K+",
  telegramMembers: "25K+",
  youtubeSubscribers: "10K+",
  youtubeViews: "350K+",
  watchHours: "70K+",
  xFollowers: "10K+",
  linkedinFollowers: "9K+",
  conversationsStudied: "~200K",
} as const;

export const persianSiteUrl = "/fa/";

export function communityYears(now: Date = new Date()) {
  return Math.max(1, now.getUTCFullYear() - COMMUNITY_FOUNDED_YEAR);
}

export const channelCount = Object.keys(socialProfiles).length;
