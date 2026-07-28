// SiteController.js - Xử lý các trang tĩnh: Trang chủ, Sản phẩm, Giới thiệu, Liên hệ

class SiteController {
  // [GET] /
  index(req, res) {
    res.render("home");
  }

  // [GET] /products
  products(req, res) {
    res.render("products");
  }

  // [GET] /about
  about(req, res) {
    res.render("about");
  }

  // [GET] /contact
  contact(req, res) {
    res.render("contact");
  }
}

// Xuất ra 1 đối tượng để dùng ở file Route
module.exports = new SiteController();
