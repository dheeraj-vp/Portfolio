import {
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { useRef } from 'react';
import { SPRING_SMOOTH, HERO_DELAYS, BUTTON_TAP } from '../../lib/animation';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface CTAProps {
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}

// Magnetic button — primary CTA
function MagneticButton({
  label,
  href,
  delay,
}: {
  label: string;
  href: string;
  delay: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 20, stiffness: 200 });
  const springY = useSpring(y, { damping: 20, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    // Max 6px magnetic pull
    x.set(Math.max(-6, Math.min(6, dx * 0.25)));
    y.set(Math.max(-6, Math.min(6, dy * 0.25)));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...SPRING_SMOOTH, delay }}
      whileTap={reduced ? {} : BUTTON_TAP}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-medium text-sm text-white overflow-hidden"
      aria-label={label}
      style={{
        background: 'linear-gradient(135deg, #7C3AED, #2563EB)',
        fontSize: '15px',
        boxShadow: '0 0 0 rgba(124,58,237,0)',
        transition: 'box-shadow 0.2s ease',
        textDecoration: 'none',
        x: springX,
        y: springY,
      } as any}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          '0 0 28px rgba(124,58,237,0.35)';
      }}
    >
      {/* Shine overlay */}
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
        }}
        aria-hidden="true"
      />
      <span className="relative z-10 font-body" style={{ fontFamily: 'var(--font-body)' }}>
        {label}
      </span>
      <motion.span
        className="relative z-10"
        whileHover={reduced ? {} : { x: 4 }}
        transition={{ type: 'spring', damping: 15, stiffness: 300 }}
        aria-hidden="true"
      >
        →
      </motion.span>
    </motion.a>
  );
}

// Secondary CTA — minimal with border animation
function SecondaryButton({
  label,
  href,
  delay,
}: {
  label: string;
  href: string;
  delay: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.a
      href={href}
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...SPRING_SMOOTH, delay }}
      whileTap={reduced ? {} : BUTTON_TAP}
      className="group inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-medium text-sm relative overflow-hidden"
      style={{
        border: '1px solid rgba(255,255,255,0.12)',
        color: '#A1A1AA',
        background: 'transparent',
        fontSize: '15px',
        textDecoration: 'none',
        transition: 'border-color 0.2s ease, color 0.2s ease, background 0.2s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(124,58,237,0.4)';
        el.style.background = 'rgba(124,58,237,0.06)';
        el.style.color = '#FAFAFA';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(255,255,255,0.12)';
        el.style.background = 'transparent';
        el.style.color = '#A1A1AA';
      }}
    >
      <span style={{ fontFamily: 'var(--font-body)' }}>{label}</span>
    </motion.a>
  );
}

export function HeroCTAs({ primary, secondary }: CTAProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
      <div className="w-full sm:w-auto flex justify-center">
        <MagneticButton
          label={primary.label}
          href={primary.href}
          delay={HERO_DELAYS.ctaBase}
        />
      </div>
      <div className="w-full sm:w-auto flex justify-center">
        <SecondaryButton
          label={secondary.label}
          href={secondary.href}
          delay={HERO_DELAYS.ctaBase + HERO_DELAYS.ctaStagger}
        />
      </div>
    </div>
  );
}
