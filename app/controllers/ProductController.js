const Product = require("../models/Product");

class ProductController {
  // [GET] /products - Danh sách sản phẩm, có thể kèm tìm kiếm/lọc
  index(req, res, next) {
    const keyword = req.query.q || "";
    const roastLevel = req.query.roastLevel || "";

    const filter = {};
    if (keyword) {
      filter.name = { $regex: keyword, $options: "i" };
    }
    if (roastLevel) {
      filter.roastLevel = roastLevel;
    }

    Product.find(filter)
      .lean()
      .then((products) => {
        res.render("products", {
          products: products,
          keyword: keyword,
          selectedRoast: roastLevel,
        });
      })
      .catch((error) => next(error));
  }

  // [GET] /products/create
  create(req, res) {
    res.render("product-create");
  }

  // [POST] /products/store
  store(req, res, next) {
    const productData = req.body;

    // Nếu có file ảnh được upload, gán đường dẫn ảnh vào dữ liệu sản phẩm
    if (req.file) {
      productData.image = "/img/products/" + req.file.filename;
    }

    const product = new Product(productData);
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
    const productData = req.body;

    // Nếu có upload ảnh mới, cập nhật lại đường dẫn ảnh
    if (req.file) {
      productData.image = "/img/products/" + req.file.filename;
    }

    Product.updateOne({ _id: req.params.id }, productData)
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
