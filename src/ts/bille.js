import { ctx } from "./variables";
import { pacman, Pacman } from "./pacman";
import { player } from "./Player";
class Bille {
    x;
    y;
    pts;
    color;
    size;
    recup;
    constructor(x, y, pts, color, size){
        this.x = x;
        this.y = y;
        this.pts = pts;
        this.color = color;
        this.size = size;
        this.recup = false;
    }
    draw(ctx) {
        if (!this.recup) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    colision_pacman(pacman) {
        const dx = this.x - pacman.x;
        const dy = this.y - pacman.y;
        const distance = Math.sqrt(dx ** 2 + dy ** 2);
        if (distance < this.size + pacman.size && !this.recup) {
            player.aug_score(this.pts);
            this.recup = true;
        }
        ;
    }
    update() {
        this.colision_pacman(pacman);
        this.draw(ctx);
    }
}
export const billes = [
    new Bille(50, 50, 75, "rgb(255,255,100)", 5)
];
for(let i = 1; i < 20; i++){
    billes.push(new Bille(20 * i / 2, 20 * i / 4, 75, "rgb(255,255,100)", 5));
}
