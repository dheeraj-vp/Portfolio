import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { SPRING_MOUSE, HERO_DELAYS } from '../../lib/animation';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { ProofTech } from '../../data/profile';

const TECH_ICONS: Record<string, string> = {
  aws:        '☁',
  go:         '◈',
  kubernetes: '⎈',
  redis:      '◆',
  docker:     '🐳',
  postgres:   '🐘',
};

// Connection line between two points
function ConnectionLine({ x1, y1, x2, y2, delay }: { x1: number; y1: number; x2: number; y2: number; delay: number }) {
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="rgba(124,58,237,0.2)"
      strokeWidth="1"
      strokeDasharray={length}
      initial={{ strokeDashoffset: length, opacity: 0 }}
      animate={{ strokeDashoffset: 0, opacity: 1 }}
      transition={{ duration: 1.2, delay, ease: 'easeInOut' }}
    />
  );
}

// Tech badge card
function TechCard({ tech, x, y, floatDelay, reduced }: {
  tech: ProofTech; x: number; y: number; floatDelay: number; reduced: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 18, stiffness: 120, delay: HERO_DELAYS.proof + floatDelay }}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <motion.div
        animate={reduced ? {} : { y: [0, -6, 0] }}
        transition={{
          duration: 4 + floatDelay,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: floatDelay * 0.5,
        }}
        className="flex items-center gap-2 px-3 py-2 rounded-xl"
        style={{
          background: '#18181B',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          backdropFilter: 'blur(8px)',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontSize: 14 }}>{TECH_ICONS[tech.id] ?? '◆'}</span>
        <span
          className="font-mono-accent"
          style={{ color: '#A1A1AA', fontSize: 11, letterSpacing: '0.04em' }}
        >
          {tech.label}
        </span>
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: tech.color, opacity: 0.8 }}
        />
      </motion.div>
    </motion.div>
  );
}

// Cluster layout positions (relative to container 260x300)
const POSITIONS = [
  { x: 130, y: 40  }, // AWS       — top center
  { x: 215, y: 95  }, // Go        — top right
  { x: 230, y: 195 }, // Kubernetes — mid right
  { x: 130, y: 265 }, // Redis     — bottom center
  { x: 30,  y: 195 }, // Docker    — mid left
  { x: 20,  y: 95  }, // PostgreSQL — top left
];

const CONNECTIONS = [
  [0, 1], [0, 5], [1, 2], [2, 3], [3, 4], [4, 5], [0, 3], [1, 4],
];

interface ProofElementProps {
  techs: ProofTech[];
}

export function ProofElement({ techs }: ProofElementProps) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRX = useSpring(rotateX, SPRING_MOUSE);
  const springRY = useSpring(rotateY, SPRING_MOUSE);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduced || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotateX.set(((e.clientY - cy) / rect.height) * -8);
    rotateY.set(((e.clientX - cx) / rect.width) * 8);
  };

  const handleMouseLeave = () => { rotateX.set(0); rotateY.set(0); };

  const W = 260; const H = 300;

  return (
    // Desktop only
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100, delay: HERO_DELAYS.proof }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="hidden lg:block"
      style={{ width: W, height: H, position: 'relative', perspective: 800 }}
      aria-hidden="true"
    >
      <motion.div
        style={{ rotateX: springRX, rotateY: springRY, width: '100%', height: '100%', position: 'relative' }}
      >
        {/* SVG connection lines */}
        <svg
          width={W} height={H}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        >
          {CONNECTIONS.map(([a, b], i) => (
            <ConnectionLine
              key={i}
              x1={POSITIONS[a].x} y1={POSITIONS[a].y}
              x2={POSITIONS[b].x} y2={POSITIONS[b].y}
              delay={HERO_DELAYS.proof + 0.2 + i * 0.08}
            />
          ))}
        </svg>

        {/* Tech badge cards */}
        {techs.slice(0, 6).map((tech, i) => (
          <TechCard
            key={tech.id}
            tech={tech}
            x={POSITIONS[i]?.x ?? 140}
            y={POSITIONS[i]?.y ?? 150}
            floatDelay={i * 0.15}
            reduced={reduced}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
