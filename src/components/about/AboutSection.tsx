import { AboutHeading } from './AboutHeading';
import { BentoGrid } from './bento/BentoGrid';
import { JourneyTimeline } from './JourneyTimeline';
import { TechExpertise } from './TechExpertise';

import { CertificationCards } from './CertificationCards';
import { LeadershipCard } from './LeadershipCard';
import { SectionTransition } from './SectionTransition';

export function AboutSection() {
  return (
    <section
      id="about"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(80px, 10vw, 120px) 0 clamp(60px, 8vw, 100px)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* Blueprint grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      {/* Top-left radial glow (blue, shifts from hero's violet) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 600,
          height: 600,
          background: 'radial-gradient(circle at 0% 0%, rgba(37,99,235,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '0 clamp(1.25rem, 5vw, 2.5rem)',
        }}
      >
        <AboutHeading />

        {/* 1. Bento Grid */}
        <div className="about-bento-grid">
          <BentoGrid />
        </div>

        {/* 2. Engineering Journey */}
        <JourneyTimeline />

        {/* 3. Technical Expertise */}
        <div className="about-tech-grid">
          <TechExpertise />
        </div>


        {/* 5. Certifications + Patent */}
        <div className="about-cert-grid">
          <CertificationCards />
        </div>

        {/* 6. Leadership */}
        <LeadershipCard />

        {/* 7. Transition */}
        <SectionTransition />
      </div>

      {/* Responsive style overrides */}
      <style>{`
        /* Bento: 3-col on desktop, stack on mobile */
        .about-bento-grid > div {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 900px) {
          .about-bento-grid > div {
            grid-template-columns: 1fr !important;
          }
          .about-bento-grid > div > div:first-child {
            grid-column: span 1 !important;
          }
        }

        /* Tech expertise: 3-col → 2-col → 1-col */
        .about-tech-grid > div > div:last-child {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 1024px) {
          .about-tech-grid > div > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .about-tech-grid > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }

        /* Certs: 4-col → 2-col → 1-col */
        .about-cert-grid > div > div:first-child {
          /* heading */
        }
        .about-cert-grid .cert-cards-grid {
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 1024px) {
          .about-cert-grid .cert-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .about-cert-grid .cert-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 700px) {
          .about-tech-grid > div > div:last-child,
          .about-cert-grid .cert-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
