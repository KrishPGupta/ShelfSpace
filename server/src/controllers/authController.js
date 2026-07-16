const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required." });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "An account with that email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });

    const token = signToken(user._id);
    res.status(201).json({ user: user.toSafeJSON(), token });
  } catch (err) {
    res.status(500).json({ message: "Couldn't create your account." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase() });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = signToken(user._id);
    res.json({ user: user.toSafeJSON(), token });
  } catch (err) {
    res.status(500).json({ message: "Couldn't sign you in." });
  }
};

exports.logout = (req, res) => {
  // Nothing to clear server-side anymore — the frontend just discards its
  // own copy of the token. Kept as a real endpoint so the client call
  // (and its error handling) doesn't need to change.
  res.json({ message: "Logged out." });
};

exports.me = (req, res) => {
  res.json({ user: req.user.toSafeJSON() });
};
