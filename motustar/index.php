<?php
session_start();

define("CHARGE_AUTOLOAD", true);
require_once "inc/poo.inc.php";
define("CHARGE_BD", true);
require_once "inc/bd.inc.php";

$action = $_GET['action'] ?? 'accueil';

if ($action == 'genere_image') {
    if (ob_get_level()) ob_end_clean();
    
    $score = $_GET['points'] ?? 0;
    $largeur = 400; 
    $hauteur = 150;
    
    $img = imagecreate($largeur, $hauteur);
    
    $fond = imagecolorallocate($img, 20, 20, 20);
    $orange = imagecolorallocate($img, 255, 140, 0);
    $blanc = imagecolorallocate($img, 255, 255, 255);
    $rouge = imagecolorallocate($img, 220, 0, 0);

    imagerectangle($img, 0, 0, $largeur-1, $hauteur-1, $orange);
    imagerectangle($img, 4, 4, $largeur-5, $hauteur-5, $rouge);

    function centrer($image, $font, $text, $y, $color, $width) {
        $fontWidth = imagefontwidth($font);
        $textWidth = strlen($text) * $fontWidth;
        $centerX = ($width - $textWidth) / 2;
        imagestring($image, $font, $centerX, $y, $text, $color);
    }

    centrer($img, 5, "MOTUS TENKAICHI", 25, $orange, $largeur);
    centrer($img, 5, "SCORE : " . $score . " PTS", 65, $blanc, $largeur);
    centrer($img, 3, "Partie du " . date("d/m/Y"), 110, $blanc, $largeur);

    header("Content-type: image/png");
    imagepng($img);
    imagedestroy($img);
    
    exit();
}

$dico = new Dictionnaire($cnx);
$jeu = new Jeu($cnx);
$vue = new Vues();

$vue->debutHtml("Motus DBZ");

switch ($action) {
    case 'accueil':
        if (!isset($_SESSION['mot_secret'])) {
            $jeu->nouvellePartie($dico);
        }
        $vue->afficherJeu();
        break;

    case 'lettre':
        if (isset($_GET['l'])) {
            $jeu->ajouterLettre($_GET['l']);
        }
        header("Location: index.php"); 
        exit();

    case 'effacer':
        $jeu->effacerLettre();
        header("Location: index.php");
        exit();

    case 'valider':
        $jeu->validerInput();
        header("Location: index.php");
        exit();
        
    case 'reset':
        $jeu->nouvellePartie($dico);
        header("Location: index.php");
        exit();

    case 'sauver':
        if (isset($_POST['pseudo'])) {
            $pts = $jeu->sauverScore($_POST['pseudo']);
            $vue->afficherImageScore($pts); 
            unset($_SESSION['mot_secret']);
        }

        $scores = $jeu->getTopScores();
        $vue->afficherScores($scores);
        break;

    case 'admin':
        $vue->afficherAdmin($dico->lireTout());
        break;

    case 'ajout_mot':
        if(!empty($_POST['mot'])) $dico->ajouter($_POST['mot']);
        header("Location: index.php?action=admin");
        exit();

    case 'suppr_mot':
        if(!empty($_GET['id'])) $dico->supprimer($_GET['id']);
        header("Location: index.php?action=admin");
        exit();

    case 'regles':
        $vue->afficherRegles();
        break;
}

$vue->finHtml();
?>