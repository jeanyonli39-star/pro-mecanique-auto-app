// ===============================
// PROFIL ARTISAN
// ===============================

import { db, storage } from "./firebase.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

import {
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// ===============================
// Récupération de l'artisan
// ===============================

const params = new URLSearchParams(window.location.search);
const uid = params.get("uid");

// ===============================
// Éléments de la page
// ===============================

const nomArtisan = document.getElementById("nomArtisan");
const metierArtisan = document.getElementById("metierArtisan");
const villeArtisan = document.getElementById("villeArtisan");
const telephoneArtisan = document.getElementById("telephoneArtisan")
const telephoneWhatsApp = document.getElementById("telephoneWhatsApp");
const telephoneSecretaire = document.getElementById("telephoneSecretaire");
const zoneWhatsApp = document.getElementById("zoneWhatsApp");
const zoneSecretaire = document.getElementById("zoneSecretaire");
const descriptionArtisan = document.getElementById("descriptionArtisan");

const btnWhatsApp = document.getElementById("btnWhatsApp");

const photoArtisan = document.getElementById("photoArtisan");
const photoInput = document.getElementById("photoInput");
const btnChangerPhoto = document.getElementById("btnChangerPhoto");

// ===============================
// Chargement du profil
// ===============================

async function chargerProfil() {

  if (!uid) {

    nomArtisan.textContent = "Artisan introuvable";
    return;

  }

  try {

    const docRef = doc(db, "artisans", uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {

      nomArtisan.textContent = "Artisan introuvable";
      return;

    }

    const artisan = docSnap.data();

    // Informations de l'artisan
    nomArtisan.textContent = artisan.nom || "";
    metierArtisan.textContent = artisan.metier || "";
    villeArtisan.textContent = artisan.ville || "";
    telephoneArtisan.textContent = artisan.telephone || "";
    if (!artisan.telephoneWhatsApp) {
  zoneWhatsApp.style.display = "none";
}

if (!artisan.telephoneSecretaire) {
  zoneSecretaire.style.display = "none";
}
    descriptionArtisan.textContent = artisan.description || "";

    // ===============================
    // WhatsApp
    // ===============================

    if (artisan.telephone) {

      const numero = artisan.telephone.replace(/\s+/g, "");

      btnWhatsApp.href =
        `https://wa.me/226${numero}?text=Bonjour%20${encodeURIComponent(artisan.nom || "")},%20je%20vous%20contacte%20depuis%20Pro%20Mécanique%20Auto.`;

    }

    // ===============================
    // Photo déjà enregistrée
    // ===============================

    if (artisan.photoURL) {

      photoArtisan.src = artisan.photoURL;

    } else {

      photoArtisan.src = "images/profil.png";

    }

  } catch (erreur) {

    console.error("Erreur chargement profil :", erreur);

    nomArtisan.textContent = "Erreur de chargement du profil";

  }

}

// Lancer le chargement
chargerProfil();
// ===============================
// Changer la photo
// ===============================

btnChangerPhoto.addEventListener("click", function () {

  photoInput.click();

});


// ===============================
// Sélection et enregistrement
// de la photo
// ===============================

photoInput.addEventListener("change", async function () {

  const fichier = this.files[0];

  if (!fichier) return;

  try {

    // Affichage immédiat de la photo choisie
    photoArtisan.src = URL.createObjectURL(fichier);

    // Nom unique pour la photo
    const nomFichier =
      Date.now() + "_" + fichier.name;

    // Emplacement dans Firebase Storage
    const cheminPhoto = ref(
      storage,
      "photos-profils/" + uid + "/" + nomFichier
    );

    // Envoi de la photo
    await uploadBytes(
      cheminPhoto,
      fichier
    );

    // Récupération de l'adresse de la photo
    const urlPhoto =
      await getDownloadURL(cheminPhoto);

    // Affichage de la photo enregistrée
    photoArtisan.src = urlPhoto;

    // Enregistrement de l'adresse dans Firestore
    const artisanRef =
      doc(db, "artisans", uid);

    await updateDoc(
      artisanRef,
      {
        photoURL: urlPhoto
      }
    );

    alert(
      "✅ Photo de profil enregistrée avec succès !"
    );

  } catch (erreur) {

    console.error(
      "Erreur lors de l'enregistrement de la photo :",
      erreur
    );

    // Remettre l'image par défaut
    photoArtisan.src =
      "images/profil.png";

    alert(
      "❌ Impossible d'enregistrer la photo. Vérifiez les règles Firebase Storage."
    );

  }

});
