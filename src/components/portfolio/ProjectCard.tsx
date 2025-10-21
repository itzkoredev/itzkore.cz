"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  href: string;
  accent?: "cyan" | "purple" | "neutral";
}

export function ProjectCard({
  title,
  description,
  tags,
  image,
  href,
  accent = "neutral",
}: ProjectCardProps) {
  const accentColors = {
    cyan: "border-accent/20 hover:border-accent/40",
    purple: "border-accent-secondary/20 hover:border-accent-secondary/40",
    neutral: "border-border-soft hover:border-border-strong",
  };

  return (
    <Link href={href} className="block group">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className={`glass-strong rounded-xl overflow-hidden shadow-glass hover:shadow-lift transition-all ${accentColors[accent]}`}
      >
        {image && (
          <div className="relative w-full h-48 bg-surface-soft overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-md bg-surface-soft border border-border-soft text-subtle-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
