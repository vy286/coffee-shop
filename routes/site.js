const express = require("express");
const router = express.Router();

const SiteController = require('../app/controllers/SiteController');
const AuthMiddleware = require('../app/middleware/AuthMiddleware');

router.get('/', AuthMiddleware, SiteController.home);
router.get('/about', AuthMiddleware, SiteController.about);
router.get('/contact', AuthMiddleware, SiteController.contact);

router.get('/login', SiteController.login);
router.post('/login', SiteController.loginPost);
router.get('/logout', SiteController.logout);

module.exports = router;