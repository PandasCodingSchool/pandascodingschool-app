import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { NewsletterForm } from "@/components/newsletter-form";
import { getBlogPost, getAllBlogPosts, getRelatedPosts } from "@/lib/content";
import { renderMDX } from "@/lib/mdx";
import { siteConfig } from "@/lib/config";
import { format } from "date-fns";
import { getArticleJsonLd } from "@/lib/json-ld";

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      url: `${siteConfig.url}/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  const content = await renderMDX(post.content);
  const relatedPosts = getRelatedPosts(slug, 3);

  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getArticleJsonLd(post)),
        }}
      />
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Blog
      </Link>

      <header className="mb-10">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Link
            href={`/blog/category/${post.category.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <Badge variant="secondary">{post.category}</Badge>
          </Link>
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <Badge variant="outline" className="text-xs">
                {tag}
              </Badge>
            </Link>
          ))}
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{post.author}</span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {format(new Date(post.date), "MMMM d, yyyy")}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime}
          </span>
        </div>
      </header>

      <Separator className="mb-10" />

      <div className="prose-custom">{content}</div>

      <Separator className="my-12" />

      {/* Newsletter CTA */}
      <div className="rounded-xl border border-border/60 bg-card p-6 text-center sm:p-8">
        <h3 className="text-lg font-semibold text-foreground">
          Enjoyed this article?
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Get more AI engineering insights delivered to your inbox.
        </p>
        <div className="mx-auto mt-4 max-w-sm">
          <NewsletterForm />
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-12">
          <h3 className="mb-6 text-xl font-semibold text-foreground">
            Related Articles
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {relatedPosts.map((related) => (
              <Link key={related.slug} href={`/blog/${related.slug}`}>
                <Card className="group h-full transition-colors hover:border-primary/50">
                  <CardContent className="p-4">
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {related.category}
                    </Badge>
                    <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {related.title}
                    </h4>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {related.readingTime}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
