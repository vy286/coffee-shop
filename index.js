require("dotenv").config();
// index.js - File khởi tạo server chính của dự án Coffee Shop

const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");

const app = express();
const db = require("./config/db");
const methodOverride = require("method-override");
db.connect();
const port = process.env.PORT || 3000;

// ===== Middleware =====
app.use(morgan("combined")); // Ghi log request ra Terminal
app.use(express.static("public")); // Cấp quyền truy cập công khai cho public

// Middleware đọc dữ liệu từ Form HTML gửi lên
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// ===== Cấu hình Template Engine Handlebars =====
app.engine(
  "hbs",
  engine({ extname: ".hbs", helpers: { eq: (a, b) => a == b } }),
); //Helper so sánh 2 giá trị, dùng để chọn sẵn option trong form

app.set("view engine", "hbs");
app.set("views", "./views");

// ===== Nạp hệ thống Routes =====
const route = require("./routes");
route(app);

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
