// **** BILLE ****
import { ctx} from "./variables";
import {pacman, Pacman} from "./pacman";
import { player } from "./Player";
import { Map, TAILLE_CASE } from "./map";
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
            player.victoire();
            this.recup = true;
        };
    }

    update(){
        this.colision_pacman(pacman);
        this.draw(ctx);
    }
}



// ** Création billes **
export const billes: Bille[] = [];

const posi_libre = position_libre(Map);

for (const item of posi_libre) {
    const x = Number(item.x);
    const y = Number(item.y);
    billes.push(new Bille(x*TAILLE_CASE+TAILLE_CASE/2, y*TAILLE_CASE+TAILLE_CASE/2, 75, "rgb(255,255,100)", 5));
}

console.log(billes.length)

//new Bille(50, 50, 75, "rgb(255,255,100)", 5)