document.addEventListener('DOMContentLoaded', () => {
    
    const burger = document.getElementById('btnBurger');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeBtn = document.getElementById('btnCloseMenu');
    const menuLinks = document.querySelectorAll('.lien-menu-mobile');

    if (burger && menuOverlay) {
        burger.addEventListener('click', () => {
            menuOverlay.classList.add('active');
            burger.classList.add('open');
            document.body.style.overflow = "hidden";
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', fermerMenuMobile);
        }

        menuLinks.forEach(link => {
            link.addEventListener('click', fermerMenuMobile);
        });
    }

    function fermerMenuMobile() {
        if (menuOverlay && burger) {
            menuOverlay.classList.remove('active');
            burger.classList.remove('open');
            document.body.style.overflow = "";
        }
    }

});

let slideIndex = {};

function ouvrirModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.style.display = "flex";
  
  setTimeout(() => {
    modal.style.opacity = "1";
  }, 10);
  
  if (!slideIndex[modalId]) { slideIndex[modalId] = 1; }
  afficherDiapos(slideIndex[modalId], modalId);
  
  document.body.style.overflow = "hidden";
}

function fermerModal(event, modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.style.opacity = "0";
  
  setTimeout(() => {
    modal.style.display = "none";
    document.body.style.overflow = ""; 
  }, 300);
}

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
  
  for (i = 0; i < diapos.length; i++) {
    diapos[i].style.display = "none";
  }
  
  if (diapos.length > 0) {
      diapos[slideIndex[modalId] - 1].style.display = "block";
  }
}