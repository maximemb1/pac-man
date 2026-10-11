// *** FANTOME ***
import { ctx, cvs } from "./variables";
import { Pacman, pacman } from "./pacman";

class Fantome{
    x: number;
    y: number;
    size: number;
    speed: number;
    color: string;

    constructor(x:number, y: number, size: number, speed: number, color: string){
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.color = color;
    }

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


    colision_cvs(){
        if (this.x < 0) this.x = this.size;
        if (this.x > cvs.width) this.x = cvs.width;
        if (this.y < 0) this.y = this.size;
        if (this.y > cvs.height) this.y = this.size;
    }

    suivre(pac: Pacman){

        const {dx,dy,d} = distance2points({x:this.x,y:this.y}, {x:pac.x-pac.size,y:pac.y-pac.size});
        
        if (d === 0) return;
        
        this.x += dx/d * this.speed;
        this.y += dy/d * this.speed;
        

    }

    update(){
        this.suivre(pacman);
        this.draw(ctx);
    }
}



export const fantomes = [new Fantome(50, 300, 22, 1.2,"rgb(1, 32, 72)")];

for (let i=1; i <= 3; i++){
    fantomes.push(new Fantome(200*i/2,200*i/2, 22, 0.5+i/6,"rgb(72, 1, 1)"));
}

// *** CALCUL DISTANCE entre FANTOME et PAC MAN ***
type Point = {
    x: number;
    y: number;
}
type Distances = {
    dx: number;
    dy:number;
    d: number;
}

function distance2points(p1: Point,p2: Point): Distances{
    let dx = p2.x - p1.x;
    let dy = p2.y - p1.y;
    let d = (dx**2 + dy**2)**0.5;

    return {dx, dy, d};
}