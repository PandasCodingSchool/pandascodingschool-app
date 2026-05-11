import type { NavItem } from "@/types";

export const siteConfig = {
  name: "Panda Coding School",
  description:
    "Practical AI engineering, tools, experiments, and startup architectures.",
  url: "https://pandascodingschool.com",
  author: "Panda Coding School",
  links: {
    linkedin: "https://linkedin.com/company/pandacodingschool",
    github: "https://github.com/pandascodingschool",
    instagram: "https://instagram.com/pandacodingschool",
  },
};

export const mainNav: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Blog", href: "/blog" },
  { title: "AI Tools", href: "/tools" },
  { title: "Resources", href: "/resources" },
  { title: "About", href: "/about" },
];
