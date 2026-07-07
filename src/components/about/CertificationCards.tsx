import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SPRING_SMOOTH } from '../../lib/animation';
import { about, type Certification } from '../../data/about';

function CertCard({ cert, index }: { cert: Certification; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const pct = cert.score && cert.maxScore ? (cert.score / cert.maxScore) * 100 : 100;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ ...SPRING_SMOOTH, delay: 0.15 + index * 0.05 }}
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        minHeight: '130px',
        transition: 'border-color 0.2s, background 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.background = 'var(--card)';
      }}
    >
      <div>
        {/* Top line: Issuer & Link */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: cert.issuerColor,
                boxShadow: `0 0 6px ${cert.issuerColor}88`,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                color: cert.issuerColor,
                fontWeight: 700,
                letterSpacing: '0.08em',
              }}
            >
              {cert.issuerShort}
            </span>
          </div>
          {cert.url && (
            <motion.a
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 2 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'var(--text-muted)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#FAFAFA')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
            >
              View ↗
            </motion.a>
          )}
        </div>

        {/* Title */}
        <h4
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 13,
            fontWeight: 600,
            color: '#FAFAFA',
            lineHeight: 1.4,
            margin: '0 0 0.5rem 0',
          }}
        >
          {cert.title}
        </h4>
      </div>

      {/* Bottom line: progress / status & date */}
      <div style={{ marginTop: 'auto' }}>
        {/* Slim score bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              flex: 1,
              height: 3,
              background: 'rgba(255,255,255,0.06)',
              borderRadius: 99,
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.35 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: '100%',
                width: `${pct}%`,
                background: '#22C55E',
                borderRadius: 99,
                transformOrigin: 'left',
              }}
            />
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#22C55E', fontWeight: 600, whiteSpace: 'nowrap' }}>
            {cert.score ? `${cert.score}/${cert.maxScore}` : 'Completed'}
          </span>
        </div>

        {/* Date */}
        {cert.date && (
          <div style={{ marginTop: 4, textAlign: 'right' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                color: 'var(--text-muted)',
              }}
            >
              {cert.date}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function CertificationCards() {
  return (
    <div style={{ marginBottom: '3rem' }}>
      {/* 1. PATENT HIGHLIGHT ON TOP */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ ...SPRING_SMOOTH, delay: 0.1 }}
        style={{ marginBottom: '0.75rem' }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--text-muted)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          PATENT
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ ...SPRING_SMOOTH, delay: 0.15 }}
        style={{
          marginBottom: '2.5rem',
          background: 'rgba(124, 58, 237, 0.05)',
          border: '1px solid rgba(124, 58, 237, 0.18)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          flexWrap: 'wrap',
          boxShadow: '0 8px 30px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.02)',
        }}
      >
        <span style={{ fontSize: 24, flexShrink: 0 }}>💡</span>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#A78BFA', fontWeight: 600, letterSpacing: '0.12em' }}>
              PATENT FILED & PUBLISHED
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                color: '#22C55E',
                background: 'rgba(34,197,94,0.1)',
                border: '1px solid rgba(34,197,94,0.22)',
                borderRadius: 99,
                padding: '1px 7px',
              }}
            >
              {about.patent.status}
            </span>
          </div>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 600, color: '#FAFAFA', margin: 0, lineHeight: 1.4 }}>
            {about.patent.title}
          </h3>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', margin: '4px 0 0' }}>
            App No: {about.patent.applicationNumber} • Filed: {about.patent.date}
          </p>
        </div>
      </motion.div>

      {/* 2. OTHER CERTIFICATIONS */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ ...SPRING_SMOOTH, delay: 0.2 }}
        style={{ marginBottom: '1rem' }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--text-muted)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          CERTIFICATIONS
        </span>
      </motion.div>

      {/* Responsive 2-column, 2-row grid for the 4 certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {about.certifications.map((cert, i) => (
          <CertCard key={cert.title} cert={cert} index={i} />
        ))}
      </div>
    </div>
  );
}
