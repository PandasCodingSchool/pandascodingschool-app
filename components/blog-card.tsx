import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
  showDate?: boolean;
}

export function BlogCard({ post, showDate = false }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
        {/* Banner image */}
        {post.image ? (
          <div className="relative aspect-video w-full overflow-hidden bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="relative aspect-video w-full overflow-hidden bg-linear-to-br from-primary/10 via-primary/5 to-background flex items-center justify-center">
            <span className="text-4xl opacity-20">🐼</span>
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {post.category}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {post.readingTime}
            </span>
            {showDate && (
              <span className="text-xs text-muted-foreground">
                {format(new Date(post.date), "MMM d, yyyy")}
              </span>
            )}
          </div>

          <h2 className="text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
            {post.title}
          </h2>

          <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">
            {post.excerpt}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs text-muted-foreground">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
