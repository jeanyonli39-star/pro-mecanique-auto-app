// ===============================
// PRO MECANIQUE AUTO
// ===============================

console.log("Pro Mécanique Auto chargé");

// ---------- INSCRIPTION ----------

const btnInscription = document.getElementById("btnInscription");
const zoneAuth = document.getElementById("zoneAuth");

if (btnInscription && zoneAuth) {
    btnInscription.addEventListener("click", () => {
        zoneAuth.style.display = "block";
        document.getElementById("zoneConnexion").style.display = "none";
    });
}

// ---------- CONNEXION ----------

const btnConnexion = document.getElementById("btnConnexion");
const zoneConnexion = document.getElementById("zoneConnexion");

if (btnConnexion && zoneConnexion) {
    btnConnexion.addEventListener("click", () => {
        zoneConnexion.style.display = "block";
        zoneAuth.style.display = "none";
    });
}

// ---------- CREATION COMPTE ----------

const btnCreerCompte = document.getElementById("btnCreerCompte");

if (btnCreerCompte) {

    btnCreerCompte.addEventListener("click", () => {

        const nom = document.getElementById("nom").value.trim();
        const email = document.getElementById("email").value.trim();
        const motdepasse = document.getElementById("motdepasse").value.trim();
        const typeCompte = document.getElementById("typeCompte").value;

        if (!nom || !email || !motdepasse) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        alert("Le formulaire d'inscription est prêt.");
    });

}

// ---------- CONNEXION ----------

const btnConnexionCompte = document.getElementById("btnConnexionCompte");

if (btnConnexionCompte) {

    btnConnexionCompte.addEventListener("click", () => {

        const email = document.getElementById("emailConnexion").value.trim();
        const motdepasse = document.getElementById("motdepasseConnexion").value.trim();

        if (!email || !motdepasse) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        alert("Le formulaire de connexion est prêt.");

    });

}
