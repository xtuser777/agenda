exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.warning = req.flash('warning');
    res.locals.user = req.session.user;
    next();
};

exports.checkCsrfToken = (err, req, res, next) => {
    if (err)
        return res.render('404', { title: 'Erro'});

    next();
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}

exports.loginRequired = (req, res, next) => {
    if (!req.session.user) {
        req.flash('errors', 'O usuário precisa estar logado!');
        req.session.save(() => res.redirect('/'));
        return;
    }

    next();
}