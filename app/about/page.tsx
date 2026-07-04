import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Wrench, Code2, BookOpen, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { siteConfig, authorProfile } from "@/lib/config";
import { getAllBlogPosts, getAllTools } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name} — practical AI engineering for builders.`,
  alternates: { canonical: `${siteConfig.url}/about` },
};

const values = [
  {
    icon: Code2,
    title: "Real over theoretical",
    description:
      "Everything here comes from systems actually shipped to real users, not toy demos.",
  },
  {
    icon: BookOpen,
    title: "Failures included",
    description:
      "The mistakes and dead-ends matter as much as the wins. You learn from both.",
  },
  {
    icon: Wrench,
    title: "Practical first",
    description:
      "Code you can copy, patterns you can apply today, tools you can actually use.",
  },
  {
    icon: Zap,
    title: "No hype",
    description:
      "Honest takes on what AI can and can't do. No breathless buzzword salad.",
  },
];

const timeline = [
  {
    year: "The problem",
    text: "Most AI content online is either surface-level hype or academic papers. There was nothing in between for engineers who just want to ship.",
  },
  {
    year: "The idea",
    text: "Document real builds end to end: architecture, code, trade-offs, and the messy parts nobody talks about.",
  },
  {
    year: "Today",
    text: "A growing library of deep-dives, tool reviews, and build-in-public stories, published every week.",
  },
];

export default function AboutPage() {
  const postCount = getAllBlogPosts().length;
  const toolCount = getAllTools().length;

  const stats = [
    { value: `${postCount}+`, label: "Articles" },
    { value: `${toolCount}+`, label: "Tools reviewed" },
    { value: "Weekly", label: "New content" },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      {/* Hero */}
      <section className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
        <Image
          src={authorProfile.avatar}
          alt={authorProfile.name}
          width={112}
          height={112}
          className="h-28 w-28 shrink-0 rounded-2xl object-cover ring-2 ring-primary/20"
        />
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-primary">
            About {siteConfig.name}
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Practical AI engineering, minus the hype
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            {authorProfile.bio}
          </p>
        </div>
      </section>

      {/* Stats */}
      <dl className="mt-12 grid grid-cols-3 gap-6 rounded-2xl border border-border/60 bg-card p-6">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <dt className="text-2xl font-bold text-foreground sm:text-3xl">
              {stat.value}
            </dt>
            <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">
              {stat.label}
            </dd>
          </div>
        ))}
      </dl>

      {/* Story */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Why this exists
        </h2>
        <div className="mt-6 space-y-4 text-muted-foreground leading-7">
          <p>
            {siteConfig.name} is built for developers, founders, indie hackers,
            and AI engineers who build real systems. It is{" "}
            <strong className="text-foreground">not</strong> another traditional
            tutorial site.
          </p>
          <p>
            You&apos;ll find AI tool reviews, build-in-public engineering
            stories, deep technical breakdowns, and free resources, all focused
            on production-grade systems. Real code, real trade-offs, and the
            lessons that only show up when you actually ship.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          The story
        </h2>
        <div className="mt-8 space-y-8 border-l border-border pl-8">
          {timeline.map((item, i) => (
            <Reveal key={item.year} delay={i * 100} className="relative">
              <span className="absolute -left-10.25 top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-background">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">
                {item.year}
              </h3>
              <p className="mt-1 text-muted-foreground leading-7">
                {item.text}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          What I care about
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 80}>
              <div className="h-full rounded-xl border border-border/60 bg-card p-6">
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-2.5 ring-1 ring-primary/20">
                  <value.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16">
        <div className="rounded-2xl border border-border/60 bg-linear-to-b from-card to-primary/5 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Let&apos;s build something real
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Start with the latest articles, or get weekly AI engineering
            insights straight to your inbox.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/blog">
              <Button size="lg" className="h-12 px-8 text-base">
                Read the Blog
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/newsletter">
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base"
              >
                Join the Newsletter
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
