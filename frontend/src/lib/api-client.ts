import { ApiResponse } from "@/types/api";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://pratima-verma-backend-w3s2.onrender.com";

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
    logDev(`[api-client] Network-level failure calling ${url}`, err);

    throw new Error(
      `Could not reach ${url}. Check whether the backend is running and whether CORS is configured correctly.`
    );
  }

  if (!res.ok) {
    logDev(`[api-client] ${url} responded with HTTP ${res.status}`);

    throw new Error(
      `${url} responded with HTTP ${res.status}`
    );
  }

  let body: ApiResponse<T>;

  try {
    body = (await res.json()) as ApiResponse<T>;
  } catch (err) {
    logDev(`[api-client] ${url} returned invalid JSON`, err);

    throw new Error(
      `${url} returned a response that is not valid JSON`
    );
  }

  if (!body.success) {
    const message =
      "message" in body && typeof body.message === "string"
        ? body.message
        : `Request to ${url} failed`;

    logDev(`[api-client] ${url} returned an API error`, message);

    throw new Error(message);
  }

  return body.data;
}

export async function apiPost<T>(
  path: string,
  payload: unknown
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;

  let res: Response;

  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    logDev(`[api-client] Network-level failure calling ${url}`, err);

    throw new Error(
      `Could not reach ${url}. Check whether the backend is running and whether CORS is configured correctly.`
    );
  }

  if (!res.ok) {
    logDev(`[api-client] ${url} responded with HTTP ${res.status}`);

    throw new Error(
      `${url} responded with HTTP ${res.status}`
    );
  }

  let body: ApiResponse<T>;

  try {
    body = (await res.json()) as ApiResponse<T>;
  } catch (err) {
    logDev(`[api-client] ${url} returned invalid JSON`, err);

    throw new Error(
      `${url} returned a response that is not valid JSON`
    );
  }

  if (!body.success) {
    const message =
      "message" in body && typeof body.message === "string"
        ? body.message
        : `Request to ${url} failed`;

    logDev(`[api-client] ${url} returned an API error`, message);

    throw new Error(message);
  }

  return body.data;
}
