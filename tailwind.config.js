/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg:      '#09090B',
        surface: '#111113',
        card:    '#18181B',
        border:  'rgba(255,255,255,0.08)',
        text: {
          primary:   '#FAFAFA',
          secondary: '#A1A1AA',
          muted:     '#71717A',
        },
        accent: {
          from: '#7C3AED',
          to:   '#2563EB',
        },
        success: '#22C55E',
      },
      fontFamily: {
        sans:  ['General Sans', 'Inter', 'system-ui', 'sans-serif'],
        body:  ['Inter', 'system-ui', 'sans-serif'],
        mono:  ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #7C3AED, #2563EB)',
        'text-gradient':   'linear-gradient(135deg, #7C3AED, #2563EB)',
      },
      animation: {
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        'grid-drift': 'gridDrift 30s linear infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'scroll-line': 'scrollLine 1.6s ease-in-out infinite',
        'border-trace': 'borderTrace 0.4s ease forwards',
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%':       { transform: 'scale(1.4)', opacity: '0.6' },
        },
        gridDrift: {
          from: { backgroundPosition: '0 0' },
          to:   { backgroundPosition: '32px 32px' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-8px)' },
        },
        scrollLine: {
          '0%':   { transform: 'scaleY(0)', transformOrigin: 'top', opacity: '1' },
          '50%':  { transform: 'scaleY(1)', transformOrigin: 'top', opacity: '1' },
          '100%': { transform: 'scaleY(1)', transformOrigin: 'top', opacity: '0' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        'pill': '9999px',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      maxWidth: {
        'hero': '56rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
      },
    },
  },
  plugins: [],
};
