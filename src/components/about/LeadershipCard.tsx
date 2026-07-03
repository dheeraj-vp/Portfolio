import { motion } from 'framer-motion';
import { SPRING_SMOOTH } from '../../lib/animation';
import { about } from '../../data/about';

export function LeadershipCard() {
  const { leadership } = about;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ ...SPRING_SMOOTH, delay: 0.1 }}
      whileHover={{ y: -3 }}
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
        }}
      />

      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'var(--text-muted)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.4rem',
            }}
          >
            LEADERSHIP
          </span>
          <div className="font-display" style={{ fontSize: 18, fontWeight: 600, color: '#FAFAFA' }}>
            {leadership.org}
            <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: 15, marginLeft: 8 }}>
              · {leadership.chapter}
            </span>
          </div>
        </div>
        {leadership.url && (
          <motion.a
            href={leadership.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--text-muted)',
              textDecoration: 'none',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 'var(--radius-md)',
              padding: '6px 12px',
              transition: 'color 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#FAFAFA')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            view post
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M7 7h10v10"/>
            </svg>
          </motion.a>
        )}
      </div>

      {/* Roles */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '1rem' }}>
        {leadership.roles.map(role => (
          <span
            key={role}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: '#7C3AED',
              background: 'rgba(124,58,237,0.08)',
              border: '1px solid rgba(124,58,237,0.2)',
              borderRadius: 'var(--radius-pill)',
              padding: '3px 10px',
            }}
          >
            {role}
          </span>
        ))}
      </div>

      {/* Description */}
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
        {leadership.description}
      </p>

      {/* Highlight event */}
      {leadership.highlight && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(37,99,235,0.08)',
            border: '1px solid rgba(37,99,235,0.2)',
            borderRadius: 'var(--radius-md)',
            padding: '8px 14px',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#2563EB', letterSpacing: '0.08em' }}>
            WORKSHOP
          </span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#FAFAFA', fontWeight: 500 }}>
            {leadership.highlight.event}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>
            · {leadership.highlight.date}
          </span>
        </div>
      )}
    </motion.div>
  );
}
