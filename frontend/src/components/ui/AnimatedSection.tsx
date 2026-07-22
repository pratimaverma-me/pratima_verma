"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimatedSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function AnimatedSection({ id, children, className = "" }: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`scroll-mt-20 border-b border-border py-20 lg:scroll-mt-10 ${className}`}
    >
      <div className="section-container">{children}</div>
    </motion.section>
  );
}
