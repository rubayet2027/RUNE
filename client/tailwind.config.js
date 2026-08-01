/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        rune: {
          bg: 'var(--color-bg)',
          surface: 'var(--color-surface)',
          'surface-secondary': 'var(--color-surface-secondary)',
          border: 'var(--color-border)',
          'border-subtle': 'var(--color-border-subtle)',
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          
          // Back-compatibility fields for any programmatic layouts
          'surface-dim': 'var(--color-bg)',
          'surface-bright': 'var(--color-surface-secondary)',
          'surface-lowest': 'var(--color-bg)',
          'surface-low': 'var(--color-surface)',
          'surface-container': 'var(--color-surface-secondary)',
          'surface-high': 'var(--color-surface-secondary)',
          'surface-highest': 'var(--color-surface-secondary)',
          outline: 'var(--color-border-subtle)',
          'on-primary': 'var(--color-bg)',
          'on-secondary': 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-primary)',
          accent: 'var(--color-text-secondary)',
        },
      },
      fontFamily: {
        sans: ['"Hanken Grotesk"', 'sans-serif'],
        serif: ['"Bodoni Moda"', 'serif'],
        display: ['"Bodoni Moda"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '0px',
        none: '0px',
        sm: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        full: '0px',
      },
      letterSpacing: {
        widest: '0.2em',
        ultra: '0.3em',
      },
    },
  },
  plugins: [],
};
