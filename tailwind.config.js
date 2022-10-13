/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      'xs': {'max': '420px'},
      'sm': {'max': '624px'},
      'md': {'max': '780px'},
      'lg': {'max': '1124px'},
      'xl': {'max': '1280px'},
      '2xl': {'max': '1536px'},
    },
  },
  plugins: [],
}
