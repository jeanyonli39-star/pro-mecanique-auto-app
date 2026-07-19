// ===============================
// AUTH - PRO MECANIQUE AUTO
// ===============================

import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// Récupération des éléments HTML

const btnCreerCompte = document.getElementById("btnCreerCompte");
const btnConnexionCompte = document.getElementById("btnConnexionCompte");


// Champs inscription

const nom = document.getElementById("nom");
const email = document.getElementById("email");
const motdepasse = document.getElementById("motdepasse");
const telephone = document.getElementById("telephone");
const ville = document.getElementById("ville");
const metier = document.getElementById("metier");
const description = document.getElementById("description");
const typeCompte = document.getElementById("typeCompte");


// ===============================
// CREATION DE COMPTE ARTISAN
// ===============================

btnCreerCompte.addEventListener("click", async () => {

    try {

        const utilisateur = await createUserWithEmailAndPassword(
            auth,
            email.value,
            motdepasse.value
        );


        const uid = utilisateur.user.uid;


        await setDoc(doc(db, "artisans", uid), {

            nom: nom.value,
            email: email.value,
            telephone: telephone.value,
            ville: ville.value,
            metier: metier.value,
            description: description.value,
            typeCompte: typeCompte.value,
            uid: uid,
            dateCreation: new Date()

        });


        alert("✅ Inscription réussie !");


    } catch (erreur) {

        alert("Erreur inscription : " + erreur.message);

    }

});



// ===============================
// CONNEXION
// ===============================

btnConnexionCompte.addEventListener("click", async () => {

    try {

        await signInWithEmailAndPassword(
            auth,
            email.value,
            motdepasse.value
        );


        alert("✅ Connexion réussie !");


    } catch (erreur) {

        alert("Erreur connexion : " + erreur.message);

    }

});
