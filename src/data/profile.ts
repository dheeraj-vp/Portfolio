// ============================================================
// Profile Data — Single source of truth for all content
// ============================================================

export const profile = {
  name: 'Dheeraj V P',
  nameShort: 'Dheeraj',

  headline: {
    line1: 'Engineering systems',
    line2: ['that ships at ', 'scale.', ''],
    // line2: prefix | gradient word (includes period) | empty suffix
  },

  roles: [
    'Backend Engineer',
    'Cloud Platform Engineer',
    'Distributed Systems',
    'DevOps Engineer',
    'Full Stack Engineer',
  ],

  description:
    'Building production-grade distributed systems, cloud-native platforms and backend infrastructure with measurable impact — from 112ms incident resolution to highly scalable serverless architectures.',

  availability: {
    label: 'Available for opportunities',
    active: true,
  },

  metrics: [
    { value: 2, unit: '×', label: 'Automation Speedup', isCounter: true },
    { value: 112, unit: 'ms', label: 'Incident Resolution', isCounter: true },
    { value: 98, unit: '%', label: 'Test Coverage', isCounter: true },
    { value: 2, unit: '×', label: 'AWS Certified', isCounter: true },
    { value: null, unit: null, label: 'Co-Inventor', isCounter: false, text: 'Patent' },
  ],

  cta: {
    primary: { label: 'Explore Projects', href: '#projects' },
    secondary: { label: 'View Resume', href: '#resume' },
  },

  socials: [
    { id: 'github', label: 'GitHub', href: 'https://github.com/dheeraj-vp', icon: 'github' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/dheeraj-vp/', icon: 'linkedin' },
    { id: 'leetcode', label: 'LeetCode', href: 'https://leetcode.com/u/dheeraj_vp/', icon: 'leetcode' },
    { id: 'email', label: 'Email', href: 'mailto:dheerajvp8055@gmail.com', icon: 'mail' },
  ],

  proofTechs: [
    { id: 'aws', label: 'AWS', color: '#FF9900' },
    { id: 'go', label: 'Go', color: '#00ACD7' },
    { id: 'kubernetes', label: 'Kubernetes', color: '#326CE5' },
    { id: 'redis', label: 'Redis', color: '#DC382D' },
    { id: 'docker', label: 'Docker', color: '#2496ED' },
    { id: 'postgres', label: 'PostgreSQL', color: '#336791' },
  ],
};

export type Metric = (typeof profile.metrics)[number];
export type Social = (typeof profile.socials)[number];
export type ProofTech = (typeof profile.proofTechs)[number];
