import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SPRING_SMOOTH } from '../../../lib/animation';
import { about } from '../../../data/about';

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const pct = (value / max) * 100;

  return (
    <div
      ref={ref}
      style={{
        height: 4,
        background: 'rgba(255,255,255,0.06)',
        borderRadius: 'var(--radius-pill)',
        overflow: 'hidden',
        marginTop: '0.5rem',
      }}
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          height: '100%',
          width: `${pct}%`,
          background: color,
          borderRadius: 'var(--radius-pill)',
          transformOrigin: 'left',
        }}
      />
    </div>
  );
}

export function EducationCard() {
  const { education } = about;
  const [vit, school] = education;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ ...SPRING_SMOOTH, delay: 0.2 }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        cursor: 'default',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
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
        EDUCATION
      </span>

      {/* VIT */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: '#FAFAFA' }}>
              {vit.institution}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
              {vit.degree}
            </div>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', flexShrink: 0 }}>
            {vit.years}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: '0.6rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#22C55E', fontWeight: 600 }}>
            CGPA {vit.gpa}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
            / {vit.gpaMax}
          </span>
        </div>

        <ProgressBar value={vit.gpa ?? 0} max={vit.gpaMax ?? 10} color="#22C55E" />

        {/* Focus tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: '0.75rem' }}>
          {vit.focus?.map(tag => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'var(--text-muted)',
                background: '#111113',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 'var(--radius-sm)',
                padding: '2px 8px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: '1.25rem' }} />

      {/* School */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: '#FAFAFA' }}>
              {school.institution}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
              {school.degree}
            </div>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', flexShrink: 0 }}>
            {school.years}
          </span>
        </div>
        <div style={{ marginTop: '0.6rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#22C55E', fontWeight: 600 }}>
            {school.score}{school.scoreUnit}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
