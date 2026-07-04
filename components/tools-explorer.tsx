"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, X, Star, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/components/reveal";
import type { Tool } from "@/types";

interface ToolsExplorerProps {
  tools: Tool[];
  categories: string[];
}

export function ToolsExplorer({ tools, categories }: ToolsExplorerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return tools.filter((tool) => {
      const matchesCategory =
        !activeCategory || tool.category === activeCategory;
      if (!matchesCategory) return false;
      if (!normalizedQuery) return true;

      const haystack = [
        tool.name,
        tool.excerpt,
        tool.description,
        tool.category,
        ...tool.tags,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [tools, query, activeCategory]);

  return (
    <div>
      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools by name, category, or use case..."
          aria-label="Search AI tools"
          className="h-11 pl-9 pr-9 text-base"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category filters */}
      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <button type="button" onClick={() => setActiveCategory(null)}>
            <Badge variant={activeCategory === null ? "default" : "outline"}>
              All
            </Badge>
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
            >
              <Badge
                variant={activeCategory === category ? "default" : "outline"}
              >
                {category}
              </Badge>
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      {filteredTools.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">
            No tools found
            {query ? (
              <>
                {" "}
                for{" "}
                <span className="font-medium text-foreground">
                  &ldquo;{query}&rdquo;
                </span>
              </>
            ) : null}
            . Try a different search or category.
          </p>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-muted-foreground">
            {filteredTools.length} tool{filteredTools.length !== 1 ? "s" : ""}
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool, i) => (
              <Reveal key={tool.slug} delay={(i % 3) * 80}>
                <Link href={`/tools/${tool.slug}`} className="group block h-full">
                  <article className="flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {tool.logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={tool.logo}
                            alt={tool.name}
                            className="h-10 w-10 rounded-lg object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary ring-1 ring-primary/20">
                            {tool.name.charAt(0)}
                          </span>
                        )}
                        <div>
                          <h2 className="font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
                            {tool.name}
                          </h2>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {tool.category}
                          </Badge>
                        </div>
                      </div>
                      {tool.rating > 0 && (
                        <span className="flex shrink-0 items-center gap-0.5 text-sm font-medium text-foreground">
                          <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                          {tool.rating}
                        </span>
                      )}
                    </div>

                    <p className="mt-3 line-clamp-2 flex-1 text-sm text-muted-foreground">
                      {tool.excerpt || tool.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                      <span className="text-xs font-medium text-foreground">
                        {tool.pricing}
                      </span>
                      <span className="inline-flex items-center text-xs font-medium text-primary">
                        View review
                        <ArrowUpRight className="ml-0.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
