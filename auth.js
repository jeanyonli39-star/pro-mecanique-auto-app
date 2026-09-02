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
    setDoc
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
            // VERIFICATION
            // ===============================

            if (!nom || !email || !motdepasse) {

                alert(
                    "❌ Veuillez remplir le nom, l'adresse e-mail et le mot de passe."
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


                alert(
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

                alert(
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


            alert(
                "✅ Compte artisan créé avec succès !"
            );


        } catch (erreur) {

            console.error(
                "Erreur inscription :",
                erreur
            );

            alert(
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

            const email =
                recupererValeur("email");

            const motdepasse =
                recupererValeur("motdepasse");


            if (!email || !motdepasse) {

                alert(
                    "❌ Veuillez saisir votre e-mail et votre mot de passe."
                );

                return;

            }


        const resultat =
    await signInWithEmailAndPassword(
        auth,
        email,
        motdepasse
    );

const uid =
    resultat.user.uid;


// Vérifier si c'est un client
const clientRef =
    doc(db, "clients", uid);

const clientSnap =
    await getDoc(clientRef);

if (clientSnap.exists()) {

    alert(
        "✅ Connexion réussie !"
    );

    window.location.href = "client.html";

    return;
}


// Sinon, vérifier si c'est un artisan
const artisanRef =
    doc(db, "artisans", uid);

const artisanSnap =
    await getDoc(artisanRef);

if (artisanSnap.exists()) {

    alert(
        "✅ Connexion réussie !"
    );

    window.location.href = "profil.html";

    return;
}


alert(
    "⚠️ Compte connecté, mais profil introuvable."
);


        } catch (erreur) {

            console.error(
                "Erreur connexion :",
                erreur
            );

            alert(
                "Erreur connexion : " +
                erreur.message
            );

        }

    }
);
