export type ResourceType = "book" | "website" | "tool" | "article";

export const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  book: "کتاب",
  website: "وب‌سایت",
  tool: "ابزار",
  article: "مقاله",
};

export type ResourceSubject = "resume" | "design" | "interview" | "immigration" | "career" | "technical";

export const RESOURCE_SUBJECT_LABELS: Record<ResourceSubject, string> = {
  resume: "رزومه‌نویسی",
  design: "دیزاین",
  interview: "مصاحبه",
  immigration: "مهاجرت",
  career: "مسیر شغلی",
  technical: "فنی",
};

export interface Resource {
  id: string;
  type: ResourceType[];
  subjects: ResourceSubject[];
  title: string;
  url: string;
  description: string;
  relatedVideoIds?: string[];
}

export const resources: Resource[] = [
  {
    id: "1",
    type: ["book"],
    subjects: ["technical"],
    title: "Designing Data-Intensive Applications",
    url: "https://dataintensive.net/",
    description: "یکی از بهترین کتاب‌ها برای درک سیستم‌های توزیع‌شده و طراحی داده",
    relatedVideoIds: ["1", "4"],
  },
  {
    id: "2",
    type: ["book"],
    subjects: ["design"],
    title: "Don't Make Me Think",
    url: "https://sensible.com/dont-make-me-think/",
    description: "کتاب کلاسیک طراحی UX که هر طراح باید بخونه",
    relatedVideoIds: ["2", "7"],
  },
  {
    id: "3",
    type: ["website"],
    subjects: ["career", "interview"],
    title: "Levels.fyi",
    url: "https://www.levels.fyi/",
    description: "مقایسه حقوق و مزایا در شرکت‌های تکنولوژی مختلف",
    relatedVideoIds: ["1", "5"],
  },
  {
    id: "4",
    type: ["tool"],
    subjects: ["career"],
    title: "Notion",
    url: "https://www.notion.so/",
    description: "ابزار یادداشت‌برداری و مدیریت پروژه که خیلی از مهمان‌ها ازش استفاده می‌کنن",
    relatedVideoIds: ["3", "8"],
  },
  {
    id: "5",
    type: ["article"],
    subjects: ["immigration"],
    title: "راهنمای مهاجرت به اروپا برای برنامه‌نویس‌ها",
    url: "https://example.com/immigration-guide",
    description: "مقاله جامع درباره ویزاهای کاری و مسیرهای مهاجرت به کشورهای اروپایی",
    relatedVideoIds: ["4", "7"],
  },
  {
    id: "6",
    type: ["book"],
    subjects: ["career"],
    title: "The Lean Startup",
    url: "https://theleanstartup.com/",
    description: "کتاب معروف اریک ریس درباره ساخت استارتاپ به روش چابک",
    relatedVideoIds: ["6"],
  },
  {
    id: "7",
    type: ["website"],
    subjects: ["interview", "career"],
    title: "Glassdoor",
    url: "https://www.glassdoor.com/",
    description: "نظرات کارمندان و اطلاعات حقوق در شرکت‌های مختلف",
    relatedVideoIds: ["1", "2", "5"],
  },
  {
    id: "8",
    type: ["tool", "website"],
    subjects: ["resume", "career"],
    title: "LinkedIn Premium",
    url: "https://www.linkedin.com/premium/",
    description: "برای پیدا کردن کار در خارج از کشور خیلی مفیده",
    relatedVideoIds: ["1", "3", "6"],
  },
];
