// ============================================================
// Experience Section Data — Single source of truth
// ============================================================

export interface ExperienceRole {
  id: string;
  title: string;
  company: string;
  type: 'internship' | 'leadership' | 'freelance';
  location: string;
  period: string;
  periodShort: string;
  color: string;                 // accent colour for this role
  bullets: string[];
  tech: string[];
  links?: { label: string; href: string }[];
}

export const experiences: ExperienceRole[] = [
  {
    id: 'calquity',
    title: 'DevOps Engineer Intern',
    company: 'CalQuity',
    type: 'internship',
    location: 'Remote',
    period: 'Feb 2025 – May 2025',
    periodShort: 'Feb–May 2025',
    color: '#22C55E',
    bullets: [
      'Deployed containerised Next.js applications on Azure Container Apps with GitHub Actions CI/CD, custom DNS/ingress routing, and Clerk authentication.',
      'Built production-grade serverless APIs on Azure Functions with JWT/API-key authentication, Redis-backed rate limiting, caching, and structured logging.',
      'Provisioned Azure infrastructure using Terraform (IaC) and automated deployments through CI/CD pipelines for multiple applications.',
      'Self-hosted the Supabase stack on Azure VMs and Azure Container Apps using Docker Compose, managing networking and production deployments.',
      'Automated an AI-powered market-news pipeline using Azure Functions, Azure OpenAI, and a fault-tolerant Puppeteer/Crawlee scraping system with retry logic and schema validation.',
    ],
    tech: [
      'Azure', 'Terraform', 'Docker', 'GitHub Actions',
      'Azure Functions', 'Next.js', 'Redis', 'Supabase',
      'Azure OpenAI', 'Puppeteer', 'JWT', 'CI/CD',
    ],
  },
  {
    id: 'karooya',
    title: 'Web Development Intern',
    company: 'Karooya Technologies',
    type: 'internship',
    location: 'Remote',
    period: 'May 2024 – Jun 2024',
    periodShort: 'May–Jun 2024',
    color: '#2563EB',
    bullets: [
      'Owned end-to-end development of a full-stack AI-powered chatbot application — from architecture and implementation to testing and deployment.',
      'Built real-time conversation layer using WebSocket (Socket.IO), enabling low-latency bidirectional communication between client and server.',
      'Designed scalable backend services and RESTful APIs with Node.js/Express, integrating conversational workflows and external AI APIs.',
      'Optimised frontend performance with reusable React components, responsive UI, and minimised render cycles.',
      'Managed the complete development lifecycle: feature development, API integration, debugging, performance optimisation, and production deployment.',
    ],
    tech: [
      'React.js', 'Node.js', 'Express.js',
      'Socket.IO', 'JavaScript', 'REST APIs', 'HTML', 'CSS',
    ],
  },
];

export type { ExperienceRole as Experience };
