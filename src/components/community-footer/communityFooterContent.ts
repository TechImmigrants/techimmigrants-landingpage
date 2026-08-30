import {
  persianCommunityTagline,
  socialProfiles,
  telegramChannelProfile,
} from "../../content/communityData.ts";

export type FooterLocale = "en" | "fa";
export type FooterDirection = "ltr" | "rtl";
export type FooterPlatformId = keyof typeof socialProfiles;

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterChannel extends FooterLink {
  id: string;
  platform: FooterPlatformId;
  handle: string;
}

export interface CommunityFooterContent {
  locale: FooterLocale;
  direction: FooterDirection;
  brandName: string;
  description: string;
  footerNote: string;
  promise: string;
  liveLabel: string;
  reportingMonth: string;
  channelsLabel: string;
  backToTopLabel: string;
  copyDescriptionLabel: string;
  homeHref: string;
  language: FooterLink & {
    hint: string;
    locale: FooterLocale;
    direction: FooterDirection;
  };
  channels: FooterChannel[];
}

interface FooterChannelDefinition {
  id: string;
  platform: FooterPlatformId;
  labels: Record<FooterLocale, string>;
  href: string;
  handle: string;
}

const channelDefinitions: FooterChannelDefinition[] = [
  {
    id: "telegram-group",
    platform: "telegram",
    labels: { en: "Telegram group", fa: "گروه تلگرام" },
    href: socialProfiles.telegram.url,
    handle: socialProfiles.telegram.handle,
  },
  {
    id: "telegram-channel",
    platform: "telegram",
    labels: { en: "Telegram channel", fa: "کانال تلگرام" },
    href: telegramChannelProfile.url,
    handle: telegramChannelProfile.handle,
  },
  {
    id: "youtube",
    platform: "youtube",
    labels: { en: "YouTube", fa: "یوتیوب" },
    ...socialProfiles.youtube,
    href: socialProfiles.youtube.url,
  },
  {
    id: "x",
    platform: "x",
    labels: { en: "X", fa: "X" },
    ...socialProfiles.x,
    href: socialProfiles.x.url,
  },
  {
    id: "linkedin",
    platform: "linkedin",
    labels: { en: "LinkedIn", fa: "لینکدین" },
    ...socialProfiles.linkedin,
    href: socialProfiles.linkedin.url,
  },
  {
    id: "instagram",
    platform: "instagram",
    labels: { en: "Instagram", fa: "اینستاگرام" },
    ...socialProfiles.instagram,
    href: socialProfiles.instagram.url,
  },
  {
    id: "github",
    platform: "github",
    labels: { en: "GitHub", fa: "گیت‌هاب" },
    ...socialProfiles.github,
    href: socialProfiles.github.url,
  },
];

function footerChannels(locale: FooterLocale): FooterChannel[] {
  return channelDefinitions.map(({ labels, ...channel }) => ({
    ...channel,
    label: labels[locale],
  }));
}

function formatReportingMonth(locale: FooterLocale) {
  const intlLocale = locale === "fa" ? "fa-IR-u-ca-gregory" : "en";

  return new Intl.DateTimeFormat(intlLocale, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date());
}

export const communityFooterContent: Record<FooterLocale, CommunityFooterContent> = {
  en: {
    locale: "en",
    direction: "ltr",
    brandName: "Tech Immigrants",
    description:
      "A volunteer-run community of 54K+ Persian speakers in tech. Real experience on CVs, interviews, visas, relocation, and life after the move.",
    footerNote: "Powered by community.",
    promise: "Powered by community.",
    liveLabel: "Live",
    reportingMonth: formatReportingMonth("en"),
    channelsLabel: "Community",
    backToTopLabel: "Tech Immigrants, back to the top",
    copyDescriptionLabel: "Copy the community description",
    homeHref: "#top",
    language: {
      label: "فارسی",
      hint: "Persian site",
      href: "/fa/",
      locale: "fa",
      direction: "rtl",
    },
    channels: footerChannels("en"),
  },
  fa: {
    locale: "fa",
    direction: "rtl",
    brandName: "تک ایمیگرنتس",
    description:
      "تک ایمیگرنتس یک جامعه داوطلبانه است که با مصاحبه از ایرانیان شاغل در صنعت تکنولوژی در کشورهای مختلف، تجربیات واقعی مهاجرت و کار رو با شما به اشتراک می‌ذاره.",
    footerNote: "جامعه ایرانیان شاغل در صنعت تکنولوژی",
    promise: persianCommunityTagline,
    liveLabel: "فعال",
    reportingMonth: formatReportingMonth("fa"),
    channelsLabel: "جامعه",
    backToTopLabel: "تک ایمیگرنتس، بازگشت به بالای صفحه",
    copyDescriptionLabel: "کپی توضیح جامعه",
    homeHref: "/fa/",
    language: {
      label: "English",
      hint: "وب‌سایت انگلیسی",
      href: "/",
      locale: "en",
      direction: "ltr",
    },
    channels: footerChannels("fa"),
  },
};
