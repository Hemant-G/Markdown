/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '19/20': '97%',
        '1/20': '3%',
      },
    },
  },
  plugins: [],
}

