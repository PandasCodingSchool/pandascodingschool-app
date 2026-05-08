import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPost, Tool } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const TOOLS_DIR = path.join(process.cwd(), "content/tools");

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function getAllBlogPosts(): BlogPost[] {
  ensureDir(BLOG_DIR);
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files
    .map((filename) => {
      const filePath = path.join(BLOG_DIR, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      if (data.draft) return null;

      const slug = filename.replace(".mdx", "");
      const stats = readingTime(content);

      return {
        slug,
        title: data.title || "Untitled",
        date: data.date || new Date().toISOString(),
        updated: data.updated,
        excerpt: data.excerpt || "",
        author: data.author || "Panda Coding School",
        tags: data.tags || [],
        category: data.category || "Tutorials",
        image: data.image,
        draft: data.draft || false,
        readingTime: stats.text,
        content,
      } as BlogPost;
    })
    .filter(Boolean) as BlogPost[];

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getBlogPost(slug: string): BlogPost | null {
  ensureDir(BLOG_DIR);
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title || "Untitled",
    date: data.date || new Date().toISOString(),
    updated: data.updated,
    excerpt: data.excerpt || "",
    author: data.author || "Panda Coding School",
    tags: data.tags || [],
    category: data.category || "Tutorials",
    image: data.image,
    draft: data.draft || false,
    readingTime: stats.text,
    content,
  };
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return getAllBlogPosts().filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return getAllBlogPosts().filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export function getAllBlogTags(): string[] {
  const posts = getAllBlogPosts();
  const tags = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}

export function getAllBlogCategories(): string[] {
  const posts = getAllBlogPosts();
  const categories = new Set<string>();
  posts.forEach((post) => categories.add(post.category));
  return Array.from(categories).sort();
}

export function getAllTools(): Tool[] {
  ensureDir(TOOLS_DIR);
  const files = fs.readdirSync(TOOLS_DIR).filter((f) => f.endsWith(".mdx"));

  const tools = files.map((filename) => {
    const filePath = path.join(TOOLS_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const slug = filename.replace(".mdx", "");

    return {
      slug,
      name: data.name || data.title || "Untitled",
      logo: data.logo,
      description: data.description || "",
      excerpt: data.excerpt || "",
      pricing: data.pricing || "Unknown",
      pros: data.pros || [],
      cons: data.cons || [],
      useCases: data.useCases || [],
      alternatives: data.alternatives || [],
      tags: data.tags || [],
      category: data.category || "AI Coding",
      rating: data.rating || 0,
      url: data.url || "",
      content,
    } as Tool;
  });

  return tools.sort((a, b) => a.name.localeCompare(b.name));
}

export function getTool(slug: string): Tool | null {
  ensureDir(TOOLS_DIR);
  const filePath = path.join(TOOLS_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    name: data.name || data.title || "Untitled",
    logo: data.logo,
    description: data.description || "",
    excerpt: data.excerpt || "",
    pricing: data.pricing || "Unknown",
    pros: data.pros || [],
    cons: data.cons || [],
    useCases: data.useCases || [],
    alternatives: data.alternatives || [],
    tags: data.tags || [],
    category: data.category || "AI Coding",
    rating: data.rating || 0,
    url: data.url || "",
    content,
  };
}

export function getToolsByCategory(category: string): Tool[] {
  return getAllTools().filter(
    (tool) => tool.category.toLowerCase() === category.toLowerCase()
  );
}

export function getAllToolCategories(): string[] {
  const tools = getAllTools();
  const categories = new Set<string>();
  tools.forEach((tool) => categories.add(tool.category));
  return Array.from(categories).sort();
}

export function getRelatedPosts(
  currentSlug: string,
  limit = 3
): BlogPost[] {
  const currentPost = getBlogPost(currentSlug);
  if (!currentPost) return [];

  const allPosts = getAllBlogPosts().filter((p) => p.slug !== currentSlug);

  const scored = allPosts.map((post) => {
    let score = 0;
    if (post.category === currentPost.category) score += 3;
    const sharedTags = post.tags.filter((t) =>
      currentPost.tags.includes(t)
    ).length;
    score += sharedTags * 2;
    return { post, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.post);
}
