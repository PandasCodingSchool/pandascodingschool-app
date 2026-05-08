import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getAllBlogPosts } from "@/lib/content";
import { format } from "date-fns";

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  const categories = new Set(
    posts.map((p) => p.category.toLowerCase().replace(/\s+/g, "-"))
  );
  return Array.from(categories).map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const label = category.replace(/-/g, " ");
  return {
    title: `${label.charAt(0).toUpperCase() + label.slice(1)} Articles`,
    description: `Browse all articles in the ${label} category.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const posts = getAllBlogPosts().filter(
    (post) =>
      post.category.toLowerCase().replace(/\s+/g, "-") === category
  );

  if (posts.length === 0) notFound();

  const label = category.replace(/-/g, " ");

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All Articles
      </Link>

      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground capitalize sm:text-4xl">
          {label}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {posts.length} article{posts.length !== 1 ? "s" : ""} in this
          category.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="group h-full transition-colors hover:border-primary/50">
              <CardContent className="p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {post.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {post.readingTime}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(post.date), "MMM d, yyyy")}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {post.excerpt}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
