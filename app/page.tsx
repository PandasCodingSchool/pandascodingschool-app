import Link from "next/link";
import {
  ArrowRight,
  Zap,
  BookOpen,
  Wrench,
  Code2,
  Check,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BlogCard } from "@/components/blog-card";
import { FeaturedPost } from "@/components/featured-post";
import { FaqAccordion } from "@/components/faq-accordion";
import { Reveal } from "@/components/reveal";
import { NewsletterForm } from "@/components/newsletter-form";
import { getAllBlogPosts, getAllTools } from "@/lib/content";
import { HeroGridBg } from "@/components/hero-grid-bg";
import { getWebsiteJsonLd, getFAQJsonLd } from "@/lib/json-ld";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is Panda Coding School?",
    answer:
      "Panda Coding School is a resource hub for developers and engineers who want to build real AI systems. We provide practical tutorials, tool reviews, and build-in-public stories focused on AI engineering, agent architectures, and developer productivity.",
  },
  {
    question: "Who is behind Panda Coding School?",
    answer:
      "Panda Coding School is run by a team of engineers and builders who have shipped AI systems in production. We share what actually works, what failed, and lessons learned from real projects.",
  },
  {
    question: "What topics do you cover?",
    answer:
      "We cover AI coding tools (Cursor, GitHub Copilot, Claude), agent architectures (LangGraph, RAG systems), voice AI, real-time analytics, vector databases, and startup engineering. Everything is hands-on and production-focused.",
  },
  {
    question: "Is the content free?",
    answer:
      "Yes, all our articles, tool reviews, and resources are completely free. We also offer a free newsletter with weekly AI engineering insights and exclusive tips not published on the blog.",
  },
  {
    question: "How often do you publish new content?",
    answer:
      "We publish new articles weekly, covering the latest AI tools, engineering patterns, and build-in-public updates. Newsletter subscribers get early access and exclusive content.",
  },
  {
    question: "Can I suggest a topic or tool to review?",
    answer:
      "Absolutely! We love hearing from the community. Reach out to us on Twitter @pandacodingschool or through our newsletter with your suggestions. We prioritize topics that help builders ship better AI systems.",
  },
];

const features = [
  {
    icon: Wrench,
    title: "AI Tools Discovery",
    description:
      "Curated reviews of the best AI tools with pricing, pros/cons, and real use cases.",
  },
  {
    icon: Code2,
    title: "Build In Public",
    description:
      "Transparent engineering stories — what worked, what failed, and lessons learned.",
  },
  {
    icon: BookOpen,
    title: "Deep Technical Content",
    description:
      "RAG systems, agent orchestration, voice AI, real-time analytics, and more.",
  },
  {
    icon: Zap,
    title: "Developer Resources",
    description:
      "Architecture templates, AI boilerplates, prompt packs, and debugging checklists.",
  },
];

export default function Home() {
  const allPosts = getAllBlogPosts();
  const allTools = getAllTools();
  const posts = allPosts.slice(0, 4);
  const tools = allTools.slice(0, 6);

  const topicCount = new Set(allPosts.flatMap((p) => p.tags)).size;
  const stats = [
    { value: `${allPosts.length}+`, label: "In-depth articles" },
    { value: `${allTools.length}+`, label: "AI tools reviewed" },
    { value: `${topicCount}+`, label: "Topics covered" },
    { value: "Weekly", label: "New content" },
  ];

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getWebsiteJsonLd()),
        }}
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40">
        <HeroGridBg />
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="secondary"
              className="mb-6 gap-1.5 border-primary/20 bg-primary/10 text-primary"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              New AI deep-dives every week
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Learn to build AI systems that{" "}
              <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                actually ship
              </span>
              .
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              I break down the AI tools, agent architectures, and engineering
              patterns I use to build production systems. Real code, real
              trade-offs, and the mistakes I made so you don&apos;t have to.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/blog">
                <Button size="lg" className="h-12 px-8 text-base">
                  Start Reading
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

            {/* Stat bar */}
            <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <dt className="text-2xl font-bold text-foreground sm:text-3xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-b border-border/40 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Everything you need to build with AI
            </h2>
            <p className="mt-3 text-muted-foreground">
              No theory dumps. Just the tools, patterns, and hard-won lessons
              that help you ship.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 80}>
                <div className="group h-full rounded-xl border border-border/60 bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                  <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-2.5 ring-1 ring-primary/20 transition-colors group-hover:bg-primary/15">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {posts.length > 0 && (
        <section className="border-b border-border/40 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Latest Articles
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Deep dives into AI engineering, tools, and architectures.
                </p>
              </div>
              <Link
                href="/blog"
                className="hidden text-sm font-medium text-primary hover:text-primary/80 sm:block"
              >
                View all <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
              </Link>
            </div>
            <FeaturedPost post={posts[0]} />
            {posts.length > 1 && (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.slice(1).map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            )}
            <div className="mt-6 text-center sm:hidden">
              <Link
                href="/blog"
                className="text-sm font-medium text-primary hover:text-primary/80"
              >
                View all articles{" "}
                <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* AI Tools Spotlight */}
      {tools.length > 0 && (
        <section className="border-b border-border/40 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  AI Tools Spotlight
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Discover the best AI tools for developers and builders.
                </p>
              </div>
              <Link
                href="/tools"
                className="hidden text-sm font-medium text-primary hover:text-primary/80 sm:block"
              >
                View all <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool, i) => (
                <Reveal key={tool.slug} delay={(i % 3) * 80}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="group block h-full"
                  >
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
                            <h3 className="font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
                              {tool.name}
                            </h3>
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
                      <div className="mt-4 border-t border-border/60 pt-3 text-xs font-medium text-foreground">
                        {tool.pricing}
                      </div>
                    </article>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="border-b border-border/40 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* FAQ Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(getFAQJsonLd(faqs)),
            }}
          />
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
              <HelpCircle className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-muted-foreground">
              Everything you need to know about Panda Coding School
            </p>
          </div>
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="rounded-2xl border border-border/60 bg-linear-to-b from-card to-primary/5 p-8 text-center sm:p-12">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Stay ahead in AI engineering
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Weekly AI tools, engineering insights, build-in-public updates,
              and startup lessons. Join builders who ship real AI systems.
            </p>
            <div className="mx-auto mt-8 max-w-md">
              <NewsletterForm variant="large" />
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-primary" />
                No spam, ever
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-primary" />
                Unsubscribe anytime
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-primary" />
                One email a week
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
