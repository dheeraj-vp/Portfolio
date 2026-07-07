import { useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { TiltedCard } from './TiltedCard';
import { SideRays } from './SideRays';
import { SplitText } from './SplitText';

// ─── Orbit SVG ───────────────────────────────────────────────────────────────
function OrbitRing({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      aria-hidden
      style={{ position: 'absolute', inset: '-18%', zIndex: 1, pointerEvents: 'none' }}
      animate={reduced ? {} : { rotate: 360 }}
      transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
    >
      <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', opacity: 0.2 }}>
        <circle cx="150" cy="150" r="138" stroke="url(#orbitGrad)"
          strokeWidth="1" strokeDasharray="4 10" strokeLinecap="round" />
        <path d="M 150,12 A 138,138 0 0,1 262,80" stroke="url(#accentGrad)"
          strokeWidth="1.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="orbitGrad" x1="0" y1="0" x2="300" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#8B5CF6" stopOpacity="0.6" />
            <stop offset="50%"  stopColor="#3B82F6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="accentGrad" x1="150" y1="12" x2="262" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#A78BFA" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function ProfilePhoto() {
  const reduced = useReducedMotion();
  const glowOpacity = useMotionValue(0.55);

  // Breathing glow
  useEffect(() => {
    if (reduced) return;
    const ctrl = animate(glowOpacity, [0.45, 0.65, 0.45], {
      duration: 4,
      ease: 'easeInOut',
      repeat: Infinity,
    });
    return () => ctrl.stop();
  }, [reduced, glowOpacity]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', damping: 22, stiffness: 75, delay: 0.3 }}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 440,
        margin: '0 auto',
        paddingBottom: 56,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* ── SideRays background ───────────────── */}
      <div aria-hidden style={{
        position: 'absolute', inset: '-25% -20%',
        zIndex: 0, pointerEvents: 'none', opacity: 0.55,
      }}>
        <SideRays
          speed={1.2}
          rayColor1="#8B5CF6"
          rayColor2="#3B82F6"
          intensity={0.9}
          spread={1.8}
          origin="top-right"
          tilt={-10}
          saturation={1.2}
          blend={0.65}
          falloff={1.8}
          opacity={0.7}
        />
      </div>

      {/* ── Soft ambient glow blobs ───────────── */}
      <div aria-hidden style={{ position: 'absolute', inset: '-20% -15%', zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '15%', left: '5%', width: '70%', height: '65%',
          background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.14) 0%, transparent 72%)',
          filter: 'blur(28px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', right: '5%', width: '50%', height: '50%',
          background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.10) 0%, transparent 70%)',
          filter: 'blur(24px)',
        }} />
      </div>

      {/* ── Orbit ring ───────────────────────── */}
      <OrbitRing reduced={reduced} />

      {/* ── TiltedCard portrait ──────────────── */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <TiltedCard
          imageSrc="/1.png"
          altText="Dheeraj V P — Software Development Engineer"
          containerWidth="100%"
          containerHeight="380px"
          imageWidth="380px"
          imageHeight="380px"
          rotateAmplitude={8}
          scaleOnHover={1.04}
          showMobileWarning={false}
          showTooltip={false}
        />
      </div>

      {/* ── Developer Console nameplate below portrait ──────────── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 70, delay: 0.5 }}
        style={{
          position: 'relative',
          zIndex: 20,
          marginTop: 24,
          width: '100%',
          maxWidth: 320,
          textAlign: 'left',
          fontFamily: 'var(--font-mono)',
          fontSize: 13,
          lineHeight: 1.6,
          background: 'rgba(12, 12, 18, 0.65)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: 12,
          padding: '16px 20px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255,255,255,0.03)',
        }}
      >
        {/* Console window controls */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 12, opacity: 0.5 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#EF4444' }} />
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F59E0B' }} />
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
        </div>

        {/* Command 1: > whoami */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: '#8B5CF6', marginRight: 6, fontWeight: 'bold' }}>&gt;</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.45)' }}>whoami</span>
        </div>
        {/* Output 1: Name */}
        <div style={{ paddingLeft: 12, fontWeight: 700, color: '#FAFAFA', fontSize: 16, margin: '4px 0 12px' }}>
          <SplitText
            text="Dheeraj V P"
            tag="span"
            splitType="chars"
            delay={30}
            duration={0.5}
            ease="none"
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            threshold={0.1}
            rootMargin="0px"
            textAlign="left"
          />
        </div>

        {/* Command 2: > role */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: '#3B82F6', marginRight: 6, fontWeight: 'bold' }}>&gt;</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.45)' }}>role</span>
        </div>
        {/* Output 2: Role */}
        <div style={{ paddingLeft: 12, color: 'rgba(255, 255, 255, 0.85)', fontSize: 14, margin: '4px 0 0', display: 'flex', alignItems: 'center', gap: 4 }}>
          <SplitText
            text="Software Engineer"
            tag="span"
            splitType="chars"
            delay={25}
            duration={0.5}
            ease="none"
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            threshold={0.1}
            rootMargin="0px"
            textAlign="left"
          />
          <span
            className="cursor-blink"
            style={{
              display: 'inline-block',
              width: 6,
              height: 14,
              background: '#8B5CF6',
              verticalAlign: 'middle',
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
