module.exports = (req, res, next) => {
  const path = req.path;
  const user = req.session.user;

  // 1. Các thao tác CHỈ ADMIN được làm
  const isEditOrDelete =
    path.startsWith("/products/") &&
    (path.endsWith("/edit") || req.method === "PUT" || req.method === "DELETE");
  const isCreateOrStore =
    path === "/products/create" || path === "/products/store";
  const isOrdersPage = path.startsWith("/orders");

  const adminOnly = isEditOrDelete || isCreateOrStore || isOrdersPage;

  // 2. Thao tác Giỏ hàng / Đặt hàng: Yêu cầu ĐĂNG NHẬP (Admin hoặc Khách hàng)
  const isCartAction = path.startsWith("/cart");

  // Kiểm tra quyền Admin
  if (adminOnly) {
    if (user && user.isAdmin) {
      return next();
    }
    return res.redirect("/login");
  }

  // Kiểm tra quyền Đăng nhập khi tương tác với Giỏ hàng
  if (isCartAction) {
    if (user) {
      return next();
    }
    // Chưa đăng nhập -> Chuyển hướng sang trang đăng nhập
    return res.redirect("/login");
  }

  return next(); // Các trang công khai khác
};
