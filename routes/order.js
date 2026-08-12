const express = require("express");
const router = express.Router();
const orderController = require("../app/controllers/OrderController");

// Khách xem đơn hàng cá nhân của mình
router.get("/my-orders", orderController.myOrders);

// Admin xem và quản lý toàn bộ đơn hàng
router.get("/", orderController.index);

module.exports = router;
