import validator from 'validator';

export default class Cadastro {
    constructor(formClass) {
        if (!formClass || typeof formClass !== 'string') {
            console.error('Constructor param invalid.');
            return;
        }

        this.form = document.querySelector(formClass);
    }

    init = () => (this.form) ? this.addListeners() : null;

    addListeners = () => this.form.addEventListener('submit', e => this.formEvent(e));

    formEvent(e) {
        e.preventDefault();
        this.validate();
    }

    validate() {
        for (let error of this.form.querySelectorAll('.error-text')) {
            error.remove();
        }

        let nome = this.form.querySelector('input[name="nome"]');
        let sobrenome = this.form.querySelector('input[name="sobrenome"]');
        let email = this.form.querySelector('input[name="email"]');
        let telefone = this.form.querySelector('input[name="telefone"]');

        let error = false;

        if (!nome.value) {
            this.addError(nome, 'O campo nome é obrigatório.');
            error = true;
        }

        if (email.value && !validator.isEmail(email.value)) {
            this.addError(email, 'E-mail inválido.');
            error = true;
        }
            
        if (!email.value && !telefone.value) {
            this.addError(email, 'Ao menos um e-mail ou telefone deve ser informado.');
            this.addError(telefone, 'Ao menos um e-mail ou telefone deve ser informado.');
            error = true;
        }

        if (!error) this.form.submit();
    }

    addError(field, msg) {
        let div = document.createElement('div');
        div.innerText = msg;
        div.classList.add('error-text');
        field.insertAdjacentElement('afterend', div);
    }
}