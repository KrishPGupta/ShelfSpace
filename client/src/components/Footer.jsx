import React from "react";
import { getBackgroundImage } from "../config/backgroundImages";

export default function Footer() {
  const bg = getBackgroundImage("footerBanner");

  return (
    <footer
      className="mt-16 bg-ink-gradient bg-cover bg-center text-stone"
      style={bg ? { backgroundImage: `url(${bg})` } : undefined}
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
          <div>
            <p className="font-display text-xl">ShelfSpace</p>
            <p className="mt-1 max-w-xs text-sm text-stone-dark/80">
              A shelf for the books you mean to read, and the ones you already have.
            </p>
          </div>
          <div className="flex gap-10 font-mono text-xs uppercase tracking-wide text-stone-dark/70">
            <div className="flex flex-col gap-2">
              <span className="text-brass-light">Shop</span>
              <a href="/catalog">Browse</a>
              <a href="/cart">Cart</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-brass-light">Account</span>
              <a href="/login">Sign in</a>
              <a href="/register">Join</a>
            </div>
          </div>
        </div>
        <p className="mt-8 text-xs text-stone-dark/50">
          © {new Date().getFullYear()} ShelfSpace. Built for readers.
        </p>
      </div>
    </footer>
  );
}
