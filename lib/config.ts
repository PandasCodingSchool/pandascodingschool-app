import type { NavItem } from "@/types";

export const siteConfig = {
  name: "Panda Coding School",
  description:
    "Practical AI engineering, tools, experiments, and startup architectures. Learn to build with AI.",
  url: "https://pandascodingschool.com",
  author: "Panda Coding School",
  keywords: [
    "AI coding",
    "AI engineering",
    "AI tools",
    "machine learning",
    "software development",
    "AI agents",
    "programming tutorials",
    "developer tools",
    "tech reviews",
    "Cursor AI",
    "GitHub Copilot",
    "Claude",
    "ChatGPT",
    "AI coding assistant",
    "vector databases",
    "RAG",
    "LangChain",
    "LangGraph",
  ],
  links: {
    linkedin: "https://linkedin.com/company/pandacodingschool",
    github: "https://github.com/pandascodingschool",
    instagram: "https://instagram.com/pandacodingschool",
  },
};

// Author profile shown on blog posts and the About page.
// TODO: update name, role, bio and avatar with your real details.
export const authorProfile = {
  name: "Panda Coding School",
  role: "AI Engineer & Builder",
  bio: "I build production AI systems and write about what actually works, what broke, and the lessons in between. Follow along for practical AI engineering, no hype.",
  avatar: "/assets/Panda-developer.png",
  twitter: "https://twitter.com/pandacodingschool",
};

export const mainNav: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Blog", href: "/blog" },
  { title: "AI Tools", href: "/tools" },
  { title: "Resources", href: "/resources" },
  { title: "About", href: "/about" },
];
