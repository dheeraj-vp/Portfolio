import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { SPRING_SMOOTH, HERO_DELAYS } from '../../lib/animation';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface HeroRoleProps {
  roles: string[];
}

export function HeroRole({ roles }: HeroRoleProps) {
  const reduced = useReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length, reduced]);

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...SPRING_SMOOTH, delay: HERO_DELAYS.role }}
      className="flex items-center gap-2 h-6 overflow-hidden"
    >
      {/* Dimmed prefix */}
      <span
        className="font-mono-accent text-sm flex-shrink-0 select-none"
        style={{ color: '#3F3F46' }}
        aria-hidden="true"
      >
        role://
      </span>

      {/* Cycling role text */}
      <div className="relative h-6 flex items-center" style={{ minWidth: '200px' }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={current}
            initial={
              reduced
                ? {}
                : { opacity: 0, y: -20, filter: 'blur(4px)' }
            }
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={
              reduced
                ? {}
                : { opacity: 0, y: 20, filter: 'blur(4px)' }
            }
            transition={{ ...SPRING_SMOOTH }}
            className="font-mono-accent text-sm absolute left-0 whitespace-nowrap"
            style={{ color: '#71717A' }}
          >
            {roles[current]}
          </motion.span>
        </AnimatePresence>
        {/* Invisible spacer to maintain width of longest role */}
        <span
          className="font-mono-accent text-sm invisible select-none"
          aria-hidden="true"
        >
          {roles.reduce((a, b) => (a.length > b.length ? a : b))}
        </span>
      </div>
    </motion.div>
  );
}
