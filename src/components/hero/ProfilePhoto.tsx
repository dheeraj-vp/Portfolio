import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { SPRING_MOUSE } from '../../lib/animation';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function ProfilePhoto() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, SPRING_MOUSE);
  const springY = useSpring(rotateY, SPRING_MOUSE);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduced || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotateX.set(((e.clientY - cy) / rect.height) * -6);
    rotateY.set(((e.clientX - cx) / rect.width) * 6);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', damping: 22, stiffness: 80, delay: 0.25 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 900,
        width: '100%',
        maxWidth: 340,
        margin: '0 auto',
      }}
    >
      <motion.div
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: 'preserve-3d',
          position: 'relative',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 30px 80px -12px rgba(0, 0, 0, 0.8)',
        }}
      >
        {/* ── The Photo ─────────────────────────────── */}
        <img
          src="/1.png"
          alt="Dheeraj V P — Software Development Engineer"
          draggable={false}
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            aspectRatio: '4 / 5',
            objectFit: 'cover',
            objectPosition: 'center 10%',
          }}
        />

        {/* ── Bottom gradient fade into dark ────────── */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60%',
            background:
              'linear-gradient(to top, rgba(9,9,11,0.95) 0%, rgba(9,9,11,0.7) 35%, rgba(9,9,11,0) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* ── Name + Title overlay ──────────────────── */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '0 24px 24px',
            zIndex: 2,
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 28,
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Dheeraj V P
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.55)',
              letterSpacing: '0.01em',
              margin: '4px 0 0',
            }}
          >
            Software Development Engineer
          </p>
        </div>

        {/* ── Thin luminous accent line at top ───────── */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            left: '15%',
            width: '70%',
            height: 1,
            background:
              'linear-gradient(90deg, transparent, rgba(139,92,246,0.45), rgba(59,130,246,0.45), transparent)',
          }}
        />

        {/* ── Subtle inner border for depth ─────────── */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.06)',
            pointerEvents: 'none',
          }}
        />
      </motion.div>
    </motion.div>
  );
}
