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

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
