/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00A896",
        secondary: "#FF8C42",
        background: "#F8F9FA",
        text: "#212529",
        accent: "#FFD166",
        error: "#EF476F",
        success: "#06D6A0",
        warning: "#FFD166",
        info: "#118AB2",
      },
      fontFamily: {
        sans: ["Poppins-Regular", "sans-serif"],
        medium: ["Poppins-Medium", "sans-serif"],
        semibold: ["Poppins-SemiBold", "sans-serif"],
        bold: ["Poppins-Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
}
