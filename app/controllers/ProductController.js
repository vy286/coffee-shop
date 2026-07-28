const Product = require("../models/Product");

class ProductController {
  // [GET] /products - Danh sách sản phẩm
  index(req, res, next) {
    Product.find({})
      .lean()
      .then((products) => {
        res.render("products", { products: products });
      })
      .catch((error) => next(error));
  }

  // [GET] /products/:slug - Chi tiết 1 sản phẩm
  show(req, res, next) {
    Product.findOne({ slug: req.params.slug })
      .lean()
      .then((product) => {
        res.render("product-detail", { product: product });
      })
      .catch((error) => next(error));
  }
}

module.exports = new ProductController();
