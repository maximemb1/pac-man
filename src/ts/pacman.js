import { cvs, ctx } from "./variables";
export class Pacman {
    x;
    y;
    speed;
    direction;
    size;
    anim_direction;
    angleDir;
    ouverture_bouche;
    color;
    constructor(color){
        this.x = 20;
        this.y = 200;
        this.speed = 1.5;
        this.direction = "droite";
        this.size = 12;
        this.anim_direction = 1;
        this.angleDir = 0;
        this.ouverture_bouche = 0.2 * Math.PI;
        this.color = color ? color : "rgb(255,221,58)";
    }
    animation() {
        this.ouverture_bouche += 0.035 * this.anim_direction;
        if (this.ouverture_bouche >= 0.36 * Math.PI) {
            this.anim_direction = -1;
        }
        if (this.ouverture_bouche <= 0.05 * Math.PI) {
            this.anim_direction = 1;
        }
    }
    draw(ctx) {
        const angle1 = this.angleDir + this.ouverture_bouche;
        const angle2 = this.angleDir - this.ouverture_bouche;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, angle1, angle2);
        ctx.lineTo(this.x + 0.5, this.y);
        ctx.fill();
    }
    deplacement() {
        if (this.direction === "droite") this.x += this.speed;
        if (this.direction === "gauche") this.x -= this.speed;
        if (this.direction === "haut") this.y -= this.speed;
        if (this.direction === "bas") this.y += this.speed;
    }
    changement_direction() {
        document.addEventListener("keydown", (event)=>{
            if (event.key === "ArrowRight") {
                this.direction = "droite";
                this.angleDir = 0;
                this.speed = 1.5;
            }
            ;
            if (event.key === "ArrowLeft") {
                this.direction = "gauche";
                this.angleDir = Math.PI;
                this.speed = 1.5;
            }
            if (event.key === "ArrowUp") {
                this.direction = "haut";
                this.angleDir = -Math.PI / 2;
                this.speed = 1.5;
            }
            if (event.key === "ArrowDown") {
                this.direction = "bas";
                this.angleDir = Math.PI / 2;
                this.speed = 1.5;
            }
        });
    }
    colision_cvs() {
        if (this.x + this.size > cvs.width || this.x - this.size < 0 || this.y - this.size < 0 || this.y + this.size > cvs.height) this.speed = 0;
        if (this.x + this.size > cvs.width) this.x = cvs.width - this.size;
        if (this.x - this.size < 0) this.x = this.size;
        if (this.y - this.size < 0) this.y = this.size;
        if (this.y + this.size > cvs.height) this.y = cvs.height - this.size;
    }
    update() {
        this.deplacement();
        this.colision_cvs();
        this.animation();
        this.draw(ctx);
    }
}
export const pacman = new Pacman("rgb(255,221,58)");
pacman.changement_direction();
