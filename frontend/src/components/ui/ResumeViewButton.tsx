import { FileText } from "lucide-react";

interface ResumeViewButtonProps {
  href: string;
  className?: string;
}

export function ResumeViewButton({ href, className = "" }: ResumeViewButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground/80 shadow-card transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-accent-hover/40 hover:text-accent-hover hover:shadow-card-hover ${className}`}
    >
      <FileText size={16} />
      View Resume
    </a>
  );
}
