// ==============================
// PRO MECANIQUE AUTO
// script.js
// ==============================

console.log("Pro Mecanique Auto chargé");

// ----------------------
// Liste des métiers
// ----------------------

const metiers = [
{
key: "mecanicien",
title: "Mécanicien auto",
img: "images/mecanicien.png",
tags: ["mécanique","moteur","embrayage"]
},

{
key: "electricien",
title: "Électricien auto",
img: "images/electricien.png",
tags: ["batterie","alternateur","démarreur"]
},

{
key: "climatisation",
title: "Climatisation auto",
img: "images/climatisation.png",
tags: ["clim","gaz","froid"]
},

{
key: "vente",
title: "Vente de pièces",
img: "images/pieces-auto.png",
tags: ["pièces","accessoires"]
},

{
key: "freinage",
title: "Freinage",
img: "images/freinage.png",
tags: ["plaquettes","disques"]
},

{
key: "suspension",
title: "Suspension",
img: "images/suspension.png",
tags: ["amortisseur","train"]
},

{
key: "diagnostic",
title: "Diagnostic auto",
img: "images/diagnostic.png",
tags: ["scanner","valise"]
},

{
key: "injection",
title: "Injection",
img: "images/injection.png",
tags: ["injecteur","pompe"]
},

{
key: "carrosserie",
title: "Carrosserie",
img: "images/carrosserie.png",
tags: ["tôle","redressage"]
},

{
key: "peinture",
title: "Peinture",
img: "images/peinture.png",
tags: ["vernis","couleur"]
}
];

// ----------------------
// Affichage des métiers
// ----------------------

const grid = document.getElementById("grid");
function creerCarte(metier){

const carte = document.createElement("div");

carte.className="card";

carte.innerHTML=`

<img src="${metier.img}" alt="${metier.title}">

<h3>${metier.title}</h3>

`;
return carte;

}
// ==============================
// Affichage des métiers
// ==============================

function afficherMetiers(liste) {

    grid.innerHTML = "";

    liste.forEach(metier => {

        const carte = creerCarte(metier);

        carte.addEventListener("click", function () {

            const url = "artisans.html?metier=" + encodeURIComponent(metier.title);

            window.location.href = url;

        });

        grid.appendChild(carte);

    });

}

afficherMetiers(metiers);

// ==============================
// Barre de recherche
// ==============================

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {

    const recherche = this.value.toLowerCase();

    const resultat = metiers.filter(metier => {

        return (

            metier.title.toLowerCase().includes(recherche)
return (

    metier.title.toLowerCase().includes(recherche)

    ||

    metier.tags.join(" ").toLowerCase().includes(recherche)

    ||

    metier.title.toLowerCase().startsWith(recherche)

);

    afficherMetiers(resultat);

});

// ==============================
// Fenêtre d'inscription
// ==============================

const btnInscription = document.getElementById("btnInscription");
const zoneAuth = document.getElementById("zoneAuth");

btnInscription.addEventListener("click", function () {

    zoneAuth.style.display = "block";

});

// ==============================
// Fenêtre de connexion
// ==============================

const btnConnexion = document.getElementById("btnConnexion");
const zoneConnexion = document.getElementById("zoneConnexion");

btnConnexion.addEventListener("click", function () {

    zoneConnexion.style.display = "block";

});

console.log("Interface chargée avec succès !");
