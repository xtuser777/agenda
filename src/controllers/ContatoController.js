const Contato = require('../models/Contato');

class ContatoController {

    static index(req, res) {
        return res.render('contato/index', { title: 'Contato - Index', contato: {} });
    }

    static async registerContact(req, res) {
        try {
            const ctt = new Contato(req.body);
            await ctt.register();

            if (ctt.errors.length > 0) {
                req.flash('errors', ctt.errors);
                req.session.save(() => res.redirect('/contato'));
                return;
            }

            req.flash('success', 'Contato registrado com sucesso.');
            req.session.save(() => res.redirect(`/contato/${ctt.contato._id}`));
        } catch(e) {
            console.error(e);
            return res.render('404');
        }
    }

    static async editIndex(req, res) {
        try {
            const contato = await Contato.getById(req.params.id);
            if (!contato) return res.render('404');
            return res.render('contato/index', { title: 'Contato - Index', contato});
        } catch(e) {
            console.error(e);
            return res.render('404');
        }
    }

    static async editContact(req, res) {
        try {
            const ctt = new Contato(req.body);
            await ctt.edit(req.params.id);

            if (ctt.errors.length > 0) {
                req.flash('errors', ctt.errors);
                req.session.save(() => res.redirect('/contato'));
                return;
            }

            req.flash('success', 'Contato editado com sucesso.');
            req.session.save(() => res.redirect(`/contato/${ctt.contato._id}`));
        } catch(e) {
            console.error(e);
            return res.render('404');
        }
    }

    static async deleteContact(req, res) {
        if (!req.params.id) return res.render('404');
        try {
            const c = await Contato.delete(req.params.id);
            if (!c) return res.render('404');

            req.flash('success', 'Contato excluído com sucesso.');
            req.session.save(() => res.redirect('/'));
        } catch(e) {
            console.error(e);
            return res.render('404');
        }
    }
}

module.exports = ContatoController;