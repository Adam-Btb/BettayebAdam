const boutonMenuMobile = document.getElementById('bouton-menu-mobile');
const menuMobile       = document.getElementById('menu-mobile');
const liensMenuMobile  = document.querySelectorAll('.lien-mobile');

boutonMenuMobile.addEventListener('click', () => {
    menuMobile.classList.toggle('hidden');
    menuMobile.classList.toggle('flex');

    const icone = boutonMenuMobile.querySelector('i');
    if (menuMobile.classList.contains('hidden')) {
        icone.classList.remove('fa-xmark');
        icone.classList.add('fa-bars');
    } else {
        icone.classList.remove('fa-bars');
        icone.classList.add('fa-xmark');
    }
});

liensMenuMobile.forEach(lien => {
    lien.addEventListener('click', () => {
        menuMobile.classList.add('hidden');
        menuMobile.classList.remove('flex');
        const icone = boutonMenuMobile.querySelector('i');
        icone.classList.remove('fa-xmark');
        icone.classList.add('fa-bars');
    });
});

const boutonHaut = document.getElementById('retour-haut');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        boutonHaut.classList.remove('opacity-0', 'pointer-events-none');
    } else {
        boutonHaut.classList.add('opacity-0', 'pointer-events-none');
    }
});

const texteAEcrire  = "Développeur Full-Stack et Data";
const elementMachine = document.getElementById('machine-ecrire');
let indexLettre      = 0;

function machineAEcrire() {
    if (indexLettre < texteAEcrire.length) {
        elementMachine.textContent = texteAEcrire.substring(0, indexLettre + 1);
        indexLettre++;
        setTimeout(machineAEcrire, 100);
    } else {
        const curseur       = document.createElement('span');
        curseur.textContent = '_';
        curseur.classList.add('curseur-machine');
        elementMachine.appendChild(curseur);
    }
}

setTimeout(machineAEcrire, 1000);

const observateurApparition = new IntersectionObserver((entrees, observateur) => {
    entrees.forEach(entree => {
        if (entree.isIntersecting) {
            entree.target.classList.add('active');
            observateur.unobserve(entree.target);
        }
    });
}, {
    root:       null,
    rootMargin: '0px 0px -100px 0px',
    threshold:  0.1
});

document.querySelectorAll('.apparition').forEach(el => observateurApparition.observe(el));

const listeCompetences = [
    { nom: "HTML5",       icone: "fa-brands fa-html5",    couleur: "orange-500" },
    { nom: "CSS3",        icone: "fa-brands fa-css3-alt",  couleur: "blue-500" },
    { nom: "JavaScript",  icone: "fa-brands fa-js",        couleur: "yellow-400" },
    { nom: "React JS",    icone: "fa-brands fa-react",     couleur: "cyan-400" },
    { nom: "PHP / OOP",   icone: "fa-brands fa-php",       couleur: "indigo-400",  hoverCouleur: "cyber-purple" },
    { nom: "MySQL",       icone: "fa-solid fa-database",   couleur: "blue-300",    hoverCouleur: "cyber-purple" },
    { nom: "Figma",       icone: "fa-brands fa-figma",     couleur: "pink-400",    hoverCouleur: "pink-500" },
    { nom: "Illustrator", image: "img/illustrator.png",    couleur: "orange-500",  hoverCouleur: "orange-500" },
    { nom: "Photoshop",   image: "img/photoshop.png",      couleur: "blue-500",    hoverCouleur: "blue-500" },
    { nom: "DaVinci<br>Resolve", image: "img/davinci.png", couleur: "red-500",     hoverCouleur: "red-500" },
    { nom: "Linux",       icone: "fa-brands fa-linux",     couleur: "yellow-200",  hoverCouleur: "yellow-200", iconeCouleur: "white" },
    { nom: "Claude AI",   image: "img/claude.png",         couleur: "cyber-purple", hoverCouleur: "cyber-purple" },
    { nom: "Gemini",      image: "img/gemini.png",         couleur: "blue-400",    hoverCouleur: "blue-400" },
];

const conteneurCompetences = document.getElementById('grille-competences');

listeCompetences.forEach(comp => {
    const hoverBordure = comp.hoverCouleur || "cyber-green";
    const carte = document.createElement('div');
    carte.className = `bg-cyber-gray border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center py-5 hover:border-${hoverBordure} hover:bg-${hoverBordure}/10 transition-colors group`;

    let iconeHtml = '';
    if (comp.image) {
        iconeHtml = `<img src="${comp.image}" alt="${comp.nom.replace(/<br>/g, ' ')}" class="w-10 h-10 object-contain group-hover:scale-110 transition-transform mb-2" loading="lazy">`;
    } else {
        const couleurIcone = comp.iconeCouleur || comp.couleur;
        iconeHtml = `<i class="${comp.icone} text-4xl text-${couleurIcone} group-hover:scale-110 transition-transform mb-2"></i>`;
    }

    const centreTexte = comp.nom.includes('<br>') ? ' text-center' : '';
    const nomHtml = `<span class="font-tech text-xs text-gray-400 group-hover:text-white mb-2${centreTexte}">${comp.nom}</span>`;

    carte.innerHTML = iconeHtml + nomHtml;
    conteneurCompetences.appendChild(carte);
});

const emplacementFutur = document.createElement('div');
emplacementFutur.className = 'bg-cyber-gray/30 border-2 border-dashed border-gray-800 rounded-lg flex flex-col items-center justify-center py-5 text-center opacity-50 hover:opacity-100 hover:border-cyber-purple transition-all duration-300';
emplacementFutur.innerHTML = `
    <i class="fa-solid fa-lock text-gray-600 text-2xl mb-2"></i>
    <span class="font-tech text-xs text-gray-600 leading-tight">Bientôt...</span>
`;
conteneurCompetences.appendChild(emplacementFutur);

const listeProjets = [
    {
        titre:      "Portfolio Personnel V1",
        image:      "img/mockup-portfolio.png",
        badge:      "Front-end",
        description: "Portfolio personnel à identité visuelle cyber/neon, conçu et développé from scratch. Intègre des animations glitch, un effet typewriter, des cartes projets avec modales dynamiques et un terminal JSON interactif dans la section À Propos.",
        tags:       [
            { label: "HTML5", cls: "text-orange-400 bg-orange-400/10" },
            { label: "CSS3",  cls: "text-blue-400 bg-blue-400/10" },
            { label: "JS",    cls: "text-yellow-400 bg-yellow-400/10" }
        ],
        modaleIcone: "fa-solid fa-user-astronaut",
        modaleImages: ["img/portfolio-1.png", "img/portfolio-2.png", "img/portfolio-3.png"],
        modaleDesc:  "Portfolio personnel à identité visuelle cyber/neon, entièrement conçu et développé from scratch. Le projet intègre une animation glitch sur le nom, un effet typewriter pour les titres, un terminal JSON stylisé en section À Propos, ainsi que des cartes projets avec modales dynamiques gérées en JavaScript vanilla. Le design repose sur une palette néon vert/violet avec des animations de révélation au scroll, le tout stylisé via Tailwind CSS CDN sans build tooling.",
        url:         "#",
        labelLien:   "Vous y êtes déjà"
    },
    {
        titre:      "SAE 303 : Data Climat",
        image:      "img/mockup303.png",
        badge:      "Data Viz",
        description: "Application interactive d'exploration des opinions climatiques en France basée sur les données du Baromètre ADEME. Intégration d'une carte SVG dynamique et génération de graphiques.",
        tags:       [
            { label: "JavaScript", cls: "text-yellow-400 bg-yellow-400/10" },
            { label: "D3.js",      cls: "text-purple-400 bg-purple-400/10" },
            { label: "SVG",        cls: "text-green-400 bg-green-400/10" }
        ],
        modaleIcone: "fa-solid fa-chart-line",
        modaleImages: ["img/303-1.png", "img/303-2.png", "img/303-3.png"],
        modaleDesc:  "Application interactive d'exploration des opinions climatiques en France, basée sur les données du Baromètre ADEME. Le projet intègre une carte SVG cliquable par département, des graphiques générés en temps réel avec D3.js, ainsi qu'un système de filtres pour affiner la visualisation des données.",
        url:         "./SAE303/"
    },
    {
        titre:      "Jeu Motus (Architecture MVC)",
        image:      "img/motus-mockup.png",
        badge:      "Back-end / Jeu",
        description: "Développement complet d'un jeu web en PHP Orienté Objet utilisant l'architecture MVC. Implémentation d'une gestion stricte des sessions, base de données relationnelle et génération dynamique d'images.",
        tags:       [
            { label: "PHP OOP", cls: "text-indigo-400 bg-indigo-400/10" },
            { label: "MySQL",   cls: "text-blue-300 bg-blue-300/10" },
            { label: "MVC",     cls: "text-gray-300 bg-gray-600/30" }
        ],
        modaleIcone: "fa-solid fa-gamepad",
        modaleImages: ["img/motus-1.png", "img/motus-2.png", "img/motus-3.png"],
        modaleDesc:  "Développement complet d'un clone du jeu Motus en PHP Orienté Objet, structuré selon l'architecture MVC. Le projet comprend une gestion stricte des sessions utilisateur, une base de données relationnelle MySQL, une API de mots aléatoires et la génération dynamique d'images via la librairie GD de PHP.",
        url:         "./motustar/"
    },
    {
        titre:      "DevFront : Intégration stricte",
        image:      "img/mockupfront.png",
        badge:      "Intégration",
        description: "Projet de démonstration d'intégration web \"pixel-perfect\". Validation des standards du W3C, structuration HTML5 sémantique et utilisation avancée de CSS3 pour des animations fluides.",
        tags:       [
            { label: "HTML5",        cls: "text-orange-400 bg-orange-400/10" },
            { label: "CSS3",         cls: "text-blue-400 bg-blue-400/10" },
            { label: "GitHub Pages", cls: "text-white bg-white/10" }
        ],
        modaleIcone: "fa-solid fa-laptop-code",
        modaleImages: ["img/devfront1.png", "img/devfront2.png", "img/devfront3.png"],
        modaleDesc:  "Projet de démonstration d'intégration web pixel-perfect à partir de maquettes Figma. Validation totale des standards W3C, structuration HTML5 sémantique et utilisation avancée de CSS3 (Grid, Flexbox, Custom Properties) pour des animations et transitions fluides et performantes, déployé sur GitHub Pages.",
        url:         "./Dev%20Front/"
    }
];

const conteneurProjets = document.getElementById('grille-projets');

listeProjets.forEach(projet => {
    const carte = document.createElement('div');
    carte.className = 'group relative bg-cyber-gray border border-gray-700 rounded-lg overflow-hidden transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:border-cyber-green flex flex-col will-change-transform';

    const tagsHtml = projet.tags.map(tag =>
        `<span class="text-xs font-tech ${tag.cls} px-2 py-1 rounded">${tag.label}</span>`
    ).join('');

    carte.innerHTML = `
        <div class="min-h-[180px] md:h-72 relative overflow-hidden border-b border-gray-700 bg-gray-900 p-4">
            <img src="${projet.image}" alt="${projet.titre}" class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" loading="lazy">
            <div class="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors"></div>
            <div class="absolute top-4 right-4 bg-black/80 px-2 py-1 border border-gray-600 font-tech text-xs text-white rounded">${projet.badge}</div>
        </div>
        <div class="p-6 flex flex-col flex-grow">
            <h3 class="font-tech font-bold text-xl text-white mb-2 group-hover:text-cyber-green transition-colors">${projet.titre}</h3>
            <p class="text-gray-400 text-sm mb-4 flex-grow">${projet.description}</p>
            <div class="flex flex-wrap gap-2 mb-6">${tagsHtml}</div>
            <button class="ouvrir-modale inline-block text-sm font-tech text-white border-b border-cyber-green pb-1 hover:text-cyber-green transition-colors uppercase text-left"
                data-titre="${projet.titre}"
                data-images='${JSON.stringify(projet.modaleImages)}'
                data-icone="${projet.modaleIcone}"
                data-desc="${projet.modaleDesc.replace(/"/g, '&quot;')}"
                data-tags='${JSON.stringify(projet.tags)}'
                data-url="${projet.url || '#'}"
                data-label-lien="${projet.labelLien || ''}">
                Voir le projet <i class="fa-solid fa-arrow-right ml-1"></i>
            </button>
        </div>
    `;

    conteneurProjets.appendChild(carte);
});

const emplacementProjets = document.createElement('div');
emplacementProjets.className = 'md:col-span-2 border-2 border-dashed border-gray-700 rounded-lg p-8 flex flex-col items-center justify-center text-center opacity-50 hover:opacity-100 hover:border-cyber-purple transition-all duration-300';
emplacementProjets.innerHTML = `
    <i class="fa-solid fa-lock text-3xl text-gray-500 mb-3"></i>
    <h3 class="font-tech text-lg text-gray-400 uppercase">Projets en cours de développement...</h3>
    <p class="text-sm text-gray-500 mt-2 font-body">De nouveaux stages et projets personnels arrivent bientôt.</p>
`;
conteneurProjets.appendChild(emplacementProjets);

const modale         = document.getElementById('modale-projet');
const carteModale    = document.getElementById('carte-modale');
const titreProjet    = document.getElementById('titre-projet');
const imageProjet    = document.getElementById('image-projet');
const iconeProjet    = document.getElementById('icone-projet');
const descProjet     = document.getElementById('description-projet');
const tagsProjet     = document.getElementById('tags-projet');
const lienProjet     = document.getElementById('lien-projet');
const fermerHaut     = document.getElementById('fermer-haut');
const fermerBas      = document.getElementById('fermer-bas');
const fondModale     = document.getElementById('fond-modale');
const boutonPrecedent = document.getElementById('precedent');
const boutonSuivant  = document.getElementById('suivant');
const pointsCarousel = document.getElementById('points');

let imagesCarousel = [];
let indexCarousel  = 0;
let iconeActuelle  = '';

function afficherImageCarousel(index) {
    indexCarousel = index;
    imageProjet.src = imagesCarousel[index];
    imageProjet.alt = titreProjet.textContent + ' - ' + (index + 1);
    imageProjet.classList.remove('hidden');
    iconeProjet.className = 'hidden';

    imageProjet.onerror = () => {
        imageProjet.classList.add('hidden');
        iconeProjet.className = iconeActuelle + ' text-6xl text-gray-600';
    };

    pointsCarousel.querySelectorAll('button').forEach((point, i) => {
        point.className = i === index
            ? 'w-2.5 h-2.5 rounded-full bg-cyber-green shadow-[0_0_6px_#39ff14] transition-all'
            : 'w-2 h-2 rounded-full bg-gray-600 hover:bg-gray-400 transition-all';
    });
}

function ouvrirModale(data) {
    iconeActuelle = data.icone || 'fa-solid fa-code';

    titreProjet.textContent = data.titre;
    descProjet.textContent  = data.desc;

    imagesCarousel = data.images && data.images.length > 0 ? data.images : [];
    pointsCarousel.innerHTML = '';

    if (imagesCarousel.length > 1) {
        imagesCarousel.forEach((_, i) => {
            const point = document.createElement('button');
            point.setAttribute('aria-label', 'Image ' + (i + 1));
            point.className = i === 0
                ? 'w-2.5 h-2.5 rounded-full bg-cyber-green shadow-[0_0_6px_#39ff14] transition-all'
                : 'w-2 h-2 rounded-full bg-gray-600 hover:bg-gray-400 transition-all';
            point.addEventListener('click', () => afficherImageCarousel(i));
            pointsCarousel.appendChild(point);
        });
        boutonPrecedent.classList.remove('hidden');
        boutonSuivant.classList.remove('hidden');
        afficherImageCarousel(0);
    } else if (imagesCarousel.length === 1) {
        boutonPrecedent.classList.add('hidden');
        boutonSuivant.classList.add('hidden');
        indexCarousel = 0;
        imageProjet.src = imagesCarousel[0];
        imageProjet.alt = data.titre;
        imageProjet.classList.remove('hidden');
        iconeProjet.className = 'hidden';
        imageProjet.onerror = () => {
            imageProjet.classList.add('hidden');
            iconeProjet.className = iconeActuelle + ' text-6xl text-gray-600';
        };
    } else {
        boutonPrecedent.classList.add('hidden');
        boutonSuivant.classList.add('hidden');
        imageProjet.classList.add('hidden');
        iconeProjet.className = iconeActuelle + ' text-6xl text-gray-600';
    }

    tagsProjet.innerHTML = '';
    data.tags.forEach(tag => {
        const span       = document.createElement('span');
        span.className   = 'text-xs font-tech px-2 py-1 rounded ' + tag.cls;
        span.textContent = tag.label;
        tagsProjet.appendChild(span);
    });

    const labelLien = data.labelLien || 'Visiter le projet';
    lienProjet.querySelector('span')
        ? (lienProjet.querySelector('span').textContent = labelLien)
        : (lienProjet.innerHTML = `<i class="fa-solid fa-arrow-up-right-from-square mr-2"></i><span>${labelLien}</span>`);

    if (data.url && data.url !== '#') {
        lienProjet.href = data.url;
        lienProjet.classList.remove('opacity-40', 'pointer-events-none');
    } else {
        lienProjet.href = '#';
        lienProjet.classList.add('opacity-40', 'pointer-events-none');
    }

    modale.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    carteModale.classList.remove('carte-modale');
    void carteModale.offsetWidth;
    carteModale.classList.add('carte-modale');
}

function fermerModale() {
    modale.classList.add('hidden');
    document.body.style.overflow = '';
}

boutonPrecedent.addEventListener('click', () => {
    afficherImageCarousel((indexCarousel - 1 + imagesCarousel.length) % imagesCarousel.length);
});
boutonSuivant.addEventListener('click', () => {
    afficherImageCarousel((indexCarousel + 1) % imagesCarousel.length);
});

document.getElementById('grille-projets').addEventListener('click', (e) => {
    const btn = e.target.closest('.ouvrir-modale');
    if (!btn) return;

    ouvrirModale({
        titre:     btn.dataset.titre,
        images:    JSON.parse(btn.dataset.images),
        icone:     btn.dataset.icone || 'fa-solid fa-code',
        desc:      btn.dataset.desc,
        tags:      JSON.parse(btn.dataset.tags),
        url:       btn.dataset.url || '#',
        labelLien: btn.dataset.labelLien || '',
    });
});

fermerHaut.addEventListener('click',  fermerModale);
fermerBas.addEventListener('click',   fermerModale);
fondModale.addEventListener('click',  fermerModale);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modale.classList.contains('hidden')) {
        fermerModale();
    }
    if (!modale.classList.contains('hidden') && imagesCarousel.length > 1) {
        if (e.key === 'ArrowLeft')  boutonPrecedent.click();
        if (e.key === 'ArrowRight') boutonSuivant.click();
    }
});
