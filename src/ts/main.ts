// *** GAME LOOP ***

// * importation des variables et fonctions nécessaires *
import {cvs, ctx, etat_jeu, elmt_html} from "./variables";
import {ecran, affiche_etat_jeu} from "./interfaces";
import {pacman} from "./pacman";
import {billes, boosts, creation_bille, creation_boost} from "./bille";
import { player } from "./Player";
import { fantomes, place_fantome } from "./fantome";
import { draw_map, change_map, Map, met_0_anim_ligne } from "./map";
import { get_save, save } from "./save";


ecran("home");

pacman.changement_direction();


// * btn jouer *
const declenche_jeu = () => { 
    elmt_html.btn_jouer.onclick = () => {
        console.log("Declenche jeu")
        
        ecran("game");
        remetA0();
        lancer_jeu();
    };
    
};
const redeclenche_jeu = () =>   { 
    elmt_html.btn_rejouer.onclick = () => {
        console.log("REJOUER")
        
        ecran("game");
        remetA0();
        lancer_jeu();
        }; 
};

// ** boucle jeu **
function gameloop(){
    if (!etat_jeu.actif) return;
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    draw_map(Map);
    
    billes.forEach( (bille) => {
        bille.update();
    });

    boosts.forEach(boost => {
        boost.update();
    });
    
    pacman.update();

    fantomes.forEach((fantome) => {
        fantome.update();
    });


    player.defaite();

    if (player.victoire()) continue_apres_victoire();

    affiche_etat_jeu();
    requestAnimationFrame(gameloop);
}

const Animation_map = () => {
    if (etat_jeu.actif) return;
    ctx.clearRect(0,0,cvs.width,cvs.height);

    draw_map(Map);

    requestAnimationFrame(Animation_map)
}

function lancer_jeu(){
    player.aug_parties();
    Animation_map()
    
    setTimeout( () => {
        etat_jeu.actif = true;
        creation_bille(Map);
        creation_boost(Map);
        gameloop();
    }, 2000);
}

const remetA0 = (victoire:boolean = false) => {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    save();

    met_0_anim_ligne();

    change_map();

    if (!victoire) {
        player.remet_a_0();
        pacman.remet_a_0();
    }

    fantomes.splice(0,fantomes.length);
    place_fantome(5);

    billes.splice(0,billes.length);
    boosts.splice(0,boosts.length);
   
}

export const continue_apres_victoire = () => {
    save();

    pacman.remet_a_0();
    remetA0(true);
    creation_bille(Map);
    creation_boost(Map);

    setTimeout(  () => {Animation_map()}, 200);
    setTimeout( () => {
        etat_jeu.actif = true;
        gameloop();
    }, 2200);
}

get_save();

declenche_jeu();
redeclenche_jeu(); 

// *** Gestion tactil ***
// Variables pour stocker la position de départ du tactil
let touchStartX = 0;
let touchStartY = 0;

window.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener("touchend", (e) => {
    if (!etat_jeu.actif) return;

    let touchEndX = e.changedTouches[0].clientX;
    let touchEndY = e.changedTouches[0].clientY;

    let diffX = touchEndX - touchStartX;
    let diffY = touchEndY - touchStartY;

    // On vérifie si le mouvement horizontal est plus grand que vertical
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 30) {
            pacman.pro_dir = "droite";
        } else if (diffX < -30) {
            pacman.pro_dir = "gauche";
        }
    } else {
        // Mouvement vertical
        if (diffY > 30) {
            pacman.pro_dir = "bas";
        } else if (diffY < -30) {
            pacman.pro_dir = "haut";
        }
    }
}, { passive: true });

// *** Gestion pause ***
window.addEventListener("keydown", (e) => {
    if (e.key === "p" || e.key === "Enter" || e.code === "Space"){

        if (!etat_jeu.pause){
            etat_jeu.pause = true;

            etat_jeu.actif = false;

            ecran("pause");
        }
        else {
            etat_jeu.pause = false;

            etat_jeu.actif = true;

            ecran("game");
            gameloop();
        }

    }
})