/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#491A6F",
        secondary: "#9B9DA1",
        background: "#22252C",
        default: "#FFFFFF",
        darker: "#9537e2",
      },
    },
  },
  plugins: [],
};
