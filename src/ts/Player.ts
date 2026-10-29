import { billes, Bille } from "./bille";
import { etat_jeu } from "./variables";
import { ecran } from "./interfaces";
import { continue_apres_victoire } from "./main";

export class Player {
    score: number;
    vie: number;
    m_score: number;

    constructor() {
        this.score = 0;
        this.vie = 3;
        this.m_score = 0;
    }

    aug_score(score: number) {
        this.score += score;
    }

    perd_vie() {
        this.vie--;
    }

    nouv_m_score(){
        if (this.score > this.m_score) this.m_score = this.score
    }

    defaite() {
        if (this.vie > 0) return;

        console.log("perdu")
        etat_jeu.actif = false;
        this.nouv_m_score();

        ecran("go");
    }

    victoire(){
        let billes_recup: Bille[] = [];

        for (let bille of billes){
            if (bille.recup) billes_recup.push(bille);
        }

        if (billes_recup.length+1 >= billes.length){
            etat_jeu.actif = false;

            continue_apres_victoire();
        }
    }

    remet_a_0(){
        this.score = 0;
        this.vie = 3;
    }
}

// ** instancie joueur **
export const player = new Player();