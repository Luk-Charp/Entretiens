// ===== PAGE 1 =====

function normaliserTexte(texte) {
  return texte
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function valider() {
  const nom = document.getElementById("nom").value.trim();
  const prenom = document.getElementById("prenom").value.trim();

  if (!nom || !prenom) {
    afficherErreur("Veuillez remplir tous les champs");
    return;
  }

  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      const user = data.find(e =>
        normaliserTexte(e.NOMS) === normaliserTexte(nom) &&
        normaliserTexte(e.PRENOMS) === normaliserTexte(prenom)
      );

      if (user) {
        localStorage.setItem("nom", nom);
        localStorage.setItem("prenom", prenom);
        window.location.href = "page2.html";
      } else {
        afficherErreur("Nom ou prénom incorrect ❌");
      }
    });

    const erreur = document.getElementById("erreur");
    if (erreur) erreur.remove();
}

function afficherErreur(message) {
  let erreur = document.getElementById("erreur");

  if (!erreur) {
    erreur = document.createElement("p");
    erreur.id = "erreur";
    erreur.style.color = "#ef3333";
    erreur.style.marginTop = "10px";
    erreur.style.fontWeight = "bold";

    document.querySelector(".form-container").appendChild(erreur);
  }

  erreur.textContent = message;
}

// ===== PAGE 2 =====
function chargerParcours() {
    const nom = localStorage.getItem("nom");
    const prenom = localStorage.getItem("prenom");

    if (!nom || !prenom) return;

    document.getElementById("bonjour").textContent =
        "Bienvenue " + prenom + " " + nom;

    // Récupérer les données du JSON
    fetch("data.json")
        .then(res => res.json())
        .then(data => {
            const etudiant = data.find(e =>
                e.NOMS.toLowerCase() === nom.toLowerCase() &&
                e.PRENOMS.toLowerCase() === prenom.toLowerCase()
            );

            if (etudiant) {
                document.getElementById("heure").textContent = etudiant["HEURE DE PASSAGE"];
                document.getElementById("jury").textContent = etudiant["n° JURY"];
                document.getElementById("salle").textContent = etudiant["n° SALLES"];
                document.getElementById("accompagnant").textContent = etudiant["ACCOMPAGNANTS"];
            } else {
                document.querySelector(".infos-container").innerHTML =
                    "<p style='text-align: center; padding: 20px;'>Aucune information trouvée</p>";
            }
        });
}