/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // for a dark web application theme
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent', // test value, unused in the web application
      'error': '#B22222', // color for incorrect fields
      'light': { // colors for light theme
        main: '#E6E6E6', // background color
        additional: '#CCCAC3', // background color for header and footer
        focusing: '#97807A', // hover text color
        normal: '#2B2B2B', // common text color
        second: '#767676', // temporarily unused
        active: '#fff', // temporarily unused
        field: '#fff', // background color for fields
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
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}