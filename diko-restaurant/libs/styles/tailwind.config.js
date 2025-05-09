/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "../../apps/**/src/**/*.{js,jsx}",
    "../../libs/**/src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        restaurant: {
          light: '#FDF2F8',
          DEFAULT: '#BE185D',
          dark: '#831843',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}