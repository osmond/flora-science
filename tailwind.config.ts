import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        flora: {
          leaf: "#4CAF50",
          soil: "#6B4226",
          sky: "#3B82F6",
          light: "#F0FDF4",
        },
        water: "#3B82F6",
        fertilize: "#4CAF50",
        notes: "#A855F7",
        alert: {
          DEFAULT: "#FACC15",
          red: "#EF4444",
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
    },
  },
  plugins: [],
}
export default config
