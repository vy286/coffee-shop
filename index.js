// index.js - File khởi tạo server chính của dự án Coffee Shop

const express = require("express");
const morgan = require("morgan"); // Ghi log các request gửi lên server

const app = express();
const port = 3000;

// Tích hợp morgan để log mọi request (GET, POST...) ra Terminal
app.use(morgan("combined"));

app.get("//", (req, res) => {
  res.send("Website bán hạt cà phê - Đồ án nhóm");
});

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
