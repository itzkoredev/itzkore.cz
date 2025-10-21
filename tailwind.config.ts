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
        // New Simplified Color System
        bg: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          elevated: "var(--bg-elevated)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
        },
        accent: {
          DEFAULT: "var(--accent-primary)",
          primary: "var(--accent-primary)",
          hover: "var(--accent-hover)",
          light: "var(--accent-light)",
          secondary: "var(--accent-secondary)",
        },
        border: {
          DEFAULT: "var(--border-default)",
          subtle: "var(--border-subtle)",
          default: "var(--border-default)",
        },
        semantic: {
          success: "var(--success)",
          warning: "var(--warning)",
          error: "var(--error)",
        },
        // Legacy support (keep for gradual migration)
        brand: {
          primary: "#00AFC0",
          secondary: "#8B5CF6",
          accent: "#00AFC0",
        },
        neon: {
          cyan: "#00AFC0",
          purple: "#8B5CF6",
          violet: "#A78BFA",
        },
        surface: {
          DEFAULT: "var(--surface-strong)",
          soft: "var(--surface-soft)",
          strong: "var(--surface-strong)",
          overlay: "var(--surface-overlay)",
        },
        glass: {
          bg: "var(--glass-bg, rgba(255, 255, 255, 0.7))",
          border: "var(--glass-border, rgba(255, 255, 255, 0.2))",
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-aurora': 'linear-gradient(135deg, rgba(0,175,192,0.08) 0%, rgba(139,92,246,0.06) 100%)',
        'glass-shimmer': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      },
      backdropBlur: {
        'glass': '24px',
        'glass-strong': '32px',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'DEFAULT': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        // Legacy support
        'glass': '0 8px 32px rgba(15, 23, 42, 0.08)',
        'glass-strong': '0 12px 40px rgba(15, 23, 42, 0.12)',
        'lift': '0 20px 50px rgba(15, 23, 42, 0.1)',
      },
      dropShadow: {
        neonCyan: "0 0 4px rgba(0,175,192,0.6), 0 0 10px rgba(0,175,192,0.3)",
        neonPurple: "0 0 4px rgba(139,92,246,0.6), 0 0 10px rgba(139,92,246,0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
