/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{svg}"
  ],
  theme: {
    extend: {
      flex: {
        '3': '3'
      },
      fontFamily: {
        mont: ["Montserrat Alternates", "sans-serif"]
      }
    },
  },
  plugins: [],
}

