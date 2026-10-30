import { billes, Bille } from "./bille";
import { etat_jeu } from "./variables";
import { ecran } from "./interfaces";
import { save } from "./save";

export class Player {
    score: number;
    vie: number;
    m_score: number;
    bille_mangees: number;
    fantome_manges: number;
    parties_jouees: number;

    constructor() {
        this.score = 0;
        this.vie = 3;
        this.m_score = 0;
        this.bille_mangees = 0;
        this.fantome_manges = 0;
        this.parties_jouees = 0;
    }

    aug_score(score: number) {
        this.score += score;
    }

    perd_vie() {
        this.vie--;
        save();
    }

    nouv_m_score(){
        if (this.score > this.m_score) this.m_score = this.score
    }

    aug_bille(){
        this.bille_mangees++;
    }
    aug_fantome(){
        this.fantome_manges++;
    }
    aug_parties(){
        this.parties_jouees++;
    }

    defaite() {
        if (this.vie > 0) return;

        console.log("perdu")
        etat_jeu.actif = false;
        this.nouv_m_score();

        ecran("go");
    }

    victoire():boolean{
        let billes_recup: Bille[] = [];

        for (let bille of billes){
            if (bille.recup) billes_recup.push(bille);
        }

        if (billes_recup.length >= billes.length){
            etat_jeu.actif = false;
            return true;
        }
        return false;
    }

    remet_a_0(){
        this.score = 0;
        this.vie = 3;
    }
}

// ** instancie joueur **
export const player = new Player();