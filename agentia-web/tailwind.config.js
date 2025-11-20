/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'canvas': '#FFFFFF',
        'surface': '#FAFAFA',
        'primary': '#00E676',       // Electric Green
        'ink-primary': '#0A0A0A',  // Deep Carbon
        'ink-secondary': '#71717A', // Machine Grey
        'border-faint': '#E4E4E7',   // Faint Line
        'code-background': '#1E1E1E', // Dark background for code blocks
        'code-text': '#D4D4D4',     // Light text for code blocks
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'none': '0',
        'sm': '2px',
        'md': '4px',
      },
      boxShadow: {
        'green-glow': '0 0 12px rgba(0, 230, 118, 0.4)',
        'green-glow-lg': '0 4px 20px rgba(0, 230, 118, 0.15)',
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'pulse-line': 'pulse-line 2.5s ease-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        'pulse-line': {
          '0%': { strokeDashoffset: '300', opacity: '1' },
          '50%': { strokeDashoffset: '0', opacity: '1' },
          '75%': { strokeDashoffset: '0', opacity: '0' },
          '100%': { strokeDashoffset: '0', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
