/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "docs/*.md",
    ".vitepress/theme/*.{js,ts,vue}",
    "./components/*.{js,ts,vue}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

