// *** GAME LOOP ***

// * importation des variables et fonctions nécessaires *
import {cvs, ctx, etat_jeu, elmt_html} from "./variables";
import {ecran, affiche_etat_jeu} from "./interfaces";
import {pacman} from "./pacman";
import {billes, boosts, creation_bille, creation_boost} from "./bille";
import { player } from "./Player";
import { fantomes, place_fantome } from "./fantome";
import { draw_map, change_map, Map, met_0_anim_ligne } from "./map";



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
    pacman.remet_a_0();
    remetA0(true);
    creation_bille(Map);
    creation_boost(Map);

    Animation_map()
    setTimeout( () => {
        etat_jeu.actif = true;
        gameloop();
    }, 2200);
}


declenche_jeu();
redeclenche_jeu(); 