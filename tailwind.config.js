/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#007bff',
        'brand-hover': '#006fe6',
        'brand-light': '#e6f2ff',
        'text-dark': '#212529',
        'text-secondary': '#6c757d',
        'bg-light': '#f8f9fa',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
