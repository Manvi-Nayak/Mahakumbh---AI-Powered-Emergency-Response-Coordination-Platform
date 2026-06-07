// API client for Mahakumbh Emergency Response backend (FastAPI).
// Set VITE_API_BASE_URL in your env; defaults to localhost:8000.

const BASE_URL =
  (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_API_BASE_URL) ||
  "http://localhost:8000";

function authHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = window.localStorage.getItem("mk_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T = any>(
  path: string,
  opts: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...(opts.headers || {}),
    },
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${txt || res.statusText}`);
  }
  const ct = res.headers.get("content-type") || "";
  return (ct.includes("application/json") ? res.json() : res.text()) as Promise<T>;
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  register: (payload: any) =>
    request("/auth/register", { method: "POST", body: JSON.stringify(payload) }),

  // Incidents
  createIncident: (payload: any) =>
    request("/incidents/", { method: "POST", body: JSON.stringify(payload) }),
  listIncidents: () => request("/incidents/"),
  getIncident: (id: string) => request(`/incidents/${id}`),
  deleteIncident: (id: string) => request(`/incidents/${id}`, { method: "DELETE" }),

  // Resources
  createResource: (payload: any) =>
    request("/resources/", { method: "POST", body: JSON.stringify(payload) }),
  listResources: () => request("/resources/"),
  availableResources: () => request("/resources/"),

  // AI
  analyze: (payload: any) =>
    request("/ai/analyze", { method: "POST", body: JSON.stringify(payload) }),
  recommendations: (category: string) => request(`/recommendations/${category}`),
  responseWorkflow: (payload: {incident_id: number;}) =>
    request("/response-workflow", { method: "POST", body: JSON.stringify(payload) }),

  // Dispatch
  createDispatch: (payload: any) =>
    request("/dispatch/", { method: "POST", body: JSON.stringify(payload) }),
  listDispatch: () => request("/dispatch/"),
  getDispatch: (id: string) => request(`/dispatch/${id}`),
  updateDispatchStatus: (id: string, status: string) =>
    request(`/dispatch/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),

  // Dashboard
  stats: () => request("/dashboard/stats"),
  live: () => request("/dashboard/live"),

  alerts: () => request("/alerts/"),
};

export const WS_URL =
  (typeof import.meta !== "undefined" &&
    (import.meta as any).env?.VITE_WS_URL) ||
  "ws://localhost:8000/ws/dashboard";
// };

// export const WS_URL =
//   (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_WS_URL) ||
//   "ws://localhost:8000/ws/dashboard";
