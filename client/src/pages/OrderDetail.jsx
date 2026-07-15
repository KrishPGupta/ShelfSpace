import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchOrderById } from "../api/orders";

export default function OrderDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrderById(id)
      .then((res) => setOrder(res.data.order))
      .catch((err) => setError(err.response?.data?.message || "Couldn't load this order."));
  }, [id]);

  if (error) return <p className="p-10 text-center text-burgundy">{error}</p>;
  if (!order) return <p className="p-10 text-center text-slate">Loading…</p>;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      {location.state?.justPlaced && (
        <div className="mb-6 rounded-md bg-brass/20 p-4 text-ink">
          Order placed — thanks! It's marked <span className="font-mono">{order.status}</span> until
          payment processing is added.
        </div>
      )}

      <h1 className="font-display text-2xl text-ink">Order #{order._id.slice(-8)}</h1>
      <p className="mt-1 font-mono text-sm text-slate">Status: {order.status}</p>

      <ul className="mt-6 flex flex-col gap-3">
        {order.items.map((item) => (
          <li key={item.book} className="flex justify-between text-sm">
            <span>
              {item.title} × {item.quantity}
            </span>
            <span className="font-mono">${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between border-t border-stone-dark pt-3 font-display text-lg">
        <span>Total</span>
        <span className="font-mono">${order.total?.toFixed(2)}</span>
      </div>

      <div className="mt-8">
        <h2 className="font-mono text-xs uppercase text-slate">Shipping to</h2>
        <p className="mt-2 text-sm text-ink/90">
          {order.shippingInfo.fullName}
          <br />
          {order.shippingInfo.addressLine1}
          {order.shippingInfo.addressLine2 && <>, {order.shippingInfo.addressLine2}</>}
          <br />
          {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.postalCode}
          <br />
          {order.shippingInfo.country}
        </p>
      </div>
    </div>
  );
}
