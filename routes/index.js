const siteRouter = require("./site");
const productRouter = require("./product");
const cartRouter = require("./cart");

function route(app) {
  app.use("/cart", cartRouter); // Mọi đường dẫn /cart/* sẽ đưa vào đây
  app.use("/products", productRouter); // Mọi đường dẫn /products/* sẽ đưa vào đây
  app.use("/", siteRouter);
}

module.exports = route;
