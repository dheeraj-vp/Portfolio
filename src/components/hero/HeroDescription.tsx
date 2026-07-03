import { motion } from 'framer-motion';
import { SPRING_SMOOTH, HERO_DELAYS } from '../../lib/animation';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface HeroDescriptionProps {
  text: string;
}

export function HeroDescription({ text }: HeroDescriptionProps) {
  const reduced = useReducedMotion();

  return (
    <motion.p
      initial={reduced ? false : { opacity: 0, y: 12, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ ...SPRING_SMOOTH, delay: HERO_DELAYS.description }}
      style={{
        color: '#A1A1AA',
        fontSize: 'clamp(15px, 1.8vw, 17px)',
        lineHeight: 1.75,
        maxWidth: '44rem',
        fontFamily: 'var(--font-body)',
      }}
    >
      {text}
    </motion.p>
  );
}
