const express = require("express");
const router = express.Router();
const productController = require("../app/controllers/ProductController");

router.get("/:slug", productController.show); // Route động luôn để dưới cùng
router.get("/", productController.index);

module.exports = router;
