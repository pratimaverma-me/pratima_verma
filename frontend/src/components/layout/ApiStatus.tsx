"use client";

import { getHealth } from "@/services/health-service";
import { useApi } from "@/lib/useApi";

export function ApiStatus() {
  const state = useApi(getHealth);

  const color =
    state.status === "success" ? "bg-success" : state.status === "error" ? "bg-error" : "bg-warning";

  const label =
    state.status === "success" ? "API online" : state.status === "error" ? "API offline" : "Checking API…";

  return (
    <div className="flex items-center gap-2 text-xs text-muted">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      {label}
    </div>
  );
}
