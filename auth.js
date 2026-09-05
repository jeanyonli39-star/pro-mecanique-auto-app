// ===============================
// AUTH - PRO MECANIQUE AUTO
// ===============================

import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// ===============================
// RECUPERATION DES ELEMENTS HTML
// ===============================

const btnCreerCompte =
    document.getElementById("btnCreerCompte");

const btnConnexionCompte =
    document.getElementById("btnConnexionCompte");


// ===============================
// FONCTION POUR RECUPERER
// LA VALEUR D'UN CHAMP
// ===============================

function recupererValeur(id) {

    const element =
        document.getElementById(id);

    if (!element) {
        return "";
    }

    return element.value.trim();
}


// ===============================
// FONCTION POUR AFFICHER
// UN MESSAGE SIMPLE
// ===============================
const btnFermerMessage = document.getElementById("btnFermerMessage");

if (btnFermerMessage) {
  btnFermerMessage.addEventListener("click", () => {
    const modal = document.getElementById("messageModal");

    if (modal) {
      modal.style.display = "none";
    }
  });
}

// ===============================
// FONCTION POUR VIDER
// LE FORMULAIRE D'INSCRIPTION
// ===============================

function viderFormulaireInscription() {

    const ids = [
        "nom",
        "email",
        "motdepasse",
        "telephone",
        "telephoneWhatsApp",
        "telephoneSecretaire",
        "ville",
        "metier",
        "description"
    ];

    ids.forEach((id) => {

        const element =
            document.getElementById(id);

        if (!element) {
            return;
        }

        if (element.tagName === "SELECT") {
            element.selectedIndex = 0;
        } else {
            element.value = "";
        }

    });

    const typeCompte =
        document.getElementById("typeCompte");

    if (typeCompte) {
        typeCompte.value = "artisan";
    }

    const champsArtisan =
        document.getElementById("champsArtisan");

    if (champsArtisan) {
        champsArtisan.style.display = "block";
    }
}


// ===============================
// CREATION DE COMPTE
// ===============================

btnCreerCompte.addEventListener(
    "click",
    async () => {

        try {

            // ===============================
            // INFORMATIONS PRINCIPALES
            // ===============================

            const nom =
                recupererValeur("nom");

            const email =
                recupererValeur("email");

            const motdepasse =
                recupererValeur("motdepasse");

            const typeCompte =
                recupererValeur("typeCompte");


            // ===============================
            // VERIFICATION PRINCIPALE
            // ===============================

            if (!nom || !email || !motdepasse) {

                afficherMessage(
                    "❌ Veuillez remplir le nom, l'adresse e-mail et le mot de passe."
                );

                return;
            }


            // ===============================
            // VERIFICATION MOT DE PASSE
            // MINIMUM 8 CARACTERES
            // ===============================

            if (motdepasse.length < 8) {

                afficherMessage(
                    "❌ Le mot de passe doit contenir au minimum 8 caractères."
                );

                return;
            }


            // ===============================
            // CREATION AUTHENTIFICATION
            // ===============================

            const utilisateur =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    motdepasse
                );


            const uid =
                utilisateur.user.uid;


            // ===============================
            // COMPTE CLIENT
            // ===============================

            if (typeCompte === "client") {

                await setDoc(
                    doc(db, "clients", uid),
                    {

                        nom: nom,

                        email: email,

                        typeCompte: "client",

                        uid: uid,

                        dateCreation:
                            new Date()

                    }
                );


                // Vider le formulaire
                viderFormulaireInscription();


                // Message de réussite
                afficherMessage(
                    "✅ Compte client créé avec succès !"
                );

                return;
            }


            // ===============================
            // INFORMATIONS ARTISAN
            // ===============================

            const telephone =
                recupererValeur("telephone");

            const telephoneWhatsApp =
                recupererValeur(
                    "telephoneWhatsApp"
                );

            const telephoneSecretaire =
                recupererValeur(
                    "telephoneSecretaire"
                );

            const ville =
                recupererValeur("ville");

            const metier =
                recupererValeur("metier");

            const description =
                recupererValeur(
                    "description"
                );


            // ===============================
            // VERIFICATION ARTISAN
            // ===============================

            if (
                !telephone ||
                !ville ||
                !metier
            ) {

                afficherMessage(
                    "❌ Veuillez remplir les informations obligatoires de l'artisan."
                );

                return;
            }


            // ===============================
            // ENREGISTREMENT ARTISAN
            // ===============================

            await setDoc(
                doc(db, "artisans", uid),
                {

                    nom: nom,

                    email: email,

                    telephone: telephone,

                    telephoneWhatsApp:
                        telephoneWhatsApp,

                    telephoneSecretaire:
                        telephoneSecretaire,

                    ville: ville,

                    metier: metier,

                    description: description,

                    typeCompte: "artisan",

                    uid: uid,

                    dateCreation:
                        new Date()

                }
            );


            // Vider le formulaire
            viderFormulaireInscription();


            // Message de réussite
            afficherMessage(
                "✅ Compte artisan créé avec succès !"
            );


        } catch (erreur) {

            console.error(
                "Erreur inscription :",
                erreur
            );

            afficherMessage(
                "Erreur inscription : " +
                erreur.message
            );

        }

    }
);
// ===============================
// CONNEXION
// ===============================

btnConnexionCompte.addEventListener(
    "click",
    async () => {

        try {

            // ===============================
            // INFORMATIONS DE CONNEXION
            // ===============================

            const email =
                recupererValeur("emailConnexion");

            const motdepasse =
                recupererValeur("motdepasseConnexion");


            // ===============================
            // VERIFICATION
            // ===============================

            if (!email || !motdepasse) {

                afficherMessage(
                    "❌ Veuillez saisir votre e-mail et votre mot de passe."
                );

                return;
            }


            // ===============================
            // CONNEXION FIREBASE
            // ===============================

            const resultat =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    motdepasse
                );


            const uid =
                resultat.user.uid;


            // ===============================
            // VERIFIER SI C'EST UN CLIENT
            // ===============================

            const clientRef =
                doc(db, "clients", uid);

            const clientSnap =
                await getDoc(clientRef);


            if (clientSnap.exists()) {

                afficherMessage(
                    "✅ Connexion réussie !"
                );

                window.location.href =
                    "client.html";

                return;
            }


            // ===============================
            // VERIFIER SI C'EST UN ARTISAN
            // ===============================

            const artisanRef =
                doc(db, "artisans", uid);

            const artisanSnap =
                await getDoc(artisanRef);


            if (artisanSnap.exists()) {

                afficherMessage(
                    "✅ Connexion réussie !"
                );

                window.location.href =
                    "profil.html";

                return;
            }


            // ===============================
            // PROFIL INTROUVABLE
            // ===============================

            afficherMessage(
                "⚠️ Compte connecté, mais profil introuvable."
            );


        } catch (erreur) {

            console.error(
                "Erreur connexion :",
                erreur
            );

            afficherMessage(
                "Erreur connexion : " +
                erreur.message
            );

        }

    }
);
