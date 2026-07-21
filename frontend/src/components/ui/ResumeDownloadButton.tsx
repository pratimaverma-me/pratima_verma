import { Download } from "lucide-react";

interface ResumeDownloadButtonProps {
  href: string;
  className?: string;
}

export function ResumeDownloadButton({ href, className = "" }: ResumeDownloadButtonProps) {
  return (
    <a
      href={href}
      download="Pratima_Verma_Resume.pdf"
      className={`inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground shadow-card transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-card-hover ${className}`}
    >
      <Download size={16} />
      Download Resume
    </a>
  );
}
