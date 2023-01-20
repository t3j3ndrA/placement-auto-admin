/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      lato: ["Lato", "sans-serif"],
    },
    // to override colors
    colors: {
      backg: "#14162B",
      section: "#1A1C33",
      white: "white",
      black: "black",
      hover: "#3A4285",
      red: "red",
      danger: "#e60029",
      success: "#00b849",
      placeholder: "#EBD8D8",
    },
    // to extend the default valaue set by tailwinds
    extend: {},
  },
  plugins: [],
};
