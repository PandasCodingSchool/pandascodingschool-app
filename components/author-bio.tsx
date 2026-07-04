import Image from "next/image";
import { authorProfile } from "@/lib/config";

export function AuthorBio() {
  return (
    <div className="flex flex-col items-start gap-4 rounded-xl border border-border/60 bg-card p-6 sm:flex-row sm:items-center">
      <Image
        src={authorProfile.avatar}
        alt={authorProfile.name}
        width={64}
        height={64}
        className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-primary/20"
      />
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-primary">
          Written by
        </p>
        <h3 className="mt-0.5 text-base font-semibold text-foreground">
          {authorProfile.name}
        </h3>
        <p className="text-sm text-muted-foreground">{authorProfile.role}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {authorProfile.bio}
        </p>
      </div>
    </div>
  );
}
