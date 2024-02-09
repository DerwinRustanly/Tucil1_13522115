/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'primary': ['Rajdhani', 'sans-serif'],
      },
      colors: {
        'baseYellow' : '#D0ED57'
      }
    },
  },
  plugins: [],
}

