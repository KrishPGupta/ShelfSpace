import api from "./axios";

export const placeOrder = (shippingInfo) =>
  api.post("/orders", { shippingInfo });
export const fetchOrders = () => api.get("/orders");
export const fetchOrderById = (id) => api.get(`/orders/${id}`);
