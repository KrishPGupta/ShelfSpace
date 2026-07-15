/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#1B2E28", light: "#24382F", dark: "#101F1B" },
        stone: { DEFAULT: "#EDEAE3", dark: "#E2DED2" },
        brass: { DEFAULT: "#B08D4F", light: "#C7A66E", dark: "#8C6E3B" },
        burgundy: { DEFAULT: "#7A2E2E", light: "#933B3B" },
        slate: { DEFAULT: "#4A5A5C", light: "#61757A" },
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "ink-gradient": "linear-gradient(160deg, #1B2E28 0%, #101F1B 100%)",
      },
    },
  },
  plugins: [],
};
