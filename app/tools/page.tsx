import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getAllTools, getAllToolCategories } from "@/lib/content";
import { siteConfig } from "@/lib/config";
import { getBreadcrumbJsonLd, getWebPageJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "AI Tools Directory - Reviews & Comparisons",
  description:
    "Discover the best AI tools for developers, engineers, and builders. Reviews with pricing, pros/cons, and real use cases. Cursor AI, GitHub Copilot, Claude, and more.",
  keywords: [
    "AI tools",
    "developer tools",
    "software reviews",
    "Cursor AI",
    "GitHub Copilot",
    "Claude",
    ...siteConfig.keywords,
  ].slice(0, 15),
  alternates: {
    canonical: `${siteConfig.url}/tools`,
  },
  openGraph: {
    title: "AI Tools Directory - Reviews & Comparisons | Panda Coding School",
    description:
      "Discover the best AI tools for developers, engineers, and builders. Reviews with pricing, pros/cons, and real use cases.",
    type: "website",
    url: `${siteConfig.url}/tools`,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/assets/best-ai-tools.png`,
        width: 1200,
        height: 630,
        alt: "AI Tools Directory - Reviews and Comparisons",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pandacodingschool",
    creator: "@pandacodingschool",
    title: "AI Tools Directory - Reviews & Comparisons",
    description:
      "Discover the best AI tools for developers, engineers, and builders. Reviews with pricing, pros/cons, and real use cases.",
    images: [`${siteConfig.url}/assets/best-ai-tools.png`],
  },
};

export default function ToolsPage() {
  const tools = getAllTools();
  const categories = getAllToolCategories();

  // Structured data
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "AI Tools", url: "/tools" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {/* WebPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getWebPageJsonLd(
              "AI Tools Directory - Reviews & Comparisons",
              "Discover the best AI tools for developers, engineers, and builders. Reviews with pricing, pros/cons, and real use cases.",
              "/tools",
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
          AI Tools Directory
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Curated reviews of the best AI tools with pricing, pros/cons, and real
          use cases.
        </p>
      </div>

      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <Link href="/tools">
            <Badge variant="default">All</Badge>
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              href={`/tools/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <Badge variant="outline">{category}</Badge>
            </Link>
          ))}
        </div>
      )}

      {tools.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">
            No tools listed yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`}>
              <Card className="group h-full transition-colors hover:border-primary/50">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {tool.name}
                      </h2>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {tool.category}
                      </Badge>
                    </div>
                    {tool.rating > 0 && (
                      <span className="text-sm font-medium text-yellow-500">
                        ★ {tool.rating}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                    {tool.excerpt || tool.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {tool.pricing}
                    </span>
                    <div className="flex gap-1">
                      {tool.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-muted-foreground"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
