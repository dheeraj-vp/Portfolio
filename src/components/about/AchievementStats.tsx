import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { SPRING_SMOOTH } from '../../lib/animation';
import { about, type Achievement } from '../../data/about';

function NumberTicker({ target, duration = 1.5 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration * 60);
    const interval = setInterval(() => {
      start = Math.min(start + step, target);
      setCurrent(Math.round(start));
      if (start >= target) clearInterval(interval);
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [inView, target, duration]);

  return <span ref={ref}>{current}</span>;
}

function StatCard({ achievement, index }: { achievement: Achievement; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ ...SPRING_SMOOTH, delay: 0.1 + index * 0.1 }}
      whileHover={{ y: -2, boxShadow: '0 0 12px rgba(124,58,237,0.1)' }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1rem 0.5rem',
        cursor: 'default',
        flex: 1,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 32,
          fontWeight: 700,
          color: '#FAFAFA',
          lineHeight: 1,
          display: 'flex',
          alignItems: 'baseline',
          gap: 2,
        }}
      >
        {achievement.isCounter && typeof achievement.value === 'number' ? (
          <>
            <NumberTicker target={achievement.value} />
            {achievement.unit && (
              <span style={{ fontFamily: 'var(--font-mono)', color: '#7C3AED', fontSize: 24 }}>
                {achievement.unit}
              </span>
            )}
          </>
        ) : (
          <span style={{ fontFamily: 'var(--font-sans)' }}>
            {'text' in achievement ? achievement.text : achievement.value}
          </span>
        )}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginTop: 8,
          textAlign: 'center',
          lineHeight: 1.4,
        }}
      >
        {achievement.label}
      </div>
    </motion.div>
  );
}

export function AchievementStats() {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ ...SPRING_SMOOTH, delay: 0.1 }}
        style={{ marginBottom: '1.25rem' }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--text-muted)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          BY THE NUMBERS
        </span>
      </motion.div>

      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
        }}
      >
        {about.achievements.map((achievement, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'stretch', flex: 1 }}>
            {i > 0 && (
              <div
                style={{
                  width: 1,
                  background: 'rgba(255,255,255,0.06)',
                  flexShrink: 0,
                  alignSelf: 'stretch',
                  margin: '0.75rem 0',
                }}
              />
            )}
            <StatCard achievement={achievement} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
