const mongoose = require("mongoose");

// Hàm kết nối bất đồng bộ tới MongoDB
async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Kết nối Database thành công!");
  } catch (error) {
    console.log("❌ Kết nối Database thất bại!");
    console.log(error);
  }
}

module.exports = { connect };
