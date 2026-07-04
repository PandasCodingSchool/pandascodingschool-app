import type { Metadata } from "next";
import Link from "next/link";
import { Download, FileCode, FileText, Layout, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { NewsletterForm } from "@/components/newsletter-form";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Free Developer Resources",
  description:
    "Free AI engineering resources: architecture templates, AI agent boilerplates, prompt packs, and infrastructure blueprints. Built for developers who ship.",
  alternates: { canonical: `${siteConfig.url}/resources` },
};

const resources = [
  {
    icon: Layout,
    title: "Architecture Templates",
    description:
      "Production-grade system architecture diagrams and templates for AI applications.",
    badge: "Coming Soon",
  },
  {
    icon: FileCode,
    title: "AI Agent Boilerplates",
    description:
      "Starter code for building AI agents with LangGraph, CrewAI, and custom frameworks.",
    badge: "Coming Soon",
  },
  {
    icon: FileText,
    title: "Prompt Packs",
    description:
      "Curated prompt collections for coding, debugging, and AI-assisted workflows.",
    badge: "Coming Soon",
  },
  {
    icon: Download,
    title: "AI Infra Blueprints",
    description:
      "Infrastructure blueprints for deploying and scaling AI systems in production.",
    badge: "Coming Soon",
  },
];

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-12 max-w-2xl">
        <Badge
          variant="secondary"
          className="mb-4 border-primary/20 bg-primary/10 text-primary"
        >
          In the works
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Free{" "}
          <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Resources
          </span>{" "}
          for builders
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Battle-tested templates, boilerplates, and blueprints to accelerate
          your AI engineering workflow. I&apos;m building these out now, join
          the newsletter to get them first.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {resources.map((resource, i) => (
          <Reveal key={resource.title} delay={(i % 2) * 100}>
            <div className="group h-full rounded-xl border border-border/60 bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-2.5 ring-1 ring-primary/20 transition-colors group-hover:bg-primary/15">
                <resource.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold text-foreground">
                  {resource.title}
                </h2>
                <Badge variant="outline" className="shrink-0 text-xs">
                  {resource.badge}
                </Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {resource.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16 rounded-2xl border border-border/60 bg-linear-to-b from-card to-primary/5 p-8 text-center sm:p-12">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Be first in line
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Subscribe and I&apos;ll send these resources straight to your inbox
          the moment they drop, plus weekly AI engineering insights.
        </p>
        <div className="mx-auto mt-6 max-w-md">
          <NewsletterForm variant="large" />
        </div>
        <div className="mt-6">
          <Link href="/blog">
            <Button variant="outline">
              Read the blog while you wait
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
