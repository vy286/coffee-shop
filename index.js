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

const session = require("express-session");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "coffee-shop-secret",
    resave: false,
    saveUninitialized: false,
  }),
);

// Đưa thông tin người dùng vào Handlebars
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Chặn trình duyệt cache các trang HTML để tránh bug back về trang đã đăng xuất
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});

// ===== Cấu hình Template Engine Handlebars =====
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {

      // So sánh 2 giá trị
      eq: (a, b) => a == b,

      // Định dạng giá tiền Việt Nam
      formatPrice: (price) => {
        return Number(price).toLocaleString("vi-VN");
      }

    }
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");

// ===== Nạp hệ thống Routes =====
const route = require("./routes");
route(app);

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
