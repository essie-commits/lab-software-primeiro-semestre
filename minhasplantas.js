import { fazerLogoff, mostrarMensagem, buscarPlantas } from './back-end.js';

const espacoNome = document.getElementById('minhasplantas_nome');

const usuarioNome = localStorage.getItem('nomeUsuario');

espacoNome.innerText = usuarioNome || 'Visitante';

const refresh = document.getElementById('minhasplantas_recarregar');

refresh.addEventListener('click', (e) => {
    window.location.reload();
});

const containerPlantas = document.getElementById('container_planta');

async function exibirPlantas() {

    try {

        const plantas = await buscarPlantas();

        if (plantas.length === 0) {
            containerPlantas.innerHTML = `Você ainda não cadastrou uma plantação. Vamos lá!`
            return
        } else {

        let cardPlanta = '';

        for (const planta of plantas) {
            cardPlanta += `<h3>${planta.nome}</h3>` + `${planta.tipo} | ${planta.inicio}` + `<button class="visualizar-planta" data-id="${planta.id}">Visualizar</button>`           
        }

        containerPlantas.innerHTML = cardPlanta;

        document.querySelectorAll('.visualizar-planta').forEach(botao => {
            
            botao.addEventListener('click', (e) => {
                const id = botao.getAttribute('data-id');
                console.log(id);
                window.location.href = `verplanta.html?id=${id}`
            })
        })

    }
    }

    catch (error) {
        console.error('Erro ao carregar plantas:', error);
        containerPlantas.innerHTML = '<p>Erro ao carregar as plantas. Tente novamente mais tarde.</p>';
        mostrarMensagem('Erro ao buscar plantas', '#e74c3c');
    }
    
}

exibirPlantas();

const logoff = document.getElementById('sair_eva');

logoff.addEventListener('click', async (e) => {
    try {
        await fazerLogoff();
    } catch (error) {
        mostrarMensagem('Não foi possível sair desse usuário')
    }
});

const irCadastrarPlanta = document.getElementById('ir_cadastrarplantas');

irCadastrarPlanta.addEventListener('click', (e) => {
  window.location.href = "novaplanta.html";  
});