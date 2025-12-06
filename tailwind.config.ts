import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'border-primary-500/50',
    'bg-primary-900/20',
    'text-primary-300',
    'bg-primary-500',
    'border-secondary-500/50',
    'bg-secondary-900/20',
    'text-secondary-300',
    'bg-secondary-500',
    'border-purple-500/50',
    'bg-purple-900/20',
    'text-purple-300',
    'bg-purple-500',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf0',
          100: '#dcfce0',
          200: '#bbf7c4',
          300: '#86ef9b',
          400: '#5CAD4A', // Base color - Rick's portal green
          500: '#4a9a3b',
          600: '#3a7d2f',
          700: '#2f6327',
          800: '#284f22',
          900: '#23421e',
        },
        secondary: {
          50: '#f0fdfc',
          100: '#ccfbf8',
          200: '#99f6f2',
          300: '#AEE6E3', // Base color - Science blue
          400: '#5eead4',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        background: {
          dark: '#0a0e1a',
          darker: '#050810',
        },
        portal: {
          glow: '#5CAD4A',
          dim: '#3a7d2f',
        },
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #5CAD4A, 0 0 10px #5CAD4A' },
          '100%': { boxShadow: '0 0 10px #5CAD4A, 0 0 20px #5CAD4A, 0 0 30px #5CAD4A' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-portal': 'radial-gradient(circle, rgba(92,173,74,0.2) 0%, rgba(10,14,26,0) 70%)',
      },
    },
  },
  plugins: [],
};

export default config;
