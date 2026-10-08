// *** FANTOME ***
import { ctx } from "./variables";

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
            ctx.arc(this.x+this.size/(3.5-i), this.y+this.size/3, 3, 0, Math.PI*2);
            ctx.fill();
        }
    }

    draw(ctx: CanvasRenderingContext2D){

        ctx.fillStyle = this.color;
        ctx.beginPath();            
        ctx.roundRect(this.x, this.y, this.size, 20, [4,4,0,0]);
        ctx.fill();

        this.draw_patte(ctx);
        this.draw_eye(ctx);
    }

    update(){
        this.draw(ctx);
    }
}



export const fantomes = [new Fantome(50, 300, 22, 3,"rgb(72, 10, 1)")];

for (let i=1; i < 3; i++){
    fantomes.push(new Fantome(200*i/2,200*i/2, 22, 3,"rgb(72, 1, 1)"));
}