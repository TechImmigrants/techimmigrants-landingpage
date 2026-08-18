export type GuestRole = 
  | "Backend"
  | "Frontend"
  | "Mobile"
  | "Data"
  | "Product Manager"
  | "DevOps / SRE"
  | "Designer"
  | "Founder"
  | "Student";

export const ROLES: GuestRole[] = [
  "Backend",
  "Frontend",
  "Mobile",
  "Data",
  "Product Manager",
  "DevOps / SRE",
  "Designer",
  "Founder",
  "Student",
];

export const ROLE_LABELS: Record<GuestRole, string> = {
  "Backend": "بک‌اند",
  "Frontend": "فرانت‌اند",
  "Mobile": "موبایل",
  "Data": "داده",
  "Product Manager": "مدیر محصول",
  "DevOps / SRE": "دواپس",
  "Designer": "طراح",
  "Founder": "بنیان‌گذار",
  "Student": "دانشجو",
};

export interface Video {
  id: string;
  title: string;
  guestName: string;
  guestRole: GuestRole;
  country: string;
  youtubeId: string;
  recordedAt: string;
  shortDescription: string;
  tags: string[];
  relatedResourceIds?: string[];
  featured?: boolean;
  /** Optional explicit thumbnail (used by sample/fallback data). */
  thumbnailUrl?: string;
  /** Optional explicit watch URL (used by sample/fallback data). */
  watchUrl?: string;
  /** Marks fallback/sample content shown when live data is unavailable. */
  isSample?: boolean;
}

export const COUNTRY_LABELS: Record<string, string> = {
  "UK": "انگلستان",
  "uk": "انگلستان",
  "Germany": "آلمان",
  "germany": "آلمان",
  "Canada": "کانادا",
  "canada": "کانادا",
  "Netherlands": "هلند",
  "netherlands": "هلند",
  "Sweden": "سوئد",
  "sweden": "سوئد",
  "USA": "آمریکا",
  "usa": "آمریکا",
  "Australia": "استرالیا",
  "australia": "استرالیا",
  "Finland": "فنلاند",
  "finland": "فنلاند",
};

export const videos: Video[] = [];

const CHANNEL_URL = "https://youtube.com/@techimmigrants";

/**
 * Sample sessions shown when Supabase is not configured (static mode), so the
 * sessions area is never blank. These are representative examples of the kind
 * of interviews Tech Immigrants publishes; each links to the YouTube channel.
 */
export const sampleVideos: Video[] = [
  {
    id: "sample-1",
    title: "مسیر مهاجرت و کار به‌عنوان مهندس نرم‌افزار در آلمان",
    guestName: "",
    guestRole: "Backend",
    country: "Germany",
    youtubeId: "",
    recordedAt: "2025-09-01",
    shortDescription: "از پیدا کردن کار تا ویزای کاری و زندگی در برلین.",
    tags: ["مهاجرت", "بازار کار"],
    featured: true,
    watchUrl: CHANNEL_URL,
    isSample: true,
  },
  {
    id: "sample-2",
    title: "تجربه طراحی محصول و پیدا کردن job offer در هلند",
    guestName: "",
    guestRole: "Designer",
    country: "Netherlands",
    youtubeId: "",
    recordedAt: "2025-07-15",
    shortDescription: "پورتفولیو، مصاحبه طراحی و فرهنگ کاری در آمستردام.",
    tags: ["دیزاین", "مصاحبه"],
    featured: true,
    watchUrl: CHANNEL_URL,
    isSample: true,
  },
  {
    id: "sample-3",
    title: "مهاجرت و کار در حوزه دیتا در فنلاند",
    guestName: "",
    guestRole: "Data",
    country: "Finland",
    youtubeId: "",
    recordedAt: "2025-05-20",
    shortDescription: "از تحصیل تا کار، و زندگی در اسپو و هلسینکی.",
    tags: ["مهاجرت", "مسیر شغلی"],
    featured: true,
    watchUrl: CHANNEL_URL,
    isSample: true,
  },
];
