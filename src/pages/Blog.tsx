import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { BlogCard } from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { BLOG_TAGS } from "@/data/blog";
import { ArrowRight, BookOpen } from "lucide-react";

export default function Blog() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { posts, loading, error } = useBlogPosts(selectedTag);

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button variant="ghost" asChild>
              <Link to="/" className="gap-2">
                <ArrowRight className="h-4 w-4" />
                بازگشت به صفحه اصلی
              </Link>
            </Button>
          </div>

          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <BookOpen className="h-4 w-4" />
              بلاگ
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              مقالات تک ایمیگرنتس
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              نکات کاربردی درباره مصاحبه، رزومه، بازار کار، و مسیر مهاجرت — از
              تجربه واقعی جامعه
            </p>
          </div>

          {/* Tag filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedTag === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              همه
            </button>
            {BLOG_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  setSelectedTag(selectedTag === tag ? null : tag)
                }
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === tag
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-card rounded-xl border border-border overflow-hidden animate-pulse"
                >
                  <div className="aspect-[2/1] bg-muted" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-destructive">{error}</p>
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg mb-2">
                هنوز مقاله‌ای منتشر نشده
              </p>
              <p className="text-muted-foreground text-sm">
                به‌زودی مقالات کاربردی اینجا منتشر میشن
              </p>
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <>
              <div className="text-sm text-muted-foreground mb-6">
                {posts.length} مقاله یافت شد
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
