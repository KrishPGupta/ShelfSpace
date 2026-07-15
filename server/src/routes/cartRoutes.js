const express = require("express");
const { protect } = require("../middleware/auth");
const ctrl = require("../controllers/cartController");

const router = express.Router();
router.use(protect);
router.get("/", ctrl.getCart);
router.post("/items", ctrl.addItem);
router.patch("/items/:bookId", ctrl.updateItem);
router.delete("/items/:bookId", ctrl.removeItem);

module.exports = router;
