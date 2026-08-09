const express = require("express");
const router = express.Router();
const productController = require("../app/controllers/ProductController");
const upload = require("../config/multer");

router.get("/create", productController.create);
router.post("/store", upload.single("image"), productController.store);

router.get("/:id/edit", productController.edit);
router.put("/:id", upload.single("image"), productController.update);
router.delete("/:id", productController.destroy);

router.get("/:slug", productController.show); // Route động luôn để dưới cùng
router.get("/", productController.index);

module.exports = router;
