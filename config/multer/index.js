const multer = require("multer");
const path = require("path");

// Cấu hình nơi lưu và cách đặt tên file ảnh upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/products"); // Lưu vào thư mục riêng cho ảnh sản phẩm
  },
  filename: function (req, file, cb) {
    // Đặt tên file: thời-gian-hiện-tại + đuôi file gốc (tránh trùng tên)
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

// Chỉ cho phép upload file ảnh
const fileFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ được upload file ảnh!"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
