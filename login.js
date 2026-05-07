import { fazerLogin, mostrarMensagem } from './back-end.js';

const senha = document.getElementById('login_senha');
const mostrarSenha = document.getElementById('login_mostrar');

mostrarSenha.addEventListener(`click`, () => {
    if (senha.type === 'password') {
        senha.type = 'text';
        mostrarSenha.textContent = 'Esconder'
    } else {
        senha.type = 'password';
        mostrarSenha.textContent = 'Mostrar'
    }
});

document.getElementById('login').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login_email').value;
    const senha = document.getElementById('login_senha').value;

    try {
        await fazerLogin(email, senha);
    } catch (error) {
        mostrarMensagem('Email ou senha inválidos!', '#e74c3c');
    }

});