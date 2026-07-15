import axios from "axios";

// In dev, VITE_API_URL is unset and we fall back to "/api", which Vite
// proxies to the local Express server. In production, VITE_API_URL points
// straight at the deployed Render backend since there's no dev proxy.
const baseURL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "/api";

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default api;
