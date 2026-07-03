import { motion } from 'framer-motion';
import { SPRING_SMOOTH } from '../../lib/animation';
import { about } from '../../data/about';

export function PhilosophyCard() {
  const { philosophy } = about;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ ...SPRING_SMOOTH, delay: 0.1 }}
      whileHover={{ y: -3, boxShadow: '0 0 28px rgba(124,58,237,0.1)' }}
      style={{
        position: 'relative',
        background: '#111113',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem 2rem 2rem 2.5rem',
        marginBottom: '3rem',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      {/* Left gradient border */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: 3,
          background: 'linear-gradient(180deg, #7C3AED, #2563EB)',
          borderRadius: '0 0 0 var(--radius-lg)',
        }}
      />

      {/* Decorative quotation mark */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          right: 20,
          fontFamily: 'var(--font-sans)',
          fontSize: 72,
          color: 'rgba(124,58,237,0.1)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        "
      </div>

      {/* Blueprint grid texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
        }}
      />

      {/* Label */}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: 'var(--text-muted)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: '1.25rem',
          position: 'relative',
        }}
      >
        {philosophy.label}
      </span>

      {/* Principles */}
      <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
        {philosophy.principles.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ ...SPRING_SMOOTH, delay: 0.2 + i * 0.1 }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 18,
              fontWeight: 600,
              color: '#FAFAFA',
              lineHeight: 1.6,
            }}
          >
            {p}
          </motion.div>
        ))}
      </div>

      {/* Closing */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 15,
          color: 'var(--text-2)',
          position: 'relative',
        }}
      >
        {philosophy.closing}
      </motion.p>
    </motion.div>
  );
}
