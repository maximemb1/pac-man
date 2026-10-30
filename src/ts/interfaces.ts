// *** INTERFACE ***
import { elmt_html} from "./variables";
import { player } from "./Player";

export function ecran(ecran: string) {

    switch (ecran) {

        case "home":
            elmt_html.home.classList.remove("hidden");
            elmt_html.home.classList.add("visible");

            elmt_html.game.classList.add("hidden");
            elmt_html.game.classList.remove("visible");
            elmt_html.etat.classList.remove("visible");
            elmt_html.etat.classList.add("hidden");
            break;

        case "game":
            elmt_html.game.classList.remove("hidden");
            elmt_html.game.classList.add("visible");
            elmt_html.etat.classList.remove("hidden");
            elmt_html.etat.classList.add("visible");

            elmt_html.home.classList.remove("visible");
            elmt_html.home.classList.add("hidden");

            elmt_html.overlay.classList.remove("visible");
            elmt_html.overlay.classList.add("hidden");
            elmt_html.go.classList.remove("visible");
            elmt_html.go.classList.add("hidden");
            elmt_html.pause.classList.remove("visible");
            elmt_html.pause.classList.add("hidden");

            break;
        
        case "go":
            elmt_html.overlay.classList.remove("hidden");
            elmt_html.overlay.classList.add("visible");
            elmt_html.go.classList.remove("hidden");
            elmt_html.go.classList.add("visible");
            affiche_m_score();
            break;
        
        case "pause":
            elmt_html.overlay.classList.remove("hidden");
            elmt_html.overlay.classList.add("visible");
            elmt_html.go.classList.add("hidden");

            elmt_html.pause.classList.remove("hidden");
            elmt_html.pause.classList.add("visible");
            aff_m_score();
            afficher_score();
            break;
    }
}


// *** Etat de la partie ***
export function affiche_etat_jeu(){
    elmt_html.etat.innerHTML = `<p>Vie: ${player.vie}</p> 
                                <p>Score: ${player.score}</p>`;

}

const affiche_m_score = () => {
    elmt_html.m_score.innerHTML = `Meilleur score: ${player.m_score}`;
}
const afficher_score = () => {
    elmt_html.score_act.innerHTML = `Score: ${player.score}`;
}
const aff_m_score = () => {
    elmt_html.pause_m_score.innerHTML = `Record: ${player.m_score}`;
}