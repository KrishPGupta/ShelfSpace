import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchOrders } from "../api/orders";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders()
      .then((res) => setOrders(res.data.orders))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-10 text-center text-slate">Loading…</p>;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-2xl text-ink">Your orders</h1>

      {orders.length === 0 ? (
        <p className="mt-4 text-slate">No orders yet.</p>
      ) : (
        <ul className="mt-6 flex flex-col gap-3">
          {orders.map((o) => (
            <li key={o._id}>
              <Link
                to={`/orders/${o._id}`}
                className="flex items-center justify-between rounded-md bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <p className="font-mono text-sm text-ink">Order #{o._id.slice(-8)}</p>
                  <p className="text-xs text-slate">{new Date(o.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm text-ink">${o.total.toFixed(2)}</p>
                  <p className="text-xs uppercase text-slate">{o.status}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
