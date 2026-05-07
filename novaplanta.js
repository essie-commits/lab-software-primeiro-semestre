import { salvarPlanta, mostrarMensagem } from "./back-end.js";

const cadastrarPlanta = document.getElementById('novaplanta');

const janelaSucesso = document.getElementById('novaplanta_sucesso');

const mostrarResultado = document.getElementById('novaplanta_mostrar');

const irMinhasPlantas = document.getElementById('btn_ir_minhasplantas');

irMinhasPlantas.addEventListener('click', (e) => {
    window.location.href = "minhasplantas.html";
});

const fecharJanela = document.getElementById('novaplanta_fechar');

fecharJanela.addEventListener("click", (e) => {
    janelaSucesso.close();
});

cadastrarPlanta.addEventListener("submit", async (e) => {
    e.preventDefault();

    let nome = document.getElementById('novaplanta_nome').value;
    let inicio = document.getElementById('novaplanta_inicio').value;
    let tipo = document.getElementById('novaplanta_tipo').value;
    let local = document.getElementById('novaplanta_local').value;
    let colheita = document.getElementById('novaplanta_colher').value;

    try {
        
        await salvarPlanta(nome, inicio, tipo, local, colheita);

        let novaPlanta = `Você registrou uma nova plantação!` + `<br>` + `Nome: ${nome}` + `<br>` + `Foi plantada em: ${inicio}` + `<br>` + `Tipo: ${tipo}`;

        if (local && local.trim() !== '') {
            novaPlanta += `<br>` + `Local de Plantio: ${local}`
        }

        if (colheita !== '') {
            novaPlanta += `<br>` + `Este cultivo estará em fase de colheita após ${colheita} dias`
        }

        mostrarResultado.innerHTML = novaPlanta;

        janelaSucesso.showModal()

    } catch (error) {
    
        console.error(error);
        mostrarMensagem('Erro ao salvar a planta. Tente novamente.', '#e74c3c');
    
    }

});

const irVisualizarPlanta = document.getElementById('minhasplantas_retornar');

irVisualizarPlanta.addEventListener('click', (e) => {
    window.location.href = "minhasplantas.html";
})