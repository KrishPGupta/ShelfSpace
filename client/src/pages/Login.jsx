import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSubmitting(true);
    try {
      await login(email, password);
      navigate(location.state?.from?.pathname || "/catalog");
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't sign you in.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-16 sm:px-6">
      <h1 className="font-display text-2xl text-ink">Sign in</h1>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
        <label className="text-sm">
          <span className="mb-1 block font-mono text-xs uppercase text-slate">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border border-stone-dark px-3 py-2 focus:border-brass focus:outline-none"
          />
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-mono text-xs uppercase text-slate">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border border-stone-dark px-3 py-2 focus:border-brass focus:outline-none"
          />
        </label>

        {error && <p className="text-sm text-burgundy">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-3 rounded-md bg-brass py-3 font-medium text-ink hover:bg-brass-light transition-colors disabled:opacity-60"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="mt-4 text-sm text-slate">
        New here?{" "}
        <Link to="/register" className="text-brass-dark underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
