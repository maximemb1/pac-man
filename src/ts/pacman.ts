// *** PAC MAN ***
import {cvs, ctx} from "./variables";
import { TAILLE_CASE, Map } from "./map";
import {Fantome, fantomes} from "./fantome"
import { player } from "./Player";


export class Pacman {
    x: number;
    y: number;
    last_position: number[];
    speed: number;
    direction: "droite" | "gauche" | "haut" | "bas";
    pro_dir: "droite" | "gauche" | "haut" | "bas" | null;
    size: number;
    anim_direction: number;
    angleDir: number;
    ouverture_bouche: number;
    color: string;
    invincible: boolean;
    dbt_invincible: number;
    booste:boolean;

    constructor(color: string) {
        this.x = 25+TAILLE_CASE/2;
        this.y = TAILLE_CASE +TAILLE_CASE/2;
        this.last_position = [this.x,this.y];
        this.speed = 2;
        this.direction = "droite";
        this.pro_dir = null;
        this.size = 12;
        this.anim_direction = 1;
        this.angleDir = 0;
        this.ouverture_bouche = 0.2 * Math.PI;
        this.color = color ? color : "rgb(255,221,58)";
        this.invincible = false;
        this.dbt_invincible = 0;
        this.booste = false;
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

    prend_invincibilite(){
        this.invincible = true;
        this.dbt_invincible = Date.now();
        this.color = "rgba(154,194,227,0.85)";
    }
    perd_invincibilite_boost(timer:number){
        const fin = timer;

        if (Date.now() - this.dbt_invincible >= fin){

            if (this.invincible) this.invincible = false;
            if (this.booste) this.booste = false;

            this.color = "rgb(255,221,58)";

            fantomes.forEach( (f) =>{
                f.speed = 1.4;
                f.etat = "normal";
            } )
        }
    }
    prend_booste() {    
        this.booste = true;    
        this.dbt_invincible = Date.now();
        this.color = "rgb(255, 124, 1)";

        fantomes.forEach( (f) =>{
            f.speed = 1;
            f.etat = "peur";
        } )
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
                this.pro_dir = "droite";
            };
            if (event.key === "ArrowLeft") {
                this.pro_dir = "gauche";
            };
            if (event.key === "ArrowUp") {
                this.pro_dir = "haut";
            };
            if (event.key === "ArrowDown") {
                this.pro_dir = "bas";
            };
        });
    }

    peut_tourner(map: number[][], dir_demande: "droite" | "gauche" | "haut" | "bas" |null): boolean {
        const col = Math.floor(this.x / TAILLE_CASE);
        const ligne = Math.floor(this.y / TAILLE_CASE);
        let pro_col = col;
        let pro_ligne = ligne;

        if (dir_demande === "droite") pro_col++;
        if (dir_demande === "gauche") pro_col--;
        if (dir_demande === "haut") pro_ligne--;
        if (dir_demande === "bas") pro_ligne++;

        // case existe ?
        if (pro_ligne < 0 || pro_ligne >= map.length || pro_col < 0 || pro_col >= map[pro_ligne].length) return false;

        return map[pro_ligne][pro_col] === 0;
    }
    tourner(map: number[][]){
        if (this.pro_dir === null) return;
        if (!this.franchit_centre()) return;
       
        if (!this.peut_tourner(map, this.pro_dir)) return;
            
            this.alignement_case();
            
            this.direction = this.pro_dir;

            if (this.direction === "droite") { 
                    this.angleDir = 0;
            };
            if (this.direction === "gauche") {
                    this.angleDir = Math.PI;
            }
            if (this.direction === "haut") {
                    this.angleDir = -Math.PI/2;
            }
            if (this.direction === "bas") {
                    this.angleDir = Math.PI/2;
            }
            this.pro_dir = null;
    }
    franchit_centre(): boolean {
        const centreX = Math.floor(this.x / TAILLE_CASE) * TAILLE_CASE + TAILLE_CASE/2;
        const centreY = Math.floor(this.y / TAILLE_CASE) * TAILLE_CASE + TAILLE_CASE/2;

        if (this.direction === "droite"){
            return this.x <= centreX && this.x + this.speed >= centreX;
        }
        if( this.direction === "gauche"){
            return this.x >= centreX && this.x - this.speed <= centreX;
        }
        if (this.direction === "bas"){
            return this.y <= centreY && this.y + this.speed >= centreY;
        }
        
        return this.y >= centreY && this.y - this.speed <= centreY;
    }
    alignement_case() {
        const centreX = Math.round((this.x - TAILLE_CASE / 2) / TAILLE_CASE) * TAILLE_CASE + TAILLE_CASE / 2;

        const centreY = Math.round((this.y - TAILLE_CASE / 2) / TAILLE_CASE)* TAILLE_CASE + TAILLE_CASE / 2;

        this.x = centreX;
        this.y = centreY;
    }



    colision_cvs(){

        if (this.x + this.size > cvs.width) this.x = cvs.width - this.size;
        if (this.x - this.size < 0) this.x = this.size;
        if (this.y - this.size < 0) this.y = this.size;
        if (this.y + this.size > cvs.height) this.y = cvs.height - this.size;
    }

    colision_mur(map:number[][]): boolean{
        const ligne: number = Math.floor(this.y / TAILLE_CASE);
        const col: number = Math.floor(this.x / TAILLE_CASE);

        for (let i= ligne-2; i <= ligne  + 2; i++){
            for (let j= col -2; j <= col +2; j++){
                // case existe ?
                if (i<0 || i >= map.length || j<0 || j>= map[i].length) continue;

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

    colision_fantome(f: Fantome){
        const centreX = this.x;
        const centreY = this.y;

        //lim rect fantome
        const gauche = f.x;
        const droite = f. x+ f.size;
        const haut = f.y;
        const bas = f.y+f.size;
        // point + proche de PM
        const procheX = Math.max(gauche, Math.min(centreX, droite)); // savoir si PM est entre le point G et le point D
        const procheY = Math.max(haut, Math.min(centreY, bas));      // idem pour Haut et Bas

        // distance
        const dx = centreX - procheX;
        const dy = centreY - procheY;
        const d = dx**2 + dy**2 + 30;
        
    
        if (d < this.size**2){
            if (!this.booste && !this.invincible){
                player.perd_vie();
                this.prend_invincibilite();
            }
            if (this.booste) {
                player.aug_score(400);
                f.sEstFaitMange();
            }
        }
    }
    remet_a_0(){
        this.booste = false;
        this.invincible = false;
        this.color = "rgb(255,221,58)";
        this.x = TAILLE_CASE+TAILLE_CASE/2;
        this.y = TAILLE_CASE+TAILLE_CASE/2;
        this.last_position = [this.x, this.y];


    }

    update(){
        this.tourner(Map);

        this.last_position = [this.x, this.y];

        this.deplacement();

        if (this.colision_mur(Map)){
            this.x = this.last_position[0];
            this.y = this.last_position[1];
        };

        for (const f of fantomes){
            this.colision_fantome(f);
        }
        if (this.invincible){
            this.perd_invincibilite_boost(5000);
        }

        if (this.booste){
            this.perd_invincibilite_boost(7000);
        }

        this.colision_cvs();
        this.animation();
        this.draw(ctx);
    }
}

export const pacman = new Pacman("rgb(255,221,58)");

pacman.changement_direction();
