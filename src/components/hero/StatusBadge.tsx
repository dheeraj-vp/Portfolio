import { motion } from 'framer-motion';
import { SPRING_SMOOTH, HERO_DELAYS } from '../../lib/animation';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface StatusBadgeProps {
  label: string;
  active?: boolean;
}

export function StatusBadge({ label, active = true }: StatusBadgeProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...SPRING_SMOOTH, delay: HERO_DELAYS.badge }}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill w-fit"
      style={{
        background: active ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(34,197,94,0.2)',
      }}
    >
      {/* Pulse dot */}
      {active && (
        <span className="relative flex h-2 w-2 flex-shrink-0">
          <span
            className="absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{
              background: '#22C55E',
              animation: 'pulseDot 2s ease-in-out infinite',
            }}
          />
          <span
            className="relative inline-flex h-2 w-2 rounded-full"
            style={{ background: '#22C55E' }}
          />
        </span>
      )}
      <span
        className="font-mono-accent text-xs tracking-wide"
        style={{ color: '#A1A1AA' }}
      >
        {label}
      </span>
    </motion.div>
  );
}
