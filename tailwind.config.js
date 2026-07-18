/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          white: 'var(--bg-color)',
          cream: 'var(--card-bg)',
          beige: 'var(--border-color)',
          sand: '#423A32',
          softWhite: 'var(--card-face)',
        },
        oak: {
          light: 'var(--accent-light)',
          accent: 'var(--accent-color)',
          dark: 'var(--accent-dark)',
          DEFAULT: 'var(--accent-color)',
        },
        matte: {
          black: 'var(--text-color)',
        }
      },
      fontFamily: {
        serif: ['Poppins', 'sans-serif'],
        sans: ['Lora', 'serif'],
      },
      boxShadow: {
        'premium-card': '0 4px 30px rgba(0, 0, 0, 0.5)',
        'premium-hover': '0 12px 50px rgba(168, 146, 118, 0.12)',
        'premium-glow': '0 0 30px rgba(168, 146, 118, 0.15)',
      },
      animation: {
        'blob': 'blob 25s infinite ease-in-out',
        'shimmer': 'shimmer 1.5s infinite linear',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -40px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
