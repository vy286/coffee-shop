const Order = require("../models/Order");

class OrderController {
  // [GET] /orders - Admin xem toàn bộ đơn hàng
  index(req, res, next) {
    Order.find({})
      .sort({ createdAt: -1 }) // Sắp xếp đơn mới nhất lên đầu
      .lean()
      .then((orders) => {
        // 🛠️ Sửa từ "orders/index" thành "orders" cho đúng file views/orders.hbs
        res.render("orders", { orders });
      })
      .catch(next);
  }

  // [GET] /orders/my-orders - Khách xem các đơn hàng của chính mình
  myOrders(req, res, next) {
    const userEmail = req.session.user ? req.session.user.account : null;

    Order.find({ userEmail: userEmail })
      .sort({ createdAt: -1 }) // Sắp xếp đơn mới nhất lên đầu
      .lean()
      .then((orders) => {
        // Nếu dùng chung giao diện xem đơn với Admin hoặc file views/orders.hbs
        res.render("orders", { orders });
      })
      .catch(next);
  }
}

module.exports = new OrderController();
