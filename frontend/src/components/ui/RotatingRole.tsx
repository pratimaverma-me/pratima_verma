"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface RotatingRoleProps {
  title: string;
  className?: string;
}

/**
 * Backend returns `title` as a single "/"-delimited string (e.g.
 * "Quant Developer / Rust Systems Engineer"). This cycles through each
 * segment rather than requiring a schema change for multiple roles.
 */
export function RotatingRole({ title, className = "" }: RotatingRoleProps) {
  const roles = useMemo(
    () => title.split("/").map((r) => r.trim()).filter(Boolean),
    [title]
  );
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (roles.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % roles.length);
    }, 2800);
    return () => clearInterval(id);
  }, [roles.length]);

  if (reduceMotion) {
    return <span className={className}>{roles[index]}</span>;
  }

  return (
    <span className={`relative inline-flex h-[1.3em] overflow-hidden align-bottom ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="inline-block"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
