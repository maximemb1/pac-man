import { billes, Bille } from "./bille";
import { etat_jeu } from "./variables";

export class Player {
    score: number;
    vie: number;

    constructor() {
        this.score = 0;
        this.vie = 3;
    }

    aug_score(score: number) {
        this.score += score;
    }

    perd_vie() {
        this.vie--;
    }

    defaite() {
        if (this.vie <= 0){
            // affichage ...
            console.log("perdu")
            etat_jeu.actif = false;
            return true;
        }
    }

    victoire(){
        let billes_recup: Bille[] = [];

        for (let bille of billes){
            if (bille.recup) billes_recup.push(bille);
        }

        if (billes_recup.length+1 >= billes.length){
            etat_jeu.actif = false;
            // affichage...
        }
        
    }
}

// ** instancie joueur **
export const player = new Player();