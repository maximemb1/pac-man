import { elmt_html } from "./variables";
function ecran(ecran) {
    switch(ecran){
        case "home":
            elmt_html.home.classList.remove("hidden");
            elmt_html.home.classList.add("visible");
            elmt_html.game.classList.add("hidden");
            elmt_html.game.classList.remove("visible");
            console.log("home");
            break;
        case "game":
            elmt_html.game.classList.remove("hidden");
            elmt_html.game.classList.add("visible");
            elmt_html.home.classList.remove("visible");
            elmt_html.home.classList.add("hidden");
            console.log("game");
            break;
    }
}
export const declenche_jeu = ()=>{
    elmt_html.btn_jouer.addEventListener("click", ()=>{
        ecran("game");
    });
};
ecran("home");
