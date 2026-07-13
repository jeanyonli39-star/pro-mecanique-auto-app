
// ===============================
// FIREBASE - PRO MECANIQUE AUTO
// ===============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDBtZTROKkGWZ1WeX3KLXvyXe48oS1B3zg",
  authDomain: "promecaniqueauto.firebaseapp.com",
  projectId: "promecaniqueauto",
  storageBucket: "promecaniqueauto.firebasestorage.app",
  messagingSenderId: "951329003648",
  appId: "1:951329003648:web:cf3c514a2a8823b28eee65"
};

// Initialisation
const app = initializeApp(firebaseConfig);

// Services Firebase
const auth = getAuth(app);
const db = getFirestore(app);

// Les rendre disponibles dans toute l'application
window.auth = auth;
window.db = db;

console.log("✅ Firebase initialisé avec succès !");
