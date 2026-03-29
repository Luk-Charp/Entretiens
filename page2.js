fetch("data.json")
  .then(response => response.json())
  .then(data => {

    const nom = localStorage.getItem("nom");
    const prenom = localStorage.getItem("prenom");

    if (!nom || !prenom) {
      alert("Erreur : informations manquantes");
      return;
    }

    // 🔍 chercher dans le JSON
    const user = data.find(e =>
      e.nom.toLowerCase() === nom.toLowerCase() &&
      e.prenom.toLowerCase() === prenom.toLowerCase()
    );

    if (user) {
        

    document.getElementById("bonjour").textContent =
    "Bonjour " + user.prenom ;


      document.getElementById("heure").textContent = user.heure;
      document.getElementById("jury").textContent = user.jury;
      document.getElementById("salle").textContent = user.salle;
      document.getElementById("accompagnant").textContent = user.accompagnant;
    } else {
      alert("Utilisateur non trouvé");
    }
  });

const select = document.getElementById("domaine");
const activitesContainer = document.getElementById("activites");

select.addEventListener("change", () => {
  const choix = select.value;

  localStorage.setItem("domaine", choix);

  // reset
  activitesContainer.innerHTML = "";

  // 🔥 TITRE PRINCIPAL
  ajouterTitre("🔥 Voici ce qui pourrait t'intéresser");

  // 🔴 BLOC PRINCIPAL (AVEC GRILLE)
  const blocPrincipal = creerContainer();

  if (choix === "numerique") {
    ajouterCarteDans(blocPrincipal, "Atelier GITI", true);
  }

  if (choix === "energie") {
    ajouterCarteDans(blocPrincipal, "Atelier GETE", true);
  }

  if (choix === "les-deux") {
    ajouterCarteDans(blocPrincipal, "Atelier GITI");
    ajouterCarteDans(blocPrincipal, "Atelier GETE");
  }

  activitesContainer.appendChild(blocPrincipal);


  // 🎯 TITRE SECONDAIRE
  ajouterTitreSecondaire("🎯 On propose aussi sur place");

  // 🔵 BLOC SECONDAIRE (AVEC GRILLE)
  const blocSecondaire = creerContainer();

  ajouterCarteDans(blocSecondaire, "Billard");
  ajouterCarteDans(blocSecondaire, "Club LAN (PS5 / Switch)");
  ajouterCarteDans(blocSecondaire, "Babyfoot");
  ajouterCarteDans(blocSecondaire, "Unisique");

  activitesContainer.appendChild(blocSecondaire);
});

// fonction carte
function afficherCarte(titre) {
  const card = document.createElement("div");
  card.classList.add("activite-card");

  card.innerHTML = `<h3>${titre}</h3>`;

  activitesContainer.appendChild(card);
}

function ajouterTitre(texte) {
  const titre = document.createElement("h3");
  titre.textContent = texte;
  titre.style.marginTop = "20px";
  titre.style.textAlign = "center";
  titre.style.color = "#ef3333";

  activitesContainer.appendChild(titre);
}

function ajouterTitreSecondaire(texte) {
  const titre = document.createElement("h4");
  titre.textContent = texte;
  titre.style.marginTop = "30px";
  titre.style.textAlign = "center";
  titre.style.color = "#555";

  activitesContainer.appendChild(titre);
}

function creerContainer() {
  const div = document.createElement("div");
  div.classList.add("infos-container");
  return div;
}

function ajouterCarteDans(container, titre, estPrincipal = false) {
  const card = document.createElement("div");
  card.classList.add("activite-card");
  card.innerHTML = `<h3>${titre}</h3>`;

  container.appendChild(card);

  if (estPrincipal && container.children.length === 1) {
    card.style.gridColumn = "1 / -1";
  }
}