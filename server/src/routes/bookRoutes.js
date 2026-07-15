const express = require("express");
const { protect } = require("../middleware/auth");
const bookCtrl = require("../controllers/bookController");
const reviewCtrl = require("../controllers/reviewController");

const router = express.Router();
router.get("/", bookCtrl.getBooks);
router.get("/categories", bookCtrl.getCategories); // must precede /:id
router.get("/:id", bookCtrl.getBookById);
router.get("/:id/reviews", reviewCtrl.getReviews);
router.post("/:id/reviews", protect, reviewCtrl.addReview);

module.exports = router;
