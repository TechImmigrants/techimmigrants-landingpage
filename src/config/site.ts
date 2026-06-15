/**
 * Central content + configuration for the Tech Immigrants website.
 *
 * Almost all editable copy, links, stats, programs, sponsorship packages, and
 * FAQ items live here so non-developers can update the site without touching
 * component code. Primary language is Persian (fa); English backups are kept
 * for partner/sponsor facing copy where useful.
 */

export type ProgramStatus = "active" | "pilot" | "open-source" | "coming-soon";

export interface NavItem {
  label: string;
  /** In-page anchor id (e.g. "#programs") or route path (e.g. "/partners"). */
  href: string;
}

export interface Stat {
  value: string;
  label: string;
  hint?: string;
}

export interface JourneyStage {
  id: string;
  name: string;
  emotion: string;
  question: string;
  help: string;
}

export interface Program {
  id: string;
  title: string;
  status: ProgramStatus;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface ResourceLink {
  title: string;
  description: string;
  href: string;
}

export interface SponsorshipPackage {
  id: string;
  name: string;
  goodFor: string;
  includes: string[];
  price: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const site = {
  /** Site metadata (also mirrored in index.html for crawlers). */
  meta: {
    name: "Tech Immigrants",
    nameFa: "تک ایمیگرنتس",
    url: "https://techimmigrants.com/fa/",
    title: "Tech Immigrants — جامعه فارسی‌زبان متخصصان تکنولوژی",
    titleEn: "Tech Immigrants — Community for Persian-speaking tech professionals",
    description:
      "تک ایمیگرنتس به متخصصان فارسی‌زبان تکنولوژی کمک می‌کند مسیر مهاجرت، شغل، پیدا کردن کار، اسکان و تعلق را با کمک یک کامیونیتی قابل اعتماد، تجربه‌های واقعی، منابع کاربردی و ابزارهای ساخته‌شده توسط جامعه طی کنند.",
    descriptionEn:
      "Tech Immigrants helps Persian-speaking tech professionals navigate migration, careers, job search, relocation, and belonging through trusted community, live sessions, resources, and community-powered tools.",
    locale: "fa_IR",
    ogImage: "https://techimmigrants.com/fa/og-image.png",
  },

  /** Public social + community links. */
  social: {
    youtube: "https://youtube.com/@techimmigrants",
    telegram: "https://t.me/techimmigrants",
    linkedin: "https://www.linkedin.com/company/techimmigrants",
    twitter: "https://x.com/techimmigrants",
    instagram: "https://instagram.com/techimmigrants",
    github: "https://github.com/TechImmigrants",
  },

  /** Contact endpoints. Update these to real addresses before launch. */
  contact: {
    email: "hello@techimmigrants.com",
    partnersEmail: "partners@techimmigrants.com",
  },

  /** Primary navigation. Anchors scroll on the homepage; "/" paths route. */
  nav: [
    { label: "خانه", href: "#hero" },
    { label: "کامیونیتی", href: "#community-intelligence" },
    { label: "برنامه‌ها", href: "#programs" },
    { label: "منابع", href: "#resources" },
    { label: "Demo Day", href: "#product-builders" },
    { label: "همکاری با ما", href: "#partners" },
    { label: "حمایت", href: "#support" },
    { label: "تماس", href: "#contact" },
  ] as NavItem[],

  /** Hero copy + calls to action. */
  hero: {
    headline: "مسیر مهاجرت و رشد شغلی در تکنولوژی، با کمک یک کامیونیتی قابل اعتماد",
    subheadline:
      "Tech Immigrants یک کامیونیتی فارسی‌زبان برای متخصصان تکنولوژی است؛ جایی برای یادگیری، تجربه‌های واقعی، مسیر شغلی، مهاجرت، پیدا کردن کار، و کمک کردن به نفر بعدی.",
    taglineEn:
      "Helping Persian-speaking tech professionals navigate migration, careers, and belonging.",
    primaryCta: { label: "عضویت در کامیونیتی", href: "#community-intelligence" },
    secondaryCta: { label: "تماشای جدیدترین سشن‌ها", href: "#resources" },
    tertiaryCta: { label: "همکاری با ما", href: "#partners" },
  },

  /** Trust / proof stats. Editable. Use "+" or "تقریبی" when uncertain. */
  trust: {
    title: "یک کامیونیتی واقعی، با رشد کاملاً ارگانیک",
    subtitle:
      "این اعداد تقریبی و مجموع چند پلتفرم هستند. ما هیچ‌وقت عدد ساختگی منتشر نمی‌کنیم.",
    stats: [
      { value: "+۵۳٬۰۰۰", label: "دسترسی در همه پلتفرم‌ها", hint: "مجموع تقریبی" },
      { value: "+۱۰٬۰۰۰", label: "دنبال‌کننده یوتیوب" },
      { value: "+۲۰٬۰۰۰", label: "عضو و دسترسی تلگرام" },
      { value: "+۹٬۰۰۰", label: "مخاطب لینکدین" },
      { value: "+۱۰٬۰۰۰", label: "مخاطب X / توییتر" },
      { value: "۶ سال", label: "عمر کامیونیتی" },
      { value: "+۱۹۰", label: "اپیزود و سشن" },
      { value: "۱۰۰٪", label: "رشد ارگانیک" },
    ] as Stat[],
  },

  /** Mission section. */
  mission: {
    title: "ماموریت ما",
    lead:
      "ما می‌خواهیم مسیر مهاجرت و رشد شغلی در تکنولوژی کمتر گیج‌کننده و کمتر تنها باشد.",
    points: [
      "کمک به مهاجران برای تصمیم‌های بهتر و آگاهانه‌تر",
      "کم کردن سردرگمی‌های تکراری در مسیر مهاجرت و کار",
      "به اشتراک گذاشتن تجربه‌های واقعی، بدون رؤیافروشی",
      "ساختن ابزارهای کاربردی برای جامعه",
      "وصل کردن آدم‌ها به هم",
      "ساختن چرخه‌ای که هرکس موفق شد، به نفر بعدی کمک کند",
    ],
  },

  /** Migration journey stages. */
  journey: {
    title: "مسیر مهاجرت، مرحله به مرحله",
    subtitle:
      "هر مرحله احساس و سوال خودش را دارد. Tech Immigrants کنار شماست، از اولین جرقه تا جایی که نوبت کمک کردن به دیگران می‌رسد.",
    stages: [
      {
        id: "awakening",
        name: "جرقه و تصمیم",
        emotion: "هیجان و کمی ترس",
        question: "آیا اصلاً مهاجرت برای من گزینه‌ی درستی است؟",
        help: "تجربه‌های واقعی، گفتگوهای صادقانه و دیدن مسیر دیگران برای تصمیم آگاهانه.",
      },
      {
        id: "research",
        name: "تحقیق و برنامه‌ریزی",
        emotion: "سردرگمی میان گزینه‌ها",
        question: "کدام کشور، کدام مسیر، و از کجا شروع کنم؟",
        help: "محتوای کشورمحور، پرسش و پاسخ کامیونیتی و راهنماهای کاربردی.",
      },
      {
        id: "skills",
        name: "آماده‌سازی مهارت‌ها",
        emotion: "انگیزه برای ساختن خود",
        question: "چه مهارت‌ها و رزومه‌ای برای بازار جهانی لازم دارم؟",
        help: "سشن‌های فنی، منابع منتخب، CV Builder و بازخورد جامعه.",
      },
      {
        id: "job-search",
        name: "جستجوی کار",
        emotion: "اضطراب و امید",
        question: "چطور واقعاً از اروپا یا فنلاند job offer بگیرم؟",
        help: "سشن‌های رزومه و جاب‌سرچ، پرسش و پاسخ زنده، CV Builder و playbookها.",
      },
      {
        id: "interview",
        name: "مصاحبه و آفر",
        emotion: "استرس و تمرکز",
        question: "چطور در مصاحبه‌ها بدرخشم و آفر خوب بگیرم؟",
        help: "تجربه مصاحبه‌شونده‌ها، تمرین موک‌اینترویو (پایلوت) و نکات مذاکره.",
      },
      {
        id: "relocation",
        name: "جابه‌جایی و اسکان",
        emotion: "خستگی و دلهره‌ی شروع نو",
        question: "بعد از آفر، برای نقل مکان و شروع زندگی چه کنم؟",
        help: "منابع اسکان و relocation (به‌زودی) و تجربه‌ی اعضای مقیم.",
      },
      {
        id: "thriving",
        name: "رشد و کمک به بقیه",
        emotion: "آرامش و قدردانی",
        question: "حالا چطور به نفر بعدی کمک کنم؟",
        help: "مهمان سشن‌ها شوید، منتور شوید، یا در پروژه‌های متن‌باز مشارکت کنید.",
      },
    ] as JourneyStage[],
  },

  /** Community Intelligence section — aggregate, anonymized signals. */
  communityIntelligence: {
    title: "هوش جمعی کامیونیتی",
    lead:
      "ما حدس نمی‌زنیم جامعه به چه چیزی نیاز دارد. با تحلیل سیگنال‌های تجمیعی و ناشناس‌سازی‌شده‌ی کامیونیتی، مشکلات تکرارشونده را می‌فهمیم و منابع واقعاً مفید می‌سازیم.",
    range: "اکتبر ۲۰۲۰ تا ژوئن ۲۰۲۶",
    stats: [
      { value: "۱۳۴٬۸۱۴", label: "پیام تلگرام تحلیل‌شده" },
      { value: "۱۰٬۵۸۷", label: "مشارکت‌کننده‌ی یکتا" },
      { value: "۶۶٬۵۹۶", label: "سوال مطرح‌شده" },
      { value: "۲۷٬۵۰۳", label: "سیگنال درد و چالش" },
      { value: "۲٬۳۵۶", label: "درخواست صریح محصول/خدمت" },
    ] as Stat[],
    insight:
      "رزومه و جستجوی کار قوی‌ترین حوزه‌ی نیاز است. سوال‌های تکرارشونده نشان می‌دهند جامعه به FAQ و playbookهای ساختارمند نیاز دارد.",
    privacyNote:
      "این بینش‌ها تجمیعی و ناشناس هستند. ما هیچ پیام خصوصی‌ای منتشر نمی‌کنیم و داده‌ی کامیونیتی را نمی‌فروشیم.",
    reportReady: false,
    ctaLabel: "مشاهده گزارش هوش جمعی",
    ctaReadyLabel: "گزارش به‌زودی منتشر می‌شود",
    ctaHref: "#contact",
  },

  /** Programs. */
  programs: {
    title: "برنامه‌های Tech Immigrants",
    subtitle: "اکوسیستمی از محتوا، ابزار و رویداد که کنار مسیر شما رشد می‌کند.",
    items: [
      {
        id: "live-sessions",
        title: "سشن‌های زنده و مصاحبه‌های یوتیوب",
        status: "active",
        description:
          "گفتگوی منظم با متخصصان فارسی‌زبان درباره مهاجرت، کار و زندگی در کشورهای مختلف.",
        ctaLabel: "تماشای سشن‌ها",
        ctaHref: "#resources",
      },
      {
        id: "telegram-qa",
        title: "پرسش و پاسخ کامیونیتی تلگرام",
        status: "active",
        description:
          "جایی برای پرسیدن سوال، به اشتراک گذاشتن تجربه و کمک گرفتن از آدم‌های همفکر.",
        ctaLabel: "عضویت در تلگرام",
        ctaHref: "https://t.me/techimmigrants",
      },
      {
        id: "cv-builder",
        title: "CV Builder متن‌باز",
        status: "open-source",
        description:
          "ابزار ساخت رزومه‌ی متناسب با شرح شغل، ساخته‌شده توسط جامعه و در دسترس همه.",
        ctaLabel: "مشاهده در گیت‌هاب",
        ctaHref: "https://github.com/TechImmigrants",
      },
      {
        id: "product-builders",
        title: "Product Builders / Demo Day",
        status: "pilot",
        description:
          "بستری برای معرفی پروژه‌ها، گرفتن بازخورد و دموی زنده جلوی مشاوران فنی و کسب‌وکار.",
        ctaLabel: "بیشتر بدانید",
        ctaHref: "#product-builders",
      },
      {
        id: "community-intelligence",
        title: "هوش جمعی، FAQ و Playbookها",
        status: "active",
        description:
          "تبدیل سوال‌های تکرارشونده‌ی جامعه به راهنماهای ساختارمند و قابل اتکا.",
        ctaLabel: "بیشتر بدانید",
        ctaHref: "#community-intelligence",
      },
      {
        id: "automation",
        title: "ورکشاپ‌های n8n و اتوماسیون",
        status: "active",
        description:
          "یاد بگیرید چطور با ابزارهای اتوماسیون، کارهای تکراری مهاجرت و کار را ساده کنید.",
      },
      {
        id: "mentorship",
        title: "منتورشیپ و موک‌اینترویو",
        status: "pilot",
        description:
          "برنامه‌ی آزمایشی برای تمرین مصاحبه و راهنمایی مسیر شغلی با کمک اعضای باتجربه.",
      },
      {
        id: "relocation",
        title: "منابع اسکان و relocation",
        status: "coming-soon",
        description:
          "راهنماها و تجربه‌های واقعی برای روزهای اول بعد از نقل مکان به کشور جدید.",
      },
    ] as Program[],
  },

  /** Product Builders / Demo Day. */
  productBuilders: {
    title: "Product Builders و Demo Day",
    badge: "پایلوت",
    description:
      "Product Builders به اعضای کامیونیتی کمک می‌کند چیزی را که می‌سازند نشان دهند، حمایت بگیرند و برای Demo Day انتخاب شوند؛ جایی که می‌توانند پروژه را زنده دمو کنند و از مشاوران فنی و کسب‌وکار بازخورد بگیرند.",
    note: "این برنامه هنوز پایلوت و دستی است؛ ما بیشتر از توان فعلی‌مان قول نمی‌دهیم.",
    primaryCta: { label: "ثبت پروژه", href: "#contact" },
    secondaryCta: { label: "تماشای Demo Day", href: "https://youtube.com/@techimmigrants" },
    tertiaryCta: { label: "مشاور یا اسپانسر شوید", href: "#partners" },
  },

  /** Resources hub (links shown alongside live video/session content). */
  resources: {
    title: "منابع کاربردی",
    subtitle:
      "از اپیزودهای یوتیوب تا ابزار رزومه و راهنماهای جامعه؛ هر چیزی که در مسیر کمکتان می‌کند.",
    links: [
      {
        title: "اپیزودهای یوتیوب",
        description: "آرشیو مصاحبه‌ها و سشن‌های زنده.",
        href: "https://youtube.com/@techimmigrants",
      },
      {
        title: "CV Builder",
        description: "ساخت رزومه‌ی متناسب با شرح شغل (متن‌باز).",
        href: "https://github.com/TechImmigrants",
      },
      {
        title: "منابع جستجوی کار",
        description: "ابزارها و سایت‌های مفید برای پیدا کردن کار در خارج.",
        href: "#resources",
      },
      {
        title: "FAQ و Playbookهای جامعه",
        description: "پاسخ سوال‌های تکرارشونده، برگرفته از هوش جمعی.",
        href: "#community-intelligence",
      },
      {
        title: "منابع اسکان و relocation",
        description: "راهنماهای روزهای اول در کشور جدید (به‌زودی).",
        href: "#resources",
      },
      {
        title: "کامیونیتی تلگرام",
        description: "پرسش و پاسخ زنده و کمک گرفتن از جامعه.",
        href: "https://t.me/techimmigrants",
      },
    ] as ResourceLink[],
  },

  /** Sponsorship / partnership. The most important trust-safe section. */
  partners: {
    title: "همکاری با Tech Immigrants",
    lead:
      "ما فقط با سازمان‌هایی همکاری می‌کنیم که ارزش واقعی برای جامعه می‌سازند. اعتماد کامیونیتی فروشی نیست.",
    /** Toggle to hide all prices and show "تماس بگیرید" instead. */
    showPrices: true,
    accepted: {
      title: "همکاری‌هایی که می‌پذیریم",
      items: [
        "سشن‌های استخدام (hiring)",
        "سشن‌های پرسش و پاسخ با شرکت‌ها (AMA)",
        "ورکشاپ‌های مسیر شغلی",
        "ورکشاپ‌های فنی مفید",
        "برنامه‌های استارتاپ و founders",
        "بورسیه یا دسترسی رایگان برای اعضا",
        "حمایت از اسکان و relocation",
        "ابزارهای شغلی قابل اعتماد",
        "تخفیف محصول/ابزار برای اعضای جامعه",
        "اسپانسرینگ Demo Day",
        "اسپانسرینگ جایزه",
        "مشارکت به‌عنوان مشاور (advisor)",
      ],
    },
    rejected: {
      title: "چیزهایی که نمی‌پذیریم",
      items: [
        "تبلیغات بی‌ربط",
        "وعده‌های مبهم مهاجرتی",
        "خدمات استثمارگرانه",
        "دوره‌های شکارچی (predatory)",
        "طرح‌های یک‌شبه پولدار شدن",
        "تبلیغ کریپتو/کازینو/قمار مشکوک",
        "اسپانسرینگ بدون افشای شفاف",
        "فروش داده‌ی کامیونیتی",
        "تولید لید اسپم‌گونه",
      ],
    },
    packages: [
      {
        id: "supporter",
        name: "حامی کامیونیتی",
        goodFor: "حمایت از کار رایگان کامیونیتی",
        includes: ["ذکر نام/لوگو", "پست تشکر", "درج در وب‌سایت"],
        price: "از €۳۰۰",
      },
      {
        id: "session",
        name: "اسپانسر سشن",
        goodFor: "حمایت از یک سشن زنده یا ورکشاپ",
        includes: [
          "معرفی کوتاه در ابتدای سشن",
          "لینک در توضیحات",
          "یک اعلان تلگرام/لینکدین در صورت ربط‌داشتن",
          "دیده‌شدن پس از رویداد",
        ],
        price: "از €۸۰۰",
      },
      {
        id: "demo-day",
        name: "اسپانسر Demo Day",
        goodFor: "حمایت از Product Builders / Demo Day",
        includes: [
          "اسپانسرینگ رویداد",
          "ذکر نام اسپانسر",
          "گزینه‌ی جایزه برای پروژه‌ها",
          "گزینه‌ی صندلی مشاور",
          "ریکپ پس از رویداد",
        ],
        price: "از €۱٬۵۰۰",
      },
      {
        id: "hiring",
        name: "شریک استخدام",
        goodFor: "شرکت‌هایی که استعداد مهاجر تک را استخدام می‌کنند",
        includes: [
          "سشن زنده/AMA با تمرکز استخدام",
          "دیده‌شدن موقعیت‌های شغلی",
          "پرسش و پاسخ کامیونیتی‌محور",
        ],
        price: "سفارشی",
      },
      {
        id: "strategic",
        name: "شریک استراتژیک",
        goodFor: "همکاری بلندمدت",
        includes: [
          "پکیج چندرویدادی",
          "ورکشاپ‌ها",
          "منابع کامیونیتی",
          "گزارش اثرگذاری (impact)",
        ],
        price: "سفارشی",
      },
    ] as SponsorshipPackage[],
    disclosure: "تمام همکاری‌های اسپانسرشده به‌صورت شفاف اعلام می‌شوند.",
    primaryCta: { label: "شریک ما شوید", href: "#contact" },
    contactCta: { label: "تماس با Tech Immigrants", href: "#contact" },
    mediaKitNote: "مدیا کیت (به‌زودی)",
  },

  /** Support the mission (secondary, transparent — not donation-first). */
  support: {
    title: "حمایت از ماموریت",
    lead:
      "عضویت در کامیونیتی همیشه رایگان است. حمایت کاملاً اختیاری است و فشاری در کار نیست.",
    funds: [
      "ابزارهای کامیونیتی",
      "تولید محتوا",
      "رویدادهای رایگان",
      "پروژه‌های متن‌باز",
      "دسترسی به منتورشیپ",
      "اتوماسیون و زیرساخت",
      "هزینه‌های عملیاتی",
    ],
    cta: { label: "حمایت از Tech Immigrants", href: "#contact" },
    note: "عضویت در کامیونیتی رایگان می‌ماند. حمایت اختیاری است.",
  },

  /** Founder / about. Kept short — the site is about the community. */
  founder: {
    title: "درباره و داستان شکل‌گیری",
    body:
      "Tech Immigrants را سحر پاک‌سرشت، ساکن اسپو فنلاند، بنیان گذاشت. همه‌چیز از یک تجربه‌ی شخصی مهاجرت شروع شد و کم‌کم به یک کامیونیتی قابل اعتماد تبدیل شد.",
    origin: "متولد از یک ویزای رد شده و یک توییت.",
    location: "اسپو، فنلاند",
  },

  /** FAQ. */
  faq: {
    title: "سوال‌های پرتکرار",
    items: [
      {
        question: "Tech Immigrants چیست؟",
        answer:
          "یک کامیونیتی فارسی‌زبان برای متخصصان تکنولوژی که در مسیر مهاجرت، شغل و تعلق همدیگر را کمک می‌کنند؛ با سشن‌های زنده، منابع، و ابزارهای ساخته‌شده توسط جامعه.",
      },
      {
        question: "این کامیونیتی برای چه کسانی است؟",
        answer:
          "برای متخصصان و علاقه‌مندان فارسی‌زبان تکنولوژی که به مهاجرت، رشد شغلی، پیدا کردن کار، اسکان یا کمک به دیگران فکر می‌کنند.",
      },
      {
        question: "آیا عضویت رایگان است؟",
        answer: "بله. عضویت در کامیونیتی رایگان است و رایگان می‌ماند.",
      },
      {
        question: "چطور عضو شوم؟",
        answer:
          "کافی است به کامیونیتی تلگرام بپیوندید و کانال یوتیوب را دنبال کنید. لینک‌ها در همین صفحه و فوتر هستند.",
      },
      {
        question: "چطور سشن‌ها را ببینم؟",
        answer:
          "همه‌ی سشن‌ها و مصاحبه‌ها در کانال یوتیوب منتشر می‌شوند. بخش منابع همین صفحه هم جدیدترین‌ها را نشان می‌دهد.",
      },
      {
        question: "چطور پروژه‌ام را برای Demo Day بفرستم؟",
        answer:
          "از بخش Product Builders روی «ثبت پروژه» بزنید یا با ما تماس بگیرید. این برنامه فعلاً پایلوت است.",
      },
      {
        question: "شرکت من چطور می‌تواند همکاری یا اسپانسر شود؟",
        answer:
          "بخش «همکاری با ما» را ببینید. ما فقط همکاری‌هایی را می‌پذیریم که ارزش واقعی برای جامعه بسازند و همه‌چیز شفاف اعلام می‌شود.",
      },
      {
        question: "آیا داده‌ی کامیونیتی را می‌فروشید؟",
        answer:
          "خیر. ما داده‌ی کامیونیتی را نمی‌فروشیم و پیام‌های خصوصی را منتشر نمی‌کنیم. تحلیل‌ها تجمیعی و ناشناس هستند.",
      },
      {
        question: "آیا اسپانسرها افشا می‌شوند؟",
        answer: "بله. تمام همکاری‌های اسپانسرشده به‌صورت شفاف اعلام می‌شوند.",
      },
      {
        question: "می‌توانم داوطلب شوم یا مشارکت کنم؟",
        answer:
          "حتماً. می‌توانید مهمان سشن‌ها شوید، در پروژه‌های متن‌باز مشارکت کنید یا به دیگران در تلگرام کمک کنید.",
      },
    ] as FaqItem[],
  },

  /** Contact section. */
  contactSection: {
    title: "تماس با ما",
    lead:
      "برای همکاری، اسپانسرینگ، پیشنهاد سشن یا هر سوالی، خوشحال می‌شویم پیامتان را بشنویم.",
    generalLabel: "ایمیل عمومی",
    partnersLabel: "همکاری و اسپانسرینگ",
  },

  /** Footer. */
  footer: {
    mission: "کامیونیتی فارسی‌زبان متخصصان تکنولوژی در مسیر مهاجرت، شغل و تعلق.",
    trustNote: "ما داده‌ی کامیونیتی را نمی‌فروشیم.",
  },
} as const;

export type Site = typeof site;

