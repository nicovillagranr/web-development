// tailwind.config.js
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff5959",
        surface: "#E8E8E8",
        dark: "#1a1a1a",
        light: "#ffffff",
      },
    },
  },
  plugins: [],
};