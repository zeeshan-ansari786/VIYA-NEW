/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ECEAF0", // Custom background color (light purple/grayish)
        primary: "#8E44AD", // Primary color (deep purple)
        hoverText: "#6C3483", // Darker shade for hover text effects
      },
    },
  },
  plugins: [],
};
