const Order = require("../models/Order");

class OrderController {
  // [GET] /orders - Xem danh sách tất cả đơn hàng
  index(req, res, next) {
    Order.find({})
      .sort({ createdAt: -1 })
      .lean()
      .then((orders) => {
        res.render("orders", { orders: orders });
      })
      .catch((error) => next(error));
  }

  // [POST] /orders/:id/status - Cập nhật trạng thái đơn hàng
  updateStatus(req, res, next) {
    Order.updateOne({ _id: req.params.id }, { status: req.body.status })
      .then(() => res.redirect("/orders"))
      .catch((error) => next(error));
  }
}

module.exports = new OrderController();
