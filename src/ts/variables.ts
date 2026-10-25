// *** VARIABLES ***
// ** Types et interfaces **
export interface Dico {
    [cle: string]: string | number;
}
export type Point = {
    x: number;
    y: number;
}
export type Distances = {
    dx: number;
    dy:number;
    d: number;
}


export const cvs = document.getElementById("cvs") as HTMLCanvasElement;
cvs.width = 600;
cvs.height = 600;

export const ctx = cvs.getContext("2d") as CanvasRenderingContext2D;

export const etat_jeu = {actif: false, pause: false};

// ** ELEMENTS HTML **
const sect_home = document.getElementById("home") as HTMLElement;
const sect_game = document.getElementById("game") as HTMLElement;
const overlay = document.getElementById("overlay") as HTMLElement;

const btn_jouer = document.getElementById("btn_jouer") as HTMLButtonElement;
const btn_rejouer = document.getElementById("btn_rejouer") as HTMLButtonElement;

const barre_etat = document.getElementById("barre_etat") as HTMLElement;

const p_m_score = document.getElementById("p_m_score") as HTMLElement;
const sect_go = document.getElementById("GO") as HTMLElement;

export const elmt_html = {home: sect_home, game: sect_game, btn_jouer: btn_jouer, btn_rejouer: btn_rejouer,
    etat: barre_etat, m_score: p_m_score, go: sect_go, overlay: overlay};