// ===============================
// ARTISANS - PRO MECANIQUE AUTO
// Partie 1
// ===============================

import { db } from "./firebase.js";

import {
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const metier = params.get("metier");

const titre = document.getElementById("titreMetier");
const message = document.getElementById("message");

if (metier) {
  titre.textContent = metier;
  }
// ===============================
// Partie 2 : Affichage des artisans
// ===============================

async function chargerArtisans() {

  if (!metier) return;

  const q = query(
    collection(db, "artisans"),
    where("metier", "==", metier)
  );

  const resultat = await getDocs(q);

  if (resultat.empty) {
    message.textContent =
      "Aucun artisan inscrit dans cette catégorie pour le moment.";
    return;
  }

  message.innerHTML = "";

  resultat.forEach((doc) => {

    const artisan = doc.data();

    message.innerHTML += `
      <div class="vente-box" style="margin-bottom:20px;">
        <h3>${artisan.nom}</h3>
        <p><strong>Métier :</strong> ${artisan.metier}</p>
        <p><strong>Ville :</strong> ${artisan.ville}</p>
        <p><strong>Téléphone :</strong> ${artisan.telephone}</p>
        <p><strong>Description :</strong> ${artisan.description}</p>
      </div>
    `;

  });

}

chargerArtisans();
