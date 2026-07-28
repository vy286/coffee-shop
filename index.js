// index.js - File khởi tạo server chính của dự án Coffee Shop

const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");

const app = express();
const db = require("./config/db");
db.connect();
const port = 3000;

// ===== Middleware =====
app.use(morgan("combined")); // Ghi log request ra Terminal
app.use(express.static("public")); // Cấp quyền truy cập công khai cho public

// ===== Cấu hình Template Engine Handlebars =====
app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", "./views");

// ===== Nạp hệ thống Routes =====
const route = require("./routes");
route(app);

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
