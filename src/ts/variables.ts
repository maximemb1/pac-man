// *** VARIABLES ***

export const cvs = document.getElementById("cvs") as HTMLCanvasElement;
cvs.width = 600;
cvs.height = 600;
console.log(cvs.width, cvs.height)

export const ctx = cvs.getContext("2d") as CanvasRenderingContext2D;

// ** ELEMENTS HTML **
export const sect_home = document.getElementById("home") as HTMLElement;
export const sect_game = document.getElementById("game") as HTMLElement;

export const btn_jouer = document.getElementById("btn_jouer") as HTMLButtonElement;

export const elmt_html = {home: sect_home, game: sect_game, btn_jouer: btn_jouer};