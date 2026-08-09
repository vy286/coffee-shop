const siteRouter = require("./site");
const productRouter = require("./product");
const cartRouter = require("./cart");
const orderRouter = require("./order");

function route(app) {
  app.use("/orders", orderRouter); // Mọi đường dẫn /orders/* sẽ đưa vào đây
  app.use("/cart", cartRouter); // Mọi đường dẫn /cart/* sẽ đưa vào đây
  app.use("/products", productRouter); // Mọi đường dẫn /products/* sẽ đưa vào đây
  app.use("/", siteRouter);
}

module.exports = route;
