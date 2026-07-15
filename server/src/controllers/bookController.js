const Book = require("../models/Book");

exports.getBooks = async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice, sortBy = "title", sortDir = "asc" } = req.query;

    const filter = {};
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { author: { $regex: q, $options: "i" } },
      ];
    }
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sortableFields = { title: "title", price: "price", rating: "averageRating" };
    const field = sortableFields[sortBy] || "title";
    const dir = sortDir === "desc" ? -1 : 1;

    let books = await Book.find(filter).lean({ virtuals: true });

    // averageRating is a virtual, so sort by it in JS rather than in the Mongo query
    books.sort((a, b) => {
      const av = a[field] ?? 0;
      const bv = b[field] ?? 0;
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });

    res.json({ books });
  } catch (err) {
    res.status(500).json({ message: "Couldn't load books." });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).lean({ virtuals: true });
    if (!book) return res.status(404).json({ message: "Book not found." });
    res.json({ book });
  } catch (err) {
    res.status(404).json({ message: "Book not found." });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Book.distinct("category");
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ message: "Couldn't load categories." });
  }
};
