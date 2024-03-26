/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      'xs': '480px',
      'xxs': '560px',
      ...defaultTheme.screens,
    },
  },
  plugins: [],
}

