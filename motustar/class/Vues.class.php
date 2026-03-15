<?php
class Vues {
    public function debutHtml($titre) {
        echo "<!DOCTYPE html><html lang='fr'><head><meta charset='UTF-8'><title>$titre</title>";
        echo "<meta name='viewport' content='width=device-width, initial-scale=1.0'>";
        echo "<link rel='stylesheet' href='css/style.css'>";
        echo "</head><body><div class='conteneur'>";
        echo "<nav>";
        echo "<a href='index.php' class='nav-img'>";
        echo "<img src='img/jeu.webp' alt='Jeu' class='bt-nav'>";
        echo "</a>";
        
        echo "<a href='index.php?action=regles' class='nav-img'>";
        echo "<img src='img/regles.webp' alt='Règles' class='bt-nav'>";
        echo "</a>";
        echo "</nav>";
    }

    public function finHtml() {
        echo "</div></body></html>";
    }

    public function afficherJeu() {
        $taille = $_SESSION['taille'];
        $max = $_SESSION['max_tentatives'];
        $nbEssais = count($_SESSION['essais']);
        
        echo "<h1>MOTUS DRAGON BALL ($taille Lettres)</h1>";
        echo "<p class='message'>" . $_SESSION['msg'] . "</p>";

        echo "<div class='grille'>";

        for ($i = 0; $i < $max; $i++) {
            echo "<div class='ligne'>";
            
            if ($i < $nbEssais) {
                $essai = $_SESSION['essais'][$i];
                for ($j = 0; $j < $taille; $j++) {
                    $lettre = $essai['lettres'][$j];
                    $couleur = $essai['couleurs'][$j];
                    echo "<div class='case $couleur'>$lettre</div>";
                }
            } 
            elseif ($i == $nbEssais && $_SESSION['etat'] == 'en_cours') {
                $input = str_split($_SESSION['input_actuel']);
                for ($j = 0; $j < $taille; $j++) {
                    $char = isset($input[$j]) ? $input[$j] : '';
                    
                    $classe = ($char === '') ? 'bleu' : 'courant';
                    
                    if ($j == 0) $classe = 'courant';

                    echo "<div class='case $classe'>$char</div>";
                }
            }
            else {
                for ($j = 0; $j < $taille; $j++) {
                    echo "<div class='case bleu'></div>";
                }
            }
            echo "</div>";
        }
        echo "</div>";

        if ($_SESSION['etat'] == 'en_cours') {
            $this->afficherClavier();
        } else {
            $this->afficherFinPartie();
        }
    }

    private function afficherClavier() {
        echo "<div class='clavier'>";
        
        $this->rangeeClavier("AZERTYUIOP");
        $this->rangeeClavier("QSDFGHJKLM");
        $this->rangeeClavier("WXCVBN");
        
        echo "<div class='rangee'>";
        echo "<a href='index.php?action=effacer' class='touche action'>⌫</a>";
        echo "<a href='index.php?action=valider' class='touche action valid'>VALIDER</a>";
        echo "</div>";
        echo "</div>";
        
        echo "<form method='POST' action='index.php?action=clavier_physique' style='opacity:0; position:absolute;'>";
        echo "<input type='text' name='prop' autofocus >";
        echo "</form>";
    }

    private function rangeeClavier($lettres) {
        echo "<div class='rangee'>";
        foreach (str_split($lettres) as $l) {
            $status = $_SESSION['clavier_status'][$l] ?? ''; 
            echo "<a href='index.php?action=lettre&l=$l' class='touche $status'>$l</a>";
        }
        echo "</div>";
    }

    private function afficherFinPartie() {
        if ($_SESSION['etat'] == 'gagne') {
            echo "<div class='victoire-box'>";
            echo "<h3>VICTOIRE !</h3>";
            echo "<form method='POST' action='index.php?action=sauver'>";
            echo "<input type='text' name='pseudo' placeholder='PSEUDO' required maxlength='12'>";
            echo "<button type='submit'>ENREGISTRER</button>";
            echo "</form>";
            echo "</div>";
        }

        echo "<div style='margin-top: 30px;'>";
        echo "<a href='index.php?action=reset' class='nav-img'>";
        echo "<img src='img/gohan.webp' alt='Rejouer' class='bt-nav' style='height: 90px; border-radius: 45px;'>";
        echo "</a>";
        echo "</div>";
    }

    public function afficherImageScore($points) {
        echo "<div class='score-img'><p>Votre certificat :</p>";
        echo "<img src='index.php?action=genere_image&points=$points' alt='Score GD' style='border:2px solid black'>";
        echo "</div>";
    }
    public function afficherScores($scores) {
        echo "<div class='scene-scores'>";
        
        echo "<div>";
        echo "<img src='img/presentateur.webp' alt='Présentateur' class='img-presentateur'>";
        echo "</div>";

        echo "<div class='box-tableau'>";
        echo "<h2 class='titre-scores'>CLASSEMENT TENKAICHI</h2>";
        
        echo "<table class='tab-scores'>";
        echo "<thead><tr><th>#</th><th>JOUEUR</th><th>PTS</th></tr></thead>";
        echo "<tbody>";
        
        $rang = 1;
        foreach ($scores as $s) {
            $icone = ($rang == 1) ? "🥇" : (($rang == 2) ? "🥈" : (($rang == 3) ? "🥉" : $rang));
            echo "<tr>";
            echo "<td class='col-rang'>$icone</td>";
            echo "<td class='col-pseudo'>" . htmlspecialchars($s['pseudo']) . "</td>";
            echo "<td class='col-points'>" . $s['points'] . "</td>";
            echo "</tr>";
            $rang++;
        }
        
        echo "</tbody></table>";
        
        echo "<div style='text-align:center'><a href='index.php' class='btn-retour'>RETOUR</a></div>";
        
        echo "</div>"; 
        echo "</div>"; 
    }
    
    public function afficherRegles() {
        echo "<div class='regles-container'>";
        
        echo "<div class='regles-texte'>";
        echo "<h2>RÈGLES DU JEU</h2>";
        echo "<p>Salut ! Aide-moi à retrouver les mots cachés de l'univers Dragon Ball.</p>";
        
        echo "Tu as <strong>6 tentatives</strong> pour deviner le mot.</br>";
        echo "La <strong>première lettre</strong> est toujours donnée.";

        echo "<div class='legende'>";
        
        echo "<div class='ligne-legende'>";
        echo "<span class='mini-case rouge'>A</span>";
        echo "<span> : La lettre est <strong>Correctement placée</strong>.</span>";
        echo "</div>";

        echo "<div class='ligne-legende'>";
        echo "<div class='mini-case-img'><img src='img/dragonball.webp' alt='Dragon Ball'></div>";
        echo "<span> : La lettre est <strong> Mal placée</strong> mais dans le mot.</span>";
        echo "</div>";

        echo "<div class='ligne-legende'>";
        echo "<span class='mini-case bleu'>A</span>";
        echo "<span> : La lettre <strong>n'est pas dans le mot</strong>.</span>";
        echo "</div>";
        
        echo "</div>"; 
        echo "</div>"; 

        echo "<div class='goku-section'>";
        echo "<img src='img/goku.webp' alt='Goku' class='goku-img'>";
        echo "</div>";

        echo "</div>"; 
    }

    public function afficherAdmin($mots) {
        echo "<h2>Dictionnaire</h2><form action='index.php?action=ajout_mot' method='POST' class='form-admin'>";
        echo "<input type='text' name='mot' placeholder='Nouveau mot'><button>Ajouter</button></form>";
        echo "<table class='table-mots'>";
        foreach($mots as $m) echo "<tr><td>{$m['mot']}</td><td><a href='index.php?action=suppr_mot&id={$m['id']}' class='del'>X</a></td></tr>";
        echo "</table>";
    }
}
