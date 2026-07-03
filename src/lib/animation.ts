// ============================================================
// Animation Constants — used across all sections
// ============================================================

export const SPRING_SMOOTH = {
  type: 'spring' as const,
  damping: 18,
  stiffness: 120,
};

export const SPRING_SNAPPY = {
  type: 'spring' as const,
  damping: 15,
  stiffness: 200,
};

export const SPRING_MOUSE = {
  damping: 30,
  stiffness: 150,
};

export const SPRING_GENTLE = {
  type: 'spring' as const,
  damping: 25,
  stiffness: 80,
};

export const CARD_HOVER = { scale: 1.02, y: -4 };
export const BUTTON_HOVER = { scale: 1.03 };
export const BUTTON_TAP = { scale: 0.97 };
export const MAX_TILT = 6; // degrees
export const BLUR_RADIUS = 18; // px
export const GLOW_OPACITY = 0.12;

// Hero animation sequence delays (seconds)
export const HERO_DELAYS = {
  badge:        0.0,
  headlineBase: 0.15,
  headlineStagger: 0.08,
  role:         0.7,
  divider:      0.85,
  description:  1.0,
  metricsBase:  1.2,
  metricsStagger: 0.1,
  ctaBase:      1.7,
  ctaStagger:   0.12,
  socialBase:   1.9,
  socialStagger: 0.06,
  scroll:       2.1,
  proof:        2.2,
};

// Shared variants for fade-up-in
export const fadeUpIn = {
  initial: { opacity: 0, y: 16, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

export const wordReveal = {
  initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1 },
};
