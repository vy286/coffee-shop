const siteRouter = require("./site");
const productRouter = require("./product");
const cartRouter = require("./cart");

function route(app) {
  app.use("/cart", cartRouter);
  app.use("/products", productRouter);
  app.use("/", siteRouter);
}

module.exports = route;
