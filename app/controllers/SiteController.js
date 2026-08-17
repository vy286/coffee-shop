const bcrypt = require("bcryptjs");
const User = require("../models/User");

const ADMIN_ACCOUNT = "admin@gmail.com";
const ADMIN_PASSWORD = "123456";

class SiteController {
  home(req, res) {
    res.render("home");
  }

  about(req, res) {
    res.render("about");
  }

  contact(req, res) {
    res.render("contact");
  }

  // 👇 Đảm bảo có hàm này
  contactPost(req, res) {
    console.log("Dữ liệu liên hệ nhận được:", req.body);
    res.render("contact", {
      success: true,
      message: "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.",
    });
  }

  login(req, res) {
    res.render("login", { layout: "login" });
  }

  loginPost(req, res, next) {
    const { account, password } = req.body;

    if (account === ADMIN_ACCOUNT && password === ADMIN_PASSWORD) {
      req.session.user = {
        account: ADMIN_ACCOUNT,
        name: "Quản trị viên",
        isAdmin: true,
      };
      return res.redirect("/");
    }

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
            isAdmin: user.role === "admin",   // ✅ sửa ở đây
          };

          console.log("SESSION SET:", req.session.user);

          res.redirect("/");
        });
      })
      .catch((error) => next(error));
  }

  register(req, res) {
    res.render("register", { layout: "login" });
  }

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
