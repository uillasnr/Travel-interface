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
    white: "#F5F5F5", // Corrected color name
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

                                                                             //text-slate-800
//cores de texto                                                             text-gray-600
//H3 nome no card======= text-gray-700                                       text-gray-700
//p location text-gray-600 
//P tamaunho da fonte text-xs 12rem
/// <span className="text-gray-700 font-medium"
/// <h3 className="text-slate-800 font-bold"
//<p className="text-xs font-normal text-gray-600 text-center px-2 my-1





