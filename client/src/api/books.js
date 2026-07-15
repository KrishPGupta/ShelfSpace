import api from "./axios";

/**
 * params can include: q (text search), category, minPrice, maxPrice,
 * sortBy ("price" | "title" | "rating"), sortDir ("asc" | "desc"), page, limit
 * All filtering/sorting happens server-side via real Mongo queries.
 */
export const fetchBooks = (params = {}) => api.get("/books", { params });
export const fetchBookById = (id) => api.get(`/books/${id}`);
export const fetchCategories = () => api.get("/books/categories");
