const Product = require("../models/Product");

class SiteController {
  // [GET] / - Trang chủ, hiển thị kèm vài sản phẩm nổi bật
  index(req, res, next) {
    Product.find({})
      .limit(3) // Chỉ lấy 3 sản phẩm để hiển thị nổi bật
      .lean()
      .then((featuredProducts) => {
        res.render("home", { featuredProducts: featuredProducts });
      })
      .catch((error) => next(error));
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

module.exports = new SiteController();
