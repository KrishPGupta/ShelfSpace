import axios from "axios";

// withCredentials lets the browser send/receive the httpOnly JWT cookie
// set by the Express backend. baseURL is "/api" and proxied to the
// backend by vite.config.js in dev, and should be reverse-proxied the
// same way in production.
const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default api;
