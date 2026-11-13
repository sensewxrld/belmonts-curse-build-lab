/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gothic: {
          950: 'rgb(var(--page-rgb) / <alpha-value>)',
          900: 'rgb(var(--surface-rgb) / <alpha-value>)',
          850: 'rgb(var(--deep-purple-rgb) / <alpha-value>)',
          800: 'rgb(var(--raised-rgb) / <alpha-value>)',
          700: 'rgb(var(--deep-purple-rgb) / <alpha-value>)',
          600: 'rgb(var(--muted-rgb) / <alpha-value>)',
          border: 'rgb(var(--line-rgb) / <alpha-value>)',
          borderHover: 'rgb(var(--mint-rgb) / <alpha-value>)',
        },
        blood: {
          950: 'rgb(var(--deep-purple-rgb) / <alpha-value>)',
          900: 'rgb(var(--burgundy-rgb) / <alpha-value>)',
          800: 'rgb(var(--ultramarine-rgb) / <alpha-value>)',
          700: 'rgb(var(--ultramarine-rgb) / <alpha-value>)',
          600: 'rgb(var(--ember-rgb) / <alpha-value>)',
          500: 'rgb(var(--ember-rgb) / <alpha-value>)',
          400: 'rgb(var(--ember-rgb) / <alpha-value>)',
        },
        gold: {
          50: 'rgb(var(--ivory-rgb) / <alpha-value>)',
          100: 'rgb(var(--ivory-rgb) / <alpha-value>)',
          200: 'rgb(var(--ivory-rgb) / <alpha-value>)',
          300: 'rgb(var(--mint-rgb) / <alpha-value>)',
          400: 'rgb(var(--mint-rgb) / <alpha-value>)',
          500: 'rgb(var(--mint-rgb) / <alpha-value>)',
          600: 'rgb(var(--ultramarine-rgb) / <alpha-value>)',
          700: 'rgb(var(--deep-purple-rgb) / <alpha-value>)',
          accent: 'rgb(var(--mint-rgb) / <alpha-value>)',
        },
        arcane: {
          900: 'rgb(var(--deep-purple-rgb) / <alpha-value>)',
          800: 'rgb(var(--deep-purple-rgb) / <alpha-value>)',
          700: 'rgb(var(--lavender-rgb) / <alpha-value>)',
          600: 'rgb(var(--lavender-rgb) / <alpha-value>)',
          500: 'rgb(var(--lavender-rgb) / <alpha-value>)',
          400: 'rgb(var(--lavender-rgb) / <alpha-value>)',
          300: 'rgb(var(--lavender-rgb) / <alpha-value>)',
        }
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['Space Grotesk', 'ui-monospace', 'monospace']
      },
      boxShadow: {
        'gothic-glow': '0 0 25px -5px rgba(212, 175, 55, 0.25)',
        'blood-glow': '0 0 30px -5px rgba(190, 18, 60, 0.35)',
        'arcane-glow': '0 0 30px -5px rgba(147, 51, 234, 0.35)',
        'card-elevated': '0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(255, 255, 255, 0.05)',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at 50% 0%, var(--tw-gradient-stops))',
        'vignette': 'radial-gradient(circle at center, transparent 40%, rgba(7, 5, 8, 0.95) 100%)',
      }
    },
  },
  plugins: [],
}
