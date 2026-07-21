import { ApiResponse } from "@/types/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

// Backend error detail (implementation details, missing-config messages, raw
// status text) is useful for local debugging but must never reach a real
// visitor's console in production.
function logDev(...args: unknown[]) {
  if (process.env.NODE_ENV !== "production") {
    console.error(...args);
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  const url = `${API_BASE_URL}${path}`;

  let res: Response;
  try {
    res = await fetch(url);
  } catch (err) {
    // The browser deliberately hides *why* a fetch failed at the network
    // level (CORS rejection, connection refused, DNS failure, and mixed
    // content all throw this same generic TypeError) — so we log the exact
    // URL and point at DevTools, which does show the real reason.
    logDev(`[api-client] Network-level failure calling ${url}`, err);
    throw new Error(
      `Could not reach ${url} (backend down, wrong port, or CORS rejection — check DevTools → Network for the request to ${path})`
    );
  }

  if (!res.ok) {
    logDev(`[api-client] ${url} responded with HTTP ${res.status}`);
    throw new Error(`${url} responded with HTTP ${res.status}`);
  }

  let body: ApiResponse<T>;
  try {
    body = await res.json();
  } catch (err) {
    logDev(`[api-client] ${url} returned a non-JSON response`, err);
    throw new Error(`${url} returned a response that isn't valid JSON`);
  }

  if (!body.success) {
    logDev(`[api-client] ${url} reported an unsuccessful response`, body.message);
    throw new Error(body.message ?? `${url} reported an unsuccessful response`);
  }

  return body.data;
}

export async function apiPost<T>(path: string, payload: unknown): Promise<T> {
  const url = `${API_BASE_URL}${path}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    logDev(`[api-client] Network-level failure calling ${url}`, err);
    throw new Error(
      `Could not reach ${url} (backend down, wrong port, or CORS rejection — check DevTools → Network for the request to ${path})`
    );
  }

  // Both success (ApiResponse<T>) and error (ApiError) bodies are valid JSON,
  // just different shapes — read the status/body together to tell them apart.
  let body: Partial<ApiResponse<T>> & { message?: string };
  try {
    body = await res.json();
  } catch (err) {
    logDev(`[api-client] ${url} returned a non-JSON response`, err);
    throw new Error(`${url} returned a response that isn't valid JSON`);
  }

  if (!res.ok || !body.success) {
    const message = body.message ?? `${url} responded with HTTP ${res.status}`;
    logDev(`[api-client] ${url} failed:`, message);
    throw new Error(message);
  }

  return body.data as T;
}
