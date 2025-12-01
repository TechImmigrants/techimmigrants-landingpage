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
}

export const COUNTRY_LABELS: Record<string, string> = {
  "UK": "انگلستان",
  "Germany": "آلمان",
  "Canada": "کانادا",
  "Netherlands": "هلند",
  "Sweden": "سوئد",
  "USA": "آمریکا",
  "Australia": "استرالیا",
};

export const videos: Video[] = [
  {
    id: "1",
    title: "از تهران تا لندن: مسیر یک مهندس بک‌اند",
    guestName: "علی رضایی",
    guestRole: "Backend",
    country: "UK",
    youtubeId: "dQw4w9WgXcQ",
    recordedAt: "2024-10-15",
    shortDescription: "علی درباره تجربه مهاجرت به انگلستان و کار در استارتاپ‌های فین‌تک صحبت می‌کنه",
    tags: ["فین‌تک", "استارتاپ", "ویزای کاری"],
    relatedResourceIds: ["1", "3"],
    featured: true,
  },
  {
    id: "2",
    title: "طراحی محصول در برلین",
    guestName: "سارا محمدی",
    guestRole: "Designer",
    country: "Germany",
    youtubeId: "dQw4w9WgXcQ",
    recordedAt: "2024-09-20",
    shortDescription: "سارا از تجربه کار به عنوان طراح محصول در شرکت‌های آلمانی می‌گه",
    tags: ["طراحی", "UX", "کار تیمی"],
    relatedResourceIds: ["2"],
    featured: true,
  },
  {
    id: "3",
    title: "مسیر مهاجرت یک برنامه‌نویس موبایل به کانادا",
    guestName: "محمد حسینی",
    guestRole: "Mobile",
    country: "Canada",
    youtubeId: "dQw4w9WgXcQ",
    recordedAt: "2024-08-10",
    shortDescription: "محمد درباره مسیر مهاجرت و یافتن کار به عنوان iOS Developer صحبت می‌کنه",
    tags: ["iOS", "Swift", "اکسپرس انتری"],
    relatedResourceIds: ["4"],
  },
  {
    id: "4",
    title: "از دانشجویی تا مهندس داده در هلند",
    guestName: "نگار احمدی",
    guestRole: "Data",
    country: "Netherlands",
    youtubeId: "dQw4w9WgXcQ",
    recordedAt: "2024-11-01",
    shortDescription: "نگار از تجربه تحصیل و کار در هلند به عنوان Data Engineer می‌گه",
    tags: ["داده", "تحصیل", "هلند"],
    relatedResourceIds: ["1", "5"],
    featured: true,
  },
  {
    id: "5",
    title: "مدیریت محصول در استارتاپ‌های سوئدی",
    guestName: "امیر کریمی",
    guestRole: "Product Manager",
    country: "Sweden",
    youtubeId: "dQw4w9WgXcQ",
    recordedAt: "2024-07-25",
    shortDescription: "امیر درباره نقش PM و فرهنگ کاری سوئد صحبت می‌کنه",
    tags: ["محصول", "استارتاپ", "سوئد"],
    relatedResourceIds: ["3"],
  },
  {
    id: "6",
    title: "بنیان‌گذاری استارتاپ در آمریکا",
    guestName: "مریم زارعی",
    guestRole: "Founder",
    country: "USA",
    youtubeId: "dQw4w9WgXcQ",
    recordedAt: "2024-06-15",
    shortDescription: "مریم از تجربه ساخت استارتاپ در سیلیکون ولی می‌گه",
    tags: ["استارتاپ", "بنیان‌گذاری", "سرمایه‌گذاری"],
    relatedResourceIds: ["6"],
  },
  {
    id: "7",
    title: "فرانت‌اند در شرکت‌های بزرگ آلمانی",
    guestName: "رضا نوری",
    guestRole: "Frontend",
    country: "Germany",
    youtubeId: "dQw4w9WgXcQ",
    recordedAt: "2024-05-20",
    shortDescription: "رضا درباره تجربه کار با React در شرکت‌های بزرگ صحبت می‌کنه",
    tags: ["React", "فرانت‌اند", "آلمان"],
    relatedResourceIds: ["2", "5"],
  },
  {
    id: "8",
    title: "DevOps در استرالیا",
    guestName: "پریسا فرهادی",
    guestRole: "DevOps / SRE",
    country: "Australia",
    youtubeId: "dQw4w9WgXcQ",
    recordedAt: "2024-04-10",
    shortDescription: "پریسا از مسیر مهاجرت و کار به عنوان SRE در ملبورن می‌گه",
    tags: ["DevOps", "Cloud", "استرالیا"],
    relatedResourceIds: ["4"],
  },
];
