/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensure Tailwind scans all JSX & TSX files
  ],
  theme: {
    extend: {},
  },
  safelist: [
    "group-hover:opacity-100", 
    "group-hover:translate-y-0"
  ], // Ensure Tailwind doesn’t purge hover effects
  plugins: [],
};