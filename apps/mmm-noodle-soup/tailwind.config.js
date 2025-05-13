/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    {
      pattern: /^bg-.*/,
      variants: ["hover", "focus"],
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Source Sans Pro", "sans-serif"],
        brand: ["Comfortaa", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#2C3E50",
          light: "#34495E",
          highlight: "#e3ecf7",
        },
        secondary: {
          light: "#F8F9FA",
          sage: "#2ECC71",
        },
      },
    },
  },
  plugins: [],
};
