const authMiddleware = require("../app/middleware/AuthMiddleware");

const siteRouter = require("./site");
const productRouter = require("./product");
const cartRouter = require("./cart");
const orderRouter = require("./order");

function route(app) {
  // Truyền thông tin user từ session vào tất cả các view
  app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
  });

  // Kích hoạt middleware kiểm tra phân quyền
  app.use(authMiddleware);

  app.use("/orders", orderRouter);
  app.use("/cart", cartRouter);
  app.use("/products", productRouter);
  app.use("/", siteRouter);
}

module.exports = route;
