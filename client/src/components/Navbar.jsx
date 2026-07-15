import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const itemCount = cart.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 bg-ink text-stone shadow-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="font-display text-2xl tracking-tight">
          ShelfSpace
        </Link>

        <div className="hidden items-center gap-6 font-body text-sm sm:flex">
          <Link to="/catalog" className="hover:text-brass-light transition-colors">
            Browse
          </Link>
          <Link to="/cart" className="relative hover:text-brass-light transition-colors">
            Cart
            {itemCount > 0 && (
              <span className="absolute -right-3 -top-2 rounded-full bg-brass px-1.5 py-0.5 text-[10px] font-mono text-ink">
                {itemCount}
              </span>
            )}
          </Link>
          {user ? (
            <>
              <Link to="/orders" className="hover:text-brass-light transition-colors">
                Orders
              </Link>
              <button onClick={handleLogout} className="hover:text-brass-light transition-colors">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-brass-light transition-colors">
                Sign in
              </Link>
              <Link
                to="/register"
                className="rounded-md bg-brass px-3 py-1.5 font-medium text-ink hover:bg-brass-light transition-colors"
              >
                Join
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-4 sm:hidden">
          <Link to="/cart" className="relative">
            Cart
            {itemCount > 0 && (
              <span className="absolute -right-3 -top-2 rounded-full bg-brass px-1.5 py-0.5 text-[10px] font-mono text-ink">
                {itemCount}
              </span>
            )}
          </Link>
          <Link to={user ? "/orders" : "/login"} className="text-sm">
            {user ? "Orders" : "Sign in"}
          </Link>
        </div>
      </nav>
    </header>
  );
}
