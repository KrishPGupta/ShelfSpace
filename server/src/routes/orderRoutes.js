const express = require("express");
const { protect } = require("../middleware/auth");
const ctrl = require("../controllers/orderController");

const router = express.Router();
router.use(protect);
router.post("/", ctrl.placeOrder);
router.get("/", ctrl.getOrders);
router.get("/:id", ctrl.getOrderById);

module.exports = router;
