import { motion } from 'framer-motion';
import { useState } from 'react';
import { SPRING_SMOOTH } from '../../lib/animation';
import { about } from '../../data/about';

function CodeSnippetFull() {
  const [copied, setCopied] = useState(false);

  const code = `type Engineer struct {
    Focus  []string
    Values []string
}

me := Engineer{
    Focus: []string{
        "Backend",
        "Distributed Systems",
        "Cloud",
    },
    Values: []string{
        "Performance",
        "Reliability",
        "Automation",
    },
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderLine = (line: string, i: number) => {
    const styled = line
      .replace(/(type|struct)\b/g, '<kw>$1</kw>')
      .replace(/\b(Engineer|string)\b/g, '<ty>$1</ty>')
      .replace(/\b(Focus|Values|me)\b/g, '<id>$1</id>')
      .replace(/"([^"]+)"/g, '"<str>$1</str>"')
      .replace(/[{}[\]]/g, '<punc>$&</punc>');

    return (
      <div
        key={i}
        style={{ whiteSpace: 'pre', fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.8 }}
        dangerouslySetInnerHTML={{
          __html: styled
            .replace(/<kw>(.*?)<\/kw>/g, '<span style="color:#7C3AED;font-weight:600">$1</span>')
            .replace(/<ty>(.*?)<\/ty>/g, '<span style="color:#2563EB">$1</span>')
            .replace(/<id>(.*?)<\/id>/g, '<span style="color:#FAFAFA">$1</span>')
            .replace(/<str>(.*?)<\/str>/g, '<span style="color:#22C55E">$1</span>')
            .replace(/<punc>(.*?)<\/punc>/g, '<span style="color:#71717A">$1</span>'),
        }}
      />
    );
  };

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <span
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
        SIGNATURE
      </span>

      <div
        style={{
          position: 'relative',
          background: 'rgba(0,0,0,0.35)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          border: '1px solid rgba(255,255,255,0.06)',
          color: '#A1A1AA',
        }}
      >
        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: 'var(--radius-sm)',
            color: copied ? '#22C55E' : '#71717A',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            padding: '3px 8px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            letterSpacing: '0.05em',
          }}
        >
          {copied ? 'copied!' : 'copy'}
        </motion.button>

        {code.split('\n').map((line, i) => renderLine(line, i))}
      </div>
    </div>
  );
}

export function SnapshotCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ ...SPRING_SMOOTH, delay: 0.1 }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        marginBottom: '3rem',
      }}
    >
      {/* Left: Snapshot */}
      <div
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem',
          transition: 'border-color 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--text-muted)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '1rem',
          }}
        >
          ENGINEERING SNAPSHOT
        </span>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {about.snapshot.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ ...SPRING_SMOOTH, delay: 0.2 + i * 0.06 }}
              whileHover={{ x: 4 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                color: 'var(--text-2)',
                padding: '4px 0',
                cursor: 'default',
              }}
            >
              <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
              <span>{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right: Code snippet */}
      <div
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem',
          transition: 'border-color 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
      >
        <CodeSnippetFull />
      </div>
    </motion.div>
  );
}
