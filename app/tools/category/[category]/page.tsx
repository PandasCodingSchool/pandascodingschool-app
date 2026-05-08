import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getAllTools } from "@/lib/content";

export async function generateStaticParams() {
  const tools = getAllTools();
  const categories = new Set(
    tools.map((t) => t.category.toLowerCase().replace(/\s+/g, "-"))
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
    title: `${label.charAt(0).toUpperCase() + label.slice(1)} AI Tools`,
    description: `Browse the best ${label} tools for developers and builders.`,
  };
}

export default async function ToolCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const tools = getAllTools().filter(
    (tool) => tool.category.toLowerCase().replace(/\s+/g, "-") === category
  );

  if (tools.length === 0) notFound();

  const label = category.replace(/-/g, " ");

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Link
        href="/tools"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All Tools
      </Link>

      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground capitalize sm:text-4xl">
          {label} Tools
        </h1>
        <p className="mt-3 text-muted-foreground">
          {tools.length} tool{tools.length !== 1 ? "s" : ""} in this category.
        </p>
      </div>

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
                <div className="mt-3 text-xs text-muted-foreground">
                  {tool.pricing}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
