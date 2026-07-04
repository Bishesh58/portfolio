import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-grotesk",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono-sp",
});

// Update metadataBase when the real domain is live.
export const metadata: Metadata = {
  metadataBase: new URL("https://bisheshsunam.vercel.app"),
  title: "Bishesh Sunam | Full Stack Developer",
  description:
    "Full Stack Developer in Auckland, NZ with 4+ years building scalable web and enterprise applications — Vue, React, Node.js, TypeScript, Laravel, NetSuite, and Google Cloud.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    title: "Bishesh Sunam | Full Stack Developer",
    description:
      "Full Stack Developer in Auckland, NZ — scalable web apps, ERP integrations, and dashboards teams actually use.",
    images: ["/robot.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bishesh Sunam | Full Stack Developer",
    description:
      "Full Stack Developer in Auckland, NZ — scalable web apps, ERP integrations, and dashboards teams actually use.",
    images: ["/robot.png"],
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme="light";}})();`;

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Bishesh Sunam",
  jobTitle: "Full Stack Developer",
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
      <body className={`${grotesk.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
