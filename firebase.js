// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyDBtZTROKkGWZ1WeX3KLXvyXe48oS1B3zg",
  authDomain: "promecaniqueauto.firebaseapp.com",
  projectId: "promecaniqueauto",
  storageBucket: "promecaniqueauto.firebasestorage.app",
  messagingSenderId: "951329003648",
  appId: "1:951329003648:web:cf3c514a2a8823b28eee65"
};

const app = initializeApp(firebaseConfig);

console.log("Firebase connecté !");
