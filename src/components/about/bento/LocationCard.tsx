import { motion } from 'framer-motion';
import { SPRING_SMOOTH } from '../../../lib/animation';
import { about } from '../../../data/about';

export function LocationCard() {
  const { location } = about;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ ...SPRING_SMOOTH, delay: 0.3 }}
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
        CURRENTLY
      </span>

      {/* Location */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.75rem' }}>
        <span style={{ fontSize: 16 }}>📍</span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#FAFAFA', fontWeight: 500 }}>
          {location.city}
        </span>
      </div>

      {/* Open to remote */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.75rem' }}>
        <span
          style={{
            display: 'inline-block',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#22C55E',
            boxShadow: '0 0 8px rgba(34,197,94,0.6)',
            flexShrink: 0,
            animation: 'pulse-dot 2s ease-in-out infinite',
          }}
        />
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-2)' }}>
          {location.status}
        </span>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px rgba(34,197,94,0.6); }
          50% { opacity: 0.7; box-shadow: 0 0 14px rgba(34,197,94,0.9); }
        }
      `}</style>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '1rem 0' }} />

      {/* Timezone */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
        {location.timezone}
      </div>

      {/* Institution */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
        {location.institution}
      </div>
    </motion.div>
  );
}
