/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
 theme: {
    extend: {
      colors: {
        darkBlue: '#011627',
        purple: {
          500: '#7E5BEF',
          600: '#6D4ED4',
          700: '#5A3BC1',
        },
        gray: {
          800: '#2D3748',
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}