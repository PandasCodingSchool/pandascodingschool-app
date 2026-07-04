import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/types";

interface FeaturedPostProps {
  post: BlogPost;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="grid overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 lg:grid-cols-2">
        {/* Banner */}
        {post.image ? (
          <div className="relative aspect-video w-full overflow-hidden bg-muted lg:aspect-auto lg:h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-linear-to-br from-primary/10 via-primary/5 to-background lg:aspect-auto lg:h-full">
            <span className="text-6xl opacity-20">🐼</span>
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/15">
              Featured
            </Badge>
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

          <h2 className="text-2xl font-bold leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl">
            {post.title}
          </h2>

          <p className="mt-4 line-clamp-3 text-muted-foreground">
            {post.excerpt}
          </p>

          <span className="mt-6 inline-flex items-center text-sm font-medium text-primary">
            Read article
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </article>
    </Link>
  );
}
