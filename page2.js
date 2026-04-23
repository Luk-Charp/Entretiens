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

const activitesContainer = document.getElementById("activites");

// Afficher les activités automatiquement au chargement
function afficherActivites() {
  // 🔥 TITRE PRINCIPAL
  ajouterTitre("🔥 Voici ce qui pourrait t'intéresser");
  ajouterSousTitre("voir plan en bas");

  // 🔴 BLOC PRINCIPAL (AVEC GRILLE)
  const blocPrincipal = creerContainer();
  ajouterCarteDans(blocPrincipal, "FAQ prépa");
  ajouterCarteDans(blocPrincipal, "Projets des prépas");
  activitesContainer.appendChild(blocPrincipal);

  // 🎯 TITRE SECONDAIRE
  ajouterTitreSecondaire("🎯 On propose aussi sur place");

  // 🔵 BLOC SECONDAIRE (AVEC GRILLE)
  const blocSecondaire = creerContainer();
  ajouterCarteDans(blocSecondaire, "Billard");
  ajouterCarteDans(blocSecondaire, "Club LAN (PS5 / Switch)");
  ajouterCarteDans(blocSecondaire, "Babyfoot");
  activitesContainer.appendChild(blocSecondaire);
}

// Appeler la fonction au chargement
afficherActivites();

// ===== MODAL SALLE =====
function ouvrirModalSalle() {
    document.getElementById("modalSalle").style.display = "block";
}

function fermerModalSalle() {
    document.getElementById("modalSalle").style.display = "none";
}

// ===== MODAL PLAN =====
function ouvrirModalPlan() {
    document.getElementById("modalPlan").style.display = "block";
}

function fermerModalPlan() {
    document.getElementById("modalPlan").style.display = "none";
}

// Fermer les modals au clic en dehors du contenu
window.onclick = function(event) {
    const modalSalle = document.getElementById("modalSalle");
    const modalPlan = document.getElementById("modalPlan");
    if (event.target == modalSalle) {
        modalSalle.style.display = "none";
    }
    if (event.target == modalPlan) {
        modalPlan.style.display = "none";
    }
}

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

function ajouterSousTitre(texte) {
  const sousTitre = document.createElement("p");
  sousTitre.textContent = texte;
  sousTitre.style.marginTop = "5px";
  sousTitre.style.textAlign = "center";
  sousTitre.style.color = "#999";
  sousTitre.style.fontSize = "13px";
  sousTitre.style.fontStyle = "italic";

  activitesContainer.appendChild(sousTitre);
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