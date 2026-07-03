import { motion } from 'framer-motion';

export function SectionTransition() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: 0.2 }}
      style={{
        textAlign: 'center',
        paddingTop: '1.5rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 14,
          color: 'var(--text-muted)',
          marginBottom: '0.75rem',
        }}
      >
        Interested in seeing these skills applied?
      </p>

      <motion.a
        href="#experience"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 14,
          color: 'var(--text-2)',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          borderBottom: '1px solid transparent',
          paddingBottom: 2,
          transition: 'color 0.2s, border-color 0.2s',
        }}
        whileHover={{ color: '#FAFAFA' }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.color = '#FAFAFA';
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.color = 'var(--text-2)';
          (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
        }}
      >
        Explore My Experience
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ display: 'inline-block' }}
        >
          ↓
        </motion.span>
      </motion.a>
    </motion.div>
  );
}
