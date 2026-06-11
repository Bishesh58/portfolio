export const profile = {
  name: 'Bishesh Sunam',
  firstName: 'Bishesh',
  lastName: 'Sunam',
  role: 'Full Stack Developer',
  tagline: 'I build software that businesses run on.',
  location: 'Auckland, New Zealand',
  email: 'bishesh.sunam@gmail.com',
  phone: '022-405-0486',
  linkedin: 'https://linkedin.com/in/bishesh-sunam-89a807115',
  yearsExperience: '4+',
  summary:
    'Full Stack Developer with 4+ years of experience turning complex business problems into fast, scalable software. From ERP integrations and real-time dashboards to full SaaS platforms shipped solo — I own the entire stack, from wireframe to production.',
  availability: 'Open to new opportunities',
}

export const stats = [
  { value: 4, suffix: '+', label: 'Years of experience' },
  { value: 12, suffix: '+', label: 'Production apps shipped' },
  { value: 15, suffix: '+', label: 'APIs & systems integrated' },
  { value: 100, suffix: '%', label: 'Ownership, end to end' },
]

export interface Project {
  index: string
  title: string
  category: string
  description: string
  impact: string
  tech: string[]
  hue: number
}

export const projects: Project[] = [
  {
    index: '01',
    title: 'NetSuite SPA Dashboard',
    category: 'ERP / Sales Engineering',
    description:
      'A single-page application living inside NetSuite, featuring proposal-pipeline Kanban boards that gave the sales team a live, drag-and-drop view of every deal in motion.',
    impact: 'Streamlined sales workflows and cut proposal-tracking overhead across the team.',
    tech: ['SuiteScript', 'JavaScript', 'NetSuite', 'Kanban UX'],
    hue: 16,
  },
  {
    index: '02',
    title: 'Admin Dashboard Portal',
    category: 'Internal Platform',
    description:
      'A role-based command centre unifying KPIs, dashboards and deep integrations with NetSuite and third-party APIs like AskNicely and BWare — one login for every internal tool.',
    impact: 'Centralised internal tool management for the entire organisation.',
    tech: ['Vue.js', 'Laravel', 'MySQL', 'REST APIs', 'RBAC'],
    hue: 210,
  },
  {
    index: '03',
    title: 'Marketing Analytics Dashboard',
    category: 'Data Visualisation',
    description:
      'Aggregates Google Analytics, Search Console and website lead data into one decision-making surface — charts, tables and KPIs that marketing actually reads.',
    impact: 'Turned scattered analytics into a single source of truth for marketing decisions.',
    tech: ['Vue.js', 'GA4 API', 'Search Console API', 'Charts'],
    hue: 150,
  },
  {
    index: '04',
    title: 'Subscription SaaS Platform',
    category: 'Full Product Build',
    description:
      'A complete subscription-based SaaS platform built from wireframes to production: auth, billing, real-time data, transactional email — shipped ahead of deadline.',
    impact: 'Delivered a revenue-ready platform solo, ahead of schedule.',
    tech: ['Vue.js', 'Node.js', 'Firebase', 'Firestore', 'SendGrid', 'GCP'],
    hue: 268,
  },
  {
    index: '05',
    title: 'Credit Control Application',
    category: 'FinOps Tooling',
    description:
      'An internal system managing end-to-end credit workflows — approvals, tracking and reporting — replacing spreadsheets with structured, auditable process.',
    impact: 'Improved financial tracking and reporting efficiency company-wide.',
    tech: ['Vue.js', 'Laravel', 'MySQL', 'Workflow Engine'],
    hue: 45,
  },
  {
    index: '06',
    title: 'Warehouse Metrics Dashboard',
    category: 'Operations Intelligence',
    description:
      'Multi-branch KPI dashboards tracking operational performance in real time — picking, packing, throughput — across every warehouse location.',
    impact: 'Streamlined warehouse reporting across all branches.',
    tech: ['Vue.js', 'NetSuite', 'SQL', 'Data Viz'],
    hue: 190,
  },
  {
    index: '07',
    title: '2D Educational Game — Māori Culture',
    category: 'Game Development',
    description:
      'A Unity-based 2D educational game introducing Māori culture to international students — custom assets, animations, and smooth performance across devices.',
    impact: 'Made cultural education engaging and interactive for international students.',
    tech: ['Unity', 'C#', '2D Animation', 'Game Design'],
    hue: 330,
  },
  {
    index: '08',
    title: 'Custom Websites & Quote Systems',
    category: 'Web Engineering',
    description:
      'Fully custom websites taken from wireframe to production — dynamic quote engines, email integrations, and interactive map-based location services.',
    impact: 'Improved performance and SEO rankings through deep technical optimisation.',
    tech: ['Nuxt.js', 'WordPress', 'PHP', 'SEO', 'Maps API'],
    hue: 90,
  },
]

export interface Experience {
  period: string
  role: string
  company: string
  blurb: string
  highlights: string[]
  tech: string[]
}

export const experience: Experience[] = [
  {
    period: '2023 — Present',
    role: 'Web Developer',
    company: 'Islington Group',
    blurb:
      'The engineering force behind Boundaryline, Heritage, BTI & Fentec — building the internal platforms, ERP integrations and customer-facing sites a multi-brand group runs on.',
    highlights: [
      'Shipped 9+ production applications: dashboards, portals, tracking tools and exception-management systems',
      'Integrated NetSuite ERP and third-party APIs to automate workflows and synchronise data across systems',
      'Own hosting, deployments and domain migrations with minimal downtime',
      'Lifted SEO rankings and site performance through technical optimisation',
    ],
    tech: ['Vue.js', 'Nuxt.js', 'Laravel', 'SuiteScript', 'MySQL', 'TypeScript', 'GCP', 'WordPress'],
  },
  {
    period: '2022',
    role: 'Software Engineer',
    company: 'Attainate',
    blurb:
      'Built a subscription-based SaaS platform from wireframes to production — solo, end to end, ahead of deadline.',
    highlights: [
      'Designed the full-stack architecture: Vue.js front end on Firebase/Firestore real-time services',
      'Integrated SendGrid for automated transactional email',
      'Managed production deployment, domain setup and cloud hosting',
      'Delivered features ahead of schedule in Agile sprints',
    ],
    tech: ['Vue.js', 'Node.js', 'Firebase', 'Firestore', 'Cloud Functions', 'SendGrid', 'GCP'],
  },
  {
    period: '2020',
    role: 'Software Developer',
    company: 'Aspire2 International',
    blurb:
      'Designed and built a Unity 2D educational game introducing Māori culture to international students.',
    highlights: [
      'Implemented game mechanics, interactive elements and animations in C#',
      'Created and integrated visual and audio assets',
      'Optimised for smooth gameplay and cross-device stability',
    ],
    tech: ['Unity', 'C#', 'GitHub', '2D Animation'],
  },
]

export const skills = {
  Languages: ['TypeScript', 'JavaScript', 'C#', 'PHP', 'SQL'],
  Frontend: ['React', 'Vue', 'Nuxt', 'Tailwind CSS', 'GSAP', 'Three.js'],
  Backend: ['Node.js', 'Laravel', '.NET', 'Firebase', 'REST APIs'],
  'Data & Cloud': ['MySQL', 'MongoDB', 'Firestore', 'Google Cloud', 'CI/CD'],
  Systems: ['NetSuite / SuiteScript', 'WordPress', 'ERP Integration', 'SEO'],
}

export const education = [
  {
    period: '2021 — 2023',
    degree: 'Bachelor of Computing Systems (Software)',
    school: 'Unitec Institute of Technology',
    note: 'Full-stack builds with Python, Django, React, Node.js, MongoDB & MapBox. Winner — Top Capstone Project.',
  },
  {
    period: '2019 — 2020',
    degree: 'Diploma in Computing Level 7 (Software)',
    school: 'NTEC',
    note: 'Built a Restaurant Management System in C# .NET + SQL Server with POS, inventory & reporting.',
  },
  {
    period: '2014 — 2016',
    degree: 'Diplomas in Computing, Levels 5 & 6',
    school: 'NTEC',
    note: 'Database design, security principles, networked systems and business-focused IT solutions.',
  },
]

export const awards = [
  { title: 'Winner — Top Capstone Project', detail: 'Web App Development' },
  { title: 'ICAgile Certified Professional', detail: 'Agile delivery certification' },
]
