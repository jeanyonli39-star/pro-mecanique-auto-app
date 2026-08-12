// ===============================
// PROFIL ARTISAN
// Partie 1
// ===============================

import { db, storage } from "./firebase.js";

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
const btnWhatsApp = document.getElementById("btnWhatsApp");const photoArtisan = document.getElementById("photoArtisan");
const photoInput = document.getElementById("photoInput");
const btnChangerPhoto = document.getElementById("btnChangerPhoto");

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
    const numero = artisan.telephone.replace(/\s+/g, "");

btnWhatsApp.href =
`https://wa.me/226${numero}?text=Bonjour%20${encodeURIComponent(artisan.nom)},%20je%20vous%20contacte%20depuis%20Pro%20Mécanique%20Auto.`;

}

chargerProfil();// ===============================
// Choix d'une photo
// ===============================

btnChangerPhoto.addEventListener("click", function () {

    photoInput.click();

});

photoInput.addEventListener("change", function () {

    const fichier = this.files[0];

    if (!fichier) return;

    const lecteur = new FileReader();

    lecteur.onload = function (e) {

        photoArtisan.src = e.target.result;

    };

    lecteur.readAsDataURL(fichier);

});
