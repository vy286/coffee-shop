class SiteController {
  // [GET] /
  index(req, res) {
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
}

module.exports = new SiteController();
