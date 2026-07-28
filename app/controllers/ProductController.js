const Product = require("../models/Product");

class ProductController {
  // [GET] /products
  index(req, res, next) {
    Product.find({})
      .lean()
      .then((products) => {
        res.render("products", { products: products });
      })
      .catch((error) => next(error));
  }

  // [GET] /products/create
  create(req, res) {
    res.render("product-create");
  }

  // [POST] /products/store
  store(req, res, next) {
    const product = new Product(req.body);
    product
      .save()
      .then(() => res.redirect("/products"))
      .catch((error) => next(error));
  }

  // [GET] /products/:id/edit - Hiển thị Form sửa với dữ liệu cũ
  edit(req, res, next) {
    Product.findById(req.params.id)
      .lean()
      .then((product) => {
        res.render("product-edit", { product: product });
      })
      .catch((error) => next(error));
  }

  // [PUT] /products/:id - Lưu thay đổi vào Database
  update(req, res, next) {
    Product.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/products"))
      .catch((error) => next(error));
  }

  // [DELETE] /products/:id - Xóa sản phẩm
  destroy(req, res, next) {
    Product.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("/products"))
      .catch((error) => next(error));
  }

  // [GET] /products/:slug - Chi tiết sản phẩm (luôn để dưới cùng)
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
