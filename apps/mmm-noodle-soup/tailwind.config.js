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
      backgroundColor: {
        editor: {
          title: "var(--editor-title-color-light)",
          description: "var(--editor-description-color-light)",
          tag: "var(--editor-tag-color-light)",
          "duration-preparation":
            "var(--editor-duration-preparation-color-light)",
          "duration-waiting": "var(--editor-duration-waiting-color-light)",
          "duration-cooking": "var(--editor-duration-cooking-color-light)",
          "servings-count": "var(--editor-servings-count-color-light)",
          ingredients: "var(--editor-ingredients-color-light)",
          "ingredients-title": "var(--editor-ingredients-title-color-light)",
          "ingredients-amount": "var(--editor-ingredients-amount-color-light)",
          "ingredients-unit": "var(--editor-ingredients-unit-color-light)",
          "ingredients-name": "var(--editor-ingredients-name-color-light)",
          "ingredients-comment":
            "var(--editor-ingredients-comment-color-light)",
          instructions: "var(--editor-instructions-color-light)",
          "instructions-title": "var(--editor-instructions-title-color-light)",
          instruction: "var(--editor-instruction-color-light)",
        },
      },
      borderColor: {
        description: "var(--editor-description-color-base)",
        editor: {
          title: "var(--editor-title-color-base)",
          description: "var(--editor-description-color-base)",
          tag: "var(--editor-tag-color-base)",
          duration: "var(--editor-duration-color-base)",
          "duration-preparation": "var(--editor-duration-color-base)",
          "duration-waiting": "var(--editor-duration-color-base)",
          "duration-cooking": "var(--editor-duration-color-base)",
          "servings-count": "var(--editor-servings-count-color-base)",
          ingredients: "var(--editor-ingredients-color-base)",
          "ingredients-title": "var(--editor-ingredients-color-base)",
          "ingredients-amount": "var(--editor-ingredients-color-base)",
          "ingredients-unit": "var(--editor-ingredients-color-base)",
          "ingredients-name": "var(--editor-ingredients-color-base)",
          "ingredients-comment": "var(--editor-ingredients-color-base)",
          instructions: "var(--editor-instructions-color-base)",
          "instructions-title": "var(--editor-instructions-color-base)",
          instruction: "var(--editor-instructions-color-base)",
        },
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
