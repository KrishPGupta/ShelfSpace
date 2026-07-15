import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookById } from "../api/books";
import { fetchReviewsForBook, submitReview } from "../api/reviews";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import StarRating from "../components/StarRating";
import { getSpineColor } from "../config/categoryColors";
import { getBookCover } from "../config/bookImages";

export default function BookDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { add } = useCart();

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addStatus, setAddStatus] = useState(null);

  const [newRating, setNewRating] = useState(0);
  const [newText, setNewText] = useState("");
  const [reviewError, setReviewError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const loadReviews = () => fetchReviewsForBook(id).then((res) => setReviews(res.data.reviews));

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchBookById(id), fetchReviewsForBook(id)])
      .then(([bookRes, reviewsRes]) => {
        setBook(bookRes.data.book);
        setReviews(reviewsRes.data.reviews);
      })
      .catch((err) => setError(err.response?.data?.message || "Couldn't load this book."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    setAddStatus(null);
    try {
      await add(id, 1);
      setAddStatus("added");
    } catch (err) {
      setAddStatus(err.response?.data?.message || "Couldn't add to cart.");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewError(null);

    if (newRating < 1 || newRating > 5) {
      setReviewError("Pick a star rating from 1 to 5.");
      return;
    }
    if (newText.trim().length < 3) {
      setReviewError("Say a little more — at least a few words.");
      return;
    }

    setSubmitting(true);
    try {
      await submitReview(id, { rating: newRating, text: newText.trim() });
      setNewRating(0);
      setNewText("");
      await loadReviews();
    } catch (err) {
      setReviewError(err.response?.data?.message || "Couldn't submit your review.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="p-10 text-center text-slate">Loading…</p>;
  if (error) return <p className="p-10 text-center text-burgundy">{error}</p>;
  if (!book) return null;

  const spine = getSpineColor(book.category);
  const avgRating =
    reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-8 sm:flex-row">
        <div className="w-full shrink-0 overflow-hidden rounded-md shadow-sm sm:w-64">
          <div className="flex" style={{ borderLeft: `6px solid ${spine}` }}>
            <div className="aspect-[2/3] w-full bg-stone-dark">
              {getBookCover(book.coverImage) ? (
                <img
                  src={getBookCover(book.coverImage)}
                  alt={`Cover of ${book.title}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-slate">
                  No cover yet
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <p className="font-mono text-xs uppercase tracking-wide text-slate">{book.category}</p>
          <h1 className="mt-1 font-display text-3xl text-ink">{book.title}</h1>
          <p className="mt-1 text-slate">{book.author}</p>

          <div className="mt-3 flex items-center gap-2">
            <StarRating value={avgRating} />
            <span className="font-mono text-sm text-slate">
              {avgRating.toFixed(1)} ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
            </span>
          </div>

          <p className="mt-4 font-mono text-2xl text-ink">${book.price?.toFixed(2)}</p>
          <p className="mt-1 text-sm text-slate">
            {book.stockQuantity > 0 ? `${book.stockQuantity} in stock` : "Out of stock"}
          </p>

          <p className="mt-4 text-ink/90">{book.description}</p>

          <button
            onClick={handleAddToCart}
            disabled={book.stockQuantity === 0}
            className="mt-6 rounded-md bg-brass px-6 py-3 font-medium text-ink transition-colors hover:bg-brass-light disabled:cursor-not-allowed disabled:bg-stone-dark disabled:text-slate"
          >
            {book.stockQuantity === 0 ? "Out of stock" : "Add to cart"}
          </button>
          {addStatus === "added" && (
            <p className="mt-2 text-sm text-ink/70">Added to your cart.</p>
          )}
          {addStatus && addStatus !== "added" && (
            <p className="mt-2 text-sm text-burgundy">{addStatus}</p>
          )}
        </div>
      </div>

      <section className="mt-14">
        <h2 className="font-display text-2xl text-ink">Reviews</h2>

        {user ? (
          <form onSubmit={handleReviewSubmit} className="mt-4 rounded-md bg-white p-5 shadow-sm">
            <p className="mb-2 font-mono text-xs uppercase text-slate">Your rating</p>
            <StarRating value={newRating} interactive onChange={setNewRating} size="text-2xl" />
            <textarea
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="What did you think?"
              rows={3}
              className="mt-3 w-full rounded border border-stone-dark px-3 py-2 text-sm focus:border-brass focus:outline-none"
            />
            {reviewError && <p className="mt-2 text-sm text-burgundy">{reviewError}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="mt-3 rounded-md bg-ink px-5 py-2 text-sm font-medium text-stone hover:bg-ink-light transition-colors disabled:opacity-60"
            >
              {submitting ? "Submitting…" : "Submit review"}
            </button>
          </form>
        ) : (
          <p className="mt-3 text-sm text-slate">
            <a href="/login" className="text-brass-dark underline">
              Sign in
            </a>{" "}
            to leave a review.
          </p>
        )}

        <ul className="mt-6 flex flex-col gap-4">
          {reviews.map((r) => (
            <li key={r._id} className="rounded-md bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <StarRating value={r.rating} size="text-sm" />
                <span className="font-mono text-xs text-slate">{r.userName}</span>
              </div>
              <p className="mt-2 text-sm text-ink/90">{r.text}</p>
            </li>
          ))}
          {reviews.length === 0 && (
            <p className="text-sm text-slate">No reviews yet — be the first.</p>
          )}
        </ul>
      </section>
    </div>
  );
}
