"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MetricsTileProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: "up" | "down" | "neutral";
  accent?: "cyan" | "purple" | "neutral";
}

export function MetricsTile({
  label,
  value,
  icon,
  trend,
  accent = "neutral",
}: MetricsTileProps) {
  const accentColors = {
    cyan: "border-accent/20",
    purple: "border-accent-secondary/20",
    neutral: "border-border-soft",
  };

  const trendIcons = {
    up: "↑",
    down: "↓",
    neutral: "→",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`glass rounded-lg p-6 shadow-glass ${accentColors[accent]}`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
          {label}
        </span>
        {icon && <span className="text-accent opacity-80">{icon}</span>}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-foreground">{value}</span>
        {trend && (
          <span
            className={`text-sm font-medium ${
              trend === "up"
                ? "text-accent"
                : trend === "down"
                ? "text-muted-foreground"
                : "text-subtle-foreground"
            }`}
          >
            {trendIcons[trend]}
          </span>
        )}
      </div>
    </motion.div>
  );
}
