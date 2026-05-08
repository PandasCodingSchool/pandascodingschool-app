import type { Metadata } from "next";
import { Download, FileCode, FileText, Layout } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NewsletterForm } from "@/components/newsletter-form";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Free developer resources — architecture templates, AI boilerplates, prompt packs, and debugging checklists.",
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
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Resources
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Free developer resources to accelerate your AI engineering workflow.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {resources.map((resource) => (
          <Card key={resource.title} className="relative">
            <CardContent className="p-6">
              <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-2.5">
                <resource.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-semibold text-foreground">
                  {resource.title}
                </h2>
                <Badge variant="outline" className="text-xs">
                  {resource.badge}
                </Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {resource.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-border/60 bg-card p-8 text-center sm:p-12">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Get notified when resources launch
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Subscribe to be the first to access free architecture templates,
          boilerplates, and more.
        </p>
        <div className="mx-auto mt-6 max-w-md">
          <NewsletterForm variant="large" />
        </div>
      </div>
    </div>
  );
}
