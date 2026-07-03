# Product Requirements Document (PRD)
## Personal Portfolio Website — Dheeraj V P

---

## 1. Overview

**Project Name:** Dheeraj V P — Portfolio Website
**Owner:** Dheeraj V P
**Purpose:** A personal portfolio website to showcase Dheeraj's skills, projects, work experience, blog writing, and resume, and to provide a way for recruiters/collaborators to get in touch.
**Target Audience:** Recruiters, hiring managers, engineering peers, open-source collaborators.
**Primary Goal:** Make a strong, credible first impression that gets Dheeraj shortlisted for SDE / Backend / DevOps roles, and gives visitors an easy way to explore his work and reach out.

---

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Framework | React (Vite recommended for fast dev/build) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion (primary), ReactBits.dev components, Magic UI components |
| Routing | React Router (if multi-page) or single-page with anchor-based scroll navigation |
| Icons | Lucide React / React Icons |
| Deployment | Vercel (preferred) or Netlify |
| Content (Blogs) | MDX or a headless CMS (TBD — see Section 8) |
| Form Handling (Contact) | Formspree / EmailJS / Resend (TBD) |
| Analytics (optional) | Vercel Analytics / Plausible |

> Note: Specific ReactBits.dev / Magic UI component picks (e.g., which hero animation, which card hover effect, which cursor/spotlight effect) will be specified separately by Dheeraj and should be swapped in per-section once decided. This PRD defines *where* animation/interaction should exist — not the exact library component to use.

---

## 3. Site Structure / Navigation

Single-page scrolling app (with smooth-scroll navigation) OR multi-route app — recommend **single-page with anchored sections** for a portfolio, since it reads as one cohesive story and animations transition better between sections on scroll.

Sticky/floating navbar with links to:
1. Home
2. About Me
3. Experience
4. Projects
5. Blogs
6. Resume
7. Contact

Additional persistent elements:
- Dark/Light mode toggle (optional but recommended given animation-heavy design)
- Social links (GitHub, LinkedIn, LeetCode, Mail) always accessible (navbar or floating dock)

---

## 4. Page / Section Requirements

### 4.1 Home (Hero Section)
**Goal:** Immediate, memorable first impression.
- Name, title/tagline (e.g., "Backend Engineer | Cloud & Distributed Systems | DevOps") — Dheeraj to confirm final tagline
- Short one-line value proposition
- Animated intro (typewriter effect / staggered text reveal / gradient text — via Framer Motion or ReactBits text animation components)
- CTA buttons: "View Projects", "Download Resume"
- Background: subtle animated element (particles, gradient mesh, spotlight cursor effect, or grid background) — pick one from ReactBits/Magic UI, avoid overloading
- Social icons row (GitHub, LinkedIn, LeetCode, Mail)

### 4.2 About Me
**Goal:** Personality + credibility.
- Short bio paragraph (education, current focus area, interests)
- Education block:
  - Vellore Institute of Technology (B.Tech CSE & Business Systems, 2023–2027, GPA 8.56/10)
  - Sri Chaitanya Techno School, Class XII CBSE (84%)
- Skills section, grouped and visually presented (animated tag chips / marquee / grid):
  - **Languages:** Python, Go, Java, C++, JavaScript, TypeScript, SQL
  - **Backend & Databases:** Next.js, Node.js, FastAPI, Spring Boot, gRPC, REST, PostgreSQL, MongoDB, Redis, Supabase
  - **Cloud & DevOps:** AWS, Azure, Docker, Kubernetes, Terraform, GitHub Actions, Jenkins, Linux
  - **Observability & ML:** Prometheus, Grafana, CloudWatch, TensorFlow, scikit-learn, Prophet
- Certifications (as badges/cards with "View Credential" links):
  - AWS Certified Developer – Associate (859/1000)
  - AWS Certified AI Practitioner (936/1000)
  - Container & Kubernetes Essentials V2 – IBM (Coursera)
- Leadership: Technical Head & Ex-Web Development Team Lead, IEEE-RAS Club, VIT (with link)

### 4.3 Experience
**Goal:** Clear, scannable work history — timeline style preferred.
- Animated vertical timeline (scroll-triggered reveal per entry)
- Entry: **DevOps & Automation Intern — CalQuity (Remote)** | Feb 2025 – May 2025
  - Deployed containerized Next.js on Azure Container Apps with GitHub Actions CI/CD, custom DNS/ingress routing, Clerk-based auth
  - Built production-grade serverless API on Azure Functions (JWT/API key auth, rate limiting, Redis caching, structured logging)
  - Self-hosted full Supabase stack (PostgREST, GoTrue, Realtime, Kong) on Azure VMs + ACA via Docker Compose
  - Automated market news pipeline using Azure Functions + Azure OpenAI with fault-tolerant Puppeteer/Crawlee scraper (retry logic, schema validation)
- Design should support adding future roles easily (component-driven, data-mapped from a config/JSON file, not hardcoded JSX)

### 4.4 Projects
**Goal:** The core conversion section — most scrutinized by recruiters.
- Grid or card-stack layout with hover animations (tilt, glow, scale) from ReactBits/Magic UI
- Each project card should show: title, short description, tech stack badges, GitHub link, live demo link (if any), and expandable/modal view for full detail
- Filter/sort by tech tag (optional nice-to-have)

Known projects to include (merge across all resume versions — dedupe by using the most complete description of each):

1. **Counterfactual Automation Intelligence Platform (CAIP)** — Patent Co-inventor
   - Cloud-native event-driven microservices platform (5 services via API Gateway); ingests alerts, correlates via multi-dimensional scoring engine (temporal + spatial + semantic), auto-remediates via confidence-weighted pipeline — incident creation reduced from 5–10 min to 112ms (1500x faster)
   - Counterfactual evaluation engine comparing historical automated vs manual resolutions — ~95% decision accuracy, 81.8% faster correlation (340ms → 62ms), 86.3% CPU reduction
   - Production safety: distributed locking, canary deployments, auto-rollback
   - Tech: Java 17, Spring Boot, Distributed Systems, RabbitMQ, PostgreSQL, Redis, Resilience4j, Flyway, Micrometer

2. **QuickQueue — Campus Food Pre-Ordering System**
   - Full-stack platform, 3-role RBAC (Student, Vendor, Admin), 5-stage order lifecycle state machine
   - Real-time order tracking via SSE with heartbeat management, auto-reconnect, role-based message routing
   - Multi-layer security stack (CSP, HSTS, XSS/SQLi prevention via Prisma + Zod, Upstash Redis rate limiting)
   - 98.36% unit test coverage (130+ tests), 98% security test pass rate (96/98); Dockerized, GitHub Actions CI/CD to GHCR
   - Tech: Next.js 15, TypeScript, PostgreSQL, Prisma ORM, Clerk Auth, Redis (Upstash), Zod, Docker

3. **Cloud Native URL Shortener**
   - Serverless URL shortener in Go, Hexagonal Architecture (Ports & Adapters), 5 independent Lambda functions
   - Cache-aside pattern via ElastiCache — 85% cache hit rate, sub-20ms redirects; concurrent goroutines to eliminate N+1 queries in stats pipeline
   - Decoupled notifications via SQS; full infra as code via CloudFormation, least-privilege IAM per Lambda
   - Automated testing, Trivy security scanning, GitHub Actions CI/CD with auto-rollback; CloudWatch observability
   - Tech: Go, AWS Lambda, API Gateway, DynamoDB, ElastiCache, SQS, CloudFront, CloudFormation, GitHub Actions

4. **Hot Reload Engine**
   - Production-grade CLI hot-reload tool in Go — event-driven pipeline (FileWatcher → Debouncer → Builder → ProcessManager)
   - Sliding window debouncer (300ms) prevents thundering herd on rapid saves; state machine (Stopped → Starting → Running → Stopping → Failed) for process lifecycle
   - Sub-2s file save to server restart; CrashGuard with exponential backoff (1s → 30s, max 5 restarts), SIGTERM → SIGKILL graceful shutdown with process group killing
   - 95% test coverage, race-detector-clean tests across all 6 components
   - Tech: Go, Concurrency (Goroutines, Channels), fsnotify, Context API, sync.Mutex, exec.Cmd, slog, golangci-lint

5. **Microservice Orchestration & Rightsizing Agent (MOrA)**
   - Kubernetes rightsizing platform — collects live microservice metrics via Prometheus and JMeter, feeds time-series models (scikit-learn, TensorFlow, Prophet) for automated CPU/memory recommendations
   - Enforces recommendations in-cluster — cuts over-provisioning by 25–40%
   - Production-grade CLI with idempotent, resumable workflows; full Docker/Minikube orchestration for reproducible deployments
   - Tech: Kubernetes, Docker, Prometheus, Grafana, JMeter, scikit-learn, TensorFlow, Prophet, Python, Minikube

> **Action item for Dheeraj:** Confirm final project descriptions (the resume versions differ slightly in wording/metrics per project — pick the canonical version for the site), add any newer/additional projects not on the resumes yet, and provide live-demo links where available.

### 4.5 Blogs
**Goal:** Demonstrate communication skill and thought leadership; also good for SEO.
- Blog listing page: card grid with title, cover image, short excerpt, date, read-time, tags
- Individual blog post page: clean reading layout, syntax-highlighted code blocks (for technical posts), table of contents for long posts
- Content source: MDX files in-repo (simplest, git-based) — recommended for a dev portfolio since Dheeraj can write posts in Markdown/MDX and commit them; alternative is a headless CMS (Contentful/Sanity) if non-technical editing is desired later
- Empty state: If no blogs exist yet, show a "Coming soon" placeholder rather than an empty page

### 4.6 Resume
**Goal:** Let visitors view and download the resume without leaving the site.
- Embedded PDF viewer (inline, scrollable) of the current resume
- Prominent "Download PDF" button
- Should be trivial to swap in an updated PDF (store as a static asset, referenced by one config path — not hardcoded across multiple places)
- Consider: since there are multiple resume variants (SDE-focused, DevOps-focused), decide whether to show one unified resume or let the visitor pick a variant (e.g., toggle "SDE Resume" / "DevOps Resume"). **Action item for Dheeraj to decide.**

### 4.7 Contact
**Goal:** Frictionless way to reach out.
- Contact form: Name, Email, Message → sends via EmailJS / Formspree / Resend (no backend required for MVP)
- Direct contact info: Email (mailto), Phone (optional, click-to-call), LinkedIn, GitHub
- Success/error toast feedback on form submission
- Optional: simple honeypot or reCAPTCHA to prevent spam

---

## 5. Design & Animation Guidelines

- **Consistency over spectacle:** animations should reinforce hierarchy (scroll-reveal, hover feedback, page transitions) — not distract from content.
- **Scroll-triggered reveals** (Framer Motion `whileInView`) for section entrances (About, Experience timeline, Project cards, Blog cards).
- **Micro-interactions:** button hover states, card hover tilt/glow, animated underline on nav links.
- **Page/section transition:** smooth scroll between sections; consider a subtle page-load animation once on first visit.
- **Typography:** one strong display font for headings + one clean readable font for body (to be chosen — consider pairing via Google Fonts or Fontshare).
- **Color palette:** dark-mode-first is recommended for a dev-focused portfolio (common in this space), with a light mode toggle. Palette TBD by Dheeraj.
- **Component sourcing:** Dheeraj will specify exact ReactBits.dev / Magic UI components to use per section later — this PRD leaves placeholders for: Hero background/text effect, Project card hover effect, Timeline animation, Nav bar style (floating dock vs sticky bar), Cursor effect (optional).
- **Responsiveness:** Fully responsive — mobile, tablet, desktop. Animations should degrade gracefully or be reduced on mobile for performance (respect `prefers-reduced-motion`).
- **Performance:** Lazy-load below-the-fold sections/images; keep animation libraries tree-shaken; target Lighthouse performance score 90+.

---

## 6. Data Architecture

Recommend all dynamic content (skills, experience, projects, certifications, blog metadata) live in structured config/data files (e.g., `/src/data/projects.ts`, `/src/data/experience.ts`, `/src/data/skills.ts`) rather than hardcoded in JSX. This makes it trivial to:
- Add/edit/remove projects or experience entries without touching component code
- Reuse the same data for filtering/sorting
- Potentially migrate to a CMS later without rewriting UI components

---

## 7. Non-Functional Requirements

| Requirement | Detail |
|---|---|
| Performance | Lighthouse score 90+ on Performance, Accessibility, SEO |
| SEO | Proper meta tags, Open Graph tags, sitemap.xml, robots.txt |
| Accessibility | Semantic HTML, keyboard navigable, respects `prefers-reduced-motion`, sufficient color contrast |
| Responsiveness | Mobile-first breakpoints, tested on common device sizes |
| Browser Support | Latest 2 versions of Chrome, Firefox, Safari, Edge |
| Hosting | Vercel (auto-deploy from GitHub main branch) |
| Domain | Custom domain (Dheeraj to provide/purchase) |

---

## 8. Open Questions / Decisions Needed from Dheeraj

1. Which specific ReactBits.dev / Magic UI components for: hero animation, project cards, nav bar, timeline?
2. Single unified resume vs. selectable resume variants (SDE / DevOps)?
3. Blog content source: MDX in-repo vs. headless CMS?
4. Contact form backend: EmailJS, Formspree, or Resend?
5. Final tagline/positioning statement for Hero section?
6. Color palette / dark-mode-first or light-mode-first?
7. Custom domain name?
8. Any project live demo links to include?
9. Should GitHub stats / contribution graph / LeetCode stats be displayed anywhere (common in dev portfolios)?

---

## 9. Milestones (Suggested)

1. **Setup:** Project scaffold (Vite + React + TS + Tailwind), design tokens, folder structure, data files
2. **Static Build:** All sections built with real content, no animation yet
3. **Animation Pass:** Layer in Framer Motion / ReactBits / Magic UI per section
4. **Resume + Contact:** PDF embed, download, contact form wired up
5. **Blogs:** Blog listing + post template (even if only 1 post initially)
6. **QA:** Responsive check, accessibility pass, performance audit
7. **Deploy:** Vercel deployment + custom domain + analytics

---

## 10. Success Criteria

- Recruiters can understand who Dheeraj is, what he's built, and how to reach him within 60 seconds of landing on the site
- All project metrics/claims are accurate and consistent with resume
- Site loads fast and animates smoothly on both desktop and mobile
- Resume is viewable and downloadable in one click
- Contact form reliably delivers messages
