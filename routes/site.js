const express = require("express");
const router = express.Router();
const siteController = require("../app/controllers/SiteController");

router.get("/products", siteController.products);
router.get("/about", siteController.about);
router.get("/contact", siteController.contact);
router.get("/", siteController.index); // Route gốc luôn để dưới cùng

module.exports = router;
