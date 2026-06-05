import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { useBlogPost } from "@/hooks/useBlogPosts";
import { renderMarkdown } from "@/lib/markdown";
import {
  ArrowRight,
  Calendar,
  Tag,
  Share2,
  MessageCircle,
} from "lucide-react";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { post, loading, error } = useBlogPost(slug);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const handleShare = async () => {
    if (!post) return;
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: post.title, url });
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button variant="ghost" asChild>
              <Link to="/blog" className="gap-2">
                <ArrowRight className="h-4 w-4" />
                بازگشت به بلاگ
              </Link>
            </Button>
          </div>

          {loading && (
            <div className="max-w-3xl mx-auto animate-pulse space-y-4">
              <div className="h-8 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/4" />
              <div className="aspect-[2/1] bg-muted rounded-xl mt-6" />
              <div className="space-y-3 mt-8">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-4 bg-muted rounded" />
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="text-center py-16">
              <p className="text-destructive text-lg mb-4">مقاله یافت نشد</p>
              <Button variant="outline" asChild>
                <Link to="/blog">بازگشت به بلاگ</Link>
              </Button>
            </div>
          )}

          {!loading && !error && post && (
            <article className="max-w-3xl mx-auto">
              {/* Header */}
              <header className="mb-8">
                <h1 className="text-2xl md:text-4xl font-bold text-foreground leading-tight mb-4">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  {post.published_at && (
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {formatDate(post.published_at)}
                    </span>
                  )}
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
                  >
                    <Share2 className="h-4 w-4" />
                    اشتراک‌گذاری
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full hover:bg-primary/20 transition-colors"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </Link>
                  ))}
                </div>
              </header>

              {/* Cover image */}
              {post.cover_image && (
                <div className="rounded-xl overflow-hidden mb-8 border border-border">
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-auto"
                  />
                </div>
              )}

              {/* Content */}
              <div
                className="prose prose-lg max-w-none
                  prose-headings:text-foreground prose-headings:font-bold
                  prose-p:text-foreground/90 prose-p:leading-relaxed
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground
                  prose-blockquote:border-primary prose-blockquote:text-muted-foreground
                  prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-xl
                  prose-li:text-foreground/90
                  prose-hr:border-border"
                dangerouslySetInnerHTML={{
                  __html: renderMarkdown(post.content),
                }}
              />

              {/* Footer CTA */}
              <div className="mt-12 p-6 bg-card rounded-xl border border-border text-center">
                <h3 className="font-bold text-foreground mb-2">
                  عضو جامعه تک ایمیگرنتس شوید
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  سوال بپرسید، تجربه به اشتراک بذارید، و از مقالات جدید باخبر
                  بشید
                </p>
                <div className="flex justify-center gap-3">
                  <Button asChild>
                    <a
                      href="https://t.me/techimmigrants"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      عضویت در تلگرام
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/blog">مقالات بیشتر</Link>
                  </Button>
                </div>
              </div>
            </article>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
