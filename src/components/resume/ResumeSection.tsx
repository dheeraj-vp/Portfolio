import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { SPRING_SMOOTH } from '../../lib/animation';
import { resumesData, type ResumeVariant } from '../../data/resumes';
import {
  ExternalLink,
  Download,
  Code,
  Server,
  Cloud,
  Layers,
  Activity,
  Cpu
} from 'lucide-react';



// Target roles list
const targetRoles = [
  { name: 'Full-Stack Engineering', icon: Layers, color: '#C084FC' },
  { name: 'Backend Development', icon: Server, color: '#60A5FA' },
  { name: 'DevOps Automation', icon: Cpu, color: '#4ADE80' },
  { name: 'Site Reliability (SRE)', icon: Activity, color: '#F87171' },
  { name: 'Cloud Infrastructure', icon: Cloud, color: '#FB923C' },
  { name: 'Platform Engineering', icon: Code, color: '#38BDF8' },
];

export function ResumeSection() {
  const [activeTab, setActiveTab] = useState<'fullStack' | 'devOps'>('fullStack');
  const activeResume: ResumeVariant = resumesData[activeTab];

  return (
    <section
      id="resume"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 10vw, 8rem) 0',
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
        background: '#09090B',
      }}
    >
      {/* Blueprint grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      {/* Glow effects */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          height: 400,
          background: 'radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '0 clamp(1.25rem, 5vw, 2.5rem)',
        }}
      >
        {/* Section Header */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'var(--text-muted)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.75rem',
            }}
          >
            [ RESUME ]
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ ...SPRING_SMOOTH, delay: 0.2 }}
            className="font-display"
            style={{
              fontSize: 'clamp(32px, 5vw, 42px)',
              fontWeight: 700,
              color: '#FAFAFA',
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
            }}
          >
            Professional{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #A78BFA 30%, #60A5FA 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Background.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              color: 'var(--text-2)',
              maxWidth: '32rem',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            View or download my resume tailored to either Full-Stack SDE or DevOps/SRE specifications.
          </motion.p>
        </div>

        {/* Target Roles Pill Grid */}
        <div style={{ marginBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              maxWidth: '54rem',
              margin: '0 auto',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'block',
                textAlign: 'center',
                marginBottom: '1.25rem',
              }}
            >
              ✦ Active candidate open to opportunities in:
            </span>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 12,
              }}
            >
              {targetRoles.map((role) => {
                const IconComponent = role.icon;
                return (
                  <div
                    key={role.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.04)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.75rem 1rem',
                      transition: 'border-color 0.2s, background 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '6px',
                        background: `${role.color}15`,
                        color: role.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <IconComponent size={14} />
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 13.5,
                        fontWeight: 500,
                        color: '#FAFAFA',
                      }}
                    >
                      {role.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Tab Toggle Control */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              padding: '4px',
              borderRadius: 'var(--radius-pill)',
              position: 'relative',
              gap: 4,
            }}
          >
            {(['fullStack', 'devOps'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  fontWeight: 600,
                  color: activeTab === tab ? '#FAFAFA' : 'var(--text-muted)',
                  padding: '8px 24px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'color 0.2s',
                  zIndex: 1,
                  outline: 'none',
                }}
              >
                {tab === 'fullStack' ? 'Full-Stack Resume' : 'DevOps / SRE Resume'}
                {activeTab === tab && (
                  <motion.div
                    layoutId="active-resume-tab"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 'var(--radius-pill)',
                      zIndex: -1,
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Google Drive PDF Preview Container */}
        <div style={{ maxWidth: '54rem', margin: '0 auto', marginBottom: '3rem' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              style={{
                width: '100%',
                background: '#18181B',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: '0 20px 48px rgba(0,0,0,0.5)',
                position: 'relative',
                overflow: 'hidden',
                aspectRatio: '16/10',
                minHeight: '600px',
                height: '75vh',
              }}
            >
              {/* Highlight line */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: activeTab === 'fullStack'
                    ? 'linear-gradient(90deg, #A78BFA, #3B82F6)'
                    : 'linear-gradient(90deg, #3B82F6, #10B981)',
                  zIndex: 10,
                }}
              />

              <iframe
                src={activeResume.driveLink.replace('/view?usp=drive_link', '/preview')}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: 'var(--radius-xl)',
                }}
                allow="autoplay"
                title={`${activeResume.name} Preview`}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Buttons / CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          {/* View PDF Resume in New Tab */}
          <a
            href={activeResume.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              borderRadius: '10px',
              background: activeTab === 'fullStack'
                ? 'linear-gradient(135deg, #7C3AED, #2563EB)'
                : 'linear-gradient(135deg, #2563EB, #10B981)',
              color: '#FFFFFF',
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: activeTab === 'fullStack'
                ? '0 4px 20px rgba(124,58,237,0.2)'
                : '0 4px 20px rgba(37,99,235,0.2)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = activeTab === 'fullStack'
                ? '0 6px 24px rgba(124,58,237,0.3)'
                : '0 6px 24px rgba(37,99,235,0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = activeTab === 'fullStack'
                ? '0 4px 20px rgba(124,58,237,0.2)'
                : '0 4px 20px rgba(37,99,235,0.2)';
            }}
          >
            <span>View PDF Resume</span>
            <ExternalLink size={14} />
          </a>

          {/* Download PDF directly */}
          <a
            href={activeResume.downloadLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#FAFAFA',
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>Download PDF</span>
            <Download size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
