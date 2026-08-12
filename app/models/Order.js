const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Cấu trúc dữ liệu cho 1 đơn hàng
const Order = new Schema({
  userEmail: { type: String }, // 👈 Đã thêm trường này để liên kết với tài khoản người mua
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  note: { type: String },

  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number },
    },
  ],

  total: { type: Number, required: true },
  status: { type: String, default: "Chờ xử lý" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", Order);
