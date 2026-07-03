import { motion, useReducedMotion } from 'framer-motion';
import { SPRING_SMOOTH } from '../../lib/animation';

export function AboutHeading() {
  const reduced = useReducedMotion();

  const words1 = ['The', 'person', 'behind'];
  const words2 = ['the', 'infrastructure.'];

  const wordVariant = {
    initial: reduced ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 24, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  };

  return (
    <div style={{ marginBottom: '3rem' }}>
      {/* Section label */}
      <motion.span
        initial={reduced ? {} : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
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
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
        className="font-display"
        style={{
          fontSize: 'clamp(32px, 4.5vw, 56px)',
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: '#FAFAFA',
        }}
      >
        <div className="block overflow-visible">
          {words1.map((word, i) => (
            <motion.span
              key={`w1-${i}`}
              variants={wordVariant}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ ...SPRING_SMOOTH, delay: 0.25 + i * 0.08 }}
              className="inline-block"
              style={{ marginRight: '0.28em' }}
            >
              {word}
            </motion.span>
          ))}
        </div>
        <div className="block overflow-visible">
          {words2.map((word, i) => {
            const globalIndex = words1.length + i;
            const isAccent = word === 'infrastructure.';
            return (
              <motion.span
                key={`w2-${i}`}
                variants={wordVariant}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: '-80px' }}
                transition={{ ...SPRING_SMOOTH, delay: 0.25 + globalIndex * 0.08 }}
                className="inline-block"
                style={{ marginRight: '0.28em' }}
              >
                {isAccent ? (
                  <span className="gradient-text">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            );
          })}
        </div>
      </h2>
    </div>
  );
}
