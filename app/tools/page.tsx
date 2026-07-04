import type { Metadata } from "next";
import { ToolsExplorer } from "@/components/tools-explorer";
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
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          AI Tools{" "}
          <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Directory
          </span>
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Honest reviews of the best AI tools for developers, with pricing, pros
          and cons, and the real use cases they actually shine at.
        </p>

        {/* Stat bar */}
        <dl className="mt-8 grid max-w-lg grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border/60 bg-card px-4 py-3 text-center">
            <dt className="text-2xl font-bold text-foreground">
              {tools.length}+
            </dt>
            <dd className="text-xs text-muted-foreground">Tools reviewed</dd>
          </div>
          <div className="rounded-xl border border-border/60 bg-card px-4 py-3 text-center">
            <dt className="text-2xl font-bold text-foreground">
              {categories.length}+
            </dt>
            <dd className="text-xs text-muted-foreground">Categories</dd>
          </div>
          <div className="col-span-2 rounded-xl border border-border/60 bg-card px-4 py-3 text-center sm:col-span-1">
            <dt className="text-2xl font-bold text-foreground">Unbiased</dt>
            <dd className="text-xs text-muted-foreground">No paid rankings</dd>
          </div>
        </dl>
      </div>

      {tools.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">
            No tools listed yet. Check back soon!
          </p>
        </div>
      ) : (
        <ToolsExplorer tools={tools} categories={categories} />
      )}
    </div>
  );
}
