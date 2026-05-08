import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getTool, getAllTools } from "@/lib/content";
import { renderMDX } from "@/lib/mdx";
import { siteConfig } from "@/lib/config";
import { getToolJsonLd } from "@/lib/json-ld";

export async function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};

  return {
    title: `${tool.name} Review`,
    description: tool.description || tool.excerpt,
    openGraph: {
      title: `${tool.name} Review | ${siteConfig.name}`,
      description: tool.description || tool.excerpt,
      type: "article",
      url: `${siteConfig.url}/tools/${tool.slug}`,
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getTool(slug);

  if (!tool) notFound();

  const content = await renderMDX(tool.content);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getToolJsonLd(tool)),
        }}
      />
      <Link
        href="/tools"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All Tools
      </Link>

      <header className="mb-10">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {tool.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{tool.category}</Badge>
              {tool.rating > 0 && (
                <span className="text-sm font-medium text-yellow-500">
                  ★ {tool.rating}/5
                </span>
              )}
              <span className="text-sm text-muted-foreground">
                {tool.pricing}
              </span>
            </div>
          </div>
          {tool.url && (
            <a href={tool.url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                Visit
                <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </a>
          )}
        </div>

        <p className="mt-4 text-lg text-muted-foreground">{tool.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {tool.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        {tool.pros.length > 0 && (
          <Card>
            <CardContent className="p-5">
              <h3 className="mb-3 font-semibold text-green-500">Pros</h3>
              <ul className="space-y-2">
                {tool.pros.map((pro) => (
                  <li
                    key={pro}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    {pro}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {tool.cons.length > 0 && (
          <Card>
            <CardContent className="p-5">
              <h3 className="mb-3 font-semibold text-red-500">Cons</h3>
              <ul className="space-y-2">
                {tool.cons.map((con) => (
                  <li
                    key={con}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                    {con}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {tool.useCases.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">
            Use Cases
          </h3>
          <div className="flex flex-wrap gap-2">
            {tool.useCases.map((useCase) => (
              <Badge key={useCase} variant="secondary">
                {useCase}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {tool.alternatives.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">
            Alternatives
          </h3>
          <div className="flex flex-wrap gap-2">
            {tool.alternatives.map((alt) => (
              <Badge key={alt} variant="outline">
                {alt}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <Separator className="my-10" />

      <div className="prose-custom">{content}</div>
    </div>
  );
}
