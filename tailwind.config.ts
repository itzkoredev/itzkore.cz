import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.mdx",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-body)", ...(fontFamily as any).sans],
        heading: ["var(--font-orbitron)", ...(fontFamily as any).sans],
      },
      colors: {
  backgroundDark: "#0b0f19",
  neonPurple: "#7A00FF", // deeper purple
  neonCyan: "#00B3C6",   // colder cyan
  neonGreen: "#1FAA59",  // darker green
  neonPink: "#C000FF",   // deep magenta
  neonRed: "#FF0033",    // scarlet accent
      },
      dropShadow: {
  neonPurple: "0 0 6px #7A00FF80, 0 0 14px #7A00FF40",
  neonCyan: "0 0 6px #00B3C680, 0 0 14px #00B3C640",
  neonGreen: "0 0 6px #1FAA5980, 0 0 14px #1FAA5940",
  neonPink: "0 0 6px #C000FF80, 0 0 14px #C000FF40",
      },
    },
  },
  plugins: [],
};

export default config;
