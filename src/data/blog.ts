export type BlogTag =
  | "مصاحبه"
  | "رزومه"
  | "بازار کار"
  | "AI"
  | "مهاجرت"
  | "زبان"
  | "تجربه"
  | "راهنما";

export const BLOG_TAGS: BlogTag[] = [
  "مصاحبه",
  "رزومه",
  "بازار کار",
  "AI",
  "مهاجرت",
  "زبان",
  "تجربه",
  "راهنما",
];

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  tags: string[];
  language: "fa" | "en";
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}
