/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "**/*.md",
    ".vitepress/theme/*.{js,ts,vue}",
    "./components/*.{js,ts,vue}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

