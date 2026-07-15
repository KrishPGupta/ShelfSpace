import api from "./axios";

export const fetchReviewsForBook = (bookId) => api.get(`/books/${bookId}/reviews`);
export const submitReview = (bookId, { rating, text }) =>
  api.post(`/books/${bookId}/reviews`, { rating, text });
