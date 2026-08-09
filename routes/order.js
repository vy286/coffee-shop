const express = require("express");
const router = express.Router();
const orderController = require("../app/controllers/OrderController");

router.get("/", orderController.index);
router.post("/:id/status", orderController.updateStatus);

module.exports = router;
