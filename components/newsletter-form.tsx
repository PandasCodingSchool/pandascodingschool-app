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
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong.");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
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
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 sm:flex-row"
        >
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
        {status === "error" && (
          <p className="mt-2 text-xs text-red-500">{errorMsg}</p>
        )}
        {status !== "error" && (
          <p className="mt-2 text-xs text-muted-foreground">
            Weekly AI tools, engineering insights, and startup lessons. No spam.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-9"
          required
        />
        <Button type="submit" size="sm" disabled={status === "loading"}>
          {status === "loading" ? "..." : "Subscribe"}
        </Button>
      </form>
      {status === "error" && (
        <p className="mt-1.5 text-xs text-red-500">{errorMsg}</p>
      )}
    </div>
  );
}
