import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-border bg-surface p-6 shadow-card transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-accent-hover/40 hover:shadow-card-hover sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}
