import Link from "next/link";
import { ArrowRight, Zap, BookOpen, Wrench, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BlogCard } from "@/components/blog-card";
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
  const posts = getAllBlogPosts().slice(0, 4);
  const tools = getAllTools().slice(0, 6);

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
            <Badge variant="secondary" className="mb-6">
              Practical AI Engineering for Builders
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Build Real AI Systems.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              Practical AI engineering, tools, experiments, and startup
              architectures. No fluff — just real systems built by real
              engineers.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/blog">
                <Button size="lg" className="h-12 px-8 text-base">
                  Explore Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/newsletter">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-base"
                >
                  Join Newsletter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-b border-border/40 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="group">
                <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-2.5">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
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
            <div className="grid gap-6 sm:grid-cols-2">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
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
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <Link key={tool.slug} href={`/tools/${tool.slug}`}>
                  <Card className="group h-full transition-colors hover:border-primary/50">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {tool.name}
                          </h3>
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
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-border/60">
                <CardContent className="p-6">
                  <h3 className="text-base font-semibold text-foreground">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-2xl border border-border/60 bg-card p-8 text-center sm:p-12">
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
          </div>
        </div>
      </section>
    </div>
  );
}
