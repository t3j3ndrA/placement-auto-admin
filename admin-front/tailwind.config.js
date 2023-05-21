/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      lato: ["Lato", "sans-serif"],
    },
    // // to override colors
    colors: {
      backg: "#14162B",
      section: "#1A1C33",
      hover: "#3A4285",
      tableHead: "#454A7C",
      subSection: "#292B45",
      lightHover: "#3B3F5F",
      danger: "#e60029",
      success: "#00b849",
      placeholder: "#EBD8D8",
      white: "white",
      red: "red",
      black: "black",
      alternate: "#54566A",
    },

    // to extend the default valaue set by tailwinds
    extend: {},
  },
  plugins: [],
};
