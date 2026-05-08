import type { Metadata } from "next";
import { NewsletterForm } from "@/components/newsletter-form";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Newsletter",
  description: `Subscribe to the ${siteConfig.name} newsletter. Weekly AI tools, engineering insights, and startup lessons.`,
};

export default function NewsletterPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Stay ahead in AI engineering
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Join builders who ship real AI systems. Get weekly insights delivered
          to your inbox.
        </p>
      </div>

      <div className="mt-10">
        <NewsletterForm variant="large" />
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <div className="rounded-lg border border-border/60 p-5">
          <h3 className="font-semibold text-foreground">Weekly AI Tools</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Curated picks of the best AI tools with honest reviews.
          </p>
        </div>
        <div className="rounded-lg border border-border/60 p-5">
          <h3 className="font-semibold text-foreground">Engineering Insights</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Deep dives into production AI systems and architectures.
          </p>
        </div>
        <div className="rounded-lg border border-border/60 p-5">
          <h3 className="font-semibold text-foreground">Build In Public</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Real stories of building AI products — failures and wins.
          </p>
        </div>
        <div className="rounded-lg border border-border/60 p-5">
          <h3 className="font-semibold text-foreground">Startup Lessons</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Architecture decisions, scaling stories, and technical strategy.
          </p>
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        No spam, ever. Unsubscribe anytime.
      </p>
    </div>
  );
}
