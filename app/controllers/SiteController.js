const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Tài khoản Admin cố định
const ADMIN_ACCOUNT = "admin@gmail.com";
const ADMIN_PASSWORD = "123456";

class SiteController {
  // [GET] /
  home(req, res) {
    res.render("home");
  }

  // [GET] /about
  about(req, res) {
    res.render("about");
  }

  // [GET] /contact
  contact(req, res) {
    res.render("contact");
  }

  // [GET] /login - Hiển thị form đăng nhập với layout "login"
  login(req, res) {
    res.render("login", { layout: "login" });
  }

  // [POST] /login - Xử lý đăng nhập
  loginPost(req, res, next) {
    const { account, password } = req.body;

    // Đăng nhập Admin
    if (account === ADMIN_ACCOUNT && password === ADMIN_PASSWORD) {
      req.session.user = {
        account: account,
        name: "Quản trị viên",
        isAdmin: true,
      };
      return res.redirect("/");
    }

    // Đăng nhập Khách hàng (Email hoặc SĐT)
    User.findOne({
      $or: [{ email: account }, { phone: account }],
    })
      .then((user) => {
        if (!user) {
          return res.render("login", {
            layout: "login",
            error: "Sai tài khoản hoặc mật khẩu!",
          });
        }

        return bcrypt.compare(password, user.password).then((isMatch) => {
          if (!isMatch) {
            return res.render("login", {
              layout: "login",
              error: "Sai tài khoản hoặc mật khẩu!",
            });
          }

          req.session.user = {
            account: user.email || user.phone,
            name: user.name,
            isAdmin: false,
          };

          res.redirect("/");
        });
      })
      .catch((error) => next(error));
  }

  // [GET] /register - Hiển thị form đăng ký
  register(req, res) {
    res.render("register", { layout: "login" });
  }

  // [POST] /register - Xử lý đăng ký
  registerPost(req, res, next) {
    const { name, email, password, phone } = req.body;

    User.findOne({
      $or: [{ email: email }, { phone: phone }],
    })
      .then((existingUser) => {
        if (existingUser) {
          return res.render("register", {
            layout: "login",
            error: "Email hoặc Số điện thoại này đã được sử dụng!",
          });
        }

        return bcrypt.hash(password, 10).then((hashedPassword) => {
          const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
            phone: phone,
          });

          return newUser.save().then(() => {
            res.redirect("/login");
          });
        });
      })
      .catch((error) => next(error));
  }

  // [GET] /logout - Đăng xuất
  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.send("Có lỗi khi đăng xuất");
      }
      res.redirect("/login");
    });
  }
}

module.exports = new SiteController();
