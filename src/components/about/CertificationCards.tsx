import { motion } from 'framer-motion';
import { about, type Certification } from '../../data/about';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';

// ============================================================
// Provider Logo SVG Icons (AWS, IBM, Udemy, Fallback)
// ============================================================

function AwsLogo({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 40 24" width={size * 1.5} height={size} fill="none">
      <path
        d="M6 15.5c-2.8 0-4.5-1.5-4.5-3.8 0-2.4 1.8-3.7 4.7-3.7 1.4 0 2.6.2 3.3.5V8.1c0-1.5-1-2.3-2.7-2.3-1.4 0-2.7.4-3.6 1l-.8-1.7C3.7 4.2 5.5 3.5 7.6 3.5c3.2 0 4.8 1.6 4.8 4.5v7.2h-2.1v-1.4c-.8.9-2.1 1.7-4.3 1.7zm1.1-1.8c1.6 0 2.7-.8 3.1-1.8V10c-.6-.3-1.6-.4-2.7-.4-1.7 0-2.6.7-2.6 1.9 0 1.2.9 2.2 2.2 2.2zM16.2 4h2.4l1.9 7.4L22.5 4h2.1l2 7.4L28.5 4h2.4l-3.2 11.2h-2.3l-2.1-7.2-2.1 7.2h-2.3L16.2 4zm16.7 11.5c-2.3 0-4.1-1.1-4.7-2.4l1.8-.9c.4.9 1.5 1.5 2.9 1.5 1.4 0 2.2-.6 2.2-1.4 0-.9-.8-1.3-2.5-1.7-2.4-.6-3.8-1.5-3.8-3.4 0-2.1 1.8-3.7 4.4-3.7 2 0 3.6.8 4.3 2.1l-1.7 1c-.5-.8-1.4-1.3-2.6-1.3-1.3 0-2 .6-2 1.3 0 .8.7 1.2 2.3 1.6 2.5.6 4 1.5 4 3.5 0 2.3-1.9 3.8-4.7 3.8z"
        fill="#FF9900"
      />
      {/* AWS Smile Curve */}
      <path
        d="M4 19.5C12 23.5 26 23.5 34 18.5"
        stroke="#FF9900"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M32 16.5L35.5 18.5L32.5 21.5"
        fill="none"
        stroke="#FF9900"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IbmLogo({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 54 24" width={size * 1.8} height={size} fill="#0F62FE">
      <text
        x="0"
        y="18"
        fill="#0F62FE"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="900"
        fontSize="21"
        letterSpacing="2.5"
      >
        IBM
      </text>
    </svg>
  );
}

function UdemyLogo({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="#A435F0" strokeWidth="2.8" strokeLinecap="round">
      <path d="M4 4v7a8 8 0 0 0 16 0V4" />
      <path d="M12 12l5-5" strokeWidth="2.8" />
    </svg>
  );
}

function ProviderLogo({ issuerShort, color }: { issuerShort: string; color: string }) {
  const short = issuerShort.toUpperCase();
  if (short === 'AWS') return <AwsLogo size={20} />;
  if (short === 'IBM') return <IbmLogo size={18} />;
  if (short === 'UDEMY') return <UdemyLogo size={20} />;

  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        fontWeight: 800,
        color: color,
        letterSpacing: '0.05em',
      }}
    >
      {short}
    </span>
  );
}

// ============================================================
// Certificate Card Component
// ============================================================

function PremiumCertCard({ cert, index }: { cert: Certification; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: index * 0.08,
      }}
      whileHover={{
        y: -6,
        rotate: 1,
        transition: { type: 'spring', stiffness: 350, damping: 25 },
      }}
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: 'var(--radius-2xl)',
        padding: 'clamp(1.25rem, 3.5vw, 1.75rem)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        height: '100%',
        outline: 'none',
      }}
      tabIndex={0}
      className="group focus-visible:ring-2 focus-visible:ring-purple-500/50"
    >
      {/* Soft Ambient Radial Background Tint */}
      <div
        style={{
          position: 'absolute',
          top: -40,
          left: -40,
          width: 220,
          height: 220,
          background: `radial-gradient(circle, ${cert.issuerColor}14 0%, transparent 75%)`,
          pointerEvents: 'none',
          transition: 'opacity 0.3s',
        }}
        className="opacity-70 group-hover:opacity-100"
      />

      {/* Top Inner Highlight Line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${cert.issuerColor}40, transparent)`,
          pointerEvents: 'none',
        }}
      />

      <div>
        {/* TOP ROW: Provider Logo & Label + Verified Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            marginBottom: '1.25rem',
          }}
        >
          {/* Provider Logo + Colored Label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{
                width: 42,
                height: 42,
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${cert.issuerColor}18, rgba(255, 255, 255, 0.02))`,
                border: `1px solid ${cert.issuerColor}35`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 4px 14px ${cert.issuerColor}15`,
                flexShrink: 0,
              }}
            >
              <ProviderLogo issuerShort={cert.issuerShort} color={cert.issuerColor} />
            </motion.div>

            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                fontWeight: 700,
                color: cert.issuerColor,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              {cert.issuerShort}
            </span>
          </div>

          {/* VERIFIED Badge with green check icon */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              padding: '4px 10px',
              borderRadius: '9999px',
              background: 'rgba(34, 197, 94, 0.08)',
              border: '1px solid rgba(34, 197, 94, 0.22)',
              boxShadow: '0 2px 10px rgba(34, 197, 94, 0.1)',
            }}
          >
            <CheckCircle2 size={12} style={{ color: '#22C55E' }} />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9.5,
                fontWeight: 700,
                color: '#22C55E',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              VERIFIED
            </span>
          </div>
        </div>

        {/* CENTER: Large Certificate Title */}
        <h3
          className="font-display group-hover:text-purple-200"
          style={{
            fontSize: 'clamp(17px, 2.2vw, 20px)',
            fontWeight: 700,
            color: '#FAFAFA',
            lineHeight: 1.35,
            marginBottom: '1.25rem',
            transition: 'color 0.25s',
          }}
        >
          {cert.title}
        </h3>

        {/* CENTER: Large Achievement Badge (Score or Completed) */}
        <div style={{ marginBottom: '1.5rem' }}>
          {cert.score && cert.maxScore ? (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 14px',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.04)',
              }}
            >
              <span style={{ fontSize: 22 }} role="img" aria-label="achievement medal">

              </span>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(24px, 3.5vw, 30px)',
                    fontWeight: 800,
                    color: '#FAFAFA',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {cert.score}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    marginLeft: 4,
                  }}
                >
                  / {cert.maxScore}
                </span>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 14px',
                borderRadius: '14px',
                background: 'rgba(34, 197, 94, 0.06)',
                border: '1px solid rgba(34, 197, 94, 0.18)',
              }}
            >
              <span style={{ fontSize: 20 }} role="img" aria-label="completed badge">

              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(20px, 3vw, 24px)',
                  fontWeight: 700,
                  color: '#FAFAFA',
                  lineHeight: 1,
                }}
              >
                Completed
              </span>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM ROW: Issued Date + View Credential Ghost Button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 12,
          paddingTop: '1rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          marginTop: 'auto',
        }}
      >
        {/* Issued Date */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9.5,
              fontWeight: 600,
              color: 'var(--text-muted)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 3,
            }}
          >
            ISSUED
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              fontWeight: 500,
              color: '#D4D4D8',
            }}
          >
            {cert.date}
          </div>
        </div>

        {/* View Credential Ghost Button */}
        {cert.url && (
          <a
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              fontWeight: 600,
              color: '#E4E4E7',
              textDecoration: 'none',
              padding: '8px 14px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.25s ease',
            }}
            className="hover:bg-white/15 hover:border-white/30 hover:text-white hover:shadow-[0_4px_16px_rgba(255,255,255,0.1)]"
          >
            <span>View Credential</span>
            <ArrowUpRight size={14} />
          </a>
        )}
      </div>
    </motion.article>
  );
}

// ============================================================
// Main Certifications Section Component
// ============================================================

export function CertificationCards() {
  return (
    <div style={{ marginBottom: '3.5rem', position: 'relative' }}>
      {/* Background Ambient Glow Blobs */}
      <div
        style={{
          position: 'absolute',
          top: -20,
          left: '10%',
          width: 350,
          height: 350,
          background: 'radial-gradient(circle, rgba(255, 153, 0, 0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -20,
          right: '10%',
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* 1. PATENT HIGHLIGHT CARD */}
      <div style={{ marginBottom: '2.5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ marginBottom: '0.75rem' }}
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
            PATENT INNOVATION
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.15 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          style={{
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.06), rgba(37, 99, 235, 0.04))',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'clamp(1.25rem, 3.5vw, 1.75rem)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap',
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: '14px',
              background: 'rgba(124, 58, 237, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              flexShrink: 0,
            }}
          >
            💡
          </div>

          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  color: '#C084FC',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                PATENT FILED & PUBLISHED
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9.5,
                  fontWeight: 600,
                  color: '#22C55E',
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.25)',
                  borderRadius: 99,
                  padding: '2px 8px',
                }}
              >
                {about.patent.status}
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(16px, 2.5vw, 18px)',
                fontWeight: 700,
                color: '#FAFAFA',
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              {about.patent.title}
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11.5px',
                color: 'var(--text-muted)',
                margin: '6px 0 0',
              }}
            >
              App No: {about.patent.applicationNumber} · Filed: {about.patent.date}
            </p>
          </div>
        </motion.div>
      </div>

      {/* 2. CERTIFICATIONS GRID HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: 0.2 }}
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
          VERIFIED CERTIFICATIONS
        </span>
      </motion.div>

      {/* 3. CERTIFICATIONS GRID (2-column on desktop/tablet, 1-column on mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {about.certifications.map((cert, i) => (
          <PremiumCertCard key={cert.title} cert={cert} index={i} />
        ))}
      </div>
    </div>
  );
}
