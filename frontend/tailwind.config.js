/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F9F5F0',
          light: '#FCF9F6',
          card: '#F5F0E8',
        },
        brown: {
          dark: '#1A120B',
          DEFAULT: '#261C15',
          muted: '#4A3F35',
        },
        gold: {
          DEFAULT: '#C5A059',
          light: '#D4B574',
          dark: '#A8863F',
        },
        sage: {
          DEFAULT: '#6B7F5A',
          dark: '#4F6344',
          light: '#EEF5E8',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Lato', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1280px',
      },
      boxShadow: {
        card: '0 2px 12px rgba(26, 18, 11, 0.06)',
        'card-hover': '0 8px 24px rgba(26, 18, 11, 0.12)',
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
    },
  },
  plugins: [],
}