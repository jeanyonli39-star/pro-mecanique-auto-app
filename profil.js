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

const telephoneArtisan =
  document.getElementById("telephoneArtisan");

const telephoneWhatsApp =
  document.getElementById("telephoneWhatsApp");

const telephoneSecretaire =
  document.getElementById("telephoneSecretaire");

const zoneWhatsApp =
  document.getElementById("zoneWhatsApp");

const zoneSecretaire =
  document.getElementById("zoneSecretaire");

const descriptionArtisan =
  document.getElementById("descriptionArtisan");

const btnWhatsApp =
  document.getElementById("btnWhatsApp");

const photoArtisan =
  document.getElementById("photoArtisan");

const photoInput =
  document.getElementById("photoInput");

const btnChangerPhoto =
  document.getElementById("btnChangerPhoto");


// ===============================
// Fonction pour préparer un numéro
// ===============================

function nettoyerNumero(numero) {

  if (!numero) return "";

  let resultat = numero
    .toString()
    .replace(/\s+/g, "")
    .replace(/-/g, "")
    .replace(/\(/g, "")
    .replace(/\)/g, "");

  // Si le numéro commence déjà par +226
  if (resultat.startsWith("+226")) {
    resultat = resultat.substring(4);
  }

  // Si le numéro commence par 226
  else if (resultat.startsWith("226")) {
    resultat = resultat.substring(3);
  }

  // Si le numéro commence par 0
  resultat = resultat.replace(/^0+/, "");

  return resultat;
}


// ===============================
// Création d'un bouton Appeler
// ===============================

function creerBoutonAppel(numero, texte) {

  if (!numero) return null;

  const bouton = document.createElement("a");

  bouton.href = "tel:+226" + nettoyerNumero(numero);

  bouton.textContent = texte;

  bouton.className = "btn call";

  bouton.style.display = "inline-block";
  bouton.style.marginTop = "8px";
  bouton.style.marginRight = "8px";
  bouton.style.textDecoration = "none";

  return bouton;
}


// ===============================
// Chargement du profil
// ===============================

async function chargerProfil() {

  if (!uid) {

    nomArtisan.textContent =
      "Artisan introuvable";

    return;
  }

  try {

    const docRef =
      doc(db, "artisans", uid);

    const docSnap =
      await getDoc(docRef);


    if (!docSnap.exists()) {

      nomArtisan.textContent =
        "Artisan introuvable";

      return;
    }


    const artisan =
      docSnap.data();


    // ===============================
    // Informations générales
    // ===============================

    nomArtisan.textContent =
      artisan.nom || "";

    metierArtisan.textContent =
      artisan.metier || "";

    villeArtisan.textContent =
      artisan.ville || "";

    telephoneArtisan.textContent =
      artisan.telephone || "";

    telephoneWhatsApp.textContent =
      artisan.telephoneWhatsApp || "";

    telephoneSecretaire.textContent =
      artisan.telephoneSecretaire || "";

    descriptionArtisan.textContent =
      artisan.description || "";


    // ===============================
    // Numéro principal
    // ===============================

    const ancienBoutonPrincipal =
      document.getElementById("btnAppelPrincipal");

    if (ancienBoutonPrincipal) {
      ancienBoutonPrincipal.remove();
    }

    if (artisan.telephone) {

      const boutonPrincipal =
        creerBoutonAppel(
          artisan.telephone,
          "📞 Appeler"
        );

      if (boutonPrincipal) {

        boutonPrincipal.id =
          "btnAppelPrincipal";

        telephoneArtisan.parentElement
          .appendChild(boutonPrincipal);
      }

    }


    // ===============================
    // WhatsApp
    // ===============================

    if (artisan.telephoneWhatsApp) {

      const numeroWhatsApp =
        nettoyerNumero(
          artisan.telephoneWhatsApp
        );

      btnWhatsApp.href =
        `https://wa.me/226${numeroWhatsApp}?text=Bonjour%20${encodeURIComponent(artisan.nom || "")}%2C%20je%20vous%20contacte%20depuis%20Pro%20Mécanique%20Auto.`;

      btnWhatsApp.style.display =
        "inline-block";

      zoneWhatsApp.style.display =
        "block";

    } else {

      zoneWhatsApp.style.display =
        "none";
    }


    // ===============================
    // Numéro du secrétaire
    // ===============================

    const ancienBoutonSecretaire =
      document.getElementById(
        "btnAppelSecretaire"
      );

    if (ancienBoutonSecretaire) {
      ancienBoutonSecretaire.remove();
    }


    if (artisan.telephoneSecretaire) {

      zoneSecretaire.style.display =
        "block";


      const boutonSecretaire =
        creerBoutonAppel(
          artisan.telephoneSecretaire,
          "📞 Appeler le secrétaire"
        );


      if (boutonSecretaire) {

        boutonSecretaire.id =
          "btnAppelSecretaire";

        telephoneSecretaire.parentElement
          .appendChild(boutonSecretaire);
      }

    } else {

      zoneSecretaire.style.display =
        "none";
    }


    // ===============================
    // Photo déjà enregistrée
    // ===============================

    if (artisan.photoURL) {

      photoArtisan.src =
        artisan.photoURL;

    } else {

      photoArtisan.src =
        "images/profil.png";
    }


  } catch (erreur) {

    console.error(
      "Erreur chargement profil :",
      erreur
    );

    nomArtisan.textContent =
      "Erreur de chargement du profil";
  }
}


// ===============================
// Lancer le chargement
// ===============================

chargerProfil();


// ===============================
// Changer la photo
// ===============================

if (btnChangerPhoto && photoInput) {

  btnChangerPhoto.addEventListener(
    "click",
    function () {

      photoInput.click();

    }
  );
}


// ===============================
// Sélection et enregistrement
// de la photo
// ===============================

if (photoInput) {

  photoInput.addEventListener(
    "change",
    async function () {

      const fichier =
        this.files[0];

      if (!fichier) return;


      try {

        // Affichage immédiat
        photoArtisan.src =
          URL.createObjectURL(fichier);


        // Nom unique
        const nomFichier =
          Date.now() +
          "_" +
          fichier.name;


        // Emplacement Firebase Storage
        const cheminPhoto =
          ref(
            storage,
            "photos-profils/" +
            uid +
            "/" +
            nomFichier
          );


        // Envoi de la photo
        await uploadBytes(
          cheminPhoto,
          fichier
        );


        // Récupération de l'URL
        const urlPhoto =
          await getDownloadURL(
            cheminPhoto
          );


        // Affichage de la photo
        photoArtisan.src =
          urlPhoto;


        // Enregistrement dans Firestore
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


        // Image par défaut
        photoArtisan.src =
          "images/profil.png";


        alert(
          "❌ Impossible d'enregistrer la photo. Le stockage Firebase doit être activé pour utiliser cette fonction."
        );
      }

    }
  );
}
