import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import { getFirestore, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCsY3AymWdY5BkWyaILsG39D9e-zIZIyh8",
    authDomain: "projeto-eva-9c0e2.firebaseapp.com",
    projectId: "projeto-eva-9c0e2",
    storageBucket: "projeto-eva-9c0e2.firebasestorage.app",
    messagingSenderId: "548381110902",
    appId: "1:548381110902:web:44035da8cc8bfa091e2557",
    measurementId: "G-CQB14KF9H4"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db, updateDoc, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, collection, addDoc, getDoc, getDocs, deleteDoc, setDoc, doc };