"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface NewsletterFormProps {
  variant?: "default" | "inline" | "large";
  className?: string;
}

export function NewsletterForm({
  variant = "default",
  className = "",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    // TODO: Replace with actual Beehiiv/ConvertKit API integration
    // For now, simulate a successful signup
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("success");
    setEmail("");
  };

  if (status === "success") {
    return (
      <div className={`flex items-center gap-2 text-green-500 ${className}`}>
        <CheckCircle2 className="h-5 w-5" />
        <span className="text-sm font-medium">
          You&apos;re in! Check your inbox to confirm.
        </span>
      </div>
    );
  }

  if (variant === "large") {
    return (
      <div className={className}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 text-base"
            required
          />
          <Button
            type="submit"
            size="lg"
            className="h-12 px-8"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
        <p className="mt-2 text-xs text-muted-foreground">
          Weekly AI tools, engineering insights, and startup lessons. No spam.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex gap-2 ${className}`}
    >
      <Input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-9"
        required
      />
      <Button
        type="submit"
        size="sm"
        disabled={status === "loading"}
      >
        {status === "loading" ? "..." : "Subscribe"}
      </Button>
    </form>
  );
}
