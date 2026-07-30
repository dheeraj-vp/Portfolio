// ============================================================
// Blogs Section Data — Single source of truth for articles
// ============================================================

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  url: string;
  date: string;
  readTime: string;
  platform: 'Medium' | 'Technical Article';
  tags: string[];
  isFeatured?: boolean;
  relatedProjectId?: string; // Optional link to project
}

export const blogs: BlogPost[] = [
  {
    id: 'explainability-by-design',
    title: 'Explainability by Design: Decomposing Every Decision in Under 50ms',
    description:
      'A technical deep dive into deterministic decision decomposition for real-time automated incident remediation under strict 50ms latency constraints.',
    url: 'https://medium.com/@dheerajvp8055/explainability-by-design-decomposing-every-decision-in-under-50ms-1a8681ddfd15',
    date: 'Jul 2026',
    readTime: '6 min read',
    platform: 'Medium',
    tags: ['Patent Tech', 'System Architecture', 'Explainability', 'Automation'],
    isFeatured: true,
    relatedProjectId: 'caip',
  },
  {
    id: 'architecture-deep-dive-5-services',
    title: 'Architecture Deep Dive: 5 Microservices, One Event Backbone',
    description:
      'Deconstructing an event-driven microservices ecosystem built with Spring Boot, RabbitMQ, and Redis to achieve high-throughput cache-resident alert correlation.',
    url: 'https://medium.com/@dheerajvp8055/architecture-deep-dive-5-services-one-event-backbone-11b5be5cdd56',
    date: 'Jul 2026',
    readTime: '8 min read',
    platform: 'Medium',
    tags: ['Event-Driven', 'Microservices', 'RabbitMQ', 'Spring Boot'],
    isFeatured: true,
    relatedProjectId: 'caip',
  },

];
