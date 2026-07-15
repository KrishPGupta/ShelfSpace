const mongoose = require("mongoose");
const User = require("../models/User");
const Book = require("../models/Book");
const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    const { shippingInfo } = req.body;
    const required = ["fullName", "addressLine1", "city", "state", "postalCode", "country"];
    for (const field of required) {
      if (!shippingInfo?.[field]?.trim()) {
        return res.status(400).json({ message: "Please fill in all required shipping fields." });
      }
    }

    const user = await User.findById(req.user._id).populate("cart.book");
    if (!user.cart.length) {
      return res.status(400).json({ message: "Your cart is empty." });
    }

    let total = 0;
    const items = [];

    await session.withTransaction(async () => {
      for (const cartItem of user.cart) {
        const book = await Book.findById(cartItem.book._id).session(session);
        if (!book || book.stockQuantity < cartItem.quantity) {
          throw new Error(`"${cartItem.book.title}" doesn't have enough stock.`);
        }
        book.stockQuantity -= cartItem.quantity;
        await book.save({ session });

        items.push({
          book: book._id,
          title: book.title,
          price: book.price,
          quantity: cartItem.quantity,
        });
        total += book.price * cartItem.quantity;
      }

      user.cart = [];
      await user.save({ session });
    });

    const [order] = await Order.create(
      [{ user: user._id, items, total, shippingInfo, status: "pending" }],
      { session }
    );

    res.status(201).json({ order });
  } catch (err) {
    res.status(400).json({ message: err.message || "Couldn't place your order." });
  } finally {
    session.endSession();
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Couldn't load your orders." });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
    if (!order) return res.status(404).json({ message: "Order not found." });
    res.json({ order });
  } catch (err) {
    res.status(404).json({ message: "Order not found." });
  }
};
