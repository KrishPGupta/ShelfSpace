import React from "react";

/**
 * Controlled filter bar. All state lives in the parent (Catalog.jsx) which
 * debounces and sends these as real query params to GET /api/books —
 * there is no client-side filtering of a static list.
 */
export default function SearchFilterBar({ filters, onChange, categories }) {
  const update = (patch) => onChange({ ...filters, ...patch });

  return (
    <div className="mb-6 flex flex-col gap-3 rounded-md bg-white p-4 shadow-sm sm:flex-row sm:items-end sm:gap-4">
      <div className="flex-1">
        <label htmlFor="q" className="mb-1 block font-mono text-xs uppercase text-slate">
          Search
        </label>
        <input
          id="q"
          type="text"
          value={filters.q}
          onChange={(e) => update({ q: e.target.value })}
          placeholder="Title or author…"
          className="w-full rounded border border-stone-dark px-3 py-2 text-sm focus:border-brass focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="category" className="mb-1 block font-mono text-xs uppercase text-slate">
          Category
        </label>
        <select
          id="category"
          value={filters.category}
          onChange={(e) => update({ category: e.target.value })}
          className="w-full rounded border border-stone-dark px-3 py-2 text-sm focus:border-brass focus:outline-none sm:w-40"
        >
          <option value="">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2">
        <div>
          <label htmlFor="minPrice" className="mb-1 block font-mono text-xs uppercase text-slate">
            Min $
          </label>
          <input
            id="minPrice"
            type="number"
            min="0"
            value={filters.minPrice}
            onChange={(e) => update({ minPrice: e.target.value })}
            className="w-24 rounded border border-stone-dark px-3 py-2 text-sm focus:border-brass focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="maxPrice" className="mb-1 block font-mono text-xs uppercase text-slate">
            Max $
          </label>
          <input
            id="maxPrice"
            type="number"
            min="0"
            value={filters.maxPrice}
            onChange={(e) => update({ maxPrice: e.target.value })}
            className="w-24 rounded border border-stone-dark px-3 py-2 text-sm focus:border-brass focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="sortBy" className="mb-1 block font-mono text-xs uppercase text-slate">
          Sort by
        </label>
        <select
          id="sortBy"
          value={`${filters.sortBy}:${filters.sortDir}`}
          onChange={(e) => {
            const [sortBy, sortDir] = e.target.value.split(":");
            update({ sortBy, sortDir });
          }}
          className="w-full rounded border border-stone-dark px-3 py-2 text-sm focus:border-brass focus:outline-none sm:w-44"
        >
          <option value="title:asc">Title (A–Z)</option>
          <option value="price:asc">Price (low–high)</option>
          <option value="price:desc">Price (high–low)</option>
          <option value="rating:desc">Rating (high–low)</option>
        </select>
      </div>
    </div>
  );
}
