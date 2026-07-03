import { motion } from 'framer-motion';
import { useRef } from 'react';
import { SPRING_SMOOTH } from '../../lib/animation';
import { about, type JourneyMilestone } from '../../data/about';

const typeColors: Record<JourneyMilestone['type'] | 'skill', string> = {
  education:   '#2563EB',
  skill:       '#7C3AED',
  experience:  '#22C55E',
  achievement: '#F59E0B',
  future:      '#71717A',
};

const typeLabels: Record<JourneyMilestone['type'] | 'skill', string> = {
  education:   'Education',
  skill:       'Skill',
  experience:  'Experience',
  achievement: 'Achievement',
  future:      'Future',
};

function MilestoneRow({
  milestone,
  index,
  isLast,
}: {
  milestone: JourneyMilestone;
  index: number;
  isLast: boolean;
}) {
  const color = typeColors[milestone.type];
  const isHighlight = 'highlight' in milestone && milestone.highlight;
  const isFuture = milestone.type === 'future';

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ ...SPRING_SMOOTH, delay: 0.15 + index * 0.07 }}
      style={{
        display: 'grid',
        gridTemplateColumns: '120px 32px 1fr',
        gap: '0 0',
        position: 'relative',
        minHeight: isLast ? 0 : 72,
      }}
    >
      {/* ── Left: Year label ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          paddingRight: 20,
          paddingTop: 2,
        }}
      >
        {milestone.year && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: isFuture ? 'var(--text-muted)' : '#A1A1AA',
              letterSpacing: '0.04em',
              whiteSpace: 'nowrap',
            }}
          >
            {milestone.year}
          </span>
        )}
      </div>

      {/* ── Center: Dot + vertical connector ── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Node */}
        <motion.div
          animate={isHighlight ? {
            scale: [1, 1.3, 1],
            boxShadow: [
              '0 0 0px rgba(124,58,237,0)',
              '0 0 18px rgba(124,58,237,0.7)',
              '0 0 0px rgba(124,58,237,0)',
            ],
          } : {}}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: isHighlight ? '#7C3AED' : isFuture ? 'var(--bg)' : 'var(--card)',
            border: `2px solid ${
              isHighlight ? '#7C3AED' : isFuture ? 'rgba(255,255,255,0.15)' : color
            }`,
            flexShrink: 0,
            zIndex: 2,
            marginTop: 2,
          }}
        />

        {/* Vertical connector line */}
        {!isLast && (
          <div
            style={{
              width: 2,
              flex: 1,
              minHeight: 48,
              background: 'rgba(255,255,255,0.06)',
              marginTop: 4,
            }}
          />
        )}
      </div>

      {/* ── Right: Content ── */}
      <div
        style={{
          paddingLeft: 20,
          paddingBottom: isLast ? 0 : 28,
          paddingTop: 0,
        }}
      >
        {/* Type badge */}
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            color: isFuture ? 'var(--text-muted)' : color,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: 4,
          }}
        >
          {typeLabels[milestone.type]}
        </span>

        {/* Title */}
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            fontWeight: isHighlight ? 600 : 500,
            color: isFuture ? 'var(--text-muted)' : '#FAFAFA',
            lineHeight: 1.3,
            marginBottom: milestone.detail ? 6 : 0,
          }}
        >
          {milestone.title}
          {isHighlight && (
            <span
              style={{
                marginLeft: 8,
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                color: '#7C3AED',
                background: 'rgba(124,58,237,0.12)',
                border: '1px solid rgba(124,58,237,0.25)',
                borderRadius: 'var(--radius-pill)',
                padding: '1px 7px',
                verticalAlign: 'middle',
              }}
            >
              patent
            </span>
          )}
        </div>

        {/* Detail */}
        {'detail' in milestone && milestone.detail && (
          <div
            className="journey-detail"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              color: 'var(--text-muted)',
              lineHeight: 1.6,
            }}
          >
            {milestone.detail}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function JourneyTimeline() {
  const lineRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ marginBottom: '3rem' }}>
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ ...SPRING_SMOOTH, delay: 0.1 }}
        style={{ marginBottom: '2rem' }}
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
          ENGINEERING JOURNEY
        </span>
      </motion.div>

      {/* Timeline container */}
      <div
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: 'clamp(1rem, 4vw, 2rem)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle top-right glow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 300,
            height: 300,
            background: 'radial-gradient(circle at 100% 0%, rgba(124,58,237,0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Legend */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem 1.25rem',
            marginBottom: '1.75rem',
            paddingBottom: '1.25rem',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {(Object.entries(typeColors) as [JourneyMilestone['type'] | 'skill', string][])
            .filter(([key]) => key !== 'skill')
            .map(([type, color]) => (
              <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
                  {typeLabels[type]}
                </span>
              </div>
            ))}
        </div>

        {/* Milestones */}
        <div ref={lineRef}>
          {about.journey.map((milestone, i) => (
            <MilestoneRow
              key={i}
              milestone={milestone}
              index={i}
              isLast={i === about.journey.length - 1}
            />
          ))}
        </div>
      </div>

      <style>{`
        /* Hide detail text on mobile */
        @media (max-width: 480px) {
          .journey-detail { display: none !important; }
        }
        /* Tighten year column on mobile */
        @media (max-width: 480px) {
          .journey-row { grid-template-columns: 80px 28px 1fr !important; }
        }
      `}</style>
    </div>
  );
}
