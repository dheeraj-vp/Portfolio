import { motion } from 'framer-motion';
import { SPRING_SMOOTH } from '../../lib/animation';
import { blogs, type BlogPost } from '../../data/blogs';
import { ExternalLink, BookOpen, Clock } from 'lucide-react';

// Custom Medium Icon Component
function MediumIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  );
}

function BlogCard({ blog, index }: { blog: BlogPost; index: number }) {
  const isMedium = blog.platform?.toLowerCase() === 'medium';
  const hasMetaBar = Boolean(blog.platform || blog.date || blog.readTime);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ ...SPRING_SMOOTH, delay: 0.1 + index * 0.08 }}
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'clamp(1.25rem, 4vw, 1.75rem)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.25s, box-shadow 0.25s, transform 0.25s',
      }}
      className="group hover:border-purple-500/30 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
    >
      <div>
        {/* Top Meta Header: Platform Badge + Date + Read Time (rendered only if present) */}
        {hasMetaBar && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
              marginBottom: '1rem',
              flexWrap: 'wrap',
            }}
          >
            {/* Platform pill */}
            {blog.platform ? (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  background: isMedium ? 'rgba(255, 255, 255, 0.08)' : 'rgba(37, 99, 235, 0.1)',
                  border: isMedium ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(37, 99, 235, 0.2)',
                  color: isMedium ? '#FAFAFA' : '#60A5FA',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                {isMedium ? <MediumIcon size={12} /> : <BookOpen size={11} />}
                {blog.platform}
              </span>
            ) : (
              <span />
            )}

            {/* Date & Read time */}
            {(blog.date || blog.readTime) && (
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {blog.date && <span>{blog.date}</span>}
                {blog.date && blog.readTime && <span>·</span>}
                {blog.readTime && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={11} />
                    {blog.readTime}
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Title */}
        <h3
          className="font-display group-hover:text-purple-300"
          style={{
            fontSize: 'clamp(17px, 3vw, 20px)',
            fontWeight: 600,
            color: '#FAFAFA',
            lineHeight: 1.35,
            marginBottom: '0.75rem',
            transition: 'color 0.2s',
          }}
        >
          <a
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            {blog.title}
          </a>
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            color: 'var(--text-2)',
            lineHeight: 1.6,
            marginBottom: '1.25rem',
          }}
        >
          {blog.description}
        </p>
      </div>

      <div>
        {/* Topic Tags (rendered only if present) */}
        {blog.tags && blog.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1.25rem' }}>
            {blog.tags.map(tag => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10.5,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: 'var(--text-muted)',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Link Footer */}
        <div
          style={{
            paddingTop: '0.85rem',
            borderTop: '1px solid rgba(255,255,255,0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <a
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              fontWeight: 600,
              color: '#A78BFA',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              minHeight: 40,
              transition: 'color 0.2s, gap 0.2s',
            }}
            className="group-hover:gap-2 group-hover:text-purple-300"
          >
            <span>{blog.platform ? `Read on ${blog.platform}` : 'Read Article'}</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function BlogsSection() {
  return (
    <section
      id="blogs"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(80px, 10vw, 120px) 0 clamp(60px, 8vw, 100px)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* Blueprint grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      {/* Background Glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '20%',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.04) 0%, transparent 70%)',
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
        <div style={{ marginBottom: 'clamp(2.5rem, 6vw, 3.5rem)' }}>
          {/* Label */}
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-20px' }}
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
            [ WRITINGS & ARTICLES ]
          </motion.span>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              height: 1,
              background: 'rgba(255,255,255,0.08)',
              transformOrigin: 'left',
              marginBottom: '1.5rem',
              width: '100%',
            }}
          />

          {/* Title */}
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(28px, 5vw, 48px)',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#FAFAFA',
              marginBottom: '1rem',
            }}
          >
            Articles &{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #A78BFA, #3B82F6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Deep Dives.
            </span>
          </h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.5, delay: 0.25 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(14px, 2.5vw, 15.5px)',
              color: 'var(--text-2)',
              lineHeight: 1.6,
              maxWidth: '38rem',
            }}
          >
            Technical articles, architecture deep dives, and engineering references across projects.
          </motion.p>
        </div>

        {/* Blogs Card Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {blogs.map((blog, idx) => (
            <BlogCard key={blog.id} blog={blog} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
