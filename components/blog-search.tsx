"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BlogCard } from "@/components/blog-card";
import { FeaturedPost } from "@/components/featured-post";
import type { BlogPost } from "@/types";

interface BlogSearchProps {
  posts: BlogPost[];
  categories: string[];
  initialQuery?: string;
}

export function BlogSearch({
  posts,
  categories,
  initialQuery = "",
}: BlogSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Keyboard shortcuts: "/" focuses search, "Escape" clears/blurs it
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (e.key === "/" && !isTyping) {
        e.preventDefault();
        inputRef.current?.focus();
      }

      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        setQuery("");
        inputRef.current?.blur();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory =
        !activeCategory || post.category === activeCategory;

      if (!matchesCategory) return false;

      if (!normalizedQuery) return true;

      const haystack = [post.title, post.excerpt, post.category, ...post.tags]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [posts, query, activeCategory]);

  const isDefaultView = !query.trim() && !activeCategory;

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
          placeholder="Search articles by title, topic, or tag..."
          aria-label="Search blog articles"
          className="h-11 pl-9 pr-9 text-base"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        ) : (
          <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground sm:inline-block">
            /
          </kbd>
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
      {filteredPosts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">
            No articles found
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
            {filteredPosts.length} article
            {filteredPosts.length !== 1 ? "s" : ""} found
          </p>
          {isDefaultView && filteredPosts.length > 2 ? (
            <>
              <div className="mb-6">
                <FeaturedPost post={filteredPosts[0]} />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {filteredPosts.slice(1).map((post) => (
                  <BlogCard key={post.slug} post={post} showDate />
                ))}
              </div>
            </>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} showDate />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
