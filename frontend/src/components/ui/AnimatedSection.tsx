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
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`w-full min-w-0 scroll-mt-20 border-b border-border px-5 py-14 sm:px-8 lg:px-10 xl:px-12 ${className}`}
    >
      <div className="section-container">{children}</div>
    </motion.section>
  );
}
