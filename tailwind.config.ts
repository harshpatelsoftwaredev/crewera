import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  "#eef1f8",
          100: "#d5dced",
          200: "#aab9db",
          300: "#7e96c9",
          400: "#5273b7",
          500: "#2650a5",
          600: "#1e4184",
          700: "#163263",
          800: "#0e2242",
          900: "#0A1628",
          950: "#060d1a",
        },
        gold: {
          50:  "#fdf9ef",
          100: "#f8edce",
          200: "#f1db9d",
          300: "#e9c86c",
          400: "#e0b03b",
          500: "#C9A255",
          600: "#b08438",
          700: "#8a6429",
          800: "#63471d",
          900: "#3d2b12",
        },
        cream: {
          50:  "#FDFCFA",
          100: "#F9F7F2",
          200: "#F2EFE8",
          300: "#E8E3D8",
          400: "#D8D1C3",
          500: "#C2B8A8",
        },
        emerald: {
          500: "#10b981",
          600: "#059669",
        }
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        body: ["Outfit", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        card: "0 2px 12px rgba(10, 22, 40, 0.08), 0 1px 3px rgba(10, 22, 40, 0.04)",
        "card-hover": "0 8px 30px rgba(10, 22, 40, 0.15), 0 2px 8px rgba(10, 22, 40, 0.08)",
        nav: "0 1px 0 rgba(10, 22, 40, 0.06)",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        "slide-in": "slideIn 0.3s ease forwards",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-8px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
