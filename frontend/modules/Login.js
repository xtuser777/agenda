import validator from "validator";

export default class Login {
    constructor(formClass) {
        if (!formClass || typeof formClass !== 'string') {
            console.error('Constructor param invalid.');
            return;
        }

        this.form = document.querySelector(formClass);
    }

    init = () => (this.form) ? this.addListeners() : null;

    addListeners = () => this.form.addEventListener("submit", e => this.formEvent(e));

    formEvent(e) {
        e.preventDefault();
        this.validate();
    }

    validate() {
        for (let error of this.form.querySelectorAll('.error-text')) {
            error.remove();
        }

        let email = this.form.querySelector('input[name="email"]');
        let password = this.form.querySelector('input[name="password"]');

        let error = false;

        if (!validator.isEmail(email.value)) {
            this.addError(email, 'E-mail inválido.');
            error = true;
        }

        if (password.value.length < 3 || password.value.length > 50) {
            this.addError(password, 'A senha precisa ter entre 3 e 50 caracteres.');
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