// *** INTERFACE ***
import { elmt_html} from "./variables";

export function ecran(ecran: string) {

    switch (ecran) {

        case "home":
            elmt_html.home.classList.remove("hidden");
            elmt_html.home.classList.add("visible");

            elmt_html.game.classList.add("hidden");
            elmt_html.game.classList.remove("visible");
            break;

        case "game":
            elmt_html.game.classList.remove("hidden");
            elmt_html.game.classList.add("visible");

            elmt_html.home.classList.remove("visible");
            elmt_html.home.classList.add("hidden");

            break;
    }
}


ecran("home");
