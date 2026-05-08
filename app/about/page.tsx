import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name} — practical AI engineering for builders.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        About {siteConfig.name}
      </h1>

      <div className="mt-8 space-y-6 text-muted-foreground leading-7">
        <p>
          {siteConfig.name} is an AI engineering media platform built for
          developers, startup founders, indie hackers, and AI engineers who
          build real systems.
        </p>

        <p>
          This is <strong className="text-foreground">not</strong> a traditional
          coding tutorial website. We combine AI tools discovery, build-in-public
          engineering content, deep technical blogs, AI experiments, and developer
          resources — all focused on practical, production-grade systems.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-foreground">
          What You&apos;ll Find Here
        </h2>

        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong className="text-foreground">AI Tools Discovery</strong> —
            Curated reviews with pricing, pros/cons, and developer-focused
            comparisons.
          </li>
          <li>
            <strong className="text-foreground">Build In Public</strong> —
            Transparent engineering stories including architecture decisions,
            failures, and lessons learned.
          </li>
          <li>
            <strong className="text-foreground">Deep Technical Content</strong> —
            RAG systems, agent orchestration, voice AI, real-time analytics, and
            production infrastructure.
          </li>
          <li>
            <strong className="text-foreground">Free Resources</strong> —
            Architecture templates, AI boilerplates, prompt packs, and debugging
            checklists.
          </li>
        </ul>

        <h2 className="pt-4 text-xl font-semibold text-foreground">
          Our Mission
        </h2>

        <p>
          Become a trusted platform for practical AI engineering, startup
          systems, and modern developer workflows. We believe in sharing real
          systems, real failures, and real lessons — because that&apos;s how
          engineers actually learn.
        </p>

        <div className="rounded-lg border border-border/60 bg-card p-6 text-center">
          <p className="text-lg font-medium text-foreground italic">
            &ldquo;Practical AI engineering for builders.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
