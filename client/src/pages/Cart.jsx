import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getBookCover } from "../config/bookImages";

export default function Cart() {
  const { cart, updateQuantity, remove, loading } = useCart();
  const navigate = useNavigate();

  if (loading) return <p className="p-10 text-center text-slate">Loading your cart…</p>;

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h1 className="font-display text-2xl text-ink">Your cart is empty</h1>
        <p className="mt-2 text-slate">Find something worth shelving.</p>
        <Link
          to="/catalog"
          className="mt-6 inline-block rounded-md bg-brass px-6 py-3 font-medium text-ink hover:bg-brass-light transition-colors"
        >
          Browse the catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-2xl text-ink">Your cart</h1>

      <ul className="mt-6 flex flex-col gap-4">
        {cart.items.map((item) => (
          <li
            key={item.book._id}
            className="flex items-center gap-4 rounded-md bg-white p-4 shadow-sm"
          >
            <div className="h-20 w-14 shrink-0 overflow-hidden rounded bg-stone-dark">
              {getBookCover(item.book.coverImage) && (
                <img
                  src={getBookCover(item.book.coverImage)}
                  alt=""
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div className="flex-1">
              <p className="font-display text-ink">{item.book.title}</p>
              <p className="text-sm text-slate">{item.book.author}</p>
              <p className="font-mono text-sm text-ink">${item.book.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor={`qty-${item.book._id}`} className="sr-only">
                Quantity
              </label>
              <input
                id={`qty-${item.book._id}`}
                type="number"
                min="1"
                max={item.book.stockQuantity}
                value={item.quantity}
                onChange={(e) => updateQuantity(item.book._id, Number(e.target.value))}
                className="w-16 rounded border border-stone-dark px-2 py-1 text-center text-sm"
              />
              <button
                onClick={() => remove(item.book._id)}
                className="font-mono text-xs uppercase text-burgundy hover:underline"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-between rounded-md bg-white p-5 shadow-sm">
        <span className="font-display text-lg text-ink">Total</span>
        <span className="font-mono text-xl text-ink">${cart.total?.toFixed(2)}</span>
      </div>

      <button
        onClick={() => navigate("/checkout")}
        className="mt-6 w-full rounded-md bg-ink py-3 font-medium text-stone hover:bg-ink-light transition-colors sm:w-auto sm:px-8"
      >
        Proceed to checkout
      </button>
    </div>
  );
}
