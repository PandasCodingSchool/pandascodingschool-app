import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { BlogCard } from "@/components/blog-card";
import { getAllBlogPosts, getAllBlogCategories } from "@/lib/content";
import { siteConfig } from "@/lib/config";
import { getBreadcrumbJsonLd, getWebPageJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Blog - AI Engineering Tutorials & Reviews",
  description:
    "Deep dives into AI engineering, tools, architectures, and build-in-public stories. Learn to build with AI.",
  keywords: [
    "AI blog",
    "engineering tutorials",
    "AI tools",
    "developer resources",
    ...siteConfig.keywords,
  ].slice(0, 15),
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
  openGraph: {
    title: "Blog - AI Engineering Tutorials & Reviews | Panda Coding School",
    description:
      "Deep dives into AI engineering, tools, architectures, and build-in-public stories.",
    type: "website",
    url: `${siteConfig.url}/blog`,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/assets/best-ai-tools.png`,
        width: 1200,
        height: 630,
        alt: "Panda Coding School Blog - AI Engineering Tutorials",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pandacodingschool",
    creator: "@pandacodingschool",
    title: "Blog - AI Engineering Tutorials & Reviews",
    description:
      "Deep dives into AI engineering, tools, architectures, and build-in-public stories.",
    images: [`${siteConfig.url}/assets/best-ai-tools.png`],
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const categories = getAllBlogCategories();

  // Structured data
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {/* WebPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getWebPageJsonLd(
              "Blog - AI Engineering Tutorials & Reviews",
              "Deep dives into AI engineering, tools, architectures, and build-in-public stories.",
              "/blog",
            ),
          ),
        }}
      />
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbItems)),
        }}
      />
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
