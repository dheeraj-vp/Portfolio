import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { SPRING_SMOOTH, SPRING_SNAPPY } from '../../lib/animation';
import { projects, type Project } from '../../data/projects';
import { ExternalLink, X, Calendar, BookOpen, ChevronRight } from 'lucide-react';

// Custom GitHub Icon Component
function Github({ size = 16 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      stroke="currentColor"
      strokeWidth="2.2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

// ── Tab Type ──────────────────────────────────────────────────
type ProjectTab = 'All' | 'FullStack' | 'DevOps';

// ── Tech stack parser helper ──────────────────────────────────
function parseTechStack(techStack: string[]) {
  const keyValues: { key: string; value: string }[] = [];
  const remainingTags: string[] = [];

  techStack.forEach(item => {
    const colonIndex = item.indexOf(':');
    if (colonIndex > 0) {
      const key = item.substring(0, colonIndex).trim();
      const value = item.substring(colonIndex + 1).trim();
      keyValues.push({ key, value });
    } else {
      remainingTags.push(item);
    }
  });

  return { keyValues, remainingTags };
}

// ── Project Card Component ─────────────────────────────────────
interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index: number;
}

function ProjectCard({ project, onClick, index }: ProjectCardProps) {
  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ ...SPRING_SMOOTH, delay: index * 0.05 }}
      onClick={onClick}
      style={{
        background: project.isFeatured
          ? 'linear-gradient(to bottom right, rgba(24, 24, 27, 0.95), rgba(18, 18, 20, 0.95))'
          : 'var(--card)',
        border: project.isFeatured
          ? '1px solid rgba(139, 92, 246, 0.25)'
          : '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '280px',
        transition: 'border-color 0.25s, box-shadow 0.25s',
      }}
      className="group hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]"
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = project.isFeatured
          ? 'rgba(167, 139, 250, 0.6)'
          : 'rgba(255, 255, 255, 0.16)';
        e.currentTarget.style.boxShadow = project.isFeatured
          ? '0 12px 40px rgba(124, 58, 237, 0.15), 0 0 1px rgba(124, 58, 237, 0.25) inset'
          : '0 12px 40px rgba(0, 0, 0, 0.6)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = project.isFeatured
          ? 'rgba(139, 92, 246, 0.25)'
          : 'var(--border)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Background glow overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: project.isFeatured
            ? 'radial-gradient(circle at 100% 0%, rgba(124, 58, 237, 0.08) 0%, transparent 60%)'
            : 'radial-gradient(circle at 100% 0%, rgba(37, 99, 235, 0.03) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div>
        {/* Categories indicator */}
        <div style={{ display: 'flex', gap: 6, marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {project.badge && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(37, 99, 235, 0.15))',
                border: '1px solid rgba(139, 92, 246, 0.35)',
                color: '#C084FC',
                padding: '2px 8px',
                borderRadius: '4px',
                fontWeight: 600,
                boxShadow: '0 0 8px rgba(124, 58, 237, 0.15)',
              }}
            >
              ✦ {project.badge}
            </span>
          )}
          {project.categories.map(cat => (
            <span
              key={cat}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: cat === 'DevOps' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(37, 99, 235, 0.1)',
                border: `1px solid ${cat === 'DevOps' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(37, 99, 235, 0.15)'}`,
                color: cat === 'DevOps' ? '#4ADE80' : '#60A5FA',
                padding: '2px 6px',
                borderRadius: '4px',
              }}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3
          className="font-display group-hover:text-white"
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: '#FAFAFA',
            lineHeight: 1.3,
            marginBottom: 8,
            transition: 'color 0.2s',
          }}
        >
          {project.title}
        </h3>

        {/* Duration */}
        {project.duration && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--text-muted)',
              marginBottom: '1rem',
            }}
          >
            <Calendar size={12} />
            <span>{project.duration}</span>
          </div>
        )}

        {/* Truncated overview */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13.5,
            color: 'var(--text-2)',
            lineHeight: 1.6,
            marginBottom: '1.5rem',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.overview}
        </p>
      </div>

      <div>
        {/* Tech badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1.25rem' }}>
          {project.tags.slice(0, 4).map(tag => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                color: 'var(--text-muted)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'rgba(255,255,255,0.3)',
                padding: '2px 4px',
              }}
            >
              +{project.tags.length - 4} more
            </span>
          )}
        </div>

        {/* CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.75rem',
            borderTop: '1px solid rgba(255,255,255,0.03)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: 'var(--text-muted)',
                transition: 'color 0.2s',
              }}
              className="group-hover:text-zinc-200"
            >
              Learn More
            </span>
            <ChevronRight
              size={16}
              style={{
                color: 'var(--text-muted)',
                transition: 'transform 0.25s, color 0.25s',
              }}
              className="group-hover:translate-x-1 group-hover:text-white"
            />
          </div>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            title="View Code on GitHub"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: 'var(--text-muted)',
              transition: 'background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.color = '#FAFAFA';
              e.currentTarget.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <Github size={15} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ── Project Details Modal Component ─────────────────────────────
interface ProjectDetailsModalProps {
  project: Project;
  onClose: () => void;
}

function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  // Parse dynamic tech stack strings
  const { keyValues, remainingTags } = parseTechStack(project.techStack);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        background: 'rgba(5, 5, 6, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={SPRING_SNAPPY}
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)',
          width: '100%',
          maxWidth: '44rem',
          maxHeight: '90vh',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 0 1px rgba(255,255,255,0.06) inset',
        }}
        onClick={e => e.stopPropagation()} // Prevent closing when clicking modal content
      >
        {/* Sticky modal header */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            background: 'rgba(17, 17, 19, 0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            padding: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '1rem',
          }}
        >
          <div>
            {/* Category Tags */}
            <div style={{ display: 'flex', gap: 6, marginBottom: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {project.badge && (
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(37, 99, 235, 0.15))',
                    border: '1px solid rgba(139, 92, 246, 0.35)',
                    color: '#C084FC',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontWeight: 600,
                    boxShadow: '0 0 8px rgba(124, 58, 237, 0.15)',
                  }}
                >
                  ✦ {project.badge}
                </span>
              )}
              {project.categories.map(cat => (
                <span
                  key={cat}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    background: cat === 'DevOps' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(37, 99, 235, 0.1)',
                    border: `1px solid ${cat === 'DevOps' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(37, 99, 235, 0.15)'}`,
                    color: cat === 'DevOps' ? '#4ADE80' : '#60A5FA',
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}
                >
                  {cat}
                </span>
              ))}
            </div>

            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(20px, 3.5vw, 24px)',
                fontWeight: 700,
                color: '#FAFAFA',
                lineHeight: 1.25,
              }}
            >
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close details"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'var(--text-2)',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s, border-color 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.color = '#FAFAFA';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              e.currentTarget.style.color = 'var(--text-2)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal content body */}
        <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Section 1: Overview */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '0.75rem',
              }}
            >
              Overview
            </h4>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14.5,
                color: 'var(--text-2)',
                lineHeight: 1.7,
              }}
            >
              {project.overview}
            </p>
          </div>

          {/* Section 2: Highlights / Impact (if available) */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h4
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '0.75rem',
                }}
              >
                Key Highlights & Impact
              </h4>
              <ul
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                {project.highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      gap: 12,
                      alignItems: 'flex-start',
                      fontFamily: 'var(--font-body)',
                      fontSize: 14,
                      color: 'var(--text-2)',
                      lineHeight: 1.6,
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #7C3AED, #2563EB)',
                        flexShrink: 0,
                        marginTop: 9,
                      }}
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Section 3: Technical Stack */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '1rem',
              }}
            >
              Technology Stack
            </h4>

            {/* Structured Table for Key-Values */}
            {keyValues.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(255,255,255,0.04)',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255,255,255,0.01)',
                  marginBottom: remainingTags.length > 0 ? '1rem' : 0,
                  overflow: 'hidden',
                }}
              >
                {keyValues.map(({ key, value }, idx) => (
                  <div
                    key={key}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '160px 1fr',
                      borderBottom: idx < keyValues.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                      padding: '0.75rem 1rem',
                      alignItems: 'center',
                      fontSize: 13.5,
                      fontFamily: 'var(--font-body)',
                      color: 'var(--text-2)',
                    }}
                    className="tech-table-row"
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        color: 'var(--text-muted)',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {key}
                    </span>
                    <span style={{ color: '#FAFAFA' }}>{value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Remaining Tags */}
            {remainingTags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: '0.5rem' }}>
                {remainingTags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#FAFAFA',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Section 4: Related Blogs (Integrations) */}
          {project.relatedBlogs && project.relatedBlogs.length > 0 && (
            <div
              style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                paddingTop: '2rem',
              }}
            >
              <h4
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <BookOpen size={12} />
                Related Blog Posts & Articles
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {project.relatedBlogs.map((blog, idx) => (
                  <a
                    key={idx}
                    href={blog.url}
                    onClick={e => {
                      // Smooth scroll to blogs section if it links to #blogs
                      if (blog.url === '#blogs') {
                        e.preventDefault();
                        onClose();
                        const el = document.getElementById('blogs');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1rem 1.25rem',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: 'var(--radius-md)',
                      textDecoration: 'none',
                      transition: 'background 0.2s, border-color 0.2s',
                    }}
                    className="group/blog"
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          color: '#FAFAFA',
                          marginBottom: 4,
                        }}
                      >
                        {blog.title}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 11,
                          color: 'var(--text-muted)',
                        }}
                      >
                        {blog.date}
                      </div>
                    </div>
                    <ChevronRight
                      size={16}
                      style={{
                        color: 'var(--text-muted)',
                        transition: 'transform 0.2s, color 0.2s',
                      }}
                      className="group-hover/blog:translate-x-1 group-hover/blog:text-white"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal footer / Actions */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(9, 9, 11, 0.5)',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 12,
            borderBottomLeftRadius: 'var(--radius-xl)',
            borderBottomRightRadius: 'var(--radius-xl)',
          }}
        >
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--text)',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '8px 16px',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              }}
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              fontWeight: 500,
              color: '#09090B',
              background: '#FAFAFA',
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#E4E4E7')}
            onMouseLeave={e => (e.currentTarget.style.background = '#FAFAFA')}
          >
            <Github size={14} />
            GitHub Repository
          </a>
        </div>
      </motion.div>

      {/* Media styles for responsiveness inside code block */}
      <style>{`
        @media (max-width: 540px) {
          .tech-table-row {
            grid-template-columns: 1fr !important;
            gap: 4px;
            padding: 0.6rem 0.8rem !important;
          }
        }
      `}</style>
    </motion.div>
  );
}

// ── Main Projects Section Component ──────────────────────────────
export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<ProjectTab>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Tabs configurations
  const tabs: ProjectTab[] = ['All', 'FullStack', 'DevOps'];

  // Filter projects based on activeTab
  const filteredProjects = projects.filter(project => {
    if (activeTab === 'All') return true;
    return project.categories.includes(activeTab);
  });

  // Block body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  return (
    <section
      id="projects"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(80px, 10vw, 120px) 0 clamp(80px, 10vw, 120px)',
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

      {/* Top-right radial glow (greenish, shifts color flow) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 600,
          height: 600,
          background: 'radial-gradient(circle at 100% 0%, rgba(34,197,94,0.05) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Bottom-left radial glow */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: 600,
          height: 600,
          background: 'radial-gradient(circle at 0% 100%, rgba(124,58,237,0.05) 0%, transparent 65%)',
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
        {/* Section Heading */}
        <div style={{ marginBottom: 'clamp(2.5rem, 6vw, 4rem)' }}>
          {/* Label */}
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
            [ PROJECTS ]
          </motion.span>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#FAFAFA',
              marginBottom: '1.25rem',
            }}
          >
            Flagship Engineering{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #2563EB)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Creations.
            </span>
          </h2>

          {/* Subheading prompt with link to GitHub (user request) */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(14px, 2.5vw, 16px)',
              color: 'var(--text-2)',
              lineHeight: 1.6,
              maxWidth: '36rem',
            }}
          >
            To see complete architectures and all codebases, visit my{' '}
            <a
              href="https://github.com/dheeraj-vp"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#FAFAFA',
                fontWeight: 500,
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                paddingBottom: '2px',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#C084FC';
                e.currentTarget.style.borderColor = '#C084FC';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#FAFAFA';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              }}
            >
              GitHub repository ↗
            </a>
            .
          </motion.p>
        </div>

        {/* Tab Selector */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '3rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 'var(--radius-pill)',
              padding: 4,
              gap: 2,
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            {tabs.map(tab => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    position: 'relative',
                    padding: '8px 20px',
                    borderRadius: 'var(--radius-pill)',
                    background: 'none',
                    border: 'none',
                    color: isActive ? '#FAFAFA' : 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                    transition: 'color 0.25s',
                    outline: 'none',
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-project-tab"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 'var(--radius-pill)',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        zIndex: 0,
                      }}
                      transition={{ type: 'spring', damping: 20, stiffness: 220 }}
                    />
                  )}
                  <span style={{ position: 'relative', zIndex: 1 }}>
                    {tab === 'FullStack' ? 'FullStack' : tab === 'DevOps' ? 'DevOps' : tab}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="projects-grid-layout"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Projects Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailsModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 640px) {
          .projects-grid-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
