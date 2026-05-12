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
