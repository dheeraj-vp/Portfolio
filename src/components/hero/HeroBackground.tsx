import { useMotionValue, useSpring, motion } from 'framer-motion';
import { useEffect } from 'react';
import { SPRING_MOUSE } from '../../lib/animation';

export function HeroBackground() {
  const mouseX = useMotionValue(
    typeof window !== 'undefined' ? window.innerWidth / 2 : 0
  );
  const mouseY = useMotionValue(
    typeof window !== 'undefined' ? window.innerHeight / 2 : 0
  );

  const springX = useSpring(mouseX, SPRING_MOUSE);
  const springY = useSpring(mouseY, SPRING_MOUSE);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Layer 1: Dot grid — subtle blueprint feel */}
      <div className="absolute inset-0 dot-grid" />

      {/* Layer 2: Static radial glow — top center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(124,58,237,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Layer 3: Secondary glow — bottom right accent */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 80% 110%, rgba(37,99,235,0.07) 0%, transparent 60%)',
        }}
      />

      {/* Layer 4: Mouse-reactive spotlight */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(124,58,237,0.07) 0%, rgba(124,58,237,0.03) 40%, transparent 70%)',
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Layer 5: Noise texture overlay */}
      <div className="noise-overlay" />
    </div>
  );
}
