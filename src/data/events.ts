import { GuestRole } from "./videos";

export type EventPlatform = "YouTube Live" | "Instagram Live" | "Other";

export interface LiveEvent {
  id: string;
  title: string;
  guestName: string;
  country: string;
  guestRole: GuestRole;
  datetime: string;
  platform: EventPlatform;
  youtubeOrEventUrl?: string;
  description: string;
}

export const events: LiveEvent[] = [
  {
    id: "1",
    title: "گفتگوی زنده: مهاجرت به آلمان در ۲۰۲۵",
    guestName: "حسین رحیمی",
    country: "Germany",
    guestRole: "Backend",
    datetime: "2025-01-15T18:00:00",
    platform: "YouTube Live",
    youtubeOrEventUrl: "https://youtube.com/live/abc123",
    description: "حسین از تجربه مهاجرت اخیرش به آلمان و بازار کار فعلی صحبت می‌کنه",
  },
  {
    id: "2",
    title: "پرسش و پاسخ: کار در استارتاپ‌های هلند",
    guestName: "فاطمه میرزایی",
    country: "Netherlands",
    guestRole: "Product Manager",
    datetime: "2025-01-22T19:00:00",
    platform: "YouTube Live",
    youtubeOrEventUrl: "https://youtube.com/live/def456",
    description: "فاطمه به سوالات شما درباره کار در استارتاپ‌های هلندی پاسخ می‌ده",
  },
  {
    id: "3",
    title: "لایو ویژه: مسیر تحصیل تا کار در کانادا",
    guestName: "آرش کاظمی",
    country: "Canada",
    guestRole: "Data",
    datetime: "2025-02-01T17:00:00",
    platform: "Instagram Live",
    description: "آرش درباره مسیر تحصیل در کانادا و یافتن کار بعد از فارغ‌التحصیلی صحبت می‌کنه",
  },
];
