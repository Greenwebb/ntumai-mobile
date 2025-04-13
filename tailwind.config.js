module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B00",
        secondary: "#FFA500",
        background: "#F9F9F9",
        card: "#FFFFFF",
        text: "#333333",
        border: "#E0E0E0",
        notification: "#FF3B30",
        success: "#4CD964",
        warning: "#FFCC00",
        error: "#FF3B30",
      },
      fontFamily: {
        sans: ["System", "sans-serif"],
        medium: ["System", "sans-serif"],
        semibold: ["System", "sans-serif"],
        bold: ["System", "sans-serif"],
      },
    },
  },
  plugins: [],
};
