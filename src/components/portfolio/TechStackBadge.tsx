"use client";
import { motion } from "framer-motion";

interface TechStackBadgeProps {
  name: string;
  icon?: string;
  accent?: "cyan" | "purple" | "neutral";
}

export function TechStackBadge({ name, icon, accent = "neutral" }: TechStackBadgeProps) {
  const accentColors = {
    cyan: "bg-accent/10 border-accent/30 text-accent",
    purple: "bg-accent-secondary/10 border-accent-secondary/30 text-accent-secondary",
    neutral: "bg-surface-soft border-border-soft text-foreground",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${accentColors[accent]}`}
    >
      {icon && <span className="text-base">{icon}</span>}
      <span>{name}</span>
    </motion.div>
  );
}
