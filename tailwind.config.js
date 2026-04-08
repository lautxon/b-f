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
          '"Lora"',
          '"Domine"',
          '"Playfair Display"',
          'serif',
        ],
        serifDisplay: [
          '"Lora"',
          '"Domine"',
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
        canvas: '#1C1210',
        'canvas-light': '#2A1A18',
        bone: '#3D2522',
        card: '#2A1A18',
        'card-hover': '#352019',
        charcoal: '#D4C4BA',
        ink: '#F0E6E0',
        muted: '#9B8A82',
        border: '#3D2A25',
        'border-light': '#4A3530',
        terracotta: '#C4775B',
        'terracotta-light': '#D4956F',
        'terracotta-soft': 'rgba(196, 119, 91, 0.15)',
        ocre: '#C4A35A',
        'ocre-soft': 'rgba(196, 163, 90, 0.15)',
        arcilla: '#A87060',
        'arcilla-soft': 'rgba(168, 112, 96, 0.15)',
        valle: '#8B6F4E',
        cielo: '#7BA8B8',
        'cielo-soft': 'rgba(123, 168, 184, 0.15)',
        'ceramic-red': '#8B3A2F',
        'ceramic-dark': '#1C1210',
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
