// *** FANTOME ***
import { ctx } from "./variables";
import { Pacman, pacman } from "./pacman";
import { distance2points, oppose_dir } from "./utile";
import { TAILLE_CASE, current_map_index, Map } from "./map";

export class Fantome{
    static prochainId = 0;
    id: number;
    x: number;
    y: number;
    last_pos: number[];
    last_case_decision: { ligne: number; col: number } | null = null;
    size: number;
    speed: number;
    dir: "gauche" | "droite" | "haut" | "bas";
    color: string;

    cont_coli: number;

    constructor(x:number, y: number, size: number, speed: number, color: string){
        this.id = Fantome.prochainId++;
        this.x = x;
        this.y = y;
        this.last_pos = [this.x, this.y];
        this.last_case_decision = null;
        this.size = size;
        this.speed = speed;
        this.dir = "droite";
        this.color = color;

        this.cont_coli = 0;
    }

    // **** Draw ****
    draw_patte(ctx: CanvasRenderingContext2D){
        for (let i: number = 0; i <= 2; i++){
            
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x + 4 +i*7,
                this.y+20,
                3.8,
                0,
                Math.PI
            );
            ctx.fill();
        }
    }
    draw_eye(ctx: CanvasRenderingContext2D){
        ctx.fillStyle = "rgb(230,230,230)";
        for (let i = 0; i < 2; i++){
            if (i === 1) i = 2;
            ctx.beginPath();
            ctx.arc(this.x+this.size/(3.5-i), this.y+this.size/3, 2.5, 0, Math.PI*2);
            ctx.fill();
        }
    }
    draw(ctx: CanvasRenderingContext2D){

        ctx.fillStyle = this.color;
        ctx.beginPath();            
        ctx.roundRect(this.x, this.y, this.size, 20, [10,10,0,0]);
        ctx.fill();

        this.draw_patte(ctx);
        this.draw_eye(ctx);
    }


    // **** IA deplacement ****
    choix_dir(pac: Pacman):{direction:"gauche" | "droite" | "haut" | "bas", score:number}[]{
        const {dx,dy,d} = distance2points({x:this.x,y:this.y}, {x:pac.x, y:pac.y});
        
        if (d !== 0){
        
            if (Math.abs(dx) < Math.abs(dy)){
                if (dx/d < 0) return [{direction: "gauche", score: 100},{direction: "droite", score: 75},{direction: "haut", score: 50},{direction: "bas", score: 25}];
                else return [{direction: "droite", score: 100},{direction: "gauche", score: 75},{direction: "bas", score: 50},{direction: "haut", score: 25}];
            }
            else {
                if (dy/d < 0) return [{direction: "haut", score: 100},{direction: "bas", score: 75},{direction: "droite", score: 50},{direction: "gauche", score: 25}];
                else return [{direction: "bas", score: 100},{direction: "haut", score: 75},{direction: "gauche", score: 50},{direction: "droite", score: 25}];
            }  
        }
        return [{direction: "droite", score: 100},{direction: "gauche", score: 75},{direction: "bas", score: 50},{direction: "haut", score: 25}];
    }
        // Vérifie si le fantôme franchit le centre de la case courante sur son axe de déplacement
    franchit_centre(col: number, ligne: number): boolean {
        const centreX = col * TAILLE_CASE + TAILLE_CASE / 2;
        const centreY = ligne * TAILLE_CASE + TAILLE_CASE / 2;

        const f_centreX = this.x + this.size / 2;
        const f_centreY = this.y + 10; 

        if (this.dir === "droite") {
            return f_centreX <= centreX && f_centreX + this.speed >= centreX;
        }
        if (this.dir === "gauche") {
            return f_centreX >= centreX && f_centreX - this.speed <= centreX;
        }
        if (this.dir === "bas") {
            return f_centreY <= centreY && f_centreY + this.speed >= centreY;
        }
        return f_centreY >= centreY && f_centreY - this.speed <= centreY;
    }

    alignement_case(col: number, ligne: number) {
        const centreX = col * TAILLE_CASE + TAILLE_CASE / 2;
        const centreY = ligne * TAILLE_CASE + TAILLE_CASE / 2;

        this.x = centreX - this.size / 2;
        this.y = centreY - 10; 
    }
    repere_intersection(map: number[][]): ("haut"|"bas"|"gauche"|"droite")[]{
        const directions_possible: ("haut"|"bas"|"gauche"|"droite")[] = [];

        const ligne: number = Math.floor((this.y+10) / TAILLE_CASE);
        const col: number = Math.floor((this.x+this.size/2) / TAILLE_CASE);

        if (ligne > 0 && (map[ligne-1][col] === 0 || map[ligne-1][col] === 2)) directions_possible.push("haut");                    // haut
        if (ligne+1 < map.length && (map[ligne+1][col] === 0 || map[ligne+1][col] === 2)) directions_possible.push("bas");          // bas
        if (col > 0 && (map[ligne][col-1] === 0 || map[ligne][col-1] === 2)) directions_possible.push("gauche");                    // gauche
        if (col+1 < map[ligne].length && (map[ligne][col+1] === 0 || map[ligne][col+1] === 2)) directions_possible.push("droite");  // droit

        return directions_possible;

    }
    choisir_dir(): ("haut"|"bas"|"gauche"|"droite"){
        const dir_accessible: ("haut"|"bas"|"gauche"|"droite")[] = this.repere_intersection(Map);
    //   const dir_pref: {direction:"gauche" | "droite" | "haut" | "bas", score:number}[] = this.choix_dir(pacman);

        // Enleve direction qui mene a un mur
        const direction_testees = dir_accessible.filter(direct => {
            const ancienX = this.x;
            const ancienY = this.y;

            if (direct === "gauche") this.x -= this.speed;
            if (direct === "droite") this.x += this.speed;
            if (direct === "haut") this.y -= this.speed;
            if (direct === "bas") this.y += this.speed;

            const sans_collision = !this.colision_mur(Map);

            // Restaurer la position après le test
            this.x = ancienX;
            this.y = ancienY;

            return sans_collision;
        });
        
        if (direction_testees.length === 0) return this.dir;

        const oppose = oppose_dir(this.dir); 
        // evite demi-tour
        const sans_oppose = direction_testees.filter(dir => dir !== oppose);
        // sans_oppose vide ? => fait demi-tour
        const directions_restante = sans_oppose.length > 0 ? sans_oppose : dir_accessible;

        // Trouver meilleur direction
        let meilleureDir = directions_restante[0];
        let plusCourteDistance = Infinity;

        for (const direct of directions_restante){
            let testX = this.x;
            let testY = this.y;

            if (direct === "gauche") testX -= this.speed;
            if (direct === "droite") testX += this.speed;
            if (direct === "haut") testY -= this.speed;
            if (direct === "bas") testY += this.speed;

            // distance vers PM
            const {d} = distance2points({x:testX, y:testY},{x:pacman.x,y:pacman.y});

            if (d < plusCourteDistance){
                plusCourteDistance = d;
                meilleureDir = direct;
            }
        }

        if (Math.random() < 0.11) return directions_restante[Math.floor( Math.random()*directions_restante.length )]
        return meilleureDir;
    }

    suivre(){
        if (this.dir === "gauche") this.x -= this.speed;
        if (this.dir === "droite") this.x += this.speed;
        if (this.dir === "haut") this.y -= this.speed;
        if (this.dir === "bas") this.y += this.speed;
    }


    // **** Colisions ****
    colision_mur(map:number[][]): boolean{
        const ligne: number = Math.floor(this.y / TAILLE_CASE);
        const col: number = Math.floor(this.x / TAILLE_CASE);

        for (let i= ligne-2; i <= ligne  + 2; i++){
            for (let j= col -2; j <= col +2; j++){
                // case existe ?
                if (i<0 || i >= map.length || j<0 || j>= map[i].length) continue;
                if (map[i][j] === 0 || map[i][j] === 2) continue;

                const murX = j * TAILLE_CASE;
                const murY = i * TAILLE_CASE;

                if (this.x+this.size > murX && this.x < murX+TAILLE_CASE && this.y < murY+TAILLE_CASE && this.y + 20 > murY) {
                    this.cont_coli++;
                    //console.log(this.cont_coli);
                    return true;
                }
            }
        }
        this.cont_coli = 0;
        return false;
    }


   update() {
        this.last_pos = [this.x, this.y];

        // Calcul de la ligne/colonne actuelle
        const ligne: number = Math.floor((this.y + 10) / TAILLE_CASE);
        const col: number = Math.floor((this.x + this.size / 2) / TAILLE_CASE);

        // Si on est à une intersection ET qu'on franchit le centre
        const directions_possibles = this.repere_intersection(Map);
        
        if (directions_possibles.length >= 2 && this.franchit_centre(col, ligne)) {
            if (this.last_case_decision?.ligne !== ligne || this.last_case_decision?.col !== col) {
                
                // s'aligne au centre 
                this.alignement_case(col, ligne);

                this.dir = this.choisir_dir();

                this.last_case_decision = { ligne, col };
            }
        }

        // Déplacement
        this.suivre();

        // collision  murs
        if (this.colision_mur(Map)) {
            [this.x, this.y] = this.last_pos;
            this.dir = this.choisir_dir(); 
        }

        this.draw(ctx);
    }
}


export const fantomes: Fantome[] = [];

const couleurs_fantomes = [
    "rgb(1, 32, 72)",
    "rgb(8, 84, 22)",
    "rgb(88, 7, 15)",
    "rgb(83, 80, 11)",
    "rgb(74, 10, 61)"
];

export const posi_depart: { map: number; posi: { ligne: number[]; col: number[] } }[] = [
    { map: 0, posi: { ligne: [21,22], col: [11, 12, 13] } },        // Map 3
    { map: 1, posi: { ligne: [9, 10], col: [10, 11, 12, 13] } },    // Map 4
    { map: 2, posi: { ligne: [8, 9, 10], col: [10, 11, 12, 13] } }, // Map 5
    { map: 3, posi: { ligne: [8, 9, 10], col: [10, 11, 12, 13] } }  // Map 6
];

export const place_fantome = () => {
    fantomes.length = 0; // Vide le tableau au cas où

    // Recherche les positions de départ de la map actuelle
    const config = posi_depart.find(p => p.map === current_map_index);

    // Position par défaut si non trouvée
    const lignes = config ? config.posi.ligne : [10];
    const cols = config ? config.posi.col : [11, 12];

    // Crée 4 fantômes en répartissant leurs positions de départ dans la maison
    for (let i = 0; i < 5; i++) {
        const ligne = lignes[i % lignes.length];
        const col = cols[i % cols.length];

        const x = col * TAILLE_CASE;
        const y = ligne * TAILLE_CASE;
        const color = couleurs_fantomes[i];

        fantomes.push(new Fantome(x, y, 22, 1.4, color));
    }
};

// Appelle la fonction pour placer les fantômes au démarrage
place_fantome();
