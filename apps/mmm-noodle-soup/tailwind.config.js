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
          "title-label": "var(--editor-title-color-dark)",
          description: "var(--editor-description-color-light)",
          "description-label": "var(--editor-description-color-dark)",
          tag: "var(--editor-tag-color-light)",
          "tag-label": "var(--editor-tag-color-dark)",
          "duration-preparation":
            "var(--editor-duration-preparation-color-light)",
          "duration-preparation-label":
            "var(--editor-duration-color-dark)",
          "duration-waiting": "var(--editor-duration-waiting-color-light)",
          "duration-waiting-label":
            "var(--editor-duration-color-dark)",
          "duration-cooking": "var(--editor-duration-cooking-color-light)",
          "duration-cooking-label":
            "var(--editor-duration-color-dark)",
          "servings-count": "var(--editor-servings-count-color-light)",
          "servings-count-label":
            "var(--editor-servings-count-color-dark)",
          ingredients: "var(--editor-ingredients-color-light)",
          "ingredients-label": "var(--editor-ingredients-color-dark)",
          "ingredients-title": "var(--editor-ingredients-title-color-light)",
          "ingredients-title-label":
            "var(--editor-ingredients-color-dark)",
          "ingredients-amount": "var(--editor-ingredients-amount-color-light)",
          "ingredients-amount-label":
            "var(--editor-ingredients-color-dark)",
          "ingredients-unit": "var(--editor-ingredients-unit-color-light)",
          "ingredients-unit-label":
            "var(--editor-ingredients-color-dark)",
          "ingredients-name": "var(--editor-ingredients-name-color-light)",
          "ingredients-name-label":
            "var(--editor-ingredients-color-dark)",
          "ingredients-comment":
            "var(--editor-ingredients-comment-color-light)",
          "ingredients-comment-label":
            "var(--editor-ingredients-color-dark)",
          instructions: "var(--editor-instructions-color-light)",
          "instructions-label": "var(--editor-instructions-color-dark)",
          "instructions-title": "var(--editor-instructions-title-color-light)",
          "instructions-title-label":
            "var(--editor-instructions-color-dark)",
          instruction: "var(--editor-instruction-color-light)",
          "instruction-label": "var(--editor-instructions-color-dark)",
        },
      },
      borderColor: {
        editor: {
          title: "var(--editor-title-color-dark)",
          description: "var(--editor-description-color-dark)",
          tag: "var(--editor-tag-color-dark)",
          duration: "var(--editor-duration-color-dark)",
          "duration-preparation": "var(--editor-duration-color-dark)",
          "duration-waiting": "var(--editor-duration-color-dark)",
          "duration-cooking": "var(--editor-duration-color-dark)",
          "servings-count": "var(--editor-servings-count-color-dark)",
          ingredients: "var(--editor-ingredients-color-dark)",
          "ingredients-title": "var(--editor-ingredients-color-dark)",
          "ingredients-amount": "var(--editor-ingredients-color-dark)",
          "ingredients-unit": "var(--editor-ingredients-color-dark)",
          "ingredients-name": "var(--editor-ingredients-color-dark)",
          "ingredients-comment": "var(--editor-ingredients-color-dark)",
          instructions: "var(--editor-instructions-color-dark)",
          "instructions-title": "var(--editor-instructions-color-dark)",
          instruction: "var(--editor-instructions-color-dark)",
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
