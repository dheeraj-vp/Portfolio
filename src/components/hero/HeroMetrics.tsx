import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { SPRING_SMOOTH, HERO_DELAYS } from '../../lib/animation';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { Metric } from '../../data/profile';

interface NumberTickerProps {
  value: number;
  duration?: number;
}

function NumberTicker({ value, duration = 1500 }: NumberTickerProps) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }

    let start: number | null = null;
    const startValue = 0;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(startValue + (value - startValue) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [inView, value, duration, reduced]);

  return <span ref={ref}>{display.toLocaleString()}</span>;
}

interface HeroMetricsProps {
  metrics: Metric[];
}

export function HeroMetrics({ metrics }: HeroMetricsProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ...SPRING_SMOOTH, delay: HERO_DELAYS.metricsBase - 0.1 }}
      className="flex flex-wrap items-center gap-y-5"
      style={{ gap: '0' }}
      role="list"
      aria-label="Engineering metrics"
    >
      {metrics.map((metric, i) => (
        <motion.div
          key={metric.label}
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            ...SPRING_SMOOTH,
            delay: HERO_DELAYS.metricsBase + i * HERO_DELAYS.metricsStagger,
          }}
          whileHover={reduced ? {} : { y: -2 }}
          role="listitem"
          className="flex items-center"
        >
          {/* Metric item */}
          <div
            className="flex flex-col items-start px-5 py-1 group cursor-default"
            style={{ minWidth: '80px' }}
          >
            <div
              className="font-display font-bold leading-none"
              style={{
                fontSize: 'clamp(22px, 2.5vw, 28px)',
                color: '#FAFAFA',
              }}
            >
              {metric.isCounter && typeof metric.value === 'number' ? (
                <>
                  <NumberTicker value={metric.value} />
                  {metric.unit && (
                    <span
                      className="font-mono-accent"
                      style={{ color: '#7C3AED', fontSize: '0.85em' }}
                    >
                      {metric.unit}
                    </span>
                  )}
                </>
              ) : (
                <span>{metric.text}</span>
              )}
            </div>
            <div
              className="font-mono-accent mt-1"
              style={{
                color: '#71717A',
                fontSize: '10px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {metric.label}
            </div>
          </div>

          {/* Separator between items (not after last) */}
          {i < metrics.length - 1 && (
            <div className="metric-sep mx-1" aria-hidden="true" />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
