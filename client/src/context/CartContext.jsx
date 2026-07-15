import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { fetchCart, addToCart, updateCartItem, removeCartItem } from "../api/cart";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);

  const refreshCart = useCallback(async () => {
    if (!user) {
      setCart({ items: [], total: 0 });
      return;
    }
    setLoading(true);
    try {
      const res = await fetchCart();
      setCart(res.data.cart);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const add = async (bookId, quantity = 1) => {
    const res = await addToCart(bookId, quantity);
    setCart(res.data.cart);
  };

  const updateQuantity = async (bookId, quantity) => {
    const res = await updateCartItem(bookId, quantity);
    setCart(res.data.cart);
  };

  const remove = async (bookId) => {
    const res = await removeCartItem(bookId);
    setCart(res.data.cart);
  };

  return (
    <CartContext.Provider value={{ cart, loading, add, updateQuantity, remove, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
