/* ================= CHARGEMENT (DOM READY) ================= */
document.addEventListener('DOMContentLoaded', () => {
    
    // --- GESTION DU MENU MOBILE ---
    const burger = document.getElementById('btnBurger');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeBtn = document.getElementById('btnCloseMenu');
    const menuLinks = document.querySelectorAll('.lien-menu-mobile');

    if (burger && menuOverlay) {
        // Ouvrir le menu
        burger.addEventListener('click', () => {
            menuOverlay.classList.add('active');
            burger.classList.add('open');
            document.body.style.overflow = "hidden"; // Bloque le scroll
        });

        // Fermer le menu via la croix
        if (closeBtn) {
            closeBtn.addEventListener('click', fermerMenuMobile);
        }

        // Fermer le menu quand on clique sur un lien (Navigation)
        menuLinks.forEach(link => {
            link.addEventListener('click', fermerMenuMobile);
        });
    }

    function fermerMenuMobile() {
        if (menuOverlay && burger) {
            menuOverlay.classList.remove('active');
            burger.classList.remove('open');
            document.body.style.overflow = ""; // Réactive le scroll
        }
    }

});

/* ================= GESTION DES MODALS PROJETS ================= */

// Stocke l'index de la diapo pour chaque modal
let slideIndex = {};

// Ouvre le modal
function ouvrirModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.style.display = "flex";
  
  // Petit délai pour l'animation d'opacité
  setTimeout(() => {
    modal.style.opacity = "1";
  }, 10);
  
  // Initialise le carrousel de ce modal à la diapo 1
  if (!slideIndex[modalId]) { slideIndex[modalId] = 1; }
  afficherDiapos(slideIndex[modalId], modalId);
  
  // Bloque le scroll de la page principale derrière
  document.body.style.overflow = "hidden";
}

// Ferme le modal
function fermerModal(event, modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.style.opacity = "0";
  
  setTimeout(() => {
    modal.style.display = "none";
    // CORRECTION : On met une chaîne vide "" pour rendre la main au CSS
    document.body.style.overflow = ""; 
  }, 300);
}

/* ================= LOGIQUE CARROUSEL ================= */

function plusDiapos(n, modalId) {
  afficherDiapos(slideIndex[modalId] += n, modalId);
}

function afficherDiapos(n, modalId) {
  let i;
  const modal = document.getElementById(modalId);
  if (!modal) return;

  let diapos = modal.getElementsByClassName("diapo");
  
  if (n > diapos.length) { slideIndex[modalId] = 1 }
  if (n < 1) { slideIndex[modalId] = diapos.length }
  
  // Cache toutes les diapos
  for (i = 0; i < diapos.length; i++) {
    diapos[i].style.display = "none";
  }
  
  // Affiche la bonne
  if (diapos.length > 0) {
      diapos[slideIndex[modalId] - 1].style.display = "block";
  }
}