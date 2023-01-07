/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      'light': {
        main: '#93C851',
        additional: '#06b6d4',
        focusing: '#0e7490',
        normal: '#000',
        second: '#8694A9',
        active: '',
      },
      'dark': {
        main: '#0F172A',
        additional: '#142F49',
        focusing: '#2E93C5',
        normal: '#fff',
        second: '#8694A9',
        active: '#8614A9',
      },
    },
    extend: {
    }
  },
  plugins: [],
}