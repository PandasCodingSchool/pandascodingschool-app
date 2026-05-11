import type { MDXComponents } from "mdx/types";
import Link from "next/link";

function Callout({
  children,
  type = "info",
}: {
  children: React.ReactNode;
  type?: "info" | "warning" | "tip";
}) {
  const styles = {
    info: "border-blue-500/30 bg-blue-500/5 text-blue-200",
    warning: "border-yellow-500/30 bg-yellow-500/5 text-yellow-200",
    tip: "border-green-500/30 bg-green-500/5 text-green-200",
  };

  return (
    <div className={`my-6 rounded-lg border p-4 ${styles[type]}`}>
      {children}
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  h1: ({ children, ...props }) => (
    <h1
      className="mt-10 mb-4 text-3xl font-bold tracking-tight text-foreground"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="mt-8 mb-3 text-2xl font-semibold tracking-tight text-foreground"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="mt-6 mb-2 text-xl font-semibold text-foreground" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="mb-4 leading-7 text-muted-foreground" {...props}>
      {children}
    </p>
  ),
  a: ({ href, children, ...props }) => {
    if (href?.startsWith("/")) {
      return (
        <Link
          href={href}
          className="text-primary underline underline-offset-4 hover:text-primary/80"
          {...props}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-4 hover:text-primary/80"
        {...props}
      >
        {children}
      </a>
    );
  },
  ul: ({ children, ...props }) => (
    <ul
      className="mb-4 ml-6 list-disc space-y-2 text-muted-foreground"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="mb-4 ml-6 list-decimal space-y-2 text-muted-foreground"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-7" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-6 border-l-2 border-primary/50 pl-4 italic text-muted-foreground"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }) => (
    <code
      className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="mb-4 overflow-x-auto rounded-lg border border-border bg-[#22272e] p-4"
      {...props}
    >
      {children}
    </pre>
  ),
  hr: () => <hr className="my-8 border-border" />,
  table: ({ children, ...props }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th
      className="border border-border bg-muted px-4 py-2 text-left font-semibold text-foreground"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td
      className="border border-border px-4 py-2 text-muted-foreground"
      {...props}
    >
      {children}
    </td>
  ),
  img: ({ src, alt, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt || ""}
      className="my-8 w-full rounded-xl border border-border shadow-md"
      loading="lazy"
      {...props}
    />
  ),
  Callout,
};
