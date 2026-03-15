window.addEventListener('load', function() {
    const canevas = document.getElementById('canvasJeu');
    if (!canevas) return;
    const ctx = canevas.getContext('2d');
    const vitesse = 7; 
    let fondX = 0; 
    const NB_COLONNES = 5;
    const NB_LIGNES = 5;
    let colonneMario = 0;
    let ligneMario = 1; 
    const marioX = 250; 
    const marioY = 290; 
    let compteurFrame = 0;
    const vitesseAnimationMario = 5;

    const imgFond = new Image();
    imgFond.src = "fond.png";

    const imgMario = new Image();
    imgMario.src = "mario.png";
    let imagesChargees = 0;
    function verifierChargement() {
        imagesChargees++;
        if (imagesChargees === 2) {
            boucleAnimation();
        }
    }
    imgFond.onload = verifierChargement;
    imgMario.onload = verifierChargement;
    function boucleAnimation() {
        ctx.clearRect(0, 0, canevas.width, canevas.height);
        fondX = fondX - vitesse;
        if (fondX <= -canevas.width) {
            fondX = 0;
        }

        ctx.drawImage(imgFond, fondX, 0, canevas.width, canevas.height);

        ctx.drawImage(imgFond, fondX + canevas.width, 0, canevas.width, canevas.height);

        compteurFrame++;
        if (compteurFrame >= vitesseAnimationMario) {
            colonneMario++;
            if (colonneMario >= NB_COLONNES) {
                colonneMario = 0;
            }
            compteurFrame = 0; 
        }

        const largeurVignette = imgMario.naturalWidth / NB_COLONNES;
        const hauteurVignette = imgMario.naturalHeight / NB_LIGNES;

        const sx = colonneMario * largeurVignette;
        const sy = ligneMario * hauteurVignette;

        ctx.drawImage(
            imgMario, sx, sy, largeurVignette, hauteurVignette, marioX, marioY, largeurVignette, hauteurVignette 
        );

        requestAnimationFrame(boucleAnimation);
    }
});