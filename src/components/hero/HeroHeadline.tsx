import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { SPRING_SMOOTH, HERO_DELAYS } from '../../lib/animation';

interface HeroHeadlineProps {
  line1: string;
  line2: [string, string, string]; // [prefix, gradientWord, suffix]
}

export function HeroHeadline({ line1, line2 }: HeroHeadlineProps) {
  const reduced = useReducedMotion();
  const gradientRef = useRef<HTMLSpanElement>(null);

  // Compute word arrays for staggered reveal
  const words1 = line1.split(' ');
  const [prefix, gradientWord, suffix] = line2;
  const line2Words = [prefix.trim(), gradientWord, suffix.trim()].filter(Boolean);

  // All words across both lines, track where line 2 starts
  const allWords = [...words1, ...line2Words];
  const line2StartIndex = words1.length;

  // Trigger gradient reveal after headline animates
  useEffect(() => {
    if (reduced) return;
    const delay =
      HERO_DELAYS.headlineBase +
      allWords.length * HERO_DELAYS.headlineStagger +
      0.1;

    const timer = setTimeout(() => {
      if (gradientRef.current) {
        gradientRef.current.classList.add('revealed');
      }
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [allWords.length, reduced]);

  const wordVariant = {
    initial: reduced
      ? { opacity: 1, y: 0, filter: 'blur(0px)' }
      : { opacity: 0, y: 24, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  };

  const renderWord = (word: string, globalIndex: number) => {
    const isGradientWord = word === gradientWord;
    const delay =
      HERO_DELAYS.headlineBase + globalIndex * HERO_DELAYS.headlineStagger;

    return (
      <motion.span
        key={`${word}-${globalIndex}`}
        variants={wordVariant}
        initial="initial"
        animate="animate"
        transition={{ ...SPRING_SMOOTH, delay }}
        className="inline-block"
        style={{ marginRight: '0.28em' }}
      >
        {isGradientWord ? (
          <span
            ref={gradientRef}
            className="gradient-text-reveal font-display"
            aria-label={word}
          >
            {word}
          </span>
        ) : (
          word
        )}
      </motion.span>
    );
  };

  return (
    <h1
      className="font-display"
      style={{
        fontSize: 'clamp(38px, 5.5vw, 76px)',
        fontWeight: 700,
        lineHeight: 1.06,
        letterSpacing: '-0.02em',
        color: '#FAFAFA',
      }}
    >
      {/* Line 1 */}
      <div className="block overflow-visible">
        {words1.map((word, i) => renderWord(word, i))}
      </div>
      {/* Line 2 */}
      <div className="block overflow-visible">
        {line2Words.map((word, i) => {
          // Reconstruct properly: prefix may have trailing space
          const globalIndex = line2StartIndex + i;
          if (word === suffix.trim() && suffix === '.') {
            // Period hugs gradient word — no space
            return (
              <motion.span
                key={`suffix-${i}`}
                variants={wordVariant}
                initial="initial"
                animate="animate"
                transition={{
                  ...SPRING_SMOOTH,
                  delay:
                    HERO_DELAYS.headlineBase +
                    globalIndex * HERO_DELAYS.headlineStagger,
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            );
          }
          return renderWord(word, globalIndex);
        })}
      </div>
    </h1>
  );
}
