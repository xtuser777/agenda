const mongoose = require('mongoose');
const validator = require('validator').default;
const bcryptjs = require('bcryptjs');

const schema = new mongoose.Schema({
    email: { type: String, require: true },
    password: { type: String, require: true }
});

const model = mongoose.model('Login', schema);

class Login {

    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    validate() {
        this.clear();
        if (!validator.isEmail(this.body.email)) 
            this.errors.push('E-mail inválido.');
        if (this.body.password.length < 3 || this.body.password.length > 50) 
            this.errors.push('Senha deve ter entre 3 e 50 caracteres.');
    }

    clear() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') this.body[key] = '';
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        };
    }    

    async userExists() {
        let user = await model.findOne({ email: this.body.email });
        if (user) this.errors.push('Já existe um usuário com este e-mail cadastrado.');
    }

    async register() {
        this.validate();
        if (this.errors.length > 0) return;

        await this.userExists();

        if (this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await model.create(this.body);
    }

    async authenticate() {
        this.validate();
        if (this.errors.length > 0) return;

        this.user = await model.findOne({ email: this.body.email });
        if (!this.user) {
            this.errors.push('Usuário ainda não cadastrado.');
            return;
        }

        if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Senha inválida');
            this.user = null;
            return;
        }
    }
}

module.exports = Login;