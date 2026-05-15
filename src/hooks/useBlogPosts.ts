import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { BlogPost } from "@/data/blog";

export function useBlogPosts(tag?: string | null) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        let query = supabase
          .from("blog_posts")
          .select("*")
          .eq("published", true)
          .eq("language", "fa")
          .order("published_at", { ascending: false });

        if (tag) {
          query = query.contains("tags", [tag]);
        }

        const { data, error: queryError } = await query;

        if (queryError) throw new Error(queryError.message);

        setPosts((data || []) as BlogPost[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "خطا در بارگذاری مقالات");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [tag]);

  return { posts, loading, error };
}

export function useBlogPost(slug: string | undefined) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    async function fetchPost() {
      try {
        const { data, error: queryError } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("slug", slug)
          .eq("published", true)
          .single();

        if (queryError) throw new Error(queryError.message);

        setPost(data as BlogPost);
      } catch (err) {
        setError(err instanceof Error ? err.message : "مقاله یافت نشد");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  return { post, loading, error };
}
