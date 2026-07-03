import { motion } from 'framer-motion';
import { SPRING_SMOOTH } from '../../../lib/animation';
import { about } from '../../../data/about';
import { useState } from 'react';

// ── Code snippet mini renderer ─────────────────────────────
function CodeSnippet() {
  const [copied, setCopied] = useState(false);

  const code = `public class Engineer {
    List<String> focus = Arrays.asList(
        "Backend",
        "Distributed Systems",
        "Cloud"
    );
    List<String> values = Arrays.asList(
        "Performance",
        "Reliability",
        "Automation"
    );
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderLine = (line: string, i: number) => {
    // 1. HTML-escape first so <String> isn't parsed as an HTML tag
    const escaped = line
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // 2. Apply Java token coloring on the escaped string
    const styled = escaped
      .replace(/\b(public|class|new|List|Arrays)\b/g, '<kw>$1</kw>')
      .replace(/\b(String)\b/g, '<ty>$1</ty>')
      .replace(/\b(focus|values|asList)\b/g, '<id>$1</id>')
      .replace(/"([^"]+)"/g, '"<str>$1</str>"')
      .replace(/(&lt;|&gt;|[{}()[\]])/g, '<punc>$1</punc>');

    return (
      <div
        key={i}
        style={{ whiteSpace: 'pre', fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.7 }}
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
    <div
      style={{
        position: 'relative',
        background: 'rgba(0,0,0,0.35)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 14px',
        border: '1px solid rgba(255,255,255,0.06)',
        marginTop: '1.25rem',
        color: '#A1A1AA',
      }}
    >
      {/* Copy button */}
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
        title="Copy snippet"
      >
        {copied ? 'copied!' : 'copy'}
      </motion.button>

      {code.split('\n').map((line, i) => renderLine(line, i))}
    </div>
  );
}

// ── Bio Card ───────────────────────────────────────────────
export function BioCard() {
  const { bio } = about;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ ...SPRING_SMOOTH, delay: 0.1 }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}
      style={{
        gridColumn: 'span 2',
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        cursor: 'default',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)')}
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
          marginBottom: '0.6rem',
        }}
      >
        {bio.label}
      </span>

      <h3
        className="font-display"
        style={{ fontSize: 20, fontWeight: 600, color: '#FAFAFA', marginBottom: '0.75rem' }}
      >
        {bio.heading}
      </h3>

      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 14,
          color: 'var(--text-2)',
          lineHeight: 1.7,
        }}
      >
        {bio.body}
      </p>

      <CodeSnippet />
    </motion.div>
  );
}
