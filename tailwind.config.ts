import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#0D1117',
          100: '#0A0F1A',
          200: '#070B14',
          300: '#05080F',
          DEFAULT: '#050B14',
        },
        electric: {
          DEFAULT: '#00A3FF',
          50: '#00A3FF20',
          100: '#00A3FF40',
          200: '#00A3FF60',
          300: '#00A3FF80',
          400: '#00A3FF',
          500: '#0090E0',
        },
        neon: {
          purple: '#8B5CF6',
          pink: '#EC4899',
          cyan: '#06B6D4',
          green: '#10B981',
        },
        discord: {
          DEFAULT: '#5865F2',
          hover: '#4752C4',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 163, 255, 0.3), 0 0 10px rgba(0, 163, 255, 0.1)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 163, 255, 0.5), 0 0 40px rgba(0, 163, 255, 0.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
