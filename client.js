import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// Éléments de la page
const nomClient = document.getElementById("nomClient");
const typeCompteClient = document.getElementById("typeCompteClient");
const emailClient = document.getElementById("emailClient");
const telephoneClient = document.getElementById("telephoneClient");
const villeClient = document.getElementById("villeClient");

const btnDeconnexion = document.getElementById("btnDeconnexion");
const btnAccueil = document.getElementById("btnAccueil");


// Vérifier si un utilisateur est connecté
onAuthStateChanged(auth, async (user) => {

  // Aucun utilisateur connecté
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  try {

    // Récupérer les informations du client
    const clientRef = doc(db, "clients", user.uid);
    const clientSnap = await getDoc(clientRef);

    if (clientSnap.exists()) {

      const client = clientSnap.data();

      // Afficher les informations
      nomClient.textContent = client.nom || "Client";
      typeCompteClient.textContent = client.typeCompte || "client";
      emailClient.textContent = client.email || user.email || "Non renseigné";

      // Ces deux informations seront affichées lorsqu'elles
      // seront enregistrées dans le profil client
      telephoneClient.textContent = client.telephone || "Non renseigné";
      villeClient.textContent = client.ville || "Non renseignée";

    } else {

      // Le compte Firebase existe mais le document client n'existe pas
      nomClient.textContent = user.displayName || "Client";
      typeCompteClient.textContent = "client";
      emailClient.textContent = user.email || "Non renseigné";
      telephoneClient.textContent = "Non renseigné";
      villeClient.textContent = "Non renseignée";

    }

  } catch (erreur) {

    console.error("Erreur lors du chargement du compte client :", erreur);

    nomClient.textContent = "Erreur de chargement";
    typeCompteClient.textContent = "";
    emailClient.textContent = "";
    telephoneClient.textContent = "";
    villeClient.textContent = "";

  }

});


// Bouton Déconnexion
btnDeconnexion.addEventListener("click", async () => {

  try {

    await signOut(auth);

    window.location.href = "index.html";

  } catch (erreur) {

    console.error("Erreur lors de la déconnexion :", erreur);

    alert("Impossible de se déconnecter. Veuillez réessayer.");

  }

});


// Bouton Retour à l'accueil
btnAccueil.addEventListener("click", () => {

  window.location.href = "index.html";

});
