const Book = require("../models/Book");

exports.getReviews = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found." });
    res.json({ reviews: book.reviews });
  } catch (err) {
    res.status(500).json({ message: "Couldn't load reviews." });
  }
};

exports.addReview = async (req, res) => {
  try {
    const { rating, text } = req.body;
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Pick a star rating from 1 to 5." });
    }
    if (!text || text.trim().length < 3) {
      return res.status(400).json({ message: "Say a little more — at least a few words." });
    }

    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found." });

    book.reviews.push({
      user: req.user._id,
      userName: req.user.name,
      rating,
      text: text.trim(),
    });
    await book.save();

    res.status(201).json({ reviews: book.reviews });
  } catch (err) {
    res.status(500).json({ message: "Couldn't submit your review." });
  }
};
