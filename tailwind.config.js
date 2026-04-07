/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"SF Pro Display"',
          '"Geist Sans"',
          '"Helvetica Neue"',
          'Switzer',
          'sans-serif',
        ],
        serif: [
          '"Instrument Serif"',
          '"Playfair Display"',
          'serif',
        ],
        mono: [
          '"Geist Mono"',
          '"SF Mono"',
          '"JetBrains Mono"',
          'monospace',
        ],
      },
      colors: {
        canvas: '#FBFBFA',
        bone: '#F7F6F3',
        card: '#F9F9F8',
        charcoal: '#2F3437',
        ink: '#111111',
        muted: '#787774',
        border: '#EAEAEA',
        terracotta: '#C4775B',
        'terracotta-soft': '#F5E6DD',
        ocre: '#C4A35A',
        'ocre-soft': '#FBF3DB',
        arcilla: '#A8917B',
        'arcilla-soft': '#EDE7E1',
        valle: '#8B6F4E',
        cielo: '#6B9DB8',
        'cielo-soft': '#E1F3FE',
      },
      borderRadius: {
        crisp: '10px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
