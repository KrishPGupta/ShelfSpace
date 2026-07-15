import React from "react";
import { Link } from "react-router-dom";
import { getBackgroundImage } from "../config/backgroundImages";

export default function Home() {
  const heroBg = getBackgroundImage("hero");

  return (
    <div>
      <section
        className="relative flex min-h-[70vh] items-end bg-ink-gradient bg-cover bg-center px-4 pb-16 pt-24 sm:px-8"
        style={heroBg ? { backgroundImage: `url(${heroBg})` } : undefined}
      >
        {/* Scrim so text stays legible over any photo */}
        <div className="absolute inset-0 bg-ink/60" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl text-stone">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass-light">
            A shelf, not a warehouse
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-6xl">
            Find the book you didn't know you were looking for.
          </h1>
          <p className="mt-4 max-w-xl text-stone-dark/90">
            Search, browse by category, and keep a running cart that's actually
            yours — signed in or not, it's waiting when you come back.
          </p>
          <Link
            to="/catalog"
            className="mt-6 inline-block rounded-md bg-brass px-6 py-3 font-medium text-ink hover:bg-brass-light transition-colors"
          >
            Browse the catalog
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl text-ink">How it works</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <Step
            label="01"
            title="Search the shelf"
            body="Real text search across title and author, filter by category and price."
          />
          <Step
            label="02"
            title="Fill your cart"
            body="Your cart is saved to your account, not just this browser tab."
          />
          <Step
            label="03"
            title="Place your order"
            body="Review shipping and total, then confirm — payment integration is coming next."
          />
        </div>
      </section>
    </div>
  );
}

function Step({ label, title, body }) {
  return (
    <div className="rounded-md bg-white p-5 shadow-sm">
      <span className="font-mono text-xs text-brass-dark">{label}</span>
      <h3 className="mt-1 font-display text-lg text-ink">{title}</h3>
      <p className="mt-1 text-sm text-slate">{body}</p>
    </div>
  );
}
