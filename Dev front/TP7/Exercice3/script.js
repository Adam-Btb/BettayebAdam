window.addEventListener('load', function() {
    const canevas = document.getElementById('monCanvas');
    if (!canevas) return;
    const ctx = canevas.getContext('2d');

    let x = 50;
    let y = 50;
    let largeur = 50;
    let hauteur = 50;

    const couleurs = ["yellow", "red", "blue", "green"];
    let indiceCouleur = 0; 
    let estPlein = true; 
    let estVisible = true; 
    function dessiner() {
        ctx.clearRect(0, 0, canevas.width, canevas.height);
        if (!estVisible) {
            return;
        }
        ctx.fillStyle = couleurs[indiceCouleur];
        ctx.strokeStyle = couleurs[indiceCouleur];
        if (estPlein) {
            ctx.fillRect(x, y, largeur, hauteur);
        } else {
            ctx.strokeRect(x, y, largeur, hauteur);
        }
    }

    document.getElementById('btnLargeur').addEventListener('click', function() {
        largeur += 10;
        if (largeur > 200) {
            largeur = 10;
        }
        dessiner();
    }, false);

    document.getElementById('btnHauteur').addEventListener('click', function() {
        hauteur += 10;
        if (hauteur > 200) {
            hauteur = 10;
        }
        dessiner();
    }, false);

    document.getElementById('btnCouleur').addEventListener('click', function() {
        indiceCouleur++;
        if (indiceCouleur >= couleurs.length) {
            indiceCouleur = 0;
        }
        dessiner();
    }, false);

    document.getElementById('btnStyle').addEventListener('click', function() {
        estPlein = !estPlein;
        dessiner();
    }, false);

    document.getElementById('btnVisibilite').addEventListener('click', function() {
        estVisible = !estVisible;
        dessiner();
    }, false);

    dessiner();
});