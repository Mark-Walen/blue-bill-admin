/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    spacing: {
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '48px',
    },
    extend: {
      textIndent: {
        '3': '0.75rem'
      }
    },
  },
  plugins: [],
}
