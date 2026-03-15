// On sélectionne l'élément image
const helice = document.getElementById('helice');
let isScrolling;

// On écoute l'événement 'scroll' sur la fenêtre
window.addEventListener('scroll', function() {

    // Quand on scrolle, on lance l'animation
    helice.style.animationPlayState = 'running';

    // On efface le timer précédent (pour éviter que ça s'arrête pendant qu'on scrolle encore)
    window.clearTimeout(isScrolling);

    // On définit un timer : si aucun scroll n'est détecté pendant 100ms, on arrête l'animation
    isScrolling = setTimeout(function() {
        helice.style.animationPlayState = 'paused';
    }, 100);

}, false);