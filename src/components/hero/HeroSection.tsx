import { motion } from 'framer-motion';
import { SPRING_SMOOTH, HERO_DELAYS } from '../../lib/animation';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { profile } from '../../data/profile';
import { HeroBackground } from './HeroBackground';
import { StatusBadge } from './StatusBadge';
import { HeroHeadline } from './HeroHeadline';
import { HeroRole } from './HeroRole';
import { HeroDescription } from './HeroDescription';
import { HeroMetrics } from './HeroMetrics';
import { HeroCTAs } from './HeroCTAs';
import { SocialRow } from './SocialRow';
import { ScrollIndicator } from './ScrollIndicator';
import { ProofElement } from './ProofElement';

export function HeroSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: '#09090B' }}
      aria-label="Hero section"
    >
      {/* Background system */}
      <HeroBackground />

      {/* Main layout — splits text column and proof element */}
      <div className="relative z-10 flex-1 flex items-center">
        <div
          className="w-full flex items-center justify-between gap-12"
          style={{ padding: '0 clamp(1.25rem, 5vw, 3rem)', maxWidth: '90rem', margin: '0 auto', width: '100%' }}
        >
          {/* ── Left / Center: Hero content column ──────── */}
          <div
            className="flex flex-col"
            style={{
              gap: 'clamp(20px, 2.5vw, 32px)',
              paddingTop: 'clamp(140px, 18vh, 200px)',
              paddingBottom: 'clamp(80px, 10vh, 120px)',
              maxWidth: '52rem',
              flex: 1,
            }}
          >
            {/* 1. Status badge */}
            <StatusBadge
              label={profile.availability.label}
              active={profile.availability.active}
            />

            {/* 2. Headline */}
            <HeroHeadline
              line1={profile.headline.line1}
              line2={profile.headline.line2 as [string, string, string]}
            />

            {/* 3. Animated role */}
            <HeroRole roles={profile.roles} />

            {/* 4. Divider */}
            <motion.div
              initial={reduced ? false : { scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ ...SPRING_SMOOTH, delay: HERO_DELAYS.divider }}
              style={{
                height: 1,
                background: 'rgba(255,255,255,0.07)',
                maxWidth: '28rem',
                transformOrigin: 'left',
              }}
            />

            {/* 5. Description */}
            <HeroDescription text={profile.description} />

            {/* 6. Proof metrics */}
            <HeroMetrics metrics={profile.metrics} />

            {/* 7. CTAs */}
            <HeroCTAs
              primary={profile.cta.primary}
              secondary={profile.cta.secondary}
            />

            {/* 8. Social row */}
            <SocialRow socials={profile.socials} />

            {/* 9. Scroll indicator */}
            <div className="pt-2">
              <ScrollIndicator />
            </div>
          </div>

          {/* ── Right: Proof Element (desktop only) ─────── */}
          <div className="flex-shrink-0 self-center pt-24 hidden lg:flex">
            <ProofElement techs={profile.proofTechs} />
          </div>
        </div>
      </div>
    </section>
  );
}
