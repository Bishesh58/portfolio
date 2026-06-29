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
  github: 'https://github.com/Bishesh58',
  yearsExperience: '4+',
  summary:
    'Full Stack Developer with 4+ years turning complex business problems into fast, scalable software. From ERP integrations and real-time dashboards to full SaaS platforms shipped solo — I own the entire stack, from wireframe to production.',
  availability: 'Open to new opportunities',
}

export const stats = [
  { value: 4, suffix: '+', label: 'Years shipping production software' },
  { value: 12, suffix: '+', label: 'Production apps shipped' },
  { value: 15, suffix: '+', label: 'APIs & systems integrated' },
  { value: 4, suffix: '', label: 'Brands I build for' },
]

export interface Project {
  index: string
  title: string
  category: string
  role: string
  period: string
  featured: boolean
  /** the situation before the work */
  problem: string
  /** what I built and how */
  approach: string
  /** the result, framed honestly */
  outcome: string
  /** quantified result — placeholder until a real figure is supplied */
  metric?: string
  tech: string[]
  /** signature accent hue (hex), spread across the wheel for visual hierarchy */
  accent: string
  /** client/employer work that can't expose source or live URLs */
  nda?: boolean
  link?: string
  repo?: string
  /** screenshot path under /public; a graceful placeholder renders if absent */
  image?: string
}

export const projects: Project[] = [
  {
    index: '01',
    title: 'Subscription SaaS Platform',
    category: 'Full Product Build',
    role: 'Sole engineer — wireframe to production',
    period: '2022',
    featured: true,
    accent: '#37e0c8',
    nda: true,
    problem:
      'A subscription product needed to go from wireframes to a revenue-ready platform — auth, billing, real-time data and transactional email — on a tight deadline, with one engineer.',
    approach:
      'Designed and shipped the full stack solo: a Vue.js front end on Firebase/Firestore real-time services, Cloud Functions, SendGrid for transactional email, and production deployment + domain/cloud setup on GCP.',
    outcome: 'Delivered a complete, revenue-ready SaaS platform solo — ahead of schedule.',
    metric: 'TODO: e.g. “launched N weeks early · first N paying subscribers”',
    tech: ['Vue.js', 'Node.js', 'Firebase', 'Firestore', 'Cloud Functions', 'SendGrid', 'GCP'],
  },
  {
    index: '02',
    title: 'NetSuite SPA Dashboard',
    category: 'ERP / Sales Engineering',
    role: 'Sole developer',
    period: '2023 — Present',
    featured: true,
    accent: '#00ff66',
    nda: true,
    problem:
      'The sales team tracked proposals across spreadsheets and email, with no live view of the pipeline inside the ERP they already worked in every day.',
    approach:
      'Built a single-page application embedded inside NetSuite with SuiteScript — proposal-pipeline Kanban boards that read and write live deal records with drag-and-drop.',
    outcome: 'Gave sales one live, drag-and-drop view of every deal in motion and cut proposal-tracking overhead.',
    metric: 'TODO: e.g. “— hrs/week saved across the sales team”',
    tech: ['SuiteScript', 'JavaScript', 'NetSuite', 'Kanban UX'],
  },
  {
    index: '03',
    title: 'Admin Dashboard Portal',
    category: 'Internal Platform',
    role: 'Full-stack developer',
    period: '2023 — Present',
    featured: true,
    accent: '#5aa9ff',
    nda: true,
    problem:
      'Internal tools and KPIs were scattered across systems with separate logins — no single place for the org to manage and see everything.',
    approach:
      'Built a role-based command centre (Vue + Laravel + MySQL) unifying KPIs and dashboards with deep integrations into NetSuite and third-party APIs like AskNicely and BWare — one login, RBAC throughout.',
    outcome: 'Centralised internal tool management for the entire organisation behind a single, role-aware login.',
    metric: 'TODO: e.g. “N internal tools / N teams unified”',
    tech: ['Vue.js', 'Laravel', 'MySQL', 'REST APIs', 'RBAC'],
  },
  {
    index: '04',
    title: 'Marketing Analytics Dashboard',
    category: 'Data Visualisation',
    role: 'Full-stack developer',
    period: '2023 — Present',
    featured: true,
    accent: '#ffb347',
    nda: true,
    problem:
      'Marketing decisions were made from analytics scattered across Google Analytics, Search Console and website lead data — no single decision-making surface.',
    approach:
      'Aggregated GA4, Search Console and lead data through their APIs into one Vue dashboard — charts, tables and KPIs designed to be read at a glance.',
    outcome: 'Turned scattered analytics into a single source of truth marketing actually reads.',
    metric: 'TODO: e.g. “N data sources unified · reporting time cut by —”',
    tech: ['Vue.js', 'GA4 API', 'Search Console API', 'Charts'],
  },
  {
    index: '05',
    title: 'Credit Control Application',
    category: 'FinOps Tooling',
    role: 'Full-stack developer',
    period: '2023 — Present',
    featured: true,
    accent: '#b98cff',
    nda: true,
    problem:
      'Credit workflows — approvals, tracking and reporting — ran on spreadsheets, with no structured or auditable process.',
    approach:
      'Built an internal system (Vue + Laravel + MySQL) with a workflow engine managing the end-to-end credit lifecycle: approvals, tracking and reporting, with an audit trail.',
    outcome: 'Replaced spreadsheets with a structured, auditable process and improved financial tracking company-wide.',
    metric: 'TODO: e.g. “DSO reduced by — · N approvals/month automated”',
    tech: ['Vue.js', 'Laravel', 'MySQL', 'Workflow Engine'],
  },
  {
    index: '06',
    title: '2D Educational Game — Māori Culture',
    category: 'Game Development',
    role: 'Designer & developer',
    period: '2020',
    featured: true,
    accent: '#f25c9c',
    nda: true,
    problem:
      'International students needed an engaging, interactive way to learn about Māori culture — not another slide deck.',
    approach:
      'Designed and built a Unity 2D educational game in C# — game mechanics, interactive elements, animations, and custom visual/audio assets, optimised for smooth cross-device play.',
    outcome: 'Made cultural education genuinely interactive and engaging for international students.',
    metric: 'TODO: e.g. “used by N students / cohorts”',
    tech: ['Unity', 'C#', '2D Animation', 'Game Design'],
  },
  {
    index: '07',
    title: 'Warehouse Metrics Dashboard',
    category: 'Operations Intelligence',
    role: 'Full-stack developer',
    period: '2023 — Present',
    featured: false,
    accent: '#7fd154',
    nda: true,
    problem: 'Multi-branch warehouse performance was hard to see in real time across locations.',
    approach:
      'Built multi-branch KPI dashboards (Vue + NetSuite + SQL) tracking picking, packing and throughput in real time across every location.',
    outcome: 'Streamlined warehouse reporting across all branches.',
    tech: ['Vue.js', 'NetSuite', 'SQL', 'Data Viz'],
  },
  {
    index: '08',
    title: 'Custom Websites & Quote Systems',
    category: 'Web Engineering',
    role: 'Developer',
    period: '2023 — Present',
    featured: false,
    accent: '#19b257',
    nda: true,
    problem: 'Customer-facing sites needed dynamic quoting, integrations and strong SEO/performance.',
    approach:
      'Built fully custom sites from wireframe to production (Nuxt / WordPress / PHP) with dynamic quote engines, email integrations and interactive map-based location services.',
    outcome: 'Improved performance and SEO rankings through deep technical optimisation.',
    tech: ['Nuxt.js', 'WordPress', 'PHP', 'SEO', 'Maps API'],
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const archiveProjects = projects.filter((p) => !p.featured)

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
  Frontend: ['React', 'Vue', 'Nuxt', 'Tailwind CSS', 'GSAP', 'Canvas / rAF'],
  Backend: ['Node.js', 'Laravel', '.NET', 'Firebase', 'REST APIs'],
  'Data & Cloud': ['MySQL', 'MongoDB', 'Firestore', 'Google Cloud', 'CI/CD'],
  'AI-augmented delivery': ['Agentic workflows', 'Spec-first delivery', 'AI-assisted review', 'Cursor · Claude · Codex'],
  Systems: ['NetSuite / SuiteScript', 'WordPress', 'ERP integration', 'SEO'],
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

export const aiIntro =
  'AI is part of how I ship — not a gimmick. I run a spec-first, agentic workflow: I set the intent and architecture, then drive AI agents to plan, build, review and test across the whole codebase. The result is the velocity of a small team with the accountability of one engineer.'

export interface AITool {
  name: string
  role: string
  detail: string
}

export const aiToolkit: AITool[] = [
  {
    name: 'Cursor',
    role: 'Primary AI IDE',
    detail: 'Agent mode for codebase-aware, multi-file edits, large refactors and inline review — my daily driver.',
  },
  {
    name: 'Claude',
    role: 'Architecture & reasoning',
    detail: 'Design reviews, spec writing, and untangling gnarly bugs where deep reasoning beats autocomplete.',
  },
  {
    name: 'Codex / GPT',
    role: 'Implementation & automation',
    detail: 'Scaffolding features, generating tests and writing scripted one-off automations at speed.',
  },
  {
    name: 'Copilot',
    role: 'In-editor autocomplete',
    detail: 'Fast line- and block-level completions that keep me in flow during implementation.',
  },
]

export interface AIPractice {
  index: string
  title: string
  body: string
}

export const aiPractices: AIPractice[] = [
  {
    index: '01',
    title: 'Spec-first, agentic delivery',
    body: 'I break work into crisp specs, then let agents plan and implement across the repo while I steer intent and architecture.',
  },
  {
    index: '02',
    title: 'AI-assisted code review',
    body: 'Changes run through automated review before mine — catching regressions and edge cases early, every time.',
  },
  {
    index: '03',
    title: 'Tests & docs on tap',
    body: 'Agents draft unit tests, edge cases and documentation, which I curate to lift coverage without slowing delivery.',
  },
  {
    index: '04',
    title: 'Trust, but verify',
    body: 'Typed contracts, linting and actually running the code. AI accelerates the work; I stay accountable for what ships.',
  },
]
