"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/nav";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <nav className="section-container flex h-16 items-center justify-between">
        <a href="#hero" className="font-mono text-sm font-semibold text-foreground">
          pratima<span className="text-accent">.dev</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-foreground/70 transition-colors duration-200 hover:text-accent-hover"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors duration-200 hover:border-accent-hover/40 hover:text-accent-hover md:hidden"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-surface md:hidden">
          <div className="section-container flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-background hover:text-accent-hover"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 px-3">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
