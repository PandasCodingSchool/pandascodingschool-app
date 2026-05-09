# Panda Coding School

**Practical AI engineering for builders.**

An AI engineering media platform with curated tool reviews, deep technical content, build-in-public stories, and developer resources.

🌐 [pandascodingschool.com](https://pandascodingschool.com)

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Content:** MDX with gray-matter + next-mdx-remote
- **Fonts:** Inter + JetBrains Mono
- **Theme:** Dark mode default (next-themes)
- **SEO:** Dynamic metadata, sitemap, robots.txt, JSON-LD structured data

## Features

- **Homepage** — Hero with animated grid background, featured articles, AI tools spotlight, newsletter CTA
- **Blog** — MDX content with syntax highlighting, categories, tags, reading time, related posts
- **AI Tools Directory** — Curated reviews with ratings, pros/cons, pricing, use cases, alternatives
- **Newsletter** — Signup forms with multiple placements (placeholder for Beehiiv/ConvertKit)
- **Resources** — Developer templates, boilerplates, and guides (coming soon)
- **SEO** — Open Graph, Twitter cards, JSON-LD, auto-generated sitemap

## Project Structure

```
app/
├── page.tsx              # Homepage
├── blog/                 # Blog listing + [slug] detail + category/tag pages
├── tools/                # AI Tools directory + [slug] detail + category pages
├── about/                # About page
├── newsletter/           # Newsletter landing
├── resources/            # Resources page
├── robots.ts             # Auto-generated robots.txt
└── sitemap.ts            # Auto-generated sitemap

components/
├── hero-grid-bg.tsx      # Animated canvas grid background
├── newsletter-form.tsx   # Newsletter signup component
├── site-header.tsx       # Navigation + mobile menu
├── site-footer.tsx       # Footer with social links
├── theme-toggle.tsx      # Dark/light mode toggle
├── mdx-components.tsx    # Custom MDX rendering components
└── ui/                   # shadcn/ui components

content/
├── blog/                 # MDX blog posts with frontmatter
└── tools/                # MDX tool reviews with frontmatter

lib/
├── config.ts             # Site configuration
├── content.ts            # MDX content reading/parsing utilities
├── mdx.ts               # MDX rendering with rehype/remark plugins
└── json-ld.ts            # Structured data generators
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Adding Content

### Blog Post

Create a new `.mdx` file in `content/blog/`:

```mdx
---
title: "Your Post Title"
date: "2026-05-08"
excerpt: "A short description of the post."
author: "Panda Coding School"
category: "AI Tools"
tags: ["ai", "tools"]
draft: false
---

Your markdown content here...
```

### Tool Review

Create a new `.mdx` file in `content/tools/`:

```mdx
---
name: "Tool Name"
description: "What the tool does."
excerpt: "Short one-liner."
pricing: "Free / $20/mo"
pros: ["Fast", "Easy to use"]
cons: ["Expensive at scale"]
useCases: ["Code generation", "Debugging"]
alternatives: ["Other Tool"]
tags: ["ai-coding"]
category: "AI Coding"
rating: 4.5
url: "https://tool.com"
---

Detailed review content here...
```

## Deployment

Deploy to Vercel:

```bash
vercel deploy
```

Or connect the GitHub repo to Vercel for automatic deploys on push.

## License

MIT
