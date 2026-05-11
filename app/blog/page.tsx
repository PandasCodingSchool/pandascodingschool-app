import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { BlogCard } from "@/components/blog-card";
import { getAllBlogPosts, getAllBlogCategories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Deep dives into AI engineering, tools, architectures, and build-in-public stories.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const categories = getAllBlogCategories();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Blog
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          AI engineering, tools, architectures, and build-in-public stories.
        </p>
      </div>

      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/blog">
            <Badge variant="default">All</Badge>
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              href={`/blog/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <Badge variant="outline">{category}</Badge>
            </Link>
          ))}
        </div>
      )}

      {posts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">
            No articles yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} showDate />
          ))}
        </div>
      )}
    </div>
  );
}
