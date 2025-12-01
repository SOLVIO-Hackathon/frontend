import { API_BASE_URL, DEFAULT_HEADERS, ApiErrorShape } from "./config";

interface RequestOptions extends RequestInit {
  auth?: boolean;
  token?: string | null;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;

  const headers: Record<string, string> = {
    ...(DEFAULT_HEADERS as Record<string, string>),
    ...(options.headers as Record<string, string> || {}),
  };

  if (options.auth && options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type");
  let body: any = null;
  if (contentType && contentType.includes("application/json")) {
    body = await response.json();
  } else {
    body = await response.text();
  }

  if (!response.ok) {
    const messageCandidate = body?.message || body?.detail || response.statusText || "Request failed";
    const error: ApiErrorShape = {
      status: response.status,
      message: typeof messageCandidate === "string" ? messageCandidate : "Request failed",
      details: body,
    };
    throw error;
  }

  return body as T;
}
