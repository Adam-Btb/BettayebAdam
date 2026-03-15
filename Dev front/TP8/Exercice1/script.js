window.addEventListener('load', function() {
    const canevas = document.getElementById('canvasJeu');
    if (!canevas) return;
    const ctx = canevas.getContext('2d');
    let x = 225; 
    let y = 225;
    const vitesse = 10; 
    const COLONNES = 4; 
    const LIGNES = 4;   
    let colonne = 0; 
    let direction = 0; 
    const BAS = 0;
    const HAUT = 1;
    const GAUCHE = 2;
    const DROITE = 3;

    const fond = new Image();
    fond.src = "pelouse.png";
    const perso = new Image();
    perso.src = "sprites.png";
    let imagesChargees = 0;
    function verifierChargement() {
        imagesChargees++;
        if (imagesChargees === 2) {
            dessiner();
        }
    }
    fond.onload = verifierChargement;
    perso.onload = verifierChargement;
    function dessiner() {
        ctx.drawImage(fond, 0, 0, canevas.width, canevas.height);
        const largeurSource = perso.naturalWidth / COLONNES; 
        const hauteurSource = perso.naturalHeight / LIGNES;
        const largeurDest = largeurSource / 2;
        const hauteurDest = hauteurSource / 2;
        const sx = colonne * largeurSource;
        const sy = direction * hauteurSource;

        ctx.drawImage(
            perso, sx, sy, largeurSource, hauteurSource, x, y, largeurDest, hauteurDest         
        );
    }
    window.addEventListener('keydown', function(event) {
        if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(event.code) > -1) {
            event.preventDefault();
        }
        let bouge = false;
        switch(event.key) {
            case "ArrowUp":
                y -= vitesse;
                direction = HAUT;   
                bouge = true;
                break;
            case "ArrowDown":
                y += vitesse;
                direction = BAS;   
                bouge = true;
                break;
            case "ArrowLeft":
                x -= vitesse;
                direction = GAUCHE; 
                bouge = true;
                break;
            case "ArrowRight":
                x += vitesse;
                direction = DROITE;
                bouge = true;
                break;
        }
        if (bouge) {
            colonne++;
            if (colonne >= COLONNES) {
                colonne = 0;
            }
            const lPerso = (perso.naturalWidth / COLONNES) / 2;
            const hPerso = (perso.naturalHeight / LIGNES) / 2;
            if (x < 0) x = 0;
            if (y < 0) y = 0;
            if (x > canevas.width - lPerso) x = canevas.width - lPerso;
            if (y > canevas.height - hPerso) y = canevas.height - hPerso;
            dessiner();
        }
    }, false);
});