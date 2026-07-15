import React, { useEffect, useMemo, useState } from "react";
import { fetchBooks, fetchCategories } from "../api/books";
import BookCard from "../components/BookCard";
import SearchFilterBar from "../components/SearchFilterBar";
import { getBackgroundImage } from "../config/backgroundImages";

const DEFAULT_FILTERS = {
  q: "",
  category: "",
  minPrice: "",
  maxPrice: "",
  sortBy: "title",
  sortDir: "asc",
};

export default function Catalog() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const bannerBg = getBackgroundImage("catalogBanner");

  useEffect(() => {
    fetchCategories()
      .then((res) => setCategories(res.data.categories))
      .catch(() => setCategories([]));
  }, []);

  // Debounce so we're not firing a request on every keystroke —
  // still a real server-side query, just rate-limited client-side.
  useEffect(() => {
    setLoading(true);
    setError(null);
    const handle = setTimeout(() => {
      const params = {
        ...(filters.q && { q: filters.q }),
        ...(filters.category && { category: filters.category }),
        ...(filters.minPrice && { minPrice: filters.minPrice }),
        ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
        sortBy: filters.sortBy,
        sortDir: filters.sortDir,
      };
      fetchBooks(params)
        .then((res) => setBooks(res.data.books))
        .catch((err) => setError(err.response?.data?.message || "Couldn't load books."))
        .finally(() => setLoading(false));
    }, 350);

    return () => clearTimeout(handle);
  }, [filters]);

  const heading = useMemo(() => {
    if (filters.q) return `Results for "${filters.q}"`;
    if (filters.category) return filters.category;
    return "All books";
  }, [filters]);

  return (
    <div>
      <div
        className="bg-ink-gradient bg-cover bg-center py-10 text-stone"
        style={bannerBg ? { backgroundImage: `url(${bannerBg})` } : undefined}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="font-display text-3xl">Browse the shelf</h1>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <SearchFilterBar filters={filters} onChange={setFilters} categories={categories} />

        <h2 className="mb-4 font-mono text-xs uppercase tracking-wide text-slate">{heading}</h2>

        {loading && <p className="text-slate">Loading books…</p>}
        {error && <p className="text-burgundy">{error}</p>}
        {!loading && !error && books.length === 0 && (
          <p className="text-slate">No books match those filters yet.</p>
        )}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
