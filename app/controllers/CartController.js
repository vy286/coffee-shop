const Product = require("../models/Product");
const Order = require("../models/Order");

class CartController {
  // [POST] /cart/add/:id - Thêm sản phẩm vào giỏ
  add(req, res, next) {
    if (!req.session.cart) {
      req.session.cart = [];
    }

    const productId = req.params.id;
    const quantity = parseInt(req.body.quantity) || 1;

    const existingItem = req.session.cart.find(
      (item) => item.productId === productId,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      req.session.cart.push({ productId, quantity });
    }

    res.redirect("/cart");
  }

  // [GET] /cart - Xem giỏ hàng
  index(req, res, next) {
    const cart = req.session.cart || [];

    if (cart.length === 0) {
      return res.render("cart", { items: [], total: 0 });
    }

    const productIds = cart.map((item) => item.productId);

    Product.find({ _id: { $in: productIds } })
      .lean()
      .then((products) => {
        let total = 0;
        const items = cart.map((cartItem) => {
          const product = products.find(
            (p) => p._id.toString() === cartItem.productId,
          );
          const subtotal = product.price * cartItem.quantity;
          total += subtotal;
          return {
            ...product,
            quantity: cartItem.quantity,
            subtotal: subtotal,
          };
        });

        res.render("cart", { items: items, total: total });
      })
      .catch((error) => next(error));
  }

  // [POST] /cart/update/:id - Cập nhật số lượng 1 sản phẩm trong giỏ
  update(req, res) {
    const productId = req.params.id;
    const quantity = parseInt(req.body.quantity) || 1;

    if (req.session.cart) {
      const item = req.session.cart.find((i) => i.productId === productId);
      if (item) {
        item.quantity = quantity;
      }
    }

    res.redirect("/cart");
  }

  // [POST] /cart/remove/:id - Xóa 1 sản phẩm khỏi giỏ
  remove(req, res) {
    if (req.session.cart) {
      req.session.cart = req.session.cart.filter(
        (item) => item.productId !== req.params.id,
      );
    }
    res.redirect("/cart");
  }

  // [POST] /cart/clear - Xóa toàn bộ giỏ hàng
  clear(req, res) {
    req.session.cart = [];
    res.redirect("/cart");
  }

  // [GET] /cart/checkout - Hiển thị Form nhập thông tin giao hàng
  showCheckout(req, res, next) {
    const cart = req.session.cart || [];

    if (cart.length === 0) {
      return res.redirect("/cart");
    }

    const productIds = cart.map((item) => item.productId);

    Product.find({ _id: { $in: productIds } })
      .lean()
      .then((products) => {
        let total = 0;
        const items = cart.map((cartItem) => {
          const product = products.find(
            (p) => p._id.toString() === cartItem.productId,
          );
          const subtotal = product.price * cartItem.quantity;
          total += subtotal;
          return { ...product, quantity: cartItem.quantity, subtotal };
        });

        res.render("checkout", { items: items, total: total });
      })
      .catch((error) => next(error));
  }

  // [POST] /cart/checkout - Xử lý lưu đơn hàng vào Database
  placeOrder(req, res, next) {
    const cart = req.session.cart || [];

    if (cart.length === 0) {
      return res.redirect("/cart");
    }

    const productIds = cart.map((item) => item.productId);

    Product.find({ _id: { $in: productIds } })
      .lean()
      .then((products) => {
        let total = 0;
        const orderItems = cart.map((cartItem) => {
          const product = products.find(
            (p) => p._id.toString() === cartItem.productId,
          );
          const subtotal = product.price * cartItem.quantity;
          total += subtotal;
          return {
            productId: product._id,
            name: product.name,
            price: product.price,
            quantity: cartItem.quantity,
          };
        });

        const order = new Order({
          customerName: req.body.customerName,
          phone: req.body.phone,
          address: req.body.address,
          note: req.body.note,
          items: orderItems,
          total: total,
        });

        return order.save();
      })
      .then((savedOrder) => {
        req.session.cart = [];
        res.render("order-success", { order: savedOrder.toObject() });
      })
      .catch((error) => next(error));
  }
}

module.exports = new CartController();
