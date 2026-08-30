import {
  communityStats,
  persianCommunityTagline,
  socialProfiles,
} from "@/content/communityData";
import type { HeroContent } from "@/english/content/hero";
import type { NavItem } from "@/english/content/navigation";
import type { Platform } from "@/english/content/platforms";

export const persianInstitutionalBrand = {
  href: "/fa/",
  hint: persianCommunityTagline,
  label: "تک ایمیگرنتس، بازگشت به صفحه اصلی",
  name: "تک ایمیگرنتس",
} as const;

export const persianInstitutionalNavigation: readonly NavItem[] = [
  { label: "مصاحبه‌ها", href: "/fa/#interviews" },
  { label: "منتورها", href: "/fa/#mentors" },
  { label: "بلاگ", href: "/fa/blog" },
  { label: "منابع", href: "/fa/#resources" },
  { label: "جامعه", href: "/fa/#community" },
];

export const persianHeroContent: HeroContent = {
  status: "بیش از ۵۴ هزار نفر در شش کانال",
  headingLead: "تجربه‌های مهاجرت در دنیای تکنولوژی،",
  headingRest: "از زبان",
  headingEmphasis: "ایرانیان مهاجر",
  lead:
    "تک ایمیگرنتس یک جامعه داوطلبانه است که با مصاحبه از ایرانیان شاغل در صنعت تکنولوژی در کشورهای مختلف، تجربیات واقعی مهاجرت و کار رو با شما به اشتراک می‌ذاره.",
  actions: {
    telegram: {
      label: "عضویت در گروه تلگرام",
      href: socialProfiles.telegram.url,
    },
    youtube: {
      label: "تماشای مصاحبه‌ها",
      href: "#interviews",
    },
  },
  trust: ["داوطلب‌محور", "فارسی‌زبان", "بر پایه تجربه اعضا"],
  board: {
    title: "کانال‌های جامعه",
    total: communityStats.crossPlatformReach,
    totalLabel: "مجموع دسترسی",
    note: "رشد از دل گفت‌وگوهای مفید.",
  },
};

export const persianPlatforms: readonly Platform[] = [
  {
    id: "telegram",
    name: "تلگرام",
    metric: communityStats.telegramMembers,
    metricLabel: "عضو",
    ...socialProfiles.telegram,
    href: socialProfiles.telegram.url,
  },
  {
    id: "youtube",
    name: "یوتیوب",
    metric: communityStats.youtubeSubscribers,
    metricLabel: "مشترک",
    ...socialProfiles.youtube,
    href: socialProfiles.youtube.url,
  },
  {
    id: "x",
    name: "ایکس",
    metric: communityStats.xFollowers,
    metricLabel: "دنبال‌کننده",
    ...socialProfiles.x,
    href: socialProfiles.x.url,
  },
  {
    id: "linkedin",
    name: "لینکدین",
    metric: communityStats.linkedinFollowers,
    metricLabel: "دنبال‌کننده",
    ...socialProfiles.linkedin,
    href: socialProfiles.linkedin.url,
  },
  {
    id: "instagram",
    name: "اینستاگرام",
    ...socialProfiles.instagram,
    href: socialProfiles.instagram.url,
  },
  {
    id: "github",
    name: "گیت‌هاب",
    ...socialProfiles.github,
    href: socialProfiles.github.url,
  },
];

export const persianTickerTopics = [
  "رزومه‌ای که دیده می‌شود",
  "مصاحبه‌ها",
  "ویزا و مدارک",
  "جابه‌جایی",
  "حقوق و پیشنهادها",
  "۹۰ روز اول",
  "شبکه‌سازی حرفه‌ای",
  "ابزارهای متن‌باز",
  "کارگاه‌ها",
] as const;

export const persianCurrentMonth = new Intl.DateTimeFormat("fa-IR-u-ca-gregory", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date());
