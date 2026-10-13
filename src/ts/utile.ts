// *** Utils ***

import type { Dico, Point, Distances } from "./variables";

// ** Pas sur mur **
export function position_libre(map: number[][]): Dico[] {
    let posi_libre: Dico[] = []
    for (let i=0; i < map.length; i++){
        for (let j=0; j < map[i].length; j++){

            if (map[i][j] === 0) {
                posi_libre.push({x:j, y:i});
            }

        }
    }

    return posi_libre
}

// *** CALCUL DISTANCE entre FANTOME et PAC MAN ***

export function distance2points(p1: Point,p2: Point): Distances{
    let dx = p2.x - p1.x;
    let dy = p2.y - p1.y;
    let d = (dx**2 + dy**2)**0.5;

    return {dx, dy, d};
}