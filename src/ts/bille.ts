// **** BILLE ****
import { ctx} from "./variables";
import {pacman, Pacman} from "./pacman";
import { player } from "./Player";
import { TAILLE_CASE } from "./map";
import { position_libre } from "./utile";


export class Bille {
    x: number;
    y: number;
    pts: number;
    color: string;
    size: number;
    recup: boolean;

    constructor(x: number, y: number, pts: number, color: string, size: number){
        this.x = x;
        this.y = y;
        this.pts = pts;
        this.color = color;
        this.size = size;
        this.recup = false;
    }

    draw(ctx: CanvasRenderingContext2D){
        if (!this.recup){
            ctx.fillStyle = this.color;

            ctx.beginPath();
            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                2 * Math.PI
            )
            ctx.fill();
        }
    }

    colision_pacman(pacman: Pacman) {
        const dx = this.x - pacman.x;
        const dy = this.y - pacman.y;
        const distance = Math.sqrt(dx**2 + dy**2);

        if (distance < this.size + pacman.size && !this.recup) {

            player.aug_score(this.pts);
            player.aug_bille();
            player.victoire();
            this.recup = true;
        };
    }

    update(){
        this.colision_pacman(pacman);
        this.draw(ctx);
    }
}

export class BilleBoost extends Bille {
    constructor(x: number, y: number, pts: number){
        super(x, y, pts, "rgb(255,255,180)", 8);
    }

    colision_pacman(pacman: Pacman): void {
        const dx = this.x - pacman.x;
        const dy = this.y - pacman.y;
        const distance = Math.sqrt(dx**2 + dy**2);

        if (distance < this.size + pacman.size && !this.recup) {

            player.aug_score(this.pts);
            player.aug_bille();
            this.recup = true;
            pacman.prend_booste();
        }
    }
}


// ** Création billes **
export const billes: Bille[] = [];

export const boosts: BilleBoost[] = [];


export const creation_bille = (Map: number[][],debug=false) => {
    const posi_libre = position_libre(Map);
    if (!debug){
        for (const item of posi_libre) {
            const x = Number(item.x);
            const y = Number(item.y);
            billes.push(new Bille(x*TAILLE_CASE+TAILLE_CASE/2, y*TAILLE_CASE+TAILLE_CASE/2, 75, "rgb(255,255,100)", 5));
        }
    }
    else billes.push(new Bille(5*TAILLE_CASE+TAILLE_CASE/2, TAILLE_CASE+TAILLE_CASE/2,100000000, "rgb(255,255,100)",5));
}

export const creation_boost = (Map: number[][]) => {
    const posi_libre = position_libre(Map);

    let nbr_boost = 0;
    for (const item of posi_libre){
        if (nbr_boost <6 && Math.random() < 0.06){

            const x = Number(item.x);
            const y = Number(item.y);

            if (boosts.length === 0){
                boosts.push(new BilleBoost(x*TAILLE_CASE+TAILLE_CASE/2, y*TAILLE_CASE+TAILLE_CASE/2, 200));
            }
            else{
                if (Math.abs((boosts[boosts.length-1].x-TAILLE_CASE/2)/TAILLE_CASE - x) >= 4 && Math.abs((boosts[boosts.length-1].y-TAILLE_CASE/2)/TAILLE_CASE - y) >= 4){
                    nbr_boost++;
                    boosts.push(new BilleBoost(x*TAILLE_CASE+TAILLE_CASE/2, y*TAILLE_CASE+TAILLE_CASE/2, 200));
                }
            }
            

        }
    }
}