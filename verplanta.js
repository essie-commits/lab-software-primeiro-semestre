import { db, doc, getDoc, updateDoc, deleteDoc, mostrarMensagem } from './back-end.js';

const url = new URLSearchParams(window.location.search);
const plantaId = url.get('id');

console.log(plantaId);

if (!plantaId) {
    mostrarMensagem('Não é possível visualizar esta plantação.', '#e74c3c');
    setTimeout(() => { window.location.href = 'minhasplantas.html'; }, 2000);
    throw new Error('ID não encontrado');
};

async function carregarDados() {
    try {
        const docRef = doc(db, 'plantas', plantaId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

            let dados = docSnap.data();

            document.getElementById('verplanta_nome').value = dados.nome || '';
            document.getElementById('verplanta_inicio').value = dados.inicio || '';
            document.getElementById('verplanta_tipo').value = dados.tipo || '';
            document.getElementById('verplanta_local').value = dados.local || '';
            document.getElementById('verplanta_colher').value = dados.colheita || '';
        
        } else {
            mostrarMensagem('Planta não encontrada', '#e74c3c');
            setTimeout(() => { window.location.href = 'minhasplantas.html'; }, 2000);
        }

    } catch (error) {
        console.error(error);
        mostrarMensagem('Erro ao carregar dados', '#e74c3c');
    }

    
};

carregarDados();

const btnEditar = document.getElementById('verplanta_editar');

const btnSalvar = document.getElementById('verplanta_salvar');

let editando = false;

btnEditar.addEventListener('click', async (e) => {

    const inputs = ['verplanta_nome', 'verplanta_inicio', 'verplanta_local', 'verplanta_colher'];
    const select = document.getElementById('verplanta_tipo');

    if (!editando) {
        inputs.forEach(id => document.getElementById(id).readOnly = false);
        if (select) select.disabled = false;
        btnSalvar.disabled = false;
        btnEditar.textContent = 'Cancelar';
        editando = true;
    } else {
        await carregarDados(); 
        inputs.forEach(id => document.getElementById(id).readOnly = true);
        if (select) select.disabled = true;
        btnSalvar.disabled = true;
        btnEditar.textContent = 'Editar';
        editando = false;
    }

})

document.getElementById('verplanta').addEventListener('submit', async (e) => {
    e.preventDefault();

if (editando) {

    const novosDados = {
        nome: document.getElementById('verplanta_nome').value,
        inicio: document.getElementById('verplanta_inicio').value,
        tipo: document.getElementById('verplanta_tipo').value,
        local: document.getElementById('verplanta_local').value,
        colheita: document.getElementById('verplanta_colher').value
    };

    try {
        const docRef = doc(db, 'plantas', plantaId);
        await updateDoc(docRef, novosDados);
        mostrarMensagem('Planta atualizada com sucesso!', '#2ecc71');
        
        await carregarDados(); 

        const inputs = ['verplanta_nome', 'verplanta_inicio', 'verplanta_local', 'verplanta_colher'];
        inputs.forEach(id => document.getElementById(id).readOnly = true);
        document.getElementById('verplanta_tipo').disabled = true;
        btnSalvar.disabled = true;
        btnEditar.textContent = 'Editar';
        editando = false;
    } catch (error) {
        console.error(error);
        mostrarMensagem('Erro ao atualizar planta', '#e74c3c');
    }
    }
});

const irMinhasPlantas = document.getElementById('minhasplantas_retornar');

irMinhasPlantas.addEventListener('click', (e) => {
  window.location.href = "minhasplantas.html";  
});

const btnDeletar = document.getElementById('verplanta_deletar');

if (btnDeletar) {
    btnDeletar.addEventListener('click', async () => {

        try {
            const docRef = doc(db, 'plantas', plantaId);
            await deleteDoc(docRef);
            mostrarMensagem('Planta excluída com sucesso!', '#2ecc71');
            setTimeout(() => {
                window.location.href = 'minhasplantas.html';
            }, 1500);
        } catch (error) {
            console.error('Erro ao excluir:', error);
            mostrarMensagem('Erro ao excluir a planta. Tente novamente.', '#e74c3c');
        }
    });
}