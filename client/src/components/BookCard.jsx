import React from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import { getSpineColor } from "../config/categoryColors";
import { getBookCover } from "../config/bookImages";

export default function BookCard({ book }) {
  const spine = getSpineColor(book.category);
  // book.coverImage is just a filename from the DB; resolve it against
  // the bundled images in src/assets/images/books/.
  const coverSrc = getBookCover(book.coverImage);

  return (
    <Link
      to={`/books/${book._id}`}
      className="spine-card group flex overflow-hidden rounded-md bg-white shadow-sm"
    >
      <div className="w-2 shrink-0" style={{ backgroundColor: spine }} aria-hidden="true" />
      <div className="flex flex-1 flex-col p-3">
        <div className="mb-2 aspect-[2/3] w-full overflow-hidden rounded bg-stone-dark">
          {coverSrc ? (
            <img
              src={coverSrc}
              alt={`Cover of ${book.title}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-slate">
              No cover yet
            </div>
          )}
        </div>
        <h3 className="font-display text-base leading-snug text-ink">{book.title}</h3>
        <p className="text-sm text-slate">{book.author}</p>
        <div className="mt-1 flex items-center gap-1">
          <StarRating value={book.averageRating || 0} size="text-xs" />
          <span className="font-mono text-xs text-slate">
            ({book.reviewCount || 0})
          </span>
        </div>
        <p className="mt-auto pt-2 font-mono text-sm font-medium text-ink">
          ${book.price?.toFixed(2)}
        </p>
        {book.stockQuantity === 0 && (
          <p className="font-mono text-xs uppercase text-burgundy">Out of stock</p>
        )}
      </div>
    </Link>
  );
}
