/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#102A43",
          navyDark: "#0B1D2E",
          slate: "#1F5F8B",
          slateLight: "#337FA8",
          saffron: "#D97706",
          saffronLight: "#F59E0B",
          saffronMuted: "#FEF3C7",
          green: "#287A55",
          greenLight: "#34A873",
          greenMuted: "#D1FAE5",
          bg: "#F8FAFC",
          card: "#FFFFFF",
          border: "#D9E2EC",
          borderLight: "#E2E8F0",
          muted: "#64748B",
          text: "#102A43",
        }
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ]
      }
    },
  },
  plugins: [],
}
