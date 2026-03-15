var image = document.getElementById("monImage");
var btnStart = document.getElementById("btnStart");
var btnStop = document.getElementById("btnStop");

var intervalID = null;

// Fonction pour lancer l'animation
function startAnimation() {
    // On évite de lancer plusieurs intervalles si on clique plusieurs fois sur Start
    if (intervalID === null) {
        // "setInterval exécute une fonction de manière répétée" 
        // Ici toutes les 1000ms (1 seconde)
        intervalID = setInterval(deformer, 1000);
    }
}

// Fonction pour arrêter l'animation
function stopAnimation() {
    // "clearInterval stop l'exécution répétée d'un setInterval" 
    clearInterval(intervalID);
    intervalID = null;
}

// Fonction qui modifie la matrice de transformation
function deformer() {
    // Génération de coefficients aléatoires pour la matrice
    // On utilise Math.random() pour obtenir l'effet "aléatoire" demandé 
    
    // a et d gèrent l'échelle (scale)
    var a = 0.8 + Math.random() * 0.4; 
    var d = 0.8 + Math.random() * 0.4; 
    
    // b et c gèrent la déformation (skew)
    var b = (Math.random() - 0.5) * 0.5; 
    var c = (Math.random() - 0.5) * 0.5;
    
    // tx et ty gèrent la translation (on laisse à 0 ou petit pour garder l'image au centre)
    var tx = (Math.random() - 0.5) * 60;
    var ty = (Math.random() - 0.5) * 60;

    // Application de la syntaxe CSS décrite page 2 : matrix(a,b,c,d,tx,ty) 
    image.style.transform = "matrix(" + a + "," + b + "," + c + "," + d + "," + tx + "," + ty + ")";
}

// Ajout des écouteurs d'événements sur les boutons
btnStart.addEventListener("click", startAnimation);
btnStop.addEventListener("click", stopAnimation);