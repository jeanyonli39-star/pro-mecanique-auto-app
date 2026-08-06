// ===============================
// PROFIL ARTISAN
// Partie 1
// ===============================

import { db } from "./firebase.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);

const uid = params.get("uid");

const nomArtisan = document.getElementById("nomArtisan");
const metierArtisan = document.getElementById("metierArtisan");
const villeArtisan = document.getElementById("villeArtisan");
const telephoneArtisan = document.getElementById("telephoneArtisan");
const descriptionArtisan = document.getElementById("descriptionArtisan");
const btnWhatsApp = document.getElementById("btnWhatsApp");

// ===============================
// Partie 2 : Chargement du profil
// ===============================

async function chargerProfil() {

    if (!uid) {

        nomArtisan.textContent = "Artisan introuvable";
        return;

    }

    const docRef = doc(db, "artisans", uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {

        nomArtisan.textContent = "Artisan introuvable";
        return;

    }

    const artisan = docSnap.data();

    nomArtisan.textContent = artisan.nom;
    metierArtisan.textContent = artisan.metier;
    villeArtisan.textContent = artisan.ville;
    telephoneArtisan.textContent = artisan.telephone;
    descriptionArtisan.textContent = artisan.description;

}

chargerProfil();
