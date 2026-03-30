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

    document.getElementById("welcome").textContent =
        "Bienvenue " + prenom + " " + nom;

    // Simulation base de données (temporaire)
    fetch("data.json")
        .then(res => res.json())
        .then(data => {
            const etudiant = data.find(e =>
                e.nom.toLowerCase() === nom.toLowerCase() &&
                e.prenom.toLowerCase() === prenom.toLowerCase()
            );

            if (etudiant) {
                document.getElementById("heure").textContent = etudiant.heure;
                document.getElementById("salle").textContent = etudiant.salle;
                document.getElementById("responsable").textContent = etudiant.responsable;
            } else {
                document.getElementById("infos").innerHTML =
                    "<p>Aucune information trouvée</p>";
            }
        });
}