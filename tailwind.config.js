/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'media',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      padding: {
        '2.5': '0.625rem',
        '0.5': '0.125rem'
      }
    },
  },
  plugins: [],
}

