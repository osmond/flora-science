import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
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
      fontFamily: {
        scientific: ['Inter', 'Roboto Mono', 'sans-serif'],
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '2rem',
        xl: '4rem',
      },
      borderRadius: {
        md: '0.375rem',
        lg: '0.5rem',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(60,60,60,0.08)',
      },
      transitionProperty: {
        calm: 'background-color, box-shadow, color',
      },
    },
  },
  plugins: [],
};

export default config;
