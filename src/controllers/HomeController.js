const Contato = require('../models/Contato');

class HomeController {

    static async index(req, res) {
        const contatos = []//await Contato.get();
     
        return res.render('home/index', { title: 'Home - Index', contatos });
    }
}

module.exports = HomeController;