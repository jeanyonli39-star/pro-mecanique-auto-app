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
