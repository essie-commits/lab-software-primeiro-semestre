import { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword,
collection, signOut, addDoc, getDoc, getDocs, updateDoc, deleteDoc, setDoc, doc } from './firebase-config.js';

function mostrarMensagem(texto, cor = 'red') {
    let msg = document.getElementById('mensagem-flutuante');
    if (!msg) {
        msg = document.createElement('div');
        msg.id = 'mensagem-flutuante';
        msg.style.position = 'fixed';
        msg.style.bottom = '20px';
        msg.style.right = '20px';
        msg.style.backgroundColor = cor;
        msg.style.color = 'white';
        msg.style.padding = '10px 20px';
        msg.style.borderRadius = '8px';
        msg.style.fontFamily = 'Arial';
        msg.style.zIndex = '999';
        document.body.appendChild(msg);
    }
    msg.textContent = texto;
    msg.style.backgroundColor = cor;
    msg.style.display = 'block';
    setTimeout(() => {
        msg.style.display = 'none';
    }, 3000);
}

async function cadastrarUsuario(email, senha, nome) {
    try {
        const usuario = await createUserWithEmailAndPassword(auth, email, senha);
        const uid = usuario.user.uid;

        await setDoc(doc(db, "usuarios", uid), {
            nome: nome,
            email: email
        });

        localStorage.setItem('nomeUsuario', nome);
        
        window.location.href = "minhasplantas.html";
    } catch (error) {
        mostrarMensagem('Email ou senha inválidos!', '#e74c3c')
    }
}

async function fazerLogin(email, senha) {
    try {
        const usuario = await signInWithEmailAndPassword(auth, email, senha);

        const uid = usuario.user.uid;

        const docRef = doc(db, "usuarios", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const nome = docSnap.data().nome;
            localStorage.setItem('nomeUsuario', nome);
        } else {
            localStorage.setItem('nomeUsuario', 'Visitante');
        }

        window.location.href = "minhasplantas.html";

    } catch (error) {
        mostrarMensagem('Email ou senha inválidos!', '#e74c3c')
    }
}

async function fazerLogoff() {
    try {
        await signOut(auth);
        localStorage.clear();
        window.location.href = "index.html";
    } catch (error) {
        mostrarMensagem('Erro ao sair. Tente novamente.', '#e74c3c');
    }
}


async function salvarPlanta(nome, inicio, tipo, local, colheita) {

    try {
        await addDoc(collection(db, "plantas"), {
        nome: nome,
        inicio: inicio,
        tipo: tipo,
        local: local,
        colheita: colheita
    });

    } catch (error) {
    
        console.error(error);

    }
}

async function buscarPlantas() {
    const snap = await getDocs(collection(db, "plantas"));

    let lista = [];

    snap.forEach((d) => {

        lista.push({ id: d.id, ...d.data() });
    });

    return lista;
}

export { db, doc, getDoc, updateDoc, deleteDoc, mostrarMensagem, cadastrarUsuario, fazerLogin, fazerLogoff, salvarPlanta, buscarPlantas };
