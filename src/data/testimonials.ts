export interface Testimonial {
  id: string;
  name: string;
  role: string;
  country: string;
  avatar?: string;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "مریم کریمی",
    role: "Frontend Developer",
    country: "آلمان",
    text: "تک ایمیگرنتس خیلی بهم کمک کرد که با واقعیت‌های بازار کار آلمان آشنا بشم. مصاحبه‌ها پر از نکات عملی هستن که جایی دیگه پیدا نمیشه.",
  },
  {
    id: "2",
    name: "امیر حسینی",
    role: "Backend Engineer",
    country: "هلند",
    text: "از طریق منتورهای تک ایمیگرنتس تونستم برای مصاحبه‌های فنی آماده بشم. الان تو آمستردام کار می‌کنم و خیلی خوشحالم.",
  },
  {
    id: "3",
    name: "سارا محمدی",
    role: "Product Manager",
    country: "کانادا",
    text: "ویدیوهای یوتیوب تک ایمیگرنتس انگیزه‌ای بود که مسیر مهاجرتم رو شروع کنم. دیدن تجربه‌های واقعی خیلی الهام‌بخش بود.",
  },
  {
    id: "4",
    name: "رضا احمدی",
    role: "Data Scientist",
    country: "انگلستان",
    text: "گروه تلگرام تک ایمیگرنتس یه جامعه فوق‌العاده‌ست. هر سوالی داشته باشی، کسی هست که کمکت کنه.",
  },
];
