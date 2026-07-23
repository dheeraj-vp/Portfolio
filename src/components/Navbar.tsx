import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const NAV_LINKS = [
  { label: 'Home',       href: '#home' },
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Blogs',      href: '#blogs' },
  { label: 'Resume',     href: '#resume' },
  { label: 'Contact',    href: '#contact' },
];

export function Navbar() {
  const reduced = useReducedMotion();
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  // Auto-hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 60);
      if (currentY < 80) { setVisible(true); return; }
      setVisible(currentY < lastScrollY.current || currentY < 120);
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Active section detection
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.35 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(90deg, #7C3AED, #2563EB)',
          transformOrigin: '0%',
          zIndex: 70,
        }}
        aria-hidden="true"
      />

      {/* Navbar pill */}
      <AnimatePresence>
        {visible && (
          <motion.nav
            initial={{ y: -80, opacity: 0, x: '-50%' }}
            animate={{ y: 0, opacity: 1, x: '-50%' }}
            exit={{ y: -80, opacity: 0, x: '-50%' }}
            transition={{ type: 'spring', damping: 22, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 16,
              left: '50%',
              zIndex: 60,
              width: 'calc(100% - 2rem)',
              maxWidth: 680,
            }}
            aria-label="Main navigation"
          >
            <motion.div
              animate={{
                scale: scrolled ? 0.98 : 1,
                background: scrolled ? 'rgba(9,9,11,0.92)' : 'rgba(9,9,11,0.75)',
              }}
              transition={{ duration: 0.2 }}
              style={{
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.04) inset',
                borderRadius: 14,
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {/* Desktop links */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  flex: 1,
                }}
                className="nav-links-desktop"
              >
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.href.replace('#', '');
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      style={{
                        position: 'relative',
                        padding: '6px 12px',
                        borderRadius: 10,
                        color: isActive ? '#FAFAFA' : '#71717A',
                        fontFamily: 'var(--font-body)',
                        fontSize: 13,
                        fontWeight: isActive ? 500 : 400,
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                        outline: 'none',
                        display: 'block',
                      }}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-pill"
                          style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: 10,
                            background: 'rgba(255,255,255,0.07)',
                          }}
                          transition={{ type: 'spring', damping: 22, stiffness: 300 }}
                          aria-hidden="true"
                        />
                      )}
                      <span style={{ position: 'relative', zIndex: 1 }}>{link.label}</span>
                    </a>
                  );
                })}
              </div>

              {/* Mobile: active section label + hamburger */}
              <div className="nav-mobile-row" style={{ display: 'none', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '0 4px' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#FAFAFA', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7C3AED' }} />
                  {NAV_LINKS.find(l => l.href === `#${activeSection}`)?.label ?? 'Home'}
                </span>

                <button
                  onClick={() => setMenuOpen(o => !o)}
                  aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 8,
                    cursor: 'pointer',
                    padding: '10px 12px',
                    minWidth: 44,
                    minHeight: 44,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <motion.span
                    animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                    style={{ display: 'block', width: 20, height: 2, background: '#FAFAFA', borderRadius: 2, transformOrigin: 'center' }}
                  />
                  <motion.span
                    animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                    style={{ display: 'block', width: 20, height: 2, background: '#FAFAFA', borderRadius: 2 }}
                  />
                  <motion.span
                    animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                    style={{ display: 'block', width: 20, height: 2, background: '#FAFAFA', borderRadius: 2, transformOrigin: 'center' }}
                  />
                </button>
              </div>
            </motion.div>

            {/* Mobile dropdown menu */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                  style={{
                    marginTop: 8,
                    background: 'rgba(9,9,11,0.96)',
                    backdropFilter: 'blur(18px)',
                    WebkitBackdropFilter: 'blur(18px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 14,
                    padding: '8px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                  }}
                >
                  {NAV_LINKS.map((link) => {
                    const isActive = activeSection === link.href.replace('#', '');
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        style={{
                          padding: '12px 16px',
                          borderRadius: 10,
                          background: isActive ? 'rgba(124,58,237,0.15)' : 'transparent',
                          color: isActive ? '#FAFAFA' : '#A1A1AA',
                          fontFamily: 'var(--font-body)',
                          fontSize: 15,
                          fontWeight: isActive ? 600 : 400,
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'background 0.15s, color 0.15s',
                        }}
                      >
                        <span>{link.label}</span>
                        {isActive && <span style={{ color: '#7C3AED', fontSize: 12 }}>●</span>}
                      </a>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 639px) {
          .nav-links-desktop { display: none !important; }
          .nav-mobile-row { display: flex !important; }
        }
        @media (min-width: 640px) {
          .nav-links-desktop { display: flex !important; }
          .nav-mobile-row { display: none !important; }
        }
      `}</style>
    </>
  );
}
