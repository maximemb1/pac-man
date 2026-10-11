// *** PAC MAN ***
import {cvs, ctx} from "./variables";
import { map1, TAILLE_CASE } from "./map";

export class Pacman {
    x: number;
    y: number;
    last_position: number[];
    speed: number;
    direction: "droite" | "gauche" | "haut" | "bas";
    size: number;
    anim_direction: number;
    angleDir: number;
    ouverture_bouche: number;
    color: string;

    constructor(color: string) {
        this.x = 50;
        this.y = 200;
        this.last_position = [this.x,this.y];
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

        if (this.ouverture_bouche >= 0.36 * Math.PI){ // max => ouvre bouche
            this.anim_direction = -1;
        }

        if (this.ouverture_bouche <= 0.05 * Math.PI){ // min => ferme bouche
            this.anim_direction = 1;
        }
        
    }

    draw(ctx: CanvasRenderingContext2D) {   
        const angle1: number = this.angleDir + this.ouverture_bouche;    
        const angle2: number = this.angleDir - this.ouverture_bouche; 

        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            this.size,
            angle1,
            angle2
        );

        ctx.lineTo(this.x+0.5, this.y);
        ctx.fill();
    }

    deplacement(){
        if (this.direction === "droite")  this.x += this.speed;
        if (this.direction === "gauche") this.x -= this.speed;
        if (this.direction === "haut") this.y -= this.speed;
        if (this.direction === "bas") this.y += this.speed;
    }

    changement_direction() {
        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowRight") { 
                this.direction = "droite";
                this.angleDir = 0;
                this.speed = 1.5;
            };
            if (event.key === "ArrowLeft") {
                this.direction = "gauche";
                this.angleDir = Math.PI;
                this.speed = 1.5;
            }
            if (event.key === "ArrowUp") {
                this.direction = "haut";
                this.angleDir = -Math.PI/2;
                this.speed = 1.5;
            }
            if (event.key === "ArrowDown") {
                this.direction = "bas";
                this.angleDir = Math.PI/2;
                this.speed = 1.5;
            }
        });
    }

    colision_cvs(){
        if (this.x + this.size > cvs.width || this.x - this.size < 0 || this.y - this.size < 0 || this.y + this.size > cvs.height) this.speed = 0;

        if (this.x + this.size > cvs.width) this.x = cvs.width - this.size;
        if (this.x - this.size < 0) this.x = this.size;
        if (this.y - this.size < 0) this.y = this.size;
        if (this.y + this.size > cvs.height) this.y = cvs.height - this.size;
    }

    colision_mur(map:number[][]): boolean{
        for (let i=0; i < map.length; i++){
            for (let j=0; j < map[i].length; j++){
                if (map[i][j] === 0) continue;

                const murX = j * TAILLE_CASE;
                const murY = i * TAILLE_CASE;

                const coteProcheX = Math.max(murX, Math.min(this.x, murX+TAILLE_CASE));
                const coteProcheY = Math.max(murY, Math.min(this.y, murY+TAILLE_CASE));

                const dx = this.x - coteProcheX;
                const dy = this.y - coteProcheY;

                if (dx**2 + dy**2 < this.size**2){
                    // => colision
                    return true;
                }
                
            }
        }
        return false;
    }

    update(){
        this.last_position = [this.x, this.y];

        this.deplacement();

        if (this.colision_mur(map1)){
            this.x = this.last_position[0];
            this.y = this.last_position[1];
            this.speed = 0;
        };

        this.colision_cvs();
        this.animation();
        this.draw(ctx);
    }
}



export const pacman = new Pacman("rgb(255,221,58)");

pacman.changement_direction();

// *** dans la class pacman reste a faire vrai deplacement + change orientation dessin + bcp d'autre trucs ***