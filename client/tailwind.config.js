/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        rune: {
          surface: '#121314',
          'surface-dim': '#121314',
          'surface-bright': '#393939',
          'surface-lowest': '#0d0e0f',
          'surface-low': '#1b1c1c',
          'surface-container': '#1f2020',
          'surface-high': '#292a2a',
          'surface-highest': '#343535',
          border: '#1A1A1A',
          outline: '#444748',
          primary: '#ffffff',
          'on-primary': '#2f3131',
          secondary: '#c9c6c5',
          'on-secondary': '#313030',
          tertiary: '#ffffff',
          accent: '#e2e8f0',
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
