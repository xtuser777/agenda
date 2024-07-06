import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/Login';
import Cadastro from './modules/Contato';

import './assets/css/style.css';

const login = new Login('.form-login');
const loginCadastro = new Login('.form-login-cadastro');
const cadastro = new Cadastro('.form-contato-cadastro');

login.init();
loginCadastro.init();
cadastro.init();

console.log('boilerplate configurado!');