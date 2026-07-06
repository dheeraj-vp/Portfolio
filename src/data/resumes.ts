// ============================================================
// Resumes Data — Single source of truth for Resume Section
// ============================================================

export interface ResumeExperience {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface ResumeProject {
  title: string;
  description: string;
  tech: string[];
}

export interface ResumeVariant {
  id: string;
  name: string;
  title: string;
  driveLink: string;
  downloadLink: string;
  summary: string;
  skills: {
    category: string;
    items: string[];
  }[];
  experience: ResumeExperience[];
  projects: ResumeProject[];
}

export const resumesData: Record<'fullStack' | 'devOps', ResumeVariant> = {
  fullStack: {
    id: 'fullstack',
    name: 'Full-Stack Resume',
    title: 'Full-Stack & Backend Engineer',
    driveLink: 'https://drive.google.com/file/d/19prYQEFgVxUjvrWRyl8CsFrBHTTGJCy4/view?usp=drive_link',
    downloadLink: 'https://drive.google.com/uc?export=download&id=19prYQEFgVxUjvrWRyl8CsFrBHTTGJCy4',
    summary: 'Software Engineer specializing in building scalable backend systems, robust API architectures, and interactive web applications. Experienced in React/Next.js, Spring Boot, Go, and relational databases with a strong emphasis on clean code, automated testing, and performance optimization.',
    skills: [
      {
        category: 'Languages',
        items: ['Java', 'Go', 'Python', 'TypeScript', 'JavaScript', 'C++', 'SQL'],
      },
      {
        category: 'Frameworks & Runtimes',
        items: ['Spring Boot', 'Next.js 15', 'React', 'Node.js', 'FastAPI', 'Express'],
      },
      {
        category: 'Databases & Message Brokers',
        items: ['PostgreSQL', 'MySQL', 'Redis', 'RabbitMQ', 'Prisma ORM'],
      },
      {
        category: 'Infrastructure & Tools',
        items: ['Docker', 'AWS Lambda', 'Git', 'GitHub Actions', 'Jest', 'JUnit 5'],
      },
    ],
    experience: [
      {
        role: 'DevOps Engineer Intern',
        company: 'CalQuity (Remote)',
        period: 'Feb 2025 – May 2025',
        bullets: [
          'Developed and optimized full-stack application modules and automated deployment pipelines, improving release reliability.',
          'Integrated secure API gateways and backend microservices, handling data consistency and authentication layers.',
          'Assisted in configuring Redis-based caching systems, reducing overall query responses and latency to 112ms.',
        ],
      },
      {
        role: 'Technical Head / Web Dev Lead',
        company: 'IEEE RAS VIT Vellore',
        period: 'Dec 2024 – Present',
        bullets: [
          'Engineered event platforms and landing pages using Next.js and Tailwind CSS, increasing registration conversions.',
          'Organized and led technical workshops on React and web development fundamentals for over 100+ university students.',
          'Mentored a team of 15+ student developers, conducting weekly code reviews and structuring software deliverables.',
        ],
      },
    ],
    projects: [
      {
        title: 'Counterfactual Automation Intelligence Platform (CAIP)',
        description: 'Co-inventor of patent-filed incident management microservices system built on Spring Boot, reducing event correlation time from 340ms to 62ms.',
        tech: ['Spring Boot', 'RabbitMQ', 'Redis', 'PostgreSQL', 'Docker'],
      },
      {
        title: 'QuickQueue — Campus Food Pre-Ordering',
        description: 'Built a multi-role web platform utilizing Next.js, Prisma, and SSE real-time state tracking with 98% security scoring and Jest testing.',
        tech: ['Next.js', 'Prisma ORM', 'PostgreSQL', 'Redis', 'Clerk Auth'],
      },
      {
        title: 'Hot Reload CLI Engine',
        description: 'Developed an event-driven file-watching and automated reloading process-manager in Go using fsnotify and Graceful OS signal handling.',
        tech: ['Go', 'fsnotify', 'Process Management', 'Concurrency'],
      },
    ],
  },
  devOps: {
    id: 'devops',
    name: 'DevOps & SRE Resume',
    title: 'DevOps, SRE & Platform Engineer',
    driveLink: 'https://drive.google.com/file/d/1iVrn_3mvNKouJwKLR7SGe2Ru19aUwRID/view?usp=drive_link',
    downloadLink: 'https://drive.google.com/uc?export=download&id=1iVrn_3mvNKouJwKLR7SGe2Ru19aUwRID',
    summary: 'Cloud & Infrastructure Engineer focused on automating software delivery pipelines, managing containerized Kubernetes clusters, and implementing site reliability best practices. Certified AWS Developer with hands-on experience building Infrastructure as Code (IaC) and observability dashboards.',
    skills: [
      {
        category: 'Cloud & Platforms',
        items: ['Amazon Web Services (AWS)', 'Kubernetes (K8s)', 'Docker', 'Minikube'],
      },
      {
        category: 'Infrastructure as Code & CI/CD',
        items: ['Terraform', 'AWS CloudFormation', 'GitHub Actions', 'Shell Scripting'],
      },
      {
        category: 'Observability & Monitoring',
        items: ['Prometheus', 'Grafana', 'Amazon CloudWatch', 'ELK Stack'],
      },
      {
        category: 'Systems & Languages',
        items: ['Linux (Ubuntu/Debian)', 'Go', 'Python', 'Bash', 'TypeScript', 'Java'],
      },
    ],
    experience: [
      {
        role: 'DevOps Engineer Intern',
        company: 'CalQuity (Remote)',
        period: 'Feb 2025 – May 2025',
        bullets: [
          'Designed and maintained production CI/CD pipelines via GitHub Actions and container registries, automating zero-downtime microservice rollouts.',
          'Built robust monitoring dashboards with Prometheus and Grafana, isolating latency bottlenecks and setting up anomaly alerts.',
          'Successfully co-implemented system reliability protocols to reduce incident resolution speed to 112ms during testing cycles.',
        ],
      },
      {
        role: 'Technical Head / Web Dev Lead',
        company: 'IEEE RAS VIT Vellore',
        period: 'Dec 2024 – Present',
        bullets: [
          'Managed containerized environment environments and self-hosted deployments for the club\'s software portal.',
          'Orchestrated cloud deployment workflows and automated backups, achieving 99.9% uptime during large registration events.',
          'Trained club members on containerization best practices, Dockerizing node/python web services.',
        ],
      },
    ],
    projects: [
      {
        title: 'Counterfactual Automation Intelligence Platform (CAIP)',
        description: 'Engineered an event-driven system leveraging RabbitMQ and Redis to correlation streams of cluster alerts, optimizing CPU utilization by 86%.',
        tech: ['Spring Boot', 'RabbitMQ', 'Redis', 'Docker Compose', 'Prometheus'],
      },
      {
        title: 'Cloud Native Serverless URL Shortener',
        description: 'Designed a Go-based AWS Lambda stack using Hexagonal Architecture and Amazon ElastiCache (Redis) managed as code via CloudFormation.',
        tech: ['Go', 'AWS Lambda', 'DynamoDB', 'CloudFormation', 'SQS'],
      },
      {
        title: 'Microservice rightsizing Agent (MOrA)',
        description: 'Developed a Kubernetes-native resource rightsizing CLI agent in Python leveraging JMeter load tests and TensorFlow forecasting models.',
        tech: ['Kubernetes', 'Prometheus', 'Python', 'TensorFlow', 'Prophet'],
      },
    ],
  },
};
