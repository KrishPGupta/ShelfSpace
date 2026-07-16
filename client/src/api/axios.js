import axios from "axios";

// In dev, VITE_API_URL is unset and we fall back to "/api", which Vite
// proxies to the local Express server. In production, VITE_API_URL points
// straight at the deployed Render backend since there's no dev proxy.
const baseURL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "/api";

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

// Attach the JWT to every outgoing request, if we have one. We no longer
// rely on cookies for auth: browsers increasingly block third-party
// cookies whenever frontend and backend live on different domains
// (e.g. vercel.app vs onrender.com), which broke cookie-based auth in
// production for anyone with that browser setting on.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("shelfspace_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
