import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (name.trim().length < 2) {
      setError("Enter your name.");
      return;
    }
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
      await register(name.trim(), email, password);
      navigate("/catalog");
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't create your account.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-16 sm:px-6">
      <h1 className="font-display text-2xl text-ink">Create an account</h1>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
        <label className="text-sm">
          <span className="mb-1 block font-mono text-xs uppercase text-slate">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border border-stone-dark px-3 py-2 focus:border-brass focus:outline-none"
          />
        </label>
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
          <span className="mt-1 block text-xs text-slate">At least 6 characters.</span>
        </label>

        {error && <p className="text-sm text-burgundy">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-3 rounded-md bg-brass py-3 font-medium text-ink hover:bg-brass-light transition-colors disabled:opacity-60"
        >
          {submitting ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-4 text-sm text-slate">
        Already have an account?{" "}
        <Link to="/login" className="text-brass-dark underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
