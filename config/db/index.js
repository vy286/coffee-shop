const mongoose = require("mongoose");

// Hàm kết nối bất đồng bộ tới MongoDB
async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/coffee_shop_dev");
    console.log("✅ Kết nối Database thành công!");
  } catch (error) {
    console.log("❌ Kết nối Database thất bại!");
    console.log(error);
  }
}

module.exports = { connect };
