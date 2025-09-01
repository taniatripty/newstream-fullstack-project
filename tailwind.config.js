import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBG: "var(--primary-bg)",
        accent: "var(--primary-accent)",
        heading: "var(--heading-text)",
        body: "var(--body-text)",
        secondary: "var(--secondary-text)",
      },
      fontFamily: {
        body: ["Source Sans Pro", "sans-serif"],
        heading: ["Lora", "serif"],
      },
    },
  },
  plugins: [daisyui],
}

