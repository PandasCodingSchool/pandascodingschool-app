import { siteConfig } from "@/lib/config";
import type { BlogPost, Tool } from "@/types";

// Organization schema for the entire site
export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [
      siteConfig.links.linkedin,
      siteConfig.links.github,
      siteConfig.links.instagram,
    ].filter(Boolean),
  };
}

// Enhanced Article schema with image support
export function getArticleJsonLd(post: BlogPost) {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
      url: siteConfig.url,
    },
    datePublished: post.date,
    dateModified: post.updated || post.date,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
  };

  // Add image if available
  if (post.image) {
    jsonLd.image = {
      "@type": "ImageObject",
      url: post.image.startsWith("http")
        ? post.image
        : `${siteConfig.url}${post.image}`,
      width: 1200,
      height: 630,
    };
  }

  return jsonLd;
}

// Enhanced SoftwareApplication schema
export function getToolJsonLd(tool: Tool) {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description || tool.excerpt,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    url: tool.url || `${siteConfig.url}/tools/${tool.slug}`,
    keywords: tool.tags.join(", "),
    review: {
      "@type": "Review",
      author: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      reviewBody: tool.description || tool.excerpt,
    },
  };

  if (tool.rating > 0) {
    jsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: tool.rating,
      bestRating: 5,
      worstRating: 1,
      ratingCount: 1,
    };
  }

  if (tool.logo) {
    jsonLd.image = {
      "@type": "ImageObject",
      url: tool.logo.startsWith("http")
        ? tool.logo
        : `${siteConfig.url}${tool.logo}`,
    };
  }

  return jsonLd;
}

// Enhanced WebSite schema with search potential
export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: getOrganizationJsonLd(),
  };
}

// BreadcrumbList schema for navigation
export function getBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `${siteConfig.url}${item.url}`,
    })),
  };
}

// WebPage schema for generic pages
export function getWebPageJsonLd(
  title: string,
  description: string,
  url: string,
  dateModified?: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: url.startsWith("http") ? url : `${siteConfig.url}${url}`,
    dateModified: dateModified || new Date().toISOString(),
    publisher: getOrganizationJsonLd(),
  };
}

// FAQPage schema for FAQ sections
export function getFAQJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
