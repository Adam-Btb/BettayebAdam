/* Stockage des données du CSV et de l'état de l'interface  */
var globalData = [];
var dataIsLoaded = false;
var modeGraphique = 'histogramme'; 
var dernierDepartementClique = null; 

/* INITIALISATION */
window.addEventListener("DOMContentLoaded", function() {
    setupInteractions();
    
    var csvPath = "data/barometre-representations-sociales-du-changement-climatique.csv";
    
    /* Chargement du fichier CSV via D3.js */
    d3.csv(csvPath, function(data) {
        globalData = data;  
        dataIsLoaded = true; 
        
        /* Une fois les données chargées, on cache l'écran de chargement avec une animation */
        var ecranChargement = document.getElementById("ecran-chargement");
        if(ecranChargement) {
            ecranChargement.classList.add("cache");
            setTimeout(function() {
                ecranChargement.style.display = "none";
            }, 500);
        }
    });
});

/* GESTION DES BOUTONS DE NAVIGATION */
function changerMode(mode) {
    /* Enregistre le nouveau mode choisi */
    modeGraphique = mode;
    
    /* Met à jour visuellement les boutons */
    var btns = document.querySelectorAll('.btn-graph');
    btns.forEach(b => b.classList.remove('active'));
    
    if(mode === 'histogramme') btns[0].classList.add('active');
    else if(mode === 'courbe') btns[1].classList.add('active');
    else if(mode === 'barres') btns[2].classList.add('active');
    else if(mode === 'camembert') btns[3].classList.add('active');
    else if(mode === 'nuage') btns[4].classList.add('active');

    /* Si un département est déjà sélectionné, on force le rafraîchissement immédiat du graphique */
    if (dernierDepartementClique) {
        var event = new Event('click');
        dernierDepartementClique.dispatchEvent(event);
    }
}

/* INTERACTION UTILISATEUR */
function setupInteractions() {

    var paths = document.querySelectorAll('#carte-container path');
    var elementInfobulle = document.getElementById('infobulle'); 

    paths.forEach(function(path) {
        
        /* Affiche l'infobulle au survol de la souris */
        path.addEventListener('mousemove', function(e) {
            var nom = this.getAttribute('title') || this.id;
            if (elementInfobulle) {
                elementInfobulle.style.display = 'block';
                elementInfobulle.innerText = nom;
                elementInfobulle.style.left = (e.pageX + 15) + 'px'; 
                elementInfobulle.style.top = (e.pageY + 15) + 'px';  
            }
        });

        /* Cache l'infobulle quand la souris sort de la zone */
        path.addEventListener('mouseleave', function() {
            if (elementInfobulle) {
                elementInfobulle.style.display = 'none';
            }
        }); 

        /* Gestion du CLIC sur un département */
        path.addEventListener('click', function() {
            
            dernierDepartementClique = this;
            /* Récupération du nom du département cliqué */
            var id = this.getAttribute('id');
            var title = this.getAttribute('title');
            var nomDepartement = title ? title : id;
            document.getElementById('departement').innerText = nomDepartement;

            /* Filtrage des données globales pour ne garder que celles de ce département */
            var donneesLocales = globalData.filter(function(d) {
                return d["Département"] && d["Département"].toLowerCase() === nomDepartement.toLowerCase();
            });

            var statDiv = document.getElementById("statistiques");
            var titreDiv = document.getElementById("titre-graphique");

            if (donneesLocales.length > 0) {

                /* Sélection et affichage du graphique selon le mode actif */
                
                if (modeGraphique === 'histogramme') {
                    /* GRAPH 1 : HISTOGRAMME */
                    var dataPourGraphique = [];
                    donneesLocales.forEach(function(d) {
                        var ageVal = Number(d.age);
                        if (!isNaN(ageVal)) dataPourGraphique.push({ price: ageVal });
                    });

                    drawHistogram("#graphique", dataPourGraphique);
                    titreDiv.innerText = "Profil démographique (Âges)";
                    
                    var moyenne = d3.mean(dataPourGraphique, d => d.price);
                    var min = d3.min(dataPourGraphique, d => d.price);
                    var max = d3.max(dataPourGraphique, d => d.price);
                    
                    statDiv.innerHTML = `
                        <div style="font-size: 14px; text-align: left; background: #f9f9f9; padding: 15px; border-radius: 5px;">
                            <p><strong>Qui sont les répondants ?</strong></p>
                            <p>Cet histogramme montre la pyramide des âges des <strong>${dataPourGraphique.length} participants</strong> interrogés dans ce département.</p>
                            <ul style="margin-top:10px;">
                                <li>Âge moyen : <strong>${Math.round(moyenne)} ans</strong></li>
                                <li>L'écart va de ${min} ans à ${max} ans.</li>
                            </ul>
                            <p>Cela permet de voir si l'opinion locale est portée par une population plutôt jeune, active ou retraitée.</p>
                        </div>`;
                        
                } else if (modeGraphique === 'courbe') {
                    /* GRAPH 2 : COURBE */
                    drawgraphiquecourbes("#graphique", donneesLocales);
                    titreDiv.innerText = "Le duel des solutions : Sobriété vs Technologie";

                    statDiv.innerHTML = `
                        <div style="font-size: 14px; text-align: left; background: #f9f9f9; padding: 15px; border-radius: 5px;">
                            <p><strong>Deux philosophies s'affrontent :</strong></p>
                            <p>Ce graphique montre comment l'opinion publique évolue depuis 20 ans sur la solution à privilégier.</p>
                            <ul style="list-style: none; padding: 0; margin-top: 10px;">
                                <li style="margin-bottom: 8px;">
                                    <span style="color: #005e2f; font-weight:bold;">⬤ Sobriété (Verte)</span> :<br>
                                    <em>"Il faut modifier nos modes de vie dès maintenant."</em>
                                </li>
                                <li>
                                    <span style="color: #3498db; font-weight:bold;">⬤ Techno-optimisme (Bleue)</span> :<br>
                                    <em>"Le progrès technique trouvera des solutions (pas besoin de changer)."</em>
                                </li>
                            </ul>
                        </div>`;

                } else if (modeGraphique === 'barres') {
                    /* GRAPH 3 : BARRES */
                    drawGraphiqueBarres("#graphique", donneesLocales);
                    titreDiv.innerText = "Classement des causes perçues";
                    
                    statDiv.innerHTML = `
                        <div style="font-size: 14px; text-align: left; background: #f9f9f9; padding: 15px; border-radius: 5px;">
                            <p><strong>Perception vs Réalité</strong></p>
                            <p>Ce classement ne montre pas les émissions réelles de CO2, mais celles que les habitants accusent.</p>
                            <p style="margin-top:10px;">On a demandé : <em>"Est-ce que cette activité contribue beaucoup à l'effet de serre ?"</em></p>
                            <ul style="margin-top:5px;">
                                <li><strong>En haut :</strong> Les secteurs jugés très polluants.</li>
                                <li><strong>En bas :</strong> Les secteurs jugés moins responsables.</li>
                            </ul>
                        </div>`;

                } else if (modeGraphique === 'camembert') {
                    /* GRAPH 4 : CAMEMBERT */
                    drawCamembert("#graphique", donneesLocales);
                    titreDiv.innerText = "Modes de transport principaux";
                    
                    statDiv.innerHTML = `
                        <div style="font-size: 14px; text-align: left; background: #f9f9f9; padding: 15px; border-radius: 5px;">
                            <p><strong>Que montre ce graphique ?</strong></p>
                            <p>Répartition des moyens de transport utilisés au quotidien par les participants du département.</p>
                        </div>`;

                } else {
                    /*GRAPH 5 : NUAGE DE POINTS */
                    drawNuages("#graphique", donneesLocales);
                    titreDiv.innerText = "Corrélation Âge / Foyer";
                    
                    statDiv.innerHTML = `
                        <div style="font-size: 14px; text-align: left; background: #f9f9f9; padding: 15px; border-radius: 5px;">
                            <p><strong>Composition des foyers selon l'âge</strong></p>
                            <p>Chaque point représente un habitant. Ce graphique croise deux informations :</p>
                            <ul style="margin-top:5px; margin-bottom:10px;">
                                <li><strong>Horizontal :</strong> L'âge de la personne.</li>
                                <li><strong>Vertical :</strong> Combien de gens vivent avec elle.</li>
                            </ul>
                            <p><strong>Analyse :</strong> Une concentration de points en bas à droite indique un isolement des personnes âgées, tandis que les points en haut indiquent des familles.</p>
                        </div>`;
                }

            } else {
                /* Gestion d'erreur si aucune donnée pour le département */
                d3.select("#graphique").html("<p>Pas assez de données pour ce département.</p>");
                statDiv.innerHTML = "";
            }
        });
    });
}