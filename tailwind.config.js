/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      'error': '#B22222',
      'light': {
        main: '#E6E6E6',
        additional: '#CCCAC3',
        focusing: '#97807A',
        normal: '#2B2B2B',
        second: '#767676',
        active: '#fff',
        field: '#fff',
      },
      'dark': {
        main: '#142F49',
        additional: '#0F172A',
        focusing: '#2E93C5',
        normal: '#fff',
        second: '#8694A9',
        active: '#8614A9',
        field: '#172035',
      },
    },
    extend: {
    }
  },
  plugins: [],
}