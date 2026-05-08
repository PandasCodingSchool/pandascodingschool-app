export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  updated?: string;
  excerpt: string;
  author: string;
  tags: string[];
  category: string;
  image?: string;
  draft?: boolean;
  readingTime: string;
  content: string;
}

export interface Tool {
  slug: string;
  name: string;
  logo?: string;
  description: string;
  excerpt: string;
  pricing: string;
  pros: string[];
  cons: string[];
  useCases: string[];
  alternatives: string[];
  tags: string[];
  category: string;
  rating: number;
  url: string;
  content: string;
}

export interface NavItem {
  title: string;
  href: string;
}

export const BLOG_CATEGORIES = [
  "AI Tools",
  "AI Agents",
  "Architecture",
  "Voice AI",
  "Analytics",
  "Startups",
  "DevOps",
  "Tutorials",
  "Experiments",
] as const;

export const TOOL_CATEGORIES = [
  "AI Coding",
  "AI Agents",
  "Voice AI",
  "AI Search",
  "RAG",
  "AI Analytics",
  "AI Monitoring",
  "LLM Hosting",
  "Vector Databases",
  "Automation",
  "AI Design",
  "AI Video",
  "AI Productivity",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];
export type ToolCategory = (typeof TOOL_CATEGORIES)[number];
