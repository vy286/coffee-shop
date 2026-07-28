// index.js - File khởi tạo server chính của dự án Coffee Shop

const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");

const app = express();
const port = 3000;

// ===== Middleware =====
app.use(morgan("combined")); // Ghi log request ra Terminal

// Cấp quyền truy cập công khai cho thư mục public (ảnh, CSS)
app.use(express.static("public"));

// ===== Cấu hình Template Engine Handlebars =====
app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", "./views"); // Thư mục chứa giao diện

// ===== Route tạm thời (sẽ chuyển sang MVC ở buổi sau) =====
app.get("/", (req, res) => {
  res.render("home");
});
// Route hiển thị trang Sản phẩm
app.get("/products", (req, res) => {
  res.render("products");
});

// Route hiển thị trang Giới thiệu
app.get("/about", (req, res) => {
  res.render("about");
});

// Route hiển thị trang Liên hệ
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
