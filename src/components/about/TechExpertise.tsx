import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { SPRING_SMOOTH, SPRING_SNAPPY } from '../../lib/animation';
import { about, type SkillItem } from '../../data/about';

type DomainKey = 'languages' | 'backend' | 'cloud';

const domainMeta: Record<DomainKey, { label: string; count: string; icon: JSX.Element }> = {
  languages: {
    label: 'Languages',
    count: '7 languages',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  backend: {
    label: 'Backend & Databases',
    count: '10 technologies',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
        <path d="M7 8h2M7 11h5"/>
      </svg>
    ),
  },
  cloud: {
    label: 'Cloud & DevOps',
    count: '8 technologies',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
      </svg>
    ),
  },
};

function SkillTag({ skill }: { skill: SkillItem }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span
        style={{
          display: 'inline-block',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--text-2)',
          background: '#111113',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 'var(--radius-sm)',
          padding: '3px 9px',
          cursor: 'default',
          transition: 'border-color 0.15s, color 0.15s',
        }}
        onMouseEnter={e => {
          (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.18)';
          (e.target as HTMLElement).style.color = '#FAFAFA';
        }}
        onMouseLeave={e => {
          (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
          (e.target as HTMLElement).style.color = 'var(--text-2)';
        }}
      >
        {skill.name}
      </span>

      <AnimatePresence>
        {showTooltip && skill.projects && skill.projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ ...SPRING_SNAPPY }}
            style={{
              position: 'absolute',
              bottom: 'calc(100% + 6px)',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#18181B',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 'var(--radius-md)',
              padding: '6px 10px',
              zIndex: 20,
              minWidth: 140,
              pointerEvents: 'none',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)', marginBottom: 4, letterSpacing: '0.08em' }}>
              USED IN
            </div>
            {skill.projects.map(p => (
              <div key={p} style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-2)', lineHeight: 1.5 }}>
                · {p}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DomainCard({ domainKey, index }: { domainKey: DomainKey; index: number }) {
  const [open, setOpen] = useState(false);
  const domain = about.skills[domainKey];
  const meta = domainMeta[domainKey];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ ...SPRING_SMOOTH, delay: 0.1 + index * 0.08 }}
      onClick={() => setOpen(o => !o)}
      style={{
        background: 'var(--card)',
        border: `1px solid ${open ? 'rgba(255,255,255,0.14)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        cursor: 'pointer',
        transition: 'border-color 0.2s',
        position: 'relative',
      }}
      onMouseEnter={e => {
        if (!open) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
      }}
      onMouseLeave={e => {
        if (!open) e.currentTarget.style.borderColor = 'var(--border)';
      }}
    >
      {/* Accent dot top-right */}
      <div
        style={{
          position: 'absolute',
          top: 14,
          right: 14,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: domain.color,
          boxShadow: `0 0 10px ${domain.color}66`,
        }}
      />

      {/* Icon */}
      <div style={{ color: domain.color, marginBottom: '0.6rem' }}>{meta.icon}</div>

      {/* Name */}
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, color: '#FAFAFA', marginBottom: 4 }}>
        {meta.label}
      </div>

      {/* Count */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>
        {meta.count}
      </div>

      {/* Expandable skills */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 6,
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {domain.skills.map(skill => (
                <SkillTag key={skill.name} skill={skill} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle indicator */}
      <motion.div
        animate={{ rotate: open ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          marginTop: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: 'var(--text-muted)',
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
        {open ? 'collapse' : 'expand'}
      </motion.div>
    </motion.div>
  );
}

export function TechExpertise() {
  const domains: DomainKey[] = ['languages', 'backend', 'cloud'];

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
          TECHNICAL EXPERTISE
        </span>
      </motion.div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
        }}
      >
        {domains.map((key, i) => (
          <DomainCard key={key} domainKey={key} index={i} />
        ))}
      </div>
    </div>
  );
}
