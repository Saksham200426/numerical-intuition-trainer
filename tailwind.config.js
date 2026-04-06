/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f7f7f8',
          100: '#ebebed',
          200: '#d3d3d8',
          300: '#adadb5',
          400: '#85858f',
          500: '#696974',
          600: '#56565f',
          700: '#47474e',
          800: '#3d3d43',
          900: '#36363b',
          950: '#131316',
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        emerald: {
          400: '#34d399',
          500: '#10b981',
        },
        rose: {
          400: '#fb7185',
          500: '#f43f5e',
        },
        violet: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.4s ease forwards',
        'slide-in': 'slideIn 0.3s ease forwards',
        'pop': 'pop 0.2s ease forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'number-flip': 'numberFlip 0.3s ease forwards',
        'shake': 'shake 0.4s ease forwards',
        'score-bounce': 'scoreBounce 0.5s ease forwards',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideIn: { from: { opacity: '0', transform: 'translateX(-12px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        pop: { '0%': { transform: 'scale(0.9)', opacity: '0' }, '60%': { transform: 'scale(1.05)' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        pulseGlow: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.6' } },
        numberFlip: { from: { transform: 'rotateX(90deg)', opacity: '0' }, to: { transform: 'rotateX(0deg)', opacity: '1' } },
        shake: { '0%, 100%': { transform: 'translateX(0)' }, '25%': { transform: 'translateX(-6px)' }, '75%': { transform: 'translateX(6px)' } },
        scoreBounce: { '0%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.3)' }, '100%': { transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
}
