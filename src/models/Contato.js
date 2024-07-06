const mongoose = require('mongoose');
const validator = require('validator');

const schema = new mongoose.Schema({
    nome: { type: String, require: true },
    sobrenome: { type: String, require: false, default: '' },
    email: { type: String, require: false, default: '' },
    telefone: { type: String, require: false, default: '' },
    criadoEm: { type: Date, default: Date.now }
});

const model = mongoose.model('Contato', schema);

class Contato {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contato = null;
    }

    validate() {
        this.clear();
        if (!this.body.nome) this.errors.push('O campo nome é obrigatório.');
        if (this.body.email && !validator.isEmail(this.body.email)) 
            this.errors.push('E-mail inválido.');
        if (!this.body.email && !this.body.telefone) 
            this.errors.push('Ao menos um e-mail ou telefone deve ser informado.');
    }

    clear() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') this.body[key] = '';
        }

        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone
        };
    }    

    async register() {
        this.validate();
        if (this.errors.length > 0) return;

        this.contato = await model.create(this.body);
    }

    static async getById(id) {
        if (typeof id !== "string") return;

        return await model.findById(id);
    }

    async edit(id) {
        if (typeof id !== "string") return;
        this.validate();
        if (this.errors.length > 0) return;
        this.contato = await model.findByIdAndUpdate(id, this.body, { new: true });
    }

    static async get() {
        return await model.find().sort({ criadoEm: -1 });
    }

    static async delete(id) {
        if (typeof id !== "string") return;

        return await model.findByIdAndDelete(id);
    }
}

module.exports = Contato;