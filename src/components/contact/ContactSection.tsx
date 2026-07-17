import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { profile } from '../../data/profile';
import { SPRING_SMOOTH } from '../../lib/animation';
import {
  Mail,
  Copy,
  Check,
  ExternalLink,
  MapPin,
  Clock,
  Send,
  Loader2,
  Download,
  AlertCircle
} from 'lucide-react';

// Custom Brand SVGs
function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function LeetcodeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.777 9.778a1.375 1.375 0 0 0 0 1.942l4.885 4.885a1.375 1.375 0 0 0 1.943 0l9.777-9.777a1.375 1.375 0 0 0 0-1.942L14.444.414A1.375 1.375 0 0 0 13.483 0zm-.03 2.285l3.86 3.862-8.329 8.328-3.86-3.862 8.329-8.328z" />
      <path d="M2.5 12c-.552 0-1 .448-1 1v5.5A3.5 3.5 0 0 0 5 22h5.5c.552 0 1-.448 1-1s-.448-1-1-1H5a1.5 1.5 0 0 1-1.5-1.5V13c0-.552-.448-1-1-1z" />
    </svg>
  );
}

// Cursor-following light card wrapper component
function ContactCard({
  icon: IconComponent,
  label,
  value,
  href,
  copyValue,
  id,
  copiedId,
  onCopy,
}: {
  icon: any;
  label: string;
  value: string;
  href?: string;
  copyValue?: string;
  id: string;
  copiedId: string | null;
  onCopy: (id: string, text: string) => void;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem 1.5rem',
        overflow: 'hidden',
        transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 10px 30px rgba(0,0,0,0.3)' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
      }}
    >
      {/* Light spotlight glow */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.06), transparent 80%)`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, zIndex: 1 }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-2)',
            transition: 'color 0.2s',
          }}
        >
          <IconComponent size={18} />
        </div>

        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10.5,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              fontWeight: 500,
              color: '#FAFAFA',
              marginTop: 2,
            }}
          >
            {value}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, zIndex: 1 }}>
        {copyValue && (
          <button
            onClick={() => onCopy(id, copyValue)}
            aria-label={`Copy ${label}`}
            style={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.05)',
              background: 'rgba(255,255,255,0.02)',
              color: copiedId === id ? '#22C55E' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background 0.2s, border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
            }}
          >
            {copiedId === id ? <Check size={13} /> : <Copy size={13} />}

            {/* Tooltip confirmation */}
            <AnimatePresence>
              {copiedId === id && (
                <motion.span
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: -24, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  style={{
                    position: 'absolute',
                    top: -10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(34, 197, 94, 0.9)',
                    border: '1px solid rgba(34, 197, 94, 0.2)',
                    color: '#FFF',
                    fontSize: 10,
                    fontFamily: 'var(--font-mono)',
                    padding: '2px 8px',
                    borderRadius: 4,
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                  }}
                >
                  Copied!
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        )}

        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${label} external link`}
            style={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.05)',
              background: 'rgba(255,255,255,0.02)',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s, border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
              e.currentTarget.style.color = '#FAFAFA';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.color = 'var(--text-muted)';
            }}
          >
            <ExternalLink size={13} />
          </a>
        )}
      </div>
    </div>
  );
}

export function ContactSection() {
  const emailObj = profile.socials.find(s => s.id === 'email')!;
  const linkedinObj = profile.socials.find(s => s.id === 'linkedin')!;
  const githubObj = profile.socials.find(s => s.id === 'github')!;
  const leetcodeObj = profile.socials.find(s => s.id === 'leetcode')!;
  const emailRaw = emailObj.href.replace('mailto:', '');

  // Clipboard copy state
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form submission states
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea logic
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [formData.message]);

  // Form validator
  const validateField = (field: string, value: string) => {
    let error = '';
    if (field === 'name') {
      if (!value.trim()) error = 'Name is required.';
    } else if (field === 'email') {
      if (!value.trim()) {
        error = 'Email is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Please enter a valid email address.';
      }
    } else if (field === 'message') {
      if (!value.trim()) {
        error = 'Message is required.';
      } else if (value.trim().length < 10) {
        error = 'Message must be at least 10 characters.';
      }
    }
    return error;
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field as keyof typeof formData]);
    setFormErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setFormErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  // Submit via Web3Forms API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger touched & validate all
    const errors: Record<string, string> = {};
    const touchedFields: Record<string, boolean> = {};

    Object.keys(formData).forEach(key => {
      touchedFields[key] = true;
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) errors[key] = error;
    });

    setTouched(touchedFields);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    // Proceed to send
    setFormState('sending');
    setProgress(0);

    // Animate progress up to 90% while waiting for API
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 5;
      });
    }, 100);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'd1cf9044-0979-4b2a-a0ff-6422e10ad584',
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Contact Form Submission',
          message: formData.message,
        }),
      });

      const result = await response.json();
      clearInterval(progressInterval);

      if (response.status === 200 && result.success) {
        setProgress(100);
        setTimeout(() => {
          setFormState('success');
          setFormData({ name: '', email: '', subject: '', message: '' });
          setTouched({});
          setFormErrors({});
        }, 200);
      } else {
        setFormState('error');
      }
    } catch (err) {
      clearInterval(progressInterval);
      setFormState('error');
    }
  };

  // Clipboard copies
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  // Reset form
  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTouched({});
    setFormErrors({});
    setFormState('idle');
    setProgress(0);
  };

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 10vw, 8rem) 0 4rem 0',
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

      {/* Radial soft glow */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: '5%',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(124,58,237,0.03) 0%, transparent 70%)',
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
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
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
            [ CONTACT ]
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
            Get in{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #A78BFA 30%, #3B82F6 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Touch.
            </span>
          </motion.h2>

          {/* Closing Statement */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 15.5,
              color: 'var(--text-2)',
              maxWidth: '38rem',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Whether you're hiring for a Backend, Cloud, or DevOps role, discussing an interesting project, or simply want to connect, I'd be happy to hear from you.
          </motion.p>
        </div>

        {/* Bento Grid Content */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start',
            marginBottom: '4rem',
          }}
        >
          {/* Left Column: Availability Status & Contact Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Availability Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  Availability Status
                </span>

                {/* Soft Pulse Indicator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <motion.div
                    animate={{
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: '#10B981',
                      boxShadow: '0 0 8px #10B981',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      fontWeight: 600,
                      color: '#10B981',
                      textTransform: 'uppercase',
                    }}
                  >
                    Active
                  </span>
                </div>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#FAFAFA',
                  marginBottom: '1.25rem',
                }}
              >
                Open to Full-Time Opportunities
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                  paddingTop: '1rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                }}
              >
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Location</div>
                  <div style={{ color: '#FAFAFA', fontWeight: 500, marginTop: 4 }}>India / Remote</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Relocation</div>
                  <div style={{ color: '#FAFAFA', fontWeight: 500, marginTop: 4 }}>Open</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Timezone</div>
                  <div style={{ color: '#FAFAFA', fontWeight: 500, marginTop: 4 }}>IST (UTC+5:30)</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Work Authorization</div>
                  <div style={{ color: '#FAFAFA', fontWeight: 500, marginTop: 4 }}>Ready</div>
                </div>
              </div>
            </motion.div>

            {/* Social & Contact Card Grid */}
            <ContactCard
              id="email"
              icon={Mail}
              label="Email"
              value={emailRaw}
              copyValue={emailRaw}
              copiedId={copiedId}
              onCopy={handleCopy}
            />

            <ContactCard
              id="linkedin"
              icon={LinkedinIcon}
              label="LinkedIn"
              value={linkedinObj.href.replace('https://', '').replace('www.', '')}
              href={linkedinObj.href}
              copyValue={linkedinObj.href}
              copiedId={copiedId}
              onCopy={handleCopy}
            />

            <ContactCard
              id="github"
              icon={GithubIcon}
              label="GitHub"
              value={githubObj.href.replace('https://', '')}
              href={githubObj.href}
              copyValue={githubObj.href}
              copiedId={copiedId}
              onCopy={handleCopy}
            />

            <ContactCard
              id="leetcode"
              icon={LeetcodeIcon}
              label="LeetCode"
              value={leetcodeObj.href.replace('https://', '')}
              href={leetcodeObj.href}
              copyValue={leetcodeObj.href}
              copiedId={copiedId}
              onCopy={handleCopy}
            />

            <ContactCard
              id="location"
              icon={MapPin}
              label="Location"
              value="Vellore, Tamil Nadu, India"
              copyValue="Vellore, Tamil Nadu, India"
              copiedId={copiedId}
              onCopy={handleCopy}
            />
          </div>

          {/* Right Column: Contact Form with states */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <AnimatePresence mode="wait">
              {formState === 'idle' && (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    background: 'rgba(255,255,255, 0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem',
                  }}
                  noValidate
                >
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {/* Name */}
                    <div style={{ flex: 1, minWidth: 200, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label htmlFor="form-name" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>Name</label>
                      <input
                        id="form-name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={e => handleChange('name', e.target.value)}
                        onBlur={() => handleBlur('name')}
                        style={{
                          background: 'rgba(255,255,255,0.01)',
                          border: formErrors.name ? '1px solid #EF4444' : '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '8px',
                          padding: '10px 14px',
                          color: '#FAFAFA',
                          fontFamily: 'var(--font-sans)',
                          fontSize: 13.5,
                          outline: 'none',
                          boxShadow: formErrors.name ? '0 0 10px rgba(239,68,68,0.1)' : 'none',
                          transition: 'border-color 0.2s, box-shadow 0.2s',
                        }}
                        onFocus={e => {
                          if (!formErrors.name) {
                            e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)';
                            e.currentTarget.style.boxShadow = '0 0 10px rgba(139,92,246,0.1)';
                          }
                        }}
                      />
                      {formErrors.name && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#EF4444', fontSize: 11, fontFamily: 'var(--font-sans)', marginTop: 2 }}>
                          <AlertCircle size={10} />
                          <span>{formErrors.name}</span>
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div style={{ flex: 1, minWidth: 200, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label htmlFor="form-email" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>Email</label>
                      <input
                        id="form-email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={e => handleChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        style={{
                          background: 'rgba(255,255,255,0.01)',
                          border: formErrors.email ? '1px solid #EF4444' : '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '8px',
                          padding: '10px 14px',
                          color: '#FAFAFA',
                          fontFamily: 'var(--font-sans)',
                          fontSize: 13.5,
                          outline: 'none',
                          boxShadow: formErrors.email ? '0 0 10px rgba(239,68,68,0.1)' : 'none',
                          transition: 'border-color 0.2s, box-shadow 0.2s',
                        }}
                        onFocus={e => {
                          if (!formErrors.email) {
                            e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)';
                            e.currentTarget.style.boxShadow = '0 0 10px rgba(139,92,246,0.1)';
                          }
                        }}
                      />
                      {formErrors.email && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#EF4444', fontSize: 11, fontFamily: 'var(--font-sans)', marginTop: 2 }}>
                          <AlertCircle size={10} />
                          <span>{formErrors.email}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label htmlFor="form-subject" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>Subject <span style={{ opacity: 0.5 }}>(optional)</span></label>
                    <input
                      id="form-subject"
                      type="text"
                      placeholder="Collaborations, Job Offer, etc."
                      value={formData.subject}
                      onChange={e => handleChange('subject', e.target.value)}
                      style={{
                        background: 'rgba(255,255,255,0.01)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        color: '#FAFAFA',
                        fontFamily: 'var(--font-sans)',
                        fontSize: 13.5,
                        outline: 'none',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                      }}
                      onFocus={e => {
                        e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)';
                        e.currentTarget.style.boxShadow = '0 0 10px rgba(139,92,246,0.1)';
                      }}
                      onBlur={e => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Message */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label htmlFor="form-message" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>Message</label>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: formData.message.length > 500 ? '#EF4444' : 'var(--text-muted)' }}>
                        {formData.message.length}/500
                      </span>
                    </div>
                    <textarea
                      id="form-message"
                      ref={textareaRef}
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={e => handleChange('message', e.target.value.slice(0, 500))}
                      onBlur={() => handleBlur('message')}
                      rows={4}
                      style={{
                        background: 'rgba(255,255,255,0.01)',
                        border: formErrors.message ? '1px solid #EF4444' : '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        color: '#FAFAFA',
                        fontFamily: 'var(--font-sans)',
                        fontSize: 13.5,
                        outline: 'none',
                        boxShadow: formErrors.message ? '0 0 10px rgba(239,68,68,0.1)' : 'none',
                        resize: 'none',
                        minHeight: 100,
                        maxHeight: 250,
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                      }}
                      onFocus={e => {
                        if (!formErrors.message) {
                          e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)';
                          e.currentTarget.style.boxShadow = '0 0 10px rgba(139,92,246,0.1)';
                        }
                      }}
                    />
                    {formErrors.message && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#EF4444', fontSize: 11, fontFamily: 'var(--font-sans)', marginTop: 2 }}>
                        <AlertCircle size={10} />
                        <span>{formErrors.message}</span>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    style={{
                      marginTop: 6,
                      background: 'linear-gradient(135deg, #7C3AED, #2563EB)',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px',
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-sans)',
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      boxShadow: '0 4px 14px rgba(124,58,237,0.2)',
                      transition: 'transform 0.1s, box-shadow 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.boxShadow = '0 6px 18px rgba(124,58,237,0.3)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.boxShadow = '0 4px 14px rgba(124,58,237,0.2)';
                    }}
                    onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.98)')}
                    onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <span>Send Message</span>
                    <Send size={14} />
                  </button>
                </motion.form>
              )}

              {formState === 'sending' && (
                <motion.div
                  key="sending-state"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  style={{
                    background: 'rgba(255,255,255, 0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '3rem 2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 380,
                    textAlign: 'center',
                  }}
                >
                  <Loader2 size={32} className="animate-spin" style={{ color: '#A78BFA', marginBottom: '1.5rem' }} />
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 600, color: '#FAFAFA', marginBottom: '0.5rem' }}>
                    Securing Dispatcher Connection...
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-muted)', maxWidth: '18rem', marginBottom: '2rem' }}>
                    Transmitting message details through secure simulated gateway protocols.
                  </p>

                  {/* Simulated Progress bar */}
                  <div style={{ width: '100%', maxWidth: '15rem', height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                    <motion.div
                      style={{ height: '100%', background: 'linear-gradient(90deg, #A78BFA, #3B82F6)', width: `${progress}%` }}
                      transition={{ ease: 'linear' }}
                    />
                  </div>
                </motion.div>
              )}

              {formState === 'success' && (
                <motion.div
                  key="success-state"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  style={{
                    background: 'rgba(255,255,255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2.5rem 2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 380,
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  {/* Subtle success sparkles glow */}
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      background: 'rgba(34,197,94,0.1)',
                      border: '1px solid rgba(34,197,94,0.2)',
                      color: '#22C55E',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <Check size={24} />
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 18,
                      fontWeight: 700,
                      color: '#FAFAFA',
                      marginBottom: '0.75rem',
                    }}
                  >
                    Message Sent Successfully!
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 13.5,
                      color: 'var(--text-2)',
                      lineHeight: 1.5,
                      maxWidth: '22rem',
                      marginBottom: '2rem',
                    }}
                  >
                    Thanks for reaching out! Your message has been received, and I'll get back to you as soon as possible.
                  </p>

                  {/* Actions inside success */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                    <button
                      onClick={handleReset}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: '#FAFAFA',
                        fontFamily: 'var(--font-sans)',
                        fontSize: 12.5,
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                    >
                      Send Another
                    </button>

                    <a
                      href={emailObj.href}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #7C3AED, #2563EB)',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-sans)',
                        fontSize: 12.5,
                        fontWeight: 600,
                        textDecoration: 'none',
                        boxShadow: '0 4px 10px rgba(124,58,237,0.15)',
                      }}
                    >
                      Open Mail Client
                    </a>

                    <a
                      href={linkedinObj.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: '#FAFAFA',
                        fontFamily: 'var(--font-sans)',
                        fontSize: 12.5,
                        fontWeight: 600,
                        textDecoration: 'none',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                    >
                      Connect on LinkedIn
                    </a>
                  </div>
                </motion.div>
              )}

              {formState === 'error' && (
                <motion.div
                  key="error-state"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  style={{
                    background: 'rgba(255,255,255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2.5rem 2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 380,
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      background: 'rgba(239,68,68,0.1)',
                      border: '1px solid rgba(239,68,68,0.2)',
                      color: '#EF4444',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <AlertCircle size={24} />
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 18,
                      fontWeight: 700,
                      color: '#FAFAFA',
                      marginBottom: '0.75rem',
                    }}
                  >
                    Failed to Send Message
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 13.5,
                      color: 'var(--text-2)',
                      lineHeight: 1.5,
                      maxWidth: '22rem',
                      marginBottom: '2rem',
                    }}
                  >
                    Something went wrong. Please check your network connection or try emailing me directly at{' '}
                    <a href={emailObj.href} style={{ color: '#3B82F6', textDecoration: 'underline' }}>{emailRaw}</a>.
                  </p>

                  <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <button
                      onClick={() => setFormState('idle')}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #7C3AED, #2563EB)',
                        border: 'none',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-sans)',
                        fontSize: 12.5,
                        fontWeight: 600,
                        cursor: 'pointer',
                        boxShadow: '0 4px 10px rgba(124,58,237,0.15)',
                      }}
                    >
                      Try Again
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Response Expectations Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                background: 'rgba(255, 255, 255, 0.015)',
                border: '1px solid rgba(255, 255, 255, 0.04)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem 1.5rem',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <Clock size={12} style={{ color: '#3B82F6' }} />
                Response Expectations
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: '1rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                }}
              >
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 10.5 }}>Typically Responds Within</div>
                  <div style={{ color: '#FAFAFA', fontWeight: 600, marginTop: 2 }}>24–48 Hours</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 10.5 }}>Preferred Communication</div>
                  <div style={{ color: '#3B82F6', fontWeight: 600, marginTop: 2 }}>Email / LinkedIn</div>
                </div>
              </div>

              <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: 10.5, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: 8 }}>Open to</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {['Full-Time Roles', 'Internships', 'Open Source', 'Technical Discussions'].map(item => (
                    <span
                      key={item}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 9.5,
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        color: 'var(--text-muted)',
                        padding: '1px 6px',
                        borderRadius: 4,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quick Actions Recruiter shortcuts */}
        <div style={{ marginBottom: '5rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10.5,
              color: 'var(--text-muted)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              display: 'block',
              textAlign: 'center',
              marginBottom: '1.25rem',
            }}
          >
            ✦ Quick actions for recruiters
          </span>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 12,
              maxWidth: '48rem',
              margin: '0 auto',
            }}
          >
            <a
              href={emailObj.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 18px',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                color: '#FAFAFA',
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Mail size={13} />
              <span>Email Me Directly</span>
            </a>

            <a
              href={linkedinObj.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 18px',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                color: '#FAFAFA',
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <LinkedinIcon size={13} />
              <span>Connect on LinkedIn</span>
            </a>

            <a
              href="https://drive.google.com/uc?export=download&id=1J5ZhMLIPIyqMlPJMQhQmZNGdSVgq2g3n"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 18px',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                color: '#FAFAFA',
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Download size={13} />
              <span>Download SDE Resume</span>
            </a>

            <a
              href="https://drive.google.com/uc?export=download&id=1iVrn_3mvNKouJwKLR7SGe2Ru19aUwRID"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 18px',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                color: '#FAFAFA',
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Download size={13} />
              <span>Download DevOps Resume</span>
            </a>
          </div>
        </div>

        {/* Closing Divider */}
        <div style={{ height: 1, width: '100%', background: 'rgba(255,255,255,0.05)', marginBottom: '3rem' }} />

        {/* Footer */}
        <footer
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a
              href={githubObj.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#FAFAFA')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              aria-label="GitHub link"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={linkedinObj.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#FAFAFA')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              aria-label="LinkedIn link"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href={emailObj.href}
              style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#FAFAFA')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              aria-label="Email link"
            >
              <Mail size={18} />
            </a>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              color: 'var(--text-2)',
              lineHeight: 1.5,
            }}
          >
            <div>© {new Date().getFullYear()} — Dheeraj V P. All rights reserved.</div>
            <div style={{ color: 'var(--text-muted)', fontSize: 11.5, marginTop: 4, fontFamily: 'var(--font-mono)' }}>
              Built with React, TypeScript, Vanilla CSS & Framer Motion.
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: 11, fontStyle: 'italic', marginTop: 8 }}>
              Designed & engineered with attention to detail.
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
