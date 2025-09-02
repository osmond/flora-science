import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{css}"
  ],
  theme: {
    extend: {
      colors: {
        flora: {
          leaf: "#1A7D1E",
          soil: "#6B4226",
          sky: "#0950C4",
          light: "#F0FDF4",
        },
        water: "#0950C4",
        fertilize: "#1A7D1E",
        notes: "#7623C5",
        alert: {
          DEFAULT: "#8E6B00",
          red: "#BD1212",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
      },
    },
  },
  plugins: [],
}
export default config
