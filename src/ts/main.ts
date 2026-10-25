// *** GAME LOOP ***

// * importation des variables et fonctions nécessaires *
import {cvs, ctx, etat_jeu, elmt_html} from "./variables";
import {ecran, affiche_etat_jeu} from "./interfaces";
import {pacman} from "./pacman";
import {billes, boosts, creation_bille, creation_boost} from "./bille";
import { player } from "./Player";
import { fantomes, place_fantome } from "./fantome";
import { draw_map, change_map, Map } from "./map";


// * btn jouer *
const declenche_jeu = () => { 
    elmt_html.btn_jouer.onclick = () => {
        console.log("Declenche jeu")
        ecran("game");
        remetA0();
        creation_bille(Map);
        creation_boost(Map);
        lancer_jeu();
    };
    
};
elmt_html.btn_rejouer.onclick = () => {
    console.log("REJOUer")
        ecran("game");
        remetA0();
        creation_bille(Map);
        creation_boost(Map);
       lancer_jeu();
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


function lancer_jeu(){
    etat_jeu.actif = true;
    gameloop();
}

const remetA0 = () => {
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    player.remet_a_0();
    pacman.remet_a_0();

    fantomes.splice(0,fantomes.length);
    place_fantome();

    billes.splice(0,billes.length);
    boosts.splice(0,boosts.length);

    console.log("MAAAAP")
    change_map();
   
}

declenche_jeu();