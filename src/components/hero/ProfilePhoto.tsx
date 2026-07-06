import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { SPRING_MOUSE } from '../../lib/animation';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function ProfilePhoto() {
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt animation coordinates
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, SPRING_MOUSE);
  const springY = useSpring(rotateY, SPRING_MOUSE);

  // Spotlight effect coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const springMouseY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    
    // Tilt limits
    rotateX.set(((e.clientY - cy) / rect.height) * -12);
    rotateY.set(((e.clientX - cx) / rect.width) * 12);

    // Spotlight position
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 90, delay: 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        width: '100%',
        maxWidth: 350,
        margin: '0 auto',
      }}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl border"
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: 'preserve-3d',
          background: 'rgba(24, 24, 27, 0.6)',
          borderColor: 'rgba(255, 255, 255, 0.06)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}
      >
        {/* Spotlight overlay */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(400px circle at ${springMouseX}px ${springMouseY}px, rgba(124, 58, 237, 0.08), transparent 80%)`,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Dynamic neon gradient top border */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '10%',
            width: '80%',
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.4), rgba(59, 130, 246, 0.4), transparent)',
          }}
        />

        {/* Image Frame Container */}
        <div
          className="relative overflow-hidden rounded-full aspect-square border-2"
          style={{
            width: 270,
            height: 270,
            borderColor: 'rgba(255, 255, 255, 0.08)',
            background: 'rgba(9, 9, 11, 0.8)',
            transform: 'translateZ(15px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 20px rgba(124, 58, 237, 0.15)',
          }}
        >
          {/* Decorative Grid Lines behind image */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.02) 1px, transparent 0)',
              backgroundSize: '12px 12px',
              zIndex: 0,
              borderRadius: '50%',
            }}
          />

          <img
            src="/1.png"
            alt="Dheeraj V P"
            className="w-full h-full object-cover rounded-full relative z-10"
            onError={(e) => {
              // Fallback placeholder in case image doesn't load
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* Info Area */}
        <div
          style={{
            width: '100%',
            textAlign: 'center',
            transform: 'translateZ(30px)',
            zIndex: 10,
          }}
        >
          {/* Label Header */}
          <div
            className="font-mono-accent"
            style={{
              fontSize: 10,
              color: 'var(--text-muted)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: 4,
            }}
          >
            Software Development Engineer
          </div>

          {/* Name */}
          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 22,
              fontWeight: 800,
              color: '#FAFAFA',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              marginBottom: 8,
            }}
          >
            Dheeraj V P
          </h2>

          {/* Tag row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              marginTop: 10,
              paddingTop: 10,
              borderTop: '1px solid rgba(255, 255, 255, 0.04)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9.5,
                background: 'rgba(124, 58, 237, 0.08)',
                border: '1px solid rgba(124, 58, 237, 0.15)',
                color: '#C084FC',
                padding: '2px 8px',
                borderRadius: 4,
                letterSpacing: '0.04em',
              }}
            >
              FULLSTACK
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9.5,
                background: 'rgba(59, 130, 246, 0.08)',
                border: '1px solid rgba(59, 130, 246, 0.15)',
                color: '#93C5FD',
                padding: '2px 8px',
                borderRadius: 4,
                letterSpacing: '0.04em',
              }}
            >
              DEVOPS
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
