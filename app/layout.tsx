import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/lib/config";
import { Analytics } from "@vercel/analytics/next";
import { getOrganizationJsonLd, getWebsiteJsonLd } from "@/lib/json-ld";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - AI Coding & Engineering Tutorials`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: `${siteConfig.url}/favicon.png`, type: "image/png" }],
    apple: [{ url: `${siteConfig.url}/logo.png`, type: "image/png" }],
    shortcut: `${siteConfig.url}/favicon.png`,
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - AI Coding & Engineering Tutorials`,
    description: siteConfig.description,
    images: [
      {
        url: "/assets/best-ai-tools.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - AI Tools and Engineering Resources`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pandacodingschool",
    creator: "@pandacodingschool",
    title: `${siteConfig.name} - AI Coding & Engineering Tutorials`,
    description: siteConfig.description,
    images: ["/assets/best-ai-tools.png"],
  },
  verification: {},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        {/* Optimeleon Tracking Scripts - Must be in head to avoid race conditions */}
        <Script
          id="optimeleon-consent"
          strategy="beforeInteractive"
          data-cookieconsent="ignore"
          dangerouslySetInnerHTML={{
            __html: `window.setOptiCookieConsent = function(consent) { localStorage.setItem("opti_consent", consent); };
        window.setOptiCookieConsent("yes");`,
          }}
        />
        <Script
          id="optimeleon-main"
          strategy="beforeInteractive"
          async
          data-cookieconsent="ignore"
          dangerouslySetInnerHTML={{
            __html: `!(function (h, i, e) { var t = 2000; var n = h.createElement("style"); n.id = e; n.innerHTML = "body{opacity:0}"; h.head.appendChild(n); i.rmfk = function () { var t = h.getElementById(e); t && t.parentNode.removeChild(t); }; setTimeout(i.rmfk, t); })(document, window, "optimeleon-overlay"); !function(e,t,n,o,c,a,i){e.optimeleon||(c=e.optimeleon=function(){c.callMethod?c.callMethod.apply(c,arguments):c.queue.push(arguments)},c.push=c,c.queue=[],(a=t.createElement(n)).async=!0,a.src="https://cdn-dev.optimeleon.com/pan-1c8re/pan-1euz1/v1.main.js",a.setAttribute("data-cookieconsent","ignore"),(i=t.getElementsByTagName(n)[0]).parentNode.insertBefore(a,i))}(window,document,"script"); optimeleon("init",true,true);`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationJsonLd()),
          }}
        />
        {/* WebSite Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebsiteJsonLd()),
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
