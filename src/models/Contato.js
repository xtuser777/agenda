const validator = require("validator");

class Contato {
  constructor(nome, sobrenome, email, telefone) {
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.email = email;
    this.telefone = telefone;
    this.errors = [];
    this.contato = null;
  }

  validate() {
    this.clear();
    if (!this.nome) this.errors.push("O campo nome é obrigatório.");
    if (this.email && !validator.isEmail(this.email))
      this.errors.push("E-mail inválido.");
    if (!this.email && !this.telefone)
      this.errors.push("Ao menos um e-mail ou telefone deve ser informado.");
  }

  clear() {
    for (let key in this) {
      if (typeof this[key] !== "string") this[key] = "";
    }

    this.nome = this.nome;
    this.sobrenome = this.sobrenome;
    this.email = this.email;
    this.telefone = this.telefone;
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
