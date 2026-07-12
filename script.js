// ===============================
// PRO MECANIQUE AUTO
// Script principal
// ===============================

console.log("Pro Mécanique Auto chargé");

// -------------------------------
// Afficher le formulaire d'inscription
// -------------------------------

const btnInscription = document.getElementById("btnInscription");
const zoneAuth = document.getElementById("zoneAuth");

if (btnInscription && zoneAuth) {
    btnInscription.addEventListener("click", () => {
        zoneAuth.style.display = "block";
    });
}

// -------------------------------
// Bouton créer un compte
// -------------------------------

const btnCreerCompte = document.getElementById("btnCreerCompte");

if (btnCreerCompte) {

    btnCreerCompte.addEventListener("click", () => {

        const nom = document.getElementById("nom").value.trim();
        const email = document.getElementById("email").value.trim();
        const motdepasse = document.getElementById("motdepasse").value.trim();
        const typeCompte = document.getElementById("typeCompte").value;

        if (
            nom === "" ||
            email === "" ||
            motdepasse === ""
        ) {

            alert("Veuillez remplir tous les champs.");

            return;
        }

        alert(
            "Informations reçues :\n\n" +
            "Nom : " + nom +
            "\nEmail : " + email +
            "\nType : " + typeCompte
        );

    });

}
