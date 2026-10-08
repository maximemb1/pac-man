export class Player {
    score: number;
    vie: number;

    constructor() {
        this.score = 0;
        this.vie = 3;
    }

    aug_score(score: number) {
        this.score += score;
        console.log(this.score)
    }

    perd_vie() {
        this.vie--;
    }

    defaite() {
        if (this.vie <= 0){
            // affichage ...
            return true;
        }
    }
}

// ** instancie joueur **
export const player = new Player();