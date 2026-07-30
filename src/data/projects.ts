// ============================================================
// Projects Section Data — Single source of truth
// ============================================================

export interface RelatedBlog {
  title: string;
  url: string;
  date: string;
}

export interface Project {
  id: string;
  title: string;
  categories: ('DevOps' | 'FullStack')[];
  duration?: string;
  overview: string;
  githubUrl: string;
  liveUrl?: string;
  highlights?: string[];
  techStack: string[]; // Dynamic string array parsed by UI (splitting at colons)
  tags: string[];      // Brief tags to display on card
  relatedBlogs?: RelatedBlog[];
  isFeatured?: boolean; // To highlight important projects
  badge?: string;       // Custom badge text (e.g., 'Patent')
}

export const projects: Project[] = [
  {
    id: 'caip',
    title: 'Counterfactual Automation Intelligence Platform (CAIP)',
    categories: ['DevOps', 'FullStack'],
    isFeatured: true,
    badge: 'Patent Project',
    duration: '22 Jan 2026 – 25 Mar 2026',
    overview:
      "CAIP implements a complete incident management lifecycle from alert ingestion to automated resolution, featuring intelligent correlation, adaptive severity evaluation, confidence-weighted automation, and counterfactual outcome analysis. Built on Spring Boot microservices architecture with event-driven communication, the platform ensures high availability, fault tolerance, and regulatory compliance. The platform's core innovation is counterfactual automation evaluation - a deterministic method for comparing historical automated vs manual incident resolution outcomes to improve automation decision quality and prevent harmful automation.",
    githubUrl: 'https://github.com/dheeraj-vp/Counterfactual-Automation-Intelligence-Platform-',
    highlights: [
      'Co-inventor of patent application #202641031045 (Cache-Resident Alert Correlation & Counterfactual Automation System).',
      'Incident creation latency reduced from 5–10 min to 112ms (1500x speedup).',
      'Counterfactual evaluation engine with ~95% decision accuracy and 81.8% faster correlation (340ms → 62ms).',
      '86.3% CPU reduction via cache-resident alert correlation.'
    ],
    techStack: [
      'Language: Java 17 (LTS)',
      'Framework: Spring Boot 3.x, Spring Cloud Gateway',
      'Build Tool: Maven',
      'Database: PostgreSQL (database-per-service pattern)',
      'Database Migrations: Flyway',
      'Message Broker: RabbitMQ',
      'Cache: Redis',
      'Containerization: Docker, Docker Compose',
      'Monitoring: Prometheus, Grafana',
      'API Documentation: Swagger/OpenAPI 3.x',
      'Testing: JUnit 5, Mockito, Testcontainers, AssertJ'
    ],
    tags: ['Spring Boot', 'RabbitMQ', 'Redis', 'PostgreSQL', 'Docker'],
    relatedBlogs: [
      {
        title: 'Explainability by Design: Decomposing Every Decision in Under 50ms',
        url: 'https://medium.com/@dheerajvp8055/explainability-by-design-decomposing-every-decision-in-under-50ms-1a8681ddfd15',
        date: 'Medium Article',
      },
      {
        title: 'Architecture Deep Dive: 5 Services, One Event Backbone',
        url: 'https://medium.com/@dheerajvp8055/architecture-deep-dive-5-services-one-event-backbone-11b5be5cdd56',
        date: 'Medium Article',
      },
      {
        title: 'Deterministic Analysis of Incident Remediation Outcomes',
        url: '#blogs', // Links to blogs section
        date: 'Mar 28, 2026',
      },
      {
        title: 'Designing Cache-Resident Alert Correlation Engines',
        url: '#blogs',
        date: 'Mar 15, 2026',
      }
    ]
  },
  {
    id: 'quickqueue',
    title: 'QuickQueue — Campus Food Pre-Ordering System',
    categories: ['FullStack'],
    overview:
      'QuickQueue is a full-stack campus food pre-ordering platform featuring a 3-role Role-Based Access Control (Student, Vendor, Admin) and an automated 5-stage order lifecycle state machine. It implements real-time order tracking using Server-Sent Events (SSE) with active heartbeat management, automatic reconnection, and role-based message routing. Built with security and scalability at its core, the platform features a multi-layer security stack and exceptional automated testing coverage.',
    githubUrl: 'https://github.com/dheeraj-vp/QuickQueue',
    highlights: [
      '98.36% unit test coverage (130+ tests) across all frontend and backend services.',
      '98% security test pass rate (96/98 security markers met including CSP, HSTS, and XSS/SQLi prevention).',
      'Real-time order tracking via Server-Sent Events (SSE) with Upstash Redis-backed rate limiting.'
    ],
    techStack: [
      'Language: TypeScript',
      'Framework: Next.js 15 (App Router), Tailwind CSS',
      'Database: PostgreSQL (Supabase)',
      'ORM: Prisma ORM',
      'Authentication: Clerk Auth',
      'Cache: Redis (Upstash)',
      'Validation: Zod',
      'Containerization: Docker',
      'CI/CD: GitHub Actions, GitHub Container Registry (GHCR)',
      'Testing: Jest, React Testing Library'
    ],
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Clerk', 'Redis'],
    relatedBlogs: [
      {
        title: 'Building Resilient SSE Connections with Active Heartbeats',
        url: '#blogs',
        date: 'May 10, 2025'
      }
    ]
  },
  {
    id: 'url-shortener',
    title: 'Cloud Native URL Shortener',
    categories: ['DevOps', 'FullStack'],
    overview:
      'A high-performance serverless URL shortener built in Go using Hexagonal Architecture (Ports & Adapters) and deployed as 5 independent AWS Lambda functions. The system implements a Cache-aside pattern via Amazon ElastiCache to achieve sub-20ms redirect latency, and decouples analytics notifications via SQS. The entire infrastructure is managed as code using CloudFormation, strictly adhering to the principle of least-privilege IAM roles.',
    githubUrl: 'https://github.com/dheeraj-vp/Cloud-Native-URL-shortener-built-with-Go-and-AWS-Serverless-Stack',
    highlights: [
      '85% cache hit rate with sub-20ms redirects.',
      'Hexagonal Architecture ensuring complete decoupling of business logic from infrastructure.',
      'Concurrent goroutines to eliminate N+1 queries in stats pipeline.',
      'Least-privilege IAM policy per individual Lambda function.'
    ],
    techStack: [
      'Language: Go',
      'Framework: AWS Lambda, API Gateway',
      'Infrastructure as Code: CloudFormation',
      'Database: DynamoDB',
      'Cache: Amazon ElastiCache (Redis)',
      'Message Queue: Amazon SQS',
      'CDN: Amazon CloudFront',
      'Observability: Amazon CloudWatch',
      'CI/CD: GitHub Actions (with auto-rollback and Trivy security scanning)'
    ],
    tags: ['Go', 'AWS Lambda', 'DynamoDB', 'CloudFormation', 'ElastiCache'],
    relatedBlogs: [
      {
        title: 'Serverless Go: Hexagonal Architecture on AWS Lambda',
        url: '#blogs',
        date: 'Jan 22, 2025'
      }
    ]
  },
  {
    id: 'hot-reload',
    title: 'Hot Reload Engine',
    categories: ['FullStack'],
    overview:
      'A production-grade CLI hot-reloading tool written in Go that watches files and automates building and process management. Featuring an event-driven pipeline (FileWatcher → Debouncer → Builder → ProcessManager), it prevents thundering herds with a sliding window debouncer and orchestrates process life cycles via a deterministic state machine. It guarantees process safety via graceful shutdowns and robust crash recovery.',
    githubUrl: 'https://github.com/dheeraj-vp/HotReload',
    highlights: [
      'Sub-2s file-save to server-restart latency.',
      'Graceful process shutdown (SIGTERM → SIGKILL) using process groups.',
      'CrashGuard with exponential backoff (1s → 30s, max 5 restarts).',
      '95% test coverage with clean race detector outcomes.'
    ],
    techStack: [
      'Language: Go',
      'Libraries: fsnotify, slog',
      'Concurrency: Goroutines, Channels, sync.Mutex, Context API',
      'Process Management: exec.Cmd (with process group killing)',
      'Testing: Go Testing (race-detector-clean)',
      'Linting: golangci-lint'
    ],
    tags: ['Go', 'CLI', 'Concurrency', 'fsnotify', 'Process Management'],
    relatedBlogs: [
      {
        title: 'Process Group Management and Graceful Terminations in Go',
        url: '#blogs',
        date: 'Oct 05, 2024'
      }
    ]
  },
  {
    id: 'mora',
    title: 'Microservice Orchestration & Rightsizing Agent (MOrA)',
    categories: ['DevOps'],
    overview:
      'MOrA is a Kubernetes-native resource rightsizing and autoscaling agent. It collects real-time microservice performance metrics by driving load tests with JMeter and scraping metrics via Prometheus. This data is fed into time-series forecasting models (scikit-learn, TensorFlow, Prophet) to generate highly accurate, automated CPU and memory rightsizing recommendations, which are then enforced in-cluster to optimize resources.',
    githubUrl: 'https://github.com/dheeraj-vp/Microservice-Orchestration-and-Rightsizing-Agent',
    highlights: [
      'Reduces microservice over-provisioning by 25–40% dynamically.',
      'Predictive resource allocation using Prophet and TensorFlow forecasting models.',
      'Idempotent and resumable CLI workflows for Kubernetes cluster management.'
    ],
    techStack: [
      'Language: Python',
      'Orchestration: Kubernetes, Docker, Minikube',
      'Metrics & Load Testing: Prometheus, Grafana, Apache JMeter',
      'Machine Learning / Forecasting: scikit-learn, TensorFlow, Prophet',
      'CLI: Python CMD / click'
    ],
    tags: ['Kubernetes', 'Prometheus', 'Python', 'TensorFlow', 'Prophet'],
    relatedBlogs: [
      {
        title: 'Predictive Resource Autoscaling: Integrating ML Models with Kubernetes',
        url: '#blogs',
        date: 'Aug 14, 2024'
      }
    ]
  }
];
