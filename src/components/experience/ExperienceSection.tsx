import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { SPRING_SMOOTH, SPRING_SNAPPY } from '../../lib/animation';
import { experiences, type ExperienceRole } from '../../data/experience';

// ── Tech pill ──────────────────────────────────────────────────
function TechPill({ label }: { label: string }) {
  return (
    <span
      style={{
        display: 'inline-block',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: 'var(--text-muted)',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 'var(--radius-sm)',
        padding: '2px 8px',
        transition: 'color 0.15s, border-color 0.15s',
      }}
      onMouseEnter={e => {
        (e.target as HTMLElement).style.color = 'var(--text-2)';
        (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)';
      }}
      onMouseLeave={e => {
        (e.target as HTMLElement).style.color = 'var(--text-muted)';
        (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
      }}
    >
      {label}
    </span>
  );
}

// ── Single experience card ─────────────────────────────────────
function ExperienceCard({
  role,
  index,
  isActive,
  onClick,
}: {
  role: ExperienceRole;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ ...SPRING_SMOOTH, delay: 0.1 + index * 0.1 }}
      onClick={onClick}
      style={{
        background: isActive ? 'rgba(255,255,255,0.03)' : 'var(--card)',
        border: `1px solid ${isActive ? role.color + '44' : 'var(--border)'}`,
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.25s, background 0.25s',
      }}
      onMouseEnter={e => {
        if (!isActive) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
      }}
      onMouseLeave={e => {
        if (!isActive) e.currentTarget.style.borderColor = 'var(--border)';
      }}
    >
      {/* ── Card header ── */}
      <div
        style={{
          padding: '1.5rem',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '0.75rem',
          alignItems: 'flex-start',
        }}
      >
        {/* Left: meta */}
        <div>
          {/* Type + period */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.6rem', flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                color: role.color,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              {role.type === 'internship' ? 'Internship' : role.type}
            </span>
            <span style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.1)', flexShrink: 0 }} />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'var(--text-muted)',
              }}
            >
              {role.period}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'var(--text-muted)',
              }}
            >
              · {role.location}
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-display"
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: '#FAFAFA',
              lineHeight: 1.25,
              marginBottom: 4,
            }}
          >
            {role.title}
          </h3>

          {/* Company */}
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              color: 'var(--text-2)',
            }}
          >
            {role.company}
          </div>
        </div>

        {/* Right: colour accent dot + expand chevron */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: role.color,
              boxShadow: `0 0 10px ${role.color}88`,
              flexShrink: 0,
            }}
          />
          <motion.div
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: 0.22 }}
            style={{ color: 'var(--text-muted)', display: 'flex' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* ── Expandable body ── */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                padding: '0 1.5rem 1.5rem',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                paddingTop: '1.25rem',
              }}
            >
              {/* Bullets */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1.25rem' }}>
                {role.bullets.map((b, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...SPRING_SNAPPY, delay: 0.04 + i * 0.05 }}
                    style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        background: role.color,
                        flexShrink: 0,
                        marginTop: 7,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 14,
                        color: 'var(--text-2)',
                        lineHeight: 1.65,
                      }}
                    >
                      {b}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* Tech pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {role.tech.map(t => (
                  <TechPill key={t} label={t} />
                ))}
              </div>

              {/* Optional links */}
              {role.links && role.links.length > 0 && (
                <div style={{ display: 'flex', gap: 12, marginTop: '1rem' }}>
                  {role.links.map(l => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 12,
                        color: 'var(--text-2)',
                        textDecoration: 'none',
                        borderBottom: '1px solid rgba(255,255,255,0.15)',
                        paddingBottom: 1,
                        transition: 'color 0.15s',
                      }}
                      onMouseEnter={e => ((e.target as HTMLElement).style.color = '#FAFAFA')}
                      onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--text-2)')}
                    >
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Section ────────────────────────────────────────────────────
export function ExperienceSection() {
  const [activeId, setActiveId] = useState<string>(experiences[0].id);

  const handleToggle = (id: string) => {
    setActiveId(prev => (prev === id ? '' : id));
  };

  return (
    <section
      id="experience"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(80px, 10vw, 120px) 0 clamp(60px, 8vw, 100px)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* Blueprint grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      {/* Bottom-right glow */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 600,
          height: 500,
          background: 'radial-gradient(circle at 100% 100%, rgba(37,99,235,0.06) 0%, transparent 65%)',
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
        {/* ── Section heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ ...SPRING_SMOOTH, delay: 0.1 }}
          style={{ marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'var(--text-muted)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            [ EXPERIENCE ]
          </span>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              color: '#FAFAFA',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Where I've{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #22C55E, #2563EB)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              shipped.
            </span>
          </h2>
        </motion.div>

        {/* ── Two-column layout: timeline rail + cards ── */}
        <div className="exp-layout">
          {/* Left rail: vertical stepper */}
          <div className="exp-rail">
            {experiences.map((role, i) => {
              const isActive = activeId === role.id;
              return (
                <motion.button
                  key={role.id}
                  onClick={() => handleToggle(role.id)}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ ...SPRING_SMOOTH, delay: 0.15 + i * 0.08 }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 14,
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'left',
                    transition: 'background 0.15s',
                    position: 'relative',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  {/* Dot + line */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 3, flexShrink: 0 }}>
                    <motion.div
                      animate={isActive
                        ? { background: role.color, boxShadow: `0 0 10px ${role.color}88` }
                        : { background: 'rgba(255,255,255,0.12)', boxShadow: 'none' }
                      }
                      transition={{ duration: 0.2 }}
                      style={{ width: 10, height: 10, borderRadius: '50%', flexShrink: 0 }}
                    />
                    {i < experiences.length - 1 && (
                      <div style={{ width: 1, flex: 1, minHeight: 40, background: 'rgba(255,255,255,0.06)', marginTop: 6 }} />
                    )}
                  </div>
                  {/* Text */}
                  <div style={{ paddingBottom: i < experiences.length - 1 ? '1.25rem' : 0 }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 14,
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? '#FAFAFA' : 'var(--text-2)',
                        transition: 'color 0.2s',
                        lineHeight: 1.3,
                        marginBottom: 2,
                      }}
                    >
                      {role.title}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        color: isActive ? role.color : 'var(--text-muted)',
                        transition: 'color 0.2s',
                      }}
                    >
                      {role.company} · {role.periodShort}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right: cards stack */}
          <div className="exp-cards" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {experiences.map((role, i) => (
              <ExperienceCard
                key={role.id}
                role={role}
                index={i}
                isActive={activeId === role.id}
                onClick={() => handleToggle(role.id)}
              />
            ))}
          </div>
        </div>

        {/* ── Section transition ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ ...SPRING_SMOOTH, delay: 0.4 }}
          style={{
            marginTop: 'clamp(3rem, 6vw, 5rem)',
            textAlign: 'center',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            paddingTop: '2.5rem',
          }}
        >
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
            Want to see what I've built?
          </p>
          <a
            href="#projects"
            onClick={e => {
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              fontWeight: 500,
              color: '#FAFAFA',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              borderBottom: '1px solid rgba(255,255,255,0.15)',
              paddingBottom: 2,
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.4)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)')}
          >
            Explore Projects
            <motion.span
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              ↓
            </motion.span>
          </a>
        </motion.div>
      </div>

      {/* Responsive layout styles */}
      <style>{`
        .exp-layout {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 2rem;
          align-items: flex-start;
        }
        .exp-rail {
          position: sticky;
          top: 90px;
        }
        @media (max-width: 768px) {
          .exp-layout {
            grid-template-columns: 1fr;
          }
          .exp-rail {
            position: static;
            display: flex;
            flex-direction: row;
            overflow-x: auto;
            gap: 0;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            scrollbar-width: none;
          }
          .exp-rail::-webkit-scrollbar { display: none; }
          .exp-rail button {
            flex-direction: column;
            min-width: 120px;
            padding: 0.5rem 0.75rem !important;
          }
          .exp-rail button > div:first-child {
            flex-direction: row !important;
            padding-top: 0 !important;
          }
          .exp-rail button > div:first-child > div:last-child {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
