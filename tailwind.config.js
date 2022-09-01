/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '48px',
      },
      width: {
          'dialog-sm': '600px',
      },
      height: {
        'dialog-sm': '400px'
      }
    },
  },
  plugins: [],
}
