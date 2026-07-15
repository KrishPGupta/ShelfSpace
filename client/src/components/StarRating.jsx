import React from "react";

/**
 * Displays a star rating. If `interactive` is true, calls onChange(value)
 * when a star is clicked — used on the review form.
 */
export default function StarRating({ value = 0, interactive = false, onChange, size = "text-lg" }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={`flex gap-0.5 ${size}`} role={interactive ? "radiogroup" : "img"} aria-label={`${value} out of 5 stars`}>
      {stars.map((star) => {
        const filled = star <= Math.round(value);
        const Star = (
          <span
            key={star}
            className={filled ? "text-brass" : "text-stone-dark"}
            aria-hidden="true"
          >
            ★
          </span>
        );

        if (!interactive) return Star;

        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange?.(star)}
            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass rounded"
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          >
            {Star}
          </button>
        );
      })}
    </div>
  );
}
