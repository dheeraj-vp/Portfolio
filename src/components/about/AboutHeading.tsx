import { motion, useReducedMotion } from 'framer-motion';
import { SPRING_SMOOTH } from '../../lib/animation';

export function AboutHeading() {
  const reduced = useReducedMotion();

  const words = ['The', 'person', 'behind', 'the', 'software.'];

  const wordVariant = {
    initial: reduced ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 20, filter: 'blur(6px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  };

  return (
    <div style={{ marginBottom: '2.5rem' }}>
      {/* Section label */}
      <motion.span
        initial={reduced ? {} : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--text-muted)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: '0.75rem',
        }}
      >
        [ about ]
      </motion.span>

      {/* Divider */}
      <motion.div
        initial={reduced ? {} : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        style={{
          height: 1,
          background: 'rgba(255,255,255,0.08)',
          transformOrigin: 'left',
          marginBottom: '1.25rem',
          width: '100%',
        }}
      />

      {/* Animated headline */}
      <h2
        className="font-display flex flex-wrap items-center gap-x-[0.28em] gap-y-1"
        style={{
          fontSize: 'clamp(26px, 5.5vw, 56px)',
          fontWeight: 700,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          color: '#FAFAFA',
        }}
      >
        {words.map((word, i) => {
          const isAccent = word === 'software.';
          return (
            <motion.span
              key={`w-${i}`}
              variants={wordVariant}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-20px' }}
              transition={{ ...SPRING_SMOOTH, delay: 0.15 + i * 0.07 }}
              className="inline-block"
            >
              {isAccent ? (
                <span className="gradient-text">{word}</span>
              ) : (
                word
              )}
            </motion.span>
          );
        })}
      </h2>
    </div>
  );
}
