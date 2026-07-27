// index.js - File khởi tạo server chính của dự án Coffee Shop

const express = require('express');
const app = express();
const port = 3000;

// Route mặc định - trang chủ
app.get('/', (req, res) => {
  res.send('Website bán hạt cà phê!');
});

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});