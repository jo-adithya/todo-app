/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fce1e4",
        bg: "#fff7f8",
        gray: "#e1e1e1",
        dark: {
          primary: "#cca7ac",
          gray: "#555",
        },
      },
      keyframes: {
        ping: {
          "0%": { backgroundColor: "rgba(252, 225, 228, 0)" },
          "50%": { backgroundColor: "rgba(252, 225, 228, 1)" },
          "100%": { backgroundColor: "rgba(252, 225, 228, 0)" },
        },
      },
      animations: {
        ping: "ping .4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}

