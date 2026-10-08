export class Player {
    score;
    vie;
    constructor(){
        this.score = 0;
        this.vie = 3;
    }
    aug_score(score) {
        this.score += score;
        console.log(this.score);
    }
    perd_vie() {
        this.vie--;
    }
    defaite() {
        if (this.vie <= 0) {
            return true;
        }
    }
}
export const player = new Player();
