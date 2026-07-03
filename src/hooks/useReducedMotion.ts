import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';

export function useReducedMotion() {
  const prefersReducedMotion = useFramerReducedMotion();
  return prefersReducedMotion ?? false;
}
