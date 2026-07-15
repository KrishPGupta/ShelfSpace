import api from "./axios";

export const fetchCart = () => api.get("/cart");
export const addToCart = (bookId, quantity = 1) =>
  api.post("/cart/items", { bookId, quantity });
export const updateCartItem = (bookId, quantity) =>
  api.patch(`/cart/items/${bookId}`, { quantity });
export const removeCartItem = (bookId) => api.delete(`/cart/items/${bookId}`);
