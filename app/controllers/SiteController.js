class SiteController {

    home(req, res) {
        res.render('home');
    }

    about(req, res) {
        res.render('about');
    }

    contact(req, res) {
        res.render('contact');
    }

    login(req, res) {
        res.render('login');
    }

    loginPost(req, res) {
        const { account, password } = req.body;

        if (account === 'admin@gmail.com' || account === '03312345650' && password === '123456') {

            req.session.user = {
                account: account
            };

            return res.redirect('/');
        }

        return res.render('login', {
            error: 'Sai tài khoản hoặc mật khẩu'
        });
    }

    logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                return res.send("Có lỗi khi đăng xuất");
            }

            res.redirect('/login');
        });
    }

}

module.exports = new SiteController();