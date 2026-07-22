"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section id currently owns the "active" nav state using a
 * thin trigger band near the top of the viewport (roughly 15%-30%).
 *
 * IntersectionObserver entries do not arrive in document order, so when a
 * scroll crosses a section boundary, two entries (the section leaving and
 * the section entering) can land in the same callback batch. Naively
 * setting the active id to whichever entry is processed last makes the
 * highlight flicker to the wrong section. Instead we track the full set of
 * currently-intersecting ids and, when there's more than one, deterministically
 * prefer the one furthest along in `ids` order — the section being scrolled
 * into, not the one being scrolled away from.
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const intersecting = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            intersecting.add(entry.target.id);
          } else {
            intersecting.delete(entry.target.id);
          }
        }

        for (let i = ids.length - 1; i >= 0; i--) {
          if (intersecting.has(ids[i])) {
            setActive(ids[i]);
            break;
          }
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));

    // The trigger band never reaches the very bottom of the page, so a
    // short final section can be scrolled past without ever registering as
    // active. Force the last section active once the user hits the bottom.
    function handleScrollEnd() {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) setActive(ids[ids.length - 1]);
    }

    window.addEventListener("scroll", handleScrollEnd, { passive: true });
    handleScrollEnd();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids]);

  return active;
}
