// *** GAME LOOP ***

// * importation des variables et fonctions nécessaires *
import {cvs, ctx, etat_jeu, elmt_html} from "./variables";
import {ecran} from "./interfaces";
import {pacman} from "./pacman";
import {billes} from "./bille";
import { player } from "./Player";
import { fantomes } from "./fantome";
import { Map, draw_map } from "./map";

// * btn jouer *
const declenche_jeu = () => { elmt_html.btn_jouer.addEventListener("click", () => {
    ecran("game");
    lancer_jeu();
}) };

declenche_jeu();
 

// ** boucle jeu **
function gameloop(){
    if (!etat_jeu.actif) return;
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    draw_map(Map);
    
    billes.forEach( (bille) => {
        bille.update();
    });
    
    pacman.update();

    fantomes.forEach((fantome) => {
        fantome.update();
    });


    player.defaite();

    requestAnimationFrame(gameloop);
}


function lancer_jeu(){
    etat_jeu.actif = true;
    gameloop();
}

