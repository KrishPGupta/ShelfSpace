const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    category: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    stockQuantity: { type: Number, required: true, min: 0, default: 0 },
    coverImage: { type: String, default: null }, // filename only, resolved client-side
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

// Virtuals so /books and /books/:id both return averageRating + reviewCount
bookSchema.virtual("averageRating").get(function () {
  if (!this.reviews.length) return 0;
  const sum = this.reviews.reduce((s, r) => s + r.rating, 0);
  return sum / this.reviews.length;
});

bookSchema.virtual("reviewCount").get(function () {
  return this.reviews.length;
});

bookSchema.set("toJSON", { virtuals: true });
bookSchema.index({ title: "text", author: "text" });

module.exports = mongoose.model("Book", bookSchema);
