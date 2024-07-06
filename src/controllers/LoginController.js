const Login = require('../models/Login');

class LoginController {

    static index(req, res) {
        if (req.session.user) return res.render('login/logado', { title: 'Login - Usuário logado.'});
        return res.render('login/index', { title: 'Login - Index'});
    }

    static async registerUser(req, res) {
        try {
            let login = new Login(req.body);
            await login.register();

            if (login.errors.length > 0) {
                req.flash('errors', login.errors);
                req.session.save(() => {
                    return res.redirect('/login');
                });
                return;
            }

            req.flash('success', "Usuário cadastrado com sucesso!");
            req.session.save(() => {
                return res.redirect('/login');
            });
        } catch(e) {
            console.error(e);
            return res.render('404');
        }
    }

    static async authenticateUser(req, res) {
        try {
            let login = new Login(req.body);
            await login.authenticate();

            if (login.errors.length > 0) {
                req.flash('errors', login.errors);
                req.session.save(() => {
                    return res.redirect('/login');
                });
                return;
            }

            req.flash('success', "Usuário logado com sucesso!");
            req.session.user = login.user;
            req.session.save(() => {
                return res.redirect('/');
            });
        } catch(e) {
            console.error(e);
            return res.render('404');
        }
    }

    static logout(req, res) {
        req.session.destroy();
        res.redirect('/');
    }
}

module.exports = LoginController;