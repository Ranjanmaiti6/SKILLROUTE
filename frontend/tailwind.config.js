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
          navy: "#0F1E36",        // Deep Navy primary
          navyDark: "#0A1322",    // Deep Navy darkest
          navyLight: "#1E293B",   // Navy slate
          slate: "#2563EB",       // Muted Blue secondary
          slateDark: "#1D4ED8",
          slateLight: "#60A5FA",
          slateBg: "#EFF6FF",     // Soft blue surface
          saffron: "#D97706",     // Subtle Saffron
          saffronHover: "#B45309",
          saffronLight: "#F59E0B",
          saffronBg: "#FFFBEB",   // Soft saffron surface
          green: "#166534",       // Subtle India Green
          greenDark: "#14532D",
          greenLight: "#22C55E",
          greenBg: "#F0FDF4",     // Soft green surface
          bg: "#F9FAFB",          // Warm ivory / light gray
          surface: "#FFFFFF",
          surfaceSubtle: "#F8FAFC",
          card: "#FFFFFF",
          border: "#E2E8F0",      // Restrained crisp border
          borderLight: "#F1F5F9",
          borderSubtle: "#E5E7EB",
          muted: "#64748B",       // Slate Gray muted
          text: "#0F172A",        // Dark Charcoal / Navy text
          textMuted: "#64748B",
        }
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "sans-serif"
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "monospace"
        ]
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(15, 23, 42, 0.04)',
        'premium': '0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.03)',
        'elevated': '0 10px 25px -3px rgba(15, 23, 42, 0.08), 0 4px 8px -2px rgba(15, 23, 42, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        }
      }
    },
  },
  plugins: [],
}
