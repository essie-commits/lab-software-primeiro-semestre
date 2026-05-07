import { cadastrarUsuario, mostrarMensagem } from './back-end.js';

const senha = document.getElementById('novousuario_senha');
const mostrarSenha = document.getElementById('novousuario_mostrarsenha');

mostrarSenha.addEventListener(`click`, () => {
    if (senha.type === 'password') {
        senha.type = 'text';
        mostrarSenha.textContent = 'Esconder'
    } else {
        senha.type = 'password';
        mostrarSenha.textContent = 'Mostrar'
    }
});

const confirmar = document.getElementById('novousuario_confirmarsenha');
const mostrarConfirm = document.getElementById('novousuario_mostrarconfirm');

mostrarConfirm.addEventListener(`click`, () => {
    if (confirmar.type === 'password') {
        confirmar.type = 'text';
        mostrarConfirm.textContent = 'Esconder'
    } else {
        confirmar.type = 'password';
        mostrarConfirm.textContent = 'Mostrar'
    }
});


document.getElementById('novousuario').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('novousuario_nome').value;
    const email = document.getElementById('novousuario_email').value;
    const senha = document.getElementById('novousuario_senha').value;
    const confirmar = document.getElementById('novousuario_confirmarsenha').value;

    if (senha !== confirmar) {
        mostrarMensagem('Senhas diferentes!', '#e74c3c');
        return
    }

    try {
        await cadastrarUsuario(email, senha, nome);
    } catch (error) {
        mostrarMensagem('Email ou senha inválidos!', '#e74c3c');
}

});