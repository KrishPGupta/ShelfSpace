const User = require("../models/User");
const Book = require("../models/Book");

async function buildCartResponse(userId) {
  const user = await User.findById(userId).populate("cart.book");
  const items = user.cart
    .filter((item) => item.book) // drop items whose book was deleted
    .map((item) => ({ book: item.book, quantity: item.quantity }));
  const total = items.reduce((sum, i) => sum + i.book.price * i.quantity, 0);
  return { items, total };
}

exports.getCart = async (req, res) => {
  try {
    const cart = await buildCartResponse(req.user._id);
    res.json({ cart });
  } catch (err) {
    res.status(500).json({ message: "Couldn't load your cart." });
  }
};

exports.addItem = async (req, res) => {
  try {
    const { bookId, quantity = 1 } = req.body;
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found." });
    if (book.stockQuantity < 1) {
      return res.status(400).json({ message: "That book is out of stock." });
    }

    const user = await User.findById(req.user._id);
    const existing = user.cart.find((item) => item.book.toString() === bookId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      user.cart.push({ book: bookId, quantity });
    }
    await user.save();

    const cart = await buildCartResponse(req.user._id);
    res.json({ cart });
  } catch (err) {
    res.status(500).json({ message: "Couldn't add to cart." });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { quantity } = req.body;
    if (quantity < 1) return res.status(400).json({ message: "Quantity must be at least 1." });

    const user = await User.findById(req.user._id);
    const item = user.cart.find((i) => i.book.toString() === bookId);
    if (!item) return res.status(404).json({ message: "That item isn't in your cart." });

    item.quantity = quantity;
    await user.save();

    const cart = await buildCartResponse(req.user._id);
    res.json({ cart });
  } catch (err) {
    res.status(500).json({ message: "Couldn't update your cart." });
  }
};

exports.removeItem = async (req, res) => {
  try {
    const { bookId } = req.params;
    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter((i) => i.book.toString() !== bookId);
    await user.save();

    const cart = await buildCartResponse(req.user._id);
    res.json({ cart });
  } catch (err) {
    res.status(500).json({ message: "Couldn't update your cart." });
  }
};
