import type { Metadata } from "next";
import { Anton, Archivo, Space_Mono } from "next/font/google";
import { resume } from "@/data/resume";
import "./globals.css";

const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const sans = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono-sp",
});

// Vercel serves the site from the www host (apex 308-redirects to it),
// so all absolute URLs (og:image, canonical) must be minted against www.
const SITE_URL = "https://www.bishesh58.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${resume.name} | ${resume.role}`,
  description:
    "Full Stack Developer in Auckland, NZ with 4+ years building scalable web and enterprise applications — Vue, React, Node.js, TypeScript, Laravel, NetSuite, and Google Cloud.",
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: `${resume.name} | ${resume.role}`,
    description:
      "Full Stack Developer in Auckland, NZ — scalable web apps, ERP integrations, and dashboards teams actually use.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${resume.name} — ${resume.role}, Auckland NZ`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${resume.name} | ${resume.role}`,
    description:
      "Full Stack Developer in Auckland, NZ — scalable web apps, ERP integrations, and dashboards teams actually use.",
    images: ["/og.png"],
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.dataset.theme=t;if(localStorage.getItem("portfolio-visited")){document.documentElement.dataset.visited="1";}}catch(e){document.documentElement.dataset.theme="light";}})();`;

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: resume.name,
  jobTitle: resume.role,
  url: "https://www.bishesh58.com",
  image: "https://www.bishesh58.com/og.png",
  email: "mailto:bishesh.sunam@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Auckland",
    addressCountry: "New Zealand",
  },
  sameAs: [
    "https://github.com/bishesh58",
    "https://linkedin.com/in/bishesh-sunam-89a807115",
  ],
  knowsAbout: [
    "Full-Stack Development", "JavaScript", "TypeScript", "Vue.js", "Nuxt",
    "React", "Node.js", "Laravel", "C# .NET", "NetSuite", "SuiteScript",
    "MySQL", "Google Cloud Platform",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
      </head>
      <body className={`${display.variable} ${sans.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
