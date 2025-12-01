import { GuestRole } from "./videos";

export interface Mentor {
  id: string;
  name: string;
  country: string;
  role: GuestRole;
  company?: string;
  description: string;
  available: boolean;
}

export const mentors: Mentor[] = [
  {
    id: "1",
    name: "علی رضایی",
    country: "UK",
    role: "Backend",
    company: "یک شرکت فین‌تک",
    description: "۵ سال تجربه کار در لندن، آماده کمک در زمینه مصاحبه فنی و ویزای کاری",
    available: true,
  },
  {
    id: "2",
    name: "سارا محمدی",
    country: "Germany",
    role: "Designer",
    company: "یک استارتاپ برلینی",
    description: "متخصص UX/UI، می‌تونم در زمینه پورتفولیو و مصاحبه طراحی کمک کنم",
    available: true,
  },
  {
    id: "3",
    name: "محمد حسینی",
    country: "Canada",
    role: "Mobile",
    description: "iOS Developer در تورنتو، آشنا با مسیر اکسپرس انتری و بازار کار کانادا",
    available: false,
  },
  {
    id: "4",
    name: "نگار احمدی",
    country: "Netherlands",
    role: "Data",
    company: "یک شرکت بزرگ هلندی",
    description: "Data Engineer با تجربه تحصیل و کار در هلند",
    available: true,
  },
];
