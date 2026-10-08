import { cvs, ctx } from "./variables";
import { declenche_jeu } from "./interfaces";
import { pacman } from "./pacman";
import { billes } from "./bille";
import { player } from "./Player";
declenche_jeu();
function gameloop() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    pacman.update();
    billes.forEach((bille)=>{
        bille.update();
    });
    player.defaite();
    requestAnimationFrame(gameloop);
}
gameloop();
