"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface BadgeProps {
  children: ReactNode;
}

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: "easeOut" } },
};

export function Badge({ children }: BadgeProps) {
  return (
    <motion.span
      variants={badgeVariants}
      whileHover={{ scale: 1.08, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="inline-flex items-center rounded-md border border-border bg-background/60 px-2.5 py-1 font-mono text-[11px] font-medium tracking-tight text-body transition-colors duration-200 ease-out hover:border-accent-hover/50 hover:bg-background/90 hover:text-accent-hover"
    >
      {children}
    </motion.span>
  );
}
