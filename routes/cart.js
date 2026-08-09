const express = require("express");
const router = express.Router();
const cartController = require("../app/controllers/CartController");

router.get("/", cartController.index);
router.post("/add/:id", cartController.add);
router.post("/update/:id", cartController.update);
router.post("/remove/:id", cartController.remove);
router.post("/clear", cartController.clear);
router.get("/checkout", cartController.showCheckout);
router.post("/checkout", cartController.placeOrder);

module.exports = router;
