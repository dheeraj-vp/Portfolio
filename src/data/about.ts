// ============================================================
// About Section Data — Single source of truth
// ============================================================

export const about = {
  bio: {
    label: 'WHOAMI',
    heading: 'Engineer. Builder. Learner.',
    body: 'I build backend systems, cloud infrastructure, and automation tools with a focus on reliability, scalability, and clean architecture. As a final-year Computer Science student at VIT, I\'m driven by understanding how large-scale systems are designed, deployed, and operated in production.',
  },

  education: [
    {
      institution: 'VIT Vellore',
      degree: 'B.Tech · CSE & Business Systems',
      years: '2023 – 2027',
      gpa: 8.55,
      gpaMax: 10,
      focus: ['Operating Systems', 'DBMS', 'Computer Networks', 'DSA', 'DAA', 'Cloud & Microservices'],
    },
    {
      institution: 'Sri Chaitanya Techno School, Bengaluru',
      degree: 'Class XII · CBSE',
      years: '2021 – 2023',
      score: 84,
      scoreUnit: '%',
    },
  ],

  location: {
    city: 'Vellore, India',
    timezone: 'IST · UTC+5:30',
    status: 'Open to remote & relocation',
    institution: 'VIT Vellore · Final Year',
    openToRemote: true,
  },

  journey: [
    { year: '2023', title: 'Started CSE @ VIT', type: 'education' as const, detail: 'Began B.Tech in CSE & Business Systems at VIT Vellore.' },
    { year: 'May–Jun 2024', title: 'Web Dev Intern @ Karooya', type: 'experience' as const, detail: 'Web Development Intern (Remote) — Karooya Technologies. Built real-time full-stack AI chatbot.' },
    { year: 'Jul 2024', title: 'Full-Stack Bootcamp', type: 'achievement' as const, detail: 'Completed Full-Stack Web Development Bootcamp on Udemy.' },
    { year: 'Sep 2024', title: 'Kubernetes Certified', type: 'achievement' as const, detail: 'Container & Kubernetes Essentials V2 — IBM via Credly.' },
    { year: 'Dec 2024', title: 'Web Dev Lead · IEEE RAS', type: 'experience' as const, detail: 'Joined IEEE RAS VIT as Web Development Team Lead.' },
    { year: 'Jan 2025', title: 'Conducted React Workshop', type: 'experience' as const, detail: 'Led & conducted React Workshop as Web Development Lead at IEEE RAS, Jan 22, 2025.' },
    { year: 'Jun 2025', title: 'AWS AI Practitioner', type: 'achievement' as const, detail: 'AWS Certified AI Practitioner — Jun 12, 2025.' },
    { year: 'Aug 2025', title: 'AWS Developer Associate', type: 'achievement' as const, detail: 'AWS Certified Developer – Associate — Aug 13, 2025.' },
    { year: 'Feb–May 2025', title: 'DevOps Internship @ CalQuity', type: 'experience' as const, detail: 'DevOps Engineer Intern (Remote) — Feb 2025 to May 2025. Built CI/CD pipelines & automation; resolved incidents in 112ms.' },
    { year: 'Jan 2026', title: 'Technical Head · IEEE RAS', type: 'experience' as const, detail: 'Promoted from Web Dev Lead to Technical Head at IEEE RAS.' },
    { year: 'Mar 2026', title: 'Patent Co-Inventor', type: 'achievement' as const, detail: 'Cache-Resident Alert Correlation & Counterfactual Automation System. App No. 202641031045.', highlight: true },
    { year: '2027', title: 'Seeking SDE / Backend / DevOps Roles', type: 'future' as const, detail: 'Open to high-impact Full Stack, DevOps, and SRE roles globally.' },
  ],

  philosophy: {
    label: 'ENGINEERING PHILOSOPHY',
    principles: [
      'Performance over complexity.',
      'Automation over repetition.',
      'Reliable systems over clever code.',
    ],
    closing: 'Build software that scales, survives failures, and remains maintainable.',
  },

  skills: {
    languages: {
      color: '#7C3AED',
      icon: 'code',
      skills: [
        { name: 'Python' },
        { name: 'Go' },
        { name: 'Java' },
        { name: 'C++' },
        { name: 'JavaScript' },
        { name: 'TypeScript' },
        { name: 'SQL' },
      ],
    },
    backend: {
      color: '#2563EB',
      icon: 'server',
      skills: [
        { name: 'React' },
        { name: 'Next.js' },
        { name: 'Node.js' },
        { name: 'FastAPI' },
        { name: 'Spring Boot' },
        { name: 'gRPC' },
        { name: 'REST' },
        { name: 'PostgreSQL' },
        { name: 'Redis' },
        { name: 'RabbitMQ' },
      ],
    },
    cloud: {
      color: '#22C55E',
      icon: 'cloud',
      skills: [
        { name: 'AWS' },
        { name: 'Azure' },
        { name: 'Docker' },
        { name: 'Kubernetes' },
        { name: 'Terraform' },
        { name: 'GitHub Actions' },
        { name: 'Prometheus' },
        { name: 'Grafana' },
      ],
    },
  },

  achievements: [
    { value: 12, unit: '+', label: 'Projects Built', isCounter: true },
    { value: 3, unit: '', label: 'Certifications', isCounter: true },
    { value: 1, unit: '', label: 'Patent', isCounter: true },
    { value: 1500, unit: '×', label: 'Automation Speedup', isCounter: true },
    { value: 98, unit: '%', label: 'Test Coverage', isCounter: true },
    { value: null, unit: null, label: 'Cloud Deployments', isCounter: false, text: 'Production' },
  ],

  certifications: [
    {
      title: 'AWS Certified Developer – Associate',
      issuer: 'Amazon Web Services',
      issuerShort: 'AWS',
      issuerColor: '#FF9900',
      score: 859,
      maxScore: 1000,
      date: 'Aug 13, 2025',
      url: 'https://www.credly.com/badges/992457ad-98fa-4546-9d4d-5af2417a636e/public_url',
    },
    {
      title: 'AWS Certified AI Practitioner',
      issuer: 'Amazon Web Services',
      issuerShort: 'AWS',
      issuerColor: '#FF9900',
      score: 936,
      maxScore: 1000,
      date: 'Jun 12, 2025',
      url: 'https://www.credly.com/badges/ad715ff0-831b-439b-9a4c-05526790ef16/public_url',
    },
    {
      title: 'Container & Kubernetes Essentials V2',
      issuer: 'IBM, Coursera',
      issuerShort: 'IBM',
      issuerColor: '#0F62FE',
      date: 'Sep 14, 2024',
      url: 'https://www.credly.com/badges/8f03a8fd-372b-427b-bab4-4364d82b2079/public_url',
    },
    {
      title: 'The Complete Full-Stack Web Development Bootcamp',
      issuer: 'Udemy',
      issuerShort: 'Udemy',
      issuerColor: '#A435F0',
      date: 'Jul 20, 2024',
      url: 'https://www.udemy.com/certificate/UC-82810436-2659-420c-afba-dd49fda54b41/',
    },
  ],

  patent: {
    title: 'Cache-Resident Alert Correlation and Counterfactual Automation System for Cloud Infrastructure',
    applicationNumber: '202641031045',
    date: 'Mar 15, 2026',
    status: 'Filed & Published',
  },

  leadership: {
    org: 'IEEE RAS Club',
    chapter: 'VIT Vellore',
    roles: ['Technical Head (Jan 2026 – present)', 'Web Dev Lead (Dec 2024 – Dec 2025)'],
    description: 'Leading technical initiatives, organizing engineering activities, mentoring members, and improving the club\'s technical ecosystem.',
    url: 'https://www.linkedin.com/posts/dheeraj-vp_reactjs-webdevelopment-devops-ugcPost-7288944313978257408-OK7c/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAErnAMcBpHjb6v5HIrZbpSzuufwhsuORpQ0',
    highlight: {
      event: 'React Workshop',
      role: 'Web Development Lead',
      date: 'Jan 22, 2025',
    },
    stats: [
      { label: 'Workshop', value: 'React' },
      { label: 'Role', value: 'Tech Lead' },
      { label: 'Date', value: 'Jan 2025' },
    ],
  },

  snapshot: [
    { icon: '🐧', label: 'Linux Daily Driver' },
    { icon: '🐳', label: 'Docker Everything' },
    { icon: '☁️', label: 'AWS Enthusiast' },
    { icon: '⚙️', label: 'Automation First' },
    { icon: '📚', label: 'Distributed Systems' },
    { icon: '💡', label: 'Always Building' },
  ],
};

export type JourneyMilestone = (typeof about.journey)[number];
export type Certification = (typeof about.certifications)[number];
export type Achievement = (typeof about.achievements)[number];
export type SkillItem = { name: string; projects?: string[] };
