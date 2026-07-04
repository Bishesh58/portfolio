import type { Resume } from "./types";

export const resume: Resume = {
  name: "Bishesh Sunam",
  role: "Full Stack Developer",
  location: "Auckland, New Zealand",
  email: "bishesh.sunam@gmail.com",
  phone: "022-405-0486",
  resumePdf: "/resume.pdf",
  tagline: "I build the tools teams run on.",
  intro:
    "Full Stack Developer in Auckland — I design and ship internal platforms, ERP integrations, and dashboards that help sales, ops, and leadership teams make faster decisions.",
  socials: [
    { label: "GitHub", url: "https://github.com/bishesh58", icon: "github" },
    { label: "LinkedIn", url: "https://linkedin.com/in/bishesh-sunam-89a807115", icon: "linkedin" },
    { label: "Email", url: "mailto:bishesh.sunam@gmail.com", icon: "email" },
  ],
  about: [
    [
      { text: "Full Stack Developer with " },
      { text: "4+ years of experience", highlight: "yellow" },
      { text: " building scalable web and enterprise applications. I work across the " },
      { text: "JavaScript ecosystem", highlight: "cobalt" },
      { text: " (Vue, React, Node.js, TypeScript) and backend stacks like " },
      { text: "Laravel PHP and C# .NET", highlight: "teal" },
      { text: ", with solid SQL database design and cloud deployments." },
    ],
    [
      { text: "At the Islington group I build and integrate " },
      { text: "ERP systems and third-party APIs", highlight: "lime" },
      { text: " — NetSuite SPAs, admin portals, and " },
      { text: "dashboards and data visualisation", highlight: "yellow" },
      { text: " that turn scattered data into decisions for sales, marketing, and operations teams." },
    ],
    [
      { text: "I'm recognised for " },
      { text: "problem-solving", highlight: "teal" },
      { text: ", cross-functional collaboration, and thriving in " },
      { text: "Agile environments", highlight: "cobalt" },
      { text: ". ICAgile Certified Professional and Top Capstone Project winner." },
    ],
  ],
  timeline: [
    {
      kind: "work",
      title: "Web Developer",
      org: "Islington Group (Boundaryline, Heritage, BTI & Fentec)",
      start: "Jan 2023",
      end: "Present",
      location: "Auckland, New Zealand",
      summary:
        "Building the group's internal platform: NetSuite SPA with Kanban proposal pipeline, role-based admin portal, marketing analytics, credit control, order tracking, and warehouse KPI dashboards — plus fully custom public websites.",
    },
    {
      kind: "work",
      title: "Software Engineer (Contract)",
      org: "Attainate",
      start: "Mar 2022",
      end: "Jul 2022",
      location: "Remote, New Zealand",
      summary:
        "Took a subscription SaaS platform from wireframes to production: auth, subscription management, real-time data, and SendGrid transactional email — delivered ahead of deadline in an Agile workflow.",
    },
    {
      kind: "work",
      title: "Software Developer (Contract)",
      org: "Aspire2 International",
      start: "Jan 2020",
      end: "Jun 2020",
      location: "Auckland, New Zealand",
      summary:
        "Designed and built a Unity 2D educational game introducing Māori culture to international students — mechanics, animation, and cross-device performance.",
    },
    {
      kind: "education",
      title: "Bachelor of Computing Systems (Software)",
      org: "Unitec Institute of Technology",
      start: "2021",
      end: "2023",
      summary:
        "Full-stack coursework with Python, Django, React, Node.js, MongoDB, and MapBox. Winner — Top Capstone Project (Web App Development).",
    },
    {
      kind: "education",
      title: "Diplomas in Computing (Levels 5–7, Software)",
      org: "NTEC",
      start: "2014",
      end: "2020",
      summary:
        "From IT systems and networking foundations to database design, security, and a C# .NET restaurant management system with POS, inventory, and reporting.",
    },
  ],
  projects: [
    {
      title: "NetSuite SPA Dashboard",
      impact: "Single-page NetSuite app with a Kanban proposal pipeline that streamlined sales workflows and boosted team efficiency.",
      tags: ["SuiteScript", "Vue", "NetSuite"],
      accent: "cobalt",
    },
    {
      title: "Admin Dashboard Portal",
      impact: "Role-based portal with KPIs and NetSuite, AskNicely & BWare integrations — one home for every internal tool.",
      tags: ["Vue", "Laravel", "MySQL"],
      accent: "lime",
    },
    {
      title: "Marketing Analytics Dashboard",
      impact: "Google Analytics, Search Console, and website leads aggregated into one KPI view for marketing decisions.",
      tags: ["Nuxt", "GCP", "Charts"],
      accent: "yellow",
    },
    {
      title: "Credit Control Application",
      impact: "Internal credit workflow system that sharpened financial tracking and reporting efficiency.",
      tags: ["Laravel", "Vue", "MySQL"],
      accent: "teal",
    },
    {
      title: "Order Tracking Application",
      impact: "Mobile-friendly tool for internal teams to monitor order progress in real time.",
      tags: ["Vue", "REST APIs"],
      accent: "yellow",
    },
    {
      title: "Warehouse Metrics Dashboard",
      impact: "Multi-branch KPI dashboards tracking operational performance across warehouses.",
      tags: ["Vue", "MySQL", "Charts"],
      accent: "cobalt",
    },
    {
      title: "NPS Dashboard",
      impact: "Customer satisfaction tracking with real-time insights from external NPS APIs.",
      tags: ["Vue", "Node.js", "AskNicely"],
      accent: "teal",
    },
    {
      title: "Exception Management System",
      impact: "Operational exception handling that cut resolution time and errors.",
      tags: ["Laravel", "Vue"],
      accent: "lime",
    },
  ],
  skillGroups: [
    {
      label: "Frontend",
      accent: "cobalt",
      skills: [
        { name: "Vue", icon: "vuedotjs" },
        { name: "Nuxt", icon: "nuxt" },
        { name: "React", icon: "react" },
        { name: "Tailwind CSS", icon: "tailwindcss" },
        { name: "HTML/CSS", icon: "html5" },
      ],
    },
    {
      label: "Languages",
      accent: "yellow",
      skills: [
        { name: "JavaScript", icon: "javascript" },
        { name: "TypeScript", icon: "typescript" },
        { name: "PHP", icon: "php" },
        { name: "C#", icon: "csharp" },
        { name: "Python", icon: "python" },
        { name: "SQL", icon: "postgresql" },
      ],
    },
    {
      label: "Backend",
      accent: "lime",
      skills: [
        { name: "Node.js", icon: "nodedotjs" },
        { name: "Laravel", icon: "laravel" },
        { name: ".NET", icon: "dotnet" },
        { name: "SuiteScript", icon: "oracle" },
        { name: "REST APIs", icon: "openapiinitiative" },
      ],
    },
    {
      label: "Cloud & DevOps",
      accent: "teal",
      skills: [
        { name: "Google Cloud", icon: "googlecloud" },
        { name: "Firebase", icon: "firebase" },
        { name: "CI/CD", icon: "githubactions" },
        { name: "Docker", icon: "docker" },
        { name: "Vercel", icon: "vercel" },
      ],
    },
    {
      label: "Databases",
      accent: "cobalt",
      skills: [
        { name: "MySQL", icon: "mysql" },
        { name: "SQL Server", icon: "microsoftsqlserver" },
        { name: "MongoDB", icon: "mongodb" },
        { name: "Firestore", icon: "firebase" },
      ],
    },
    {
      label: "Tools & More",
      accent: "yellow",
      skills: [
        { name: "Git & GitHub", icon: "github" },
        { name: "Jira", icon: "jira" },
        { name: "WordPress", icon: "wordpress" },
        { name: "Unity", icon: "unity" },
        { name: "NetSuite", icon: "oracle" },
      ],
    },
    {
      label: "AI Tools",
      accent: "lime",
      skills: [
        { name: "Cursor", icon: "cursor" },
        { name: "GitHub Copilot", icon: "githubcopilot" },
        { name: "ChatGPT", icon: "openai" },
        { name: "Claude", icon: "anthropic" },
        { name: "v0", icon: "vercel" },
      ],
    },
  ],
  certifications: [
    "ICAgile Certified Professional",
    "Winner — Top Capstone Project (Web App Development)",
  ],
};
