import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { placeOrder } from "../api/orders";

const EMPTY_SHIPPING = {
  fullName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
};

export default function Checkout() {
  const { cart, refreshCart } = useCart();
  const navigate = useNavigate();
  const [shipping, setShipping] = useState(EMPTY_SHIPPING);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const update = (field, value) => setShipping((s) => ({ ...s, [field]: value }));

  const validate = () => {
    const required = ["fullName", "addressLine1", "city", "state", "postalCode", "country"];
    const next = {};
    for (const field of required) {
      if (!shipping[field]?.trim()) next[field] = "Required";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await placeOrder(shipping);
      await refreshCart();
      navigate(`/orders/${res.data.order._id}`, { state: { justPlaced: true } });
    } catch (err) {
      setSubmitError(err.response?.data?.message || "Couldn't place your order.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!cart.items || cart.items.length === 0) {
    return (
      <p className="p-10 text-center text-slate">
        Your cart is empty — nothing to check out yet.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-2xl text-ink">Review &amp; place your order</h1>

      <div className="mt-6 grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="font-mono text-xs uppercase text-slate">Order contents</h2>
          <ul className="mt-3 flex flex-col gap-3">
            {cart.items.map((item) => (
              <li key={item.book._id} className="flex justify-between text-sm">
                <span>
                  {item.book.title} × {item.quantity}
                </span>
                <span className="font-mono">${(item.book.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-stone-dark pt-3 font-display text-lg">
            <span>Total</span>
            <span className="font-mono">${cart.total?.toFixed(2)}</span>
          </div>

          {/* TODO: integrate Stripe — this is where a payment element/token
              would be collected before placeOrder() is called, once
              payment processing is added. */}
          <p className="mt-4 rounded-md bg-stone-dark/40 p-3 font-mono text-xs text-slate">
            Payment isn't wired up yet — placing an order creates a real
            "pending" order record without charging anything.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <h2 className="font-mono text-xs uppercase text-slate">Shipping details</h2>
          <Field label="Full name" value={shipping.fullName} error={errors.fullName} onChange={(v) => update("fullName", v)} />
          <Field label="Address line 1" value={shipping.addressLine1} error={errors.addressLine1} onChange={(v) => update("addressLine1", v)} />
          <Field label="Address line 2 (optional)" value={shipping.addressLine2} onChange={(v) => update("addressLine2", v)} />
          <div className="flex gap-3">
            <Field label="City" value={shipping.city} error={errors.city} onChange={(v) => update("city", v)} />
            <Field label="State" value={shipping.state} error={errors.state} onChange={(v) => update("state", v)} />
          </div>
          <div className="flex gap-3">
            <Field label="Postal code" value={shipping.postalCode} error={errors.postalCode} onChange={(v) => update("postalCode", v)} />
            <Field label="Country" value={shipping.country} error={errors.country} onChange={(v) => update("country", v)} />
          </div>

          {submitError && <p className="text-sm text-burgundy">{submitError}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-3 rounded-md bg-brass py-3 font-medium text-ink hover:bg-brass-light transition-colors disabled:opacity-60"
          >
            {submitting ? "Placing order…" : "Place order"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, value, error, onChange }) {
  return (
    <label className="flex-1 text-sm">
      <span className="mb-1 block font-mono text-xs uppercase text-slate">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded border px-3 py-2 focus:outline-none ${
          error ? "border-burgundy" : "border-stone-dark focus:border-brass"
        }`}
      />
      {error && <span className="mt-1 block text-xs text-burgundy">{error}</span>}
    </label>
  );
}
