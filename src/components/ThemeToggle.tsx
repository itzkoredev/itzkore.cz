"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full bg-bg-secondary border border-border-subtle overflow-hidden group"
      aria-label={isDark ? "Přepnout na světlý režim" : "Přepnout na tmavý režim"}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r transition-all duration-500 ${
        isDark
          ? 'from-blue-500/20 to-purple-500/20 opacity-100'
          : 'from-amber-500/20 to-orange-500/20 opacity-100'
      }`} />

      {/* Sliding toggle */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={`absolute top-1 w-6 h-6 rounded-full flex items-center justify-center shadow-lg ${
          isDark
            ? 'right-1 bg-gradient-to-br from-blue-500 to-purple-600'
            : 'left-1 bg-gradient-to-br from-amber-400 to-orange-500'
        }`}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
        ) : (
          <Sun className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
        )}
      </motion.div>

      {/* Icons in background */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
        <Sun className={`w-3 h-3 transition-opacity duration-300 ${isDark ? 'opacity-30' : 'opacity-0'}`} />
        <Moon className={`w-3 h-3 transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-30'}`} />
      </div>
    </motion.button>
  );
}
