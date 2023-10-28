/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx.css}",
    "./src/Components/**/*.{js,ts,jsx,tsx,css}",
    "./src/App/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {},
  },
  colors: {
    primary: "#590BD8",
    primaryLighter: "#DDD5EA",
    primaryDarker: "#312A4F",
    grayPrimary: "#717171",
    grayLighter: "#BBBFBF",
    white: "#F5F5F5", 
  },
  textColor: {
    dark: "#717171"
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".text-flip": {
          transform: "scaleX(-1)",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
  ],
};





