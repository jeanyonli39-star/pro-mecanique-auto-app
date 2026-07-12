// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDBtZTROKkGWZ1WeX3KLXvyXe48oS1B3zg",
  authDomain: "promecaniqueauto.firebaseapp.com",
  projectId: "promecaniqueauto",
  storageBucket: "promecaniqueauto.firebasestorage.app",
  messagingSenderId: "951329003648",
  appId: "1:951329003648:web:cf3c514a2a8823b28eee65"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Firebase Authentication
const auth = getAuth(app);

// Exporter pour les autres fichiers
export { auth, createUserWithEmailAndPassword };

console.log("Firebase connecté !");
