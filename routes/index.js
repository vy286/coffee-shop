const siteRouter = require("./site");
const productRouter = require("./product");

function route(app) {
  app.use("/products", productRouter); // Mọi đường dẫn /products/* sẽ đưa vào đây
  app.use("/", siteRouter);
}

module.exports = route;
