// ===== PAGE 1 =====
function valider() {
    const nom = document.getElementById("nom").value.trim();
    const prenom = document.getElementById("prenom").value.trim();

    if (!nom || !prenom) {
        alert("Veuillez remplir tous les champs");
        return;
    }

    // Stockage temporaire
    localStorage.setItem("nom", nom);
    localStorage.setItem("prenom", prenom);

    // Redirection
    window.location.href = "page2.html";
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