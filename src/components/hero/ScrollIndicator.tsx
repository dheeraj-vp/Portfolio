import { motion } from 'framer-motion';
import { SPRING_SMOOTH, HERO_DELAYS } from '../../lib/animation';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function ScrollIndicator() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ...SPRING_SMOOTH, delay: HERO_DELAYS.scroll }}
      className="flex flex-col items-center gap-2"
      aria-label="Scroll down"
    >
      {/* Mouse icon */}
      <div
        style={{
          width: 22,
          height: 34,
          borderRadius: 11,
          border: '1.5px solid #3F3F46',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 6,
          position: 'relative',
          overflow: 'hidden',
        }}
        aria-hidden="true"
      >
        {/* Scroll line — animates downward then fades */}
        <motion.div
          style={{
            width: 2,
            height: 8,
            borderRadius: 2,
            background: 'rgba(124,58,237,0.7)',
            originY: 0,
          }}
          animate={
            reduced
              ? { scaleY: 1, opacity: 0.5 }
              : {
                  scaleY: [0, 1, 1, 0],
                  opacity: [0, 1, 1, 0],
                  y: [0, 0, 6, 6],
                }
          }
          transition={
            reduced
              ? {}
              : {
                  duration: 1.6,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatDelay: 0.4,
                }
          }
        />
      </div>
    </motion.div>
  );
}
