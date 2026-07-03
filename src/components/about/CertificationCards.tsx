import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SPRING_SMOOTH } from '../../lib/animation';
import { about, type Certification } from '../../data/about';

function CertRow({ cert, index }: { cert: Certification; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const pct = cert.score && cert.maxScore ? (cert.score / cert.maxScore) * 100 : 100;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ ...SPRING_SMOOTH, delay: 0.1 + index * 0.07 }}
      style={{
        display: 'grid',
        gridTemplateColumns: '56px 1fr auto',
        alignItems: 'center',
        gap: '0 1rem',
        padding: '0.875rem 1.25rem',
        borderBottom: index < about.certifications.length - 1
          ? '1px solid rgba(255,255,255,0.04)'
          : 'none',
        transition: 'background 0.15s',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      {/* Issuer badge */}
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
            whiteSpace: 'nowrap',
          }}
        >
          {cert.issuerShort}
        </span>
      </div>

      {/* Title + bar + date in middle */}
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              fontWeight: 500,
              color: '#FAFAFA',
              lineHeight: 1.3,
            }}
          >
            {cert.title}
          </span>
          {cert.date && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'var(--text-muted)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {cert.date}
            </span>
          )}
        </div>

        {/* Slim score bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 5 }}>
          <div
            style={{
              flex: 1,
              maxWidth: 140,
              height: 3,
              background: 'rgba(255,255,255,0.06)',
              borderRadius: 99,
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: '100%',
                width: `${pct}%`,
                background: '#22C55E',
                borderRadius: 99,
                transformOrigin: 'left',
              }}
            />
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#22C55E', fontWeight: 600 }}>
            {cert.score ? `${cert.score}/${cert.maxScore}` : 'Completed'}
          </span>
        </div>
      </div>

      {/* Link */}
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
            whiteSpace: 'nowrap',
            transition: 'color 0.15s',
            flexShrink: 0,
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#FAFAFA')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
        >
          View ↗
        </motion.a>
      )}
    </motion.div>
  );
}

export function CertificationCards() {
  return (
    <div style={{ marginBottom: '3rem' }}>
      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ ...SPRING_SMOOTH, delay: 0.1 }}
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

      {/* Compact list */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ ...SPRING_SMOOTH, delay: 0.15 }}
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
        }}
      >
        {about.certifications.map((cert, i) => (
          <CertRow key={cert.title} cert={cert} index={i} />
        ))}
      </motion.div>

      {/* Patent callout — slim single row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ ...SPRING_SMOOTH, delay: 0.45 }}
        style={{
          marginTop: '0.75rem',
          background: 'rgba(124,58,237,0.05)',
          border: '1px solid rgba(124,58,237,0.18)',
          borderRadius: 'var(--radius-lg)',
          padding: '0.875rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.875rem',
          flexWrap: 'wrap',
        }}
      >
        <span style={{ fontSize: 16, flexShrink: 0 }}>🏛️</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#7C3AED', letterSpacing: '0.1em', flexShrink: 0 }}>
          PATENT
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
            flexShrink: 0,
          }}
        >
          {about.patent.status}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            fontWeight: 500,
            color: '#FAFAFA',
            flex: 1,
            minWidth: 200,
          }}
        >
          {about.patent.title}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
          {about.patent.applicationNumber} · {about.patent.date}
        </span>
      </motion.div>
    </div>
  );
}
