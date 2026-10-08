export const cvs = document.getElementById("cvs");
cvs.width = 600;
cvs.height = 600;
console.log(cvs.width, cvs.height);
export const ctx = cvs.getContext("2d");
export const sect_home = document.getElementById("home");
export const sect_game = document.getElementById("game");
export const btn_jouer = document.getElementById("btn_jouer");
export const elmt_html = {
    home: sect_home,
    game: sect_game,
    btn_jouer: btn_jouer
};
